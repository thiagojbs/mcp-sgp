/**
 * Testes de conformidade do MCP SGP contra a especificação oficial.
 *
 * Não há acesso a um SGP real (sem credenciais e com egress bloqueado), portanto
 * estes testes validam CONFORMIDADE AO SPEC, não integração ao vivo:
 *  - Integridade do spec gerado (src/spec/sgp-endpoints.ts)
 *  - Construção correta da requisição pelo SGPClient (método, caminho, auth, params)
 *  - Cobertura 1:1 entre endpoints do spec e tools MCP geradas
 */

import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { SGP_ENDPOINTS } from '../src/spec/sgp-endpoints';
import { sgpTools } from '../src/tools/factory';
import { SGPClient } from '../src/sgp-client';

const EXPECTED_COUNT = 237;

// ---- Captura de requisição via mock de fetch ----
interface CapturedRequest {
  url: string;
  method: string;
  headers: Record<string, string>;
  body: string | null;
}
let captured: CapturedRequest;
const originalFetch = globalThis.fetch;

beforeEach(() => {
  globalThis.fetch = (async (input: RequestInfo | URL, init?: RequestInit) => {
    captured = {
      url: String(input),
      method: (init?.method as string) ?? 'GET',
      headers: (init?.headers as Record<string, string>) ?? {},
      body: (init?.body as string | null) ?? null
    };
    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  }) as typeof fetch;
});
afterEach(() => {
  globalThis.fetch = originalFetch;
});

const tokenClient = () =>
  new SGPClient({ baseUrl: 'https://prov.sgp.net.br', authType: 'token', token: 'TK', app: 'APP' });
const basicClient = () =>
  new SGPClient({ baseUrl: 'https://prov.sgp.net.br', authType: 'basic', username: 'user', password: 'pass' });

describe('Integridade do spec', () => {
  it(`contém exatamente ${EXPECTED_COUNT} endpoints`, () => {
    expect(SGP_ENDPOINTS.length).toBe(EXPECTED_COUNT);
  });

  it('todos os ids são únicos', () => {
    const ids = new Set(SGP_ENDPOINTS.map((e) => e.id));
    expect(ids.size).toBe(SGP_ENDPOINTS.length);
  });

  it('todos os métodos são válidos', () => {
    const valid = new Set(['GET', 'POST', 'PUT', 'PATCH', 'DELETE']);
    for (const e of SGP_ENDPOINTS) expect(valid.has(e.method)).toBe(true);
  });

  it('todo caminho começa com / e não contém espaços', () => {
    for (const e of SGP_ENDPOINTS) {
      expect(e.path.startsWith('/')).toBe(true);
      expect(/\s/.test(e.path)).toBe(false);
    }
  });

  it('toda variável de caminho aparece como {var} no path', () => {
    for (const e of SGP_ENDPOINTS) {
      for (const pp of e.pathParams) {
        expect(e.path.includes(`{${pp}}`)).toBe(true);
      }
    }
  });

  it('endpoints GET não possuem corpo (params em query)', () => {
    for (const e of SGP_ENDPOINTS) {
      if (e.method === 'GET') {
        expect(e.bodyMode).toBe('none');
        expect(e.bodyParams.length).toBe(0);
      }
    }
  });

  it('ids/tools não excedem 64 caracteres (limite de clientes MCP)', () => {
    for (const e of SGP_ENDPOINTS) expect(e.id.length).toBeLessThanOrEqual(64);
  });
});

describe('Cobertura spec × tools', () => {
  it(`gera exatamente ${EXPECTED_COUNT} tools`, () => {
    expect(sgpTools.length).toBe(EXPECTED_COUNT);
  });

  it('cada tool corresponde 1:1 a um endpoint (nome == id)', () => {
    const ids = new Set(SGP_ENDPOINTS.map((e) => e.id));
    for (const t of sgpTools) {
      expect(ids.has(t.name)).toBe(true);
      expect(t.name).toBe(t.endpoint.id);
    }
  });

  it('inputSchema marca as variáveis de caminho como obrigatórias', () => {
    for (const t of sgpTools) {
      const required = t.inputSchema.required ?? [];
      expect([...required].sort()).toEqual([...t.endpoint.pathParams].sort());
    }
  });

  it('inputShape contém todas as chaves de path/query/body', () => {
    for (const t of sgpTools) {
      const keys = Object.keys(t.inputShape).sort();
      const expected = [...t.endpoint.pathParams, ...t.endpoint.queryParams, ...t.endpoint.bodyParams].sort();
      expect(keys).toEqual(expected);
    }
  });
});

describe('SGPClient — autenticação por Token', () => {
  it('GET coloca token/app na query string e não envia corpo', async () => {
    const ep = SGP_ENDPOINTS.find((e) => e.method === 'GET' && e.pathParams.length === 0)!;
    await tokenClient().request(ep);
    const url = new URL(captured.url);
    expect(captured.method).toBe('GET');
    expect(url.searchParams.get('token')).toBe('TK');
    expect(url.searchParams.get('app')).toBe('APP');
    expect(captured.body).toBeNull();
  });

  it('POST form coloca token/app + params no corpo (urlencoded), não na URL', async () => {
    const ep = SGP_ENDPOINTS.find(
      (e) => e.method === 'POST' && e.bodyMode === 'form' && e.bodyParams.length > 0 && e.pathParams.length === 0
    )!;
    const param = ep.bodyParams[0];
    await tokenClient().request(ep, { [param]: 'valor1' });
    const url = new URL(captured.url);
    expect(captured.method).toBe('POST');
    expect(captured.headers['Content-Type']).toBe('application/x-www-form-urlencoded');
    expect(url.searchParams.get('token')).toBeNull(); // não vaza na URL
    const body = new URLSearchParams(captured.body ?? '');
    expect(body.get('token')).toBe('TK');
    expect(body.get('app')).toBe('APP');
    expect(body.get(param)).toBe('valor1');
  });

  it('endpoints JSON enviam corpo application/json com token', async () => {
    const ep = SGP_ENDPOINTS.find((e) => e.bodyMode === 'json')!;
    await tokenClient().request(ep, {});
    expect(captured.headers['Content-Type']).toBe('application/json');
    const parsed = JSON.parse(captured.body ?? '{}');
    expect(parsed.token).toBe('TK');
    expect(parsed.app).toBe('APP');
  });
});

describe('SGPClient — autenticação Basic', () => {
  it('envia cabeçalho Authorization Basic e não inclui token', async () => {
    const ep = SGP_ENDPOINTS.find((e) => e.method === 'POST' && e.bodyMode === 'form' && e.bodyParams.length > 0)!;
    await basicClient().request(ep, { [ep.bodyParams[0]]: 'x' });
    expect(captured.headers['Authorization']).toBe('Basic ' + btoa('user:pass'));
    const body = new URLSearchParams(captured.body ?? '');
    expect(body.get('token')).toBeNull();
  });
});

describe('SGPClient — variáveis de caminho e base URL', () => {
  it('substitui variáveis de caminho no path', async () => {
    const ep = SGP_ENDPOINTS.find((e) => e.pathParams.length > 0)!;
    const pp = ep.pathParams[0];
    await tokenClient().request(ep, { [pp]: '4242' });
    expect(captured.url).toContain('4242');
    expect(captured.url).not.toContain(`{${pp}}`);
  });

  it('lança erro quando variável de caminho obrigatória está ausente', async () => {
    const ep = SGP_ENDPOINTS.find((e) => e.pathParams.length > 0)!;
    await expect(tokenClient().request(ep, {})).rejects.toThrow(/caminho obrigatório/);
  });

  it('normaliza baseUrl terminado em /api evitando /api/api', async () => {
    const ep = SGP_ENDPOINTS.find((e) => e.method === 'GET' && e.path.startsWith('/api/') && e.pathParams.length === 0)!;
    const client = new SGPClient({ baseUrl: 'https://prov.sgp.net.br/api/', authType: 'token', token: 'TK', app: 'APP' });
    await client.request(ep);
    expect(captured.url).not.toContain('/api/api');
    expect(captured.url).toContain('https://prov.sgp.net.br/api/');
  });
});
