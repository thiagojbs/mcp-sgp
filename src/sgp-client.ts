/**
 * Cliente HTTP para a API do SGP.
 *
 * Autenticação (conforme documentação oficial — Sistema → Ferramentas → Painel Admin → Tokens):
 *  - Token:  `token` + `app` enviados JUNTO dos demais parâmetros
 *            (no CORPO em POST/PUT/PATCH/DELETE; na QUERY STRING em GET).
 *  - Basic:  usuário/senha no cabeçalho `Authorization: Basic ...`.
 *
 * O envio (query vs corpo) e o formato (form-urlencoded vs JSON) são derivados
 * da especificação canônica de cada endpoint (src/spec/sgp-endpoints.ts).
 */

import type { SgpEndpoint } from './spec/sgp-endpoints';

export interface SGPConfig {
  /** URL base do provedor, ex: https://seuprovedor.sgp.net.br (sem /api no final) */
  baseUrl: string;
  authType: 'basic' | 'token';
  username?: string;
  password?: string;
  token?: string;
  app?: string;
}

/** Resultado normalizado de uma chamada à API do SGP. */
export interface SGPResult {
  ok: boolean;
  status: number;
  /** Corpo parseado como JSON quando possível; caso contrário, texto cru. */
  data: unknown;
}

type ParamValue = string | number | boolean | null | undefined;

function isBlank(v: ParamValue): boolean {
  return v === undefined || v === null || v === '';
}

export class SGPClient {
  private config: SGPConfig;
  private baseUrl: string;

  constructor(config: SGPConfig) {
    this.config = config;
    // Os caminhos do spec já incluem o prefixo /api (ou /ws); por isso a base
    // não deve terminar com /api nem com barra.
    this.baseUrl = (config.baseUrl || '')
      .trim()
      .replace(/\/+$/, '')
      .replace(/\/api$/i, '');
  }

  private basicHeader(): Record<string, string> {
    if (this.config.authType === 'basic' && this.config.username) {
      const creds = btoa(`${this.config.username}:${this.config.password ?? ''}`);
      return { Authorization: `Basic ${creds}` };
    }
    return {};
  }

  /** Adiciona token/app conforme o método de autenticação configurado. */
  private applyTokenAuth(target: { set: (k: string, v: string) => void }): void {
    if (this.config.authType === 'token' && this.config.token) {
      target.set('token', this.config.token);
      if (this.config.app) target.set('app', this.config.app);
    }
  }

  /**
   * Executa um endpoint do SGP a partir da sua especificação canônica.
   */
  async request(ep: SgpEndpoint, params: Record<string, ParamValue> = {}): Promise<SGPResult> {
    // 1. Caminho + variáveis de caminho (obrigatórias)
    let path = ep.path;
    for (const name of ep.pathParams) {
      const value = params[name];
      if (isBlank(value)) {
        throw new Error(`Parâmetro de caminho obrigatório ausente: "${name}"`);
      }
      path = path.replace(`{${name}}`, encodeURIComponent(String(value)));
    }

    const url = new URL(this.baseUrl + path);

    // 2. Query string (parâmetros declarados como query)
    for (const name of ep.queryParams) {
      const value = params[name];
      if (!isBlank(value)) url.searchParams.set(name, String(value));
    }

    const headers: Record<string, string> = { Accept: 'application/json', ...this.basicHeader() };
    let body: BodyInit | undefined;

    const isGet = ep.method === 'GET';

    if (isGet) {
      // Em GET, token/app vão na query (fetch não permite corpo em GET).
      this.applyTokenAuth(url.searchParams);
    } else if (ep.bodyMode === 'json') {
      const payload: Record<string, unknown> = {};
      for (const name of ep.bodyParams) {
        const value = params[name];
        if (!isBlank(value)) payload[name] = value;
      }
      if (this.config.authType === 'token' && this.config.token) {
        payload.token = this.config.token;
        if (this.config.app) payload.app = this.config.app;
      }
      headers['Content-Type'] = 'application/json';
      body = JSON.stringify(payload);
    } else {
      // Padrão para POST/PUT/PATCH/DELETE: form-urlencoded (token/app no corpo).
      const form = new URLSearchParams();
      for (const name of ep.bodyParams) {
        const value = params[name];
        if (!isBlank(value)) form.set(name, String(value));
      }
      this.applyTokenAuth(form);
      headers['Content-Type'] = 'application/x-www-form-urlencoded';
      body = form.toString();
    }

    const response = await fetch(url.toString(), { method: ep.method, headers, body });

    // 3. Resposta normalizada (JSON quando possível, senão texto cru).
    const text = await response.text();
    let data: unknown = text;
    if (text) {
      try {
        data = JSON.parse(text);
      } catch {
        data = text;
      }
    }

    return { ok: response.ok, status: response.status, data };
  }
}
