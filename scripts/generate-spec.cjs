/**
 * Gera a especificação canônica de endpoints do SGP a partir da collection oficial
 * do Postman.
 *
 *   Entrada : docs/sgp-api-spec.postman_collection.json
 *   Saídas  : src/spec/sgp-endpoints.ts  (fonte da verdade da integração)
 *             docs/endpoint-map.md       (tabela legível por seção)
 *
 * Uso: node scripts/generate-spec.cjs
 *
 * Ao atualizar a API: reimporte/exporte a collection oficial sobre o arquivo de
 * entrada e rode este gerador. NÃO edite src/spec/sgp-endpoints.ts à mão.
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const SRC = path.join(ROOT, 'docs', 'sgp-api-spec.postman_collection.json');
const OUT_TS = path.join(ROOT, 'src', 'spec', 'sgp-endpoints.ts');
const OUT_MD = path.join(ROOT, 'docs', 'endpoint-map.md');

const AUTH_KEYS = new Set(['token', 'app']); // injetados pela config, não viram params da tool

const SECTION_SLUG = {
  'Central Assinante': 'central',
  'Remessa / Retorno': 'remessa',
  FTTH: 'ftth',
  Estoque: 'estoque',
  'Termo de Aceite': 'termo',
  URA: 'ura',
  CRM: 'crm',
  'Pré-Cadastro': 'precadastro',
  RADIUS: 'radius',
  'Ordem de Serviço': 'os',
  Suporte: 'suporte',
  Outros: 'outros',
  'Gerenciador CPE': 'cpe',
};

function deaccent(s) {
  return s.normalize('NFD').replace(/[̀-ͯ]/g, '');
}
function slug(s) {
  return deaccent(s).toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_+|_+$/g, '').replace(/_+/g, '_');
}
function rawUrl(r) {
  if (!r.url) return '';
  if (typeof r.url === 'string') return r.url;
  return r.url.raw || '';
}

function extract(collection) {
  const endpoints = [];
  const usedIds = new Set();
  let section = '';

  function walk(items) {
    for (const it of items || []) {
      if (it.request) {
        const r = it.request;
        let url = rawUrl(r);
        let p = url.replace(/^https?:\/\/[^/]+/, '').replace(/\{\{url\}\}/g, '').replace(/\?.*$/, '');
        p = p.replace(/\s+/g, '').replace(/\/{2,}/g, '/');
        if (!p.startsWith('/')) p = '/' + p;

        const pathParams = [];
        p = p.replace(/\{([^{}]+)\}/g, (_m, name) => {
          const key = slug(name);
          pathParams.push(key);
          return `{${key}}`;
        });

        let queryParams = [];
        if (r.url && typeof r.url === 'object' && Array.isArray(r.url.query)) {
          queryParams = r.url.query.filter((q) => !q.disabled && q.key && !AUTH_KEYS.has(q.key)).map((q) => q.key);
        }

        let bodyMode = 'none';
        let bodyParams = [];
        if (r.body && (r.body.mode === 'formdata' || r.body.mode === 'urlencoded')) {
          bodyMode = 'form';
          const arr = r.body.mode === 'formdata' ? r.body.formdata : r.body.urlencoded;
          bodyParams = (arr || []).filter((f) => f.key && !AUTH_KEYS.has(f.key)).map((f) => f.key);
        } else if (r.body && r.body.mode === 'raw' && (r.body.raw || '').trim()) {
          bodyMode = 'json';
          try {
            const obj = JSON.parse(r.body.raw);
            if (obj && typeof obj === 'object' && !Array.isArray(obj)) {
              bodyParams = Object.keys(obj).filter((k) => !AUTH_KEYS.has(k));
            }
          } catch { /* corpo não-JSON: mantém json sem params */ }
        }

        const seen = new Set(pathParams);
        queryParams = queryParams.filter((k) => !seen.has(k) && (seen.add(k), true));
        bodyParams = bodyParams.filter((k) => !seen.has(k) && (seen.add(k), true));

        if (r.method === 'GET' && bodyMode === 'form') {
          for (const k of bodyParams) if (!seen.has(k)) { queryParams.push(k); seen.add(k); }
          bodyMode = 'none';
          bodyParams = [];
        }

        const secSlug = SECTION_SLUG[section] || slug(section);
        let base = ('sgp_' + secSlug + '_' + slug(it.name)).slice(0, 62);
        let id = base, n = 2;
        while (usedIds.has(id)) id = base + '_' + n++;
        usedIds.add(id);

        const description = (typeof r.description === 'string' ? r.description : it.description || '') || '';

        endpoints.push({
          id, name: it.name, section, method: r.method || 'GET', path: p,
          pathParams, queryParams, bodyMode, bodyParams,
          description: description.replace(/\s+/g, ' ').trim().slice(0, 300),
        });
      }
      if (it.item) walk(it.item);
    }
  }

  // A seção é a pasta de nível superior; subpastas herdam a seção do topo.
  for (const folder of collection.item) {
    section = folder.name;
    walk(folder.item ? folder.item : [folder]);
  }
  return endpoints;
}

function main() {
  const collection = JSON.parse(fs.readFileSync(SRC, 'utf8'));
  const eps = extract(collection);

  // ---- TS ----
  const header = `/**
 * Especificação canônica dos endpoints da API do SGP.
 *
 * GERADO automaticamente por scripts/generate-spec.cjs a partir da collection oficial
 * (docs/sgp-api-spec.postman_collection.json). NÃO editar à mão.
 *
 * Total de endpoints: ${eps.length}
 */

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
export type BodyMode = 'none' | 'form' | 'json';

export interface SgpEndpoint {
  /** Nome único da tool MCP (ex: sgp_ura_cliente_consultar) */
  id: string;
  /** Rótulo legível (nome original na collection) */
  name: string;
  /** Seção da API (Central Assinante, URA, FTTH, ...) */
  section: string;
  /** Método HTTP */
  method: HttpMethod;
  /** Caminho relativo à base (ex: /api/ura/consultacliente/); pode conter {var} */
  path: string;
  /** Variáveis de caminho obrigatórias */
  pathParams: string[];
  /** Parâmetros enviados na query string */
  queryParams: string[];
  /** Como o corpo é enviado */
  bodyMode: BodyMode;
  /** Parâmetros enviados no corpo (token/app NÃO entram aqui — vêm da config) */
  bodyParams: string[];
  /** Descrição curta */
  description: string;
}

export const SGP_ENDPOINTS: SgpEndpoint[] = `;
  fs.mkdirSync(path.dirname(OUT_TS), { recursive: true });
  fs.writeFileSync(OUT_TS, header + JSON.stringify(eps, null, 2) + ';\n');

  // ---- MD ----
  const bySection = {};
  for (const e of eps) (bySection[e.section] ||= []).push(e);
  let md = `# Mapa de Endpoints da API SGP (fonte da verdade)\n\n`;
  md += `Gerado a partir da collection oficial do Postman. Total: **${eps.length} endpoints** em ${Object.keys(bySection).length} seções.\n\n`;
  md += `Autenticação: \`token\` + \`app\` (método Token) ou HTTP Basic. Em **GET** os parâmetros (incl. token/app no modo Token) vão na **query string**; em **POST/PUT/PATCH/DELETE** vão no **corpo** (form-urlencoded ou JSON). \`token\`/\`app\` são injetados pela configuração da conexão.\n\n`;
  for (const [sec, list] of Object.entries(bySection)) {
    md += `## ${sec} (${list.length})\n\n| Tool | Método | Endpoint | Path | Query | Body |\n|---|---|---|---|---|---|\n`;
    for (const e of list) {
      md += `| \`${e.id}\` | ${e.method} | \`${e.path}\` | ${e.pathParams.join(', ') || '—'} | ${e.queryParams.join(', ') || '—'} | ${e.bodyMode === 'none' ? '—' : e.bodyMode + ': ' + (e.bodyParams.join(', ') || '—')} |\n`;
    }
    md += `\n`;
  }
  fs.writeFileSync(OUT_MD, md);

  console.log(`OK: ${eps.length} endpoints → ${path.relative(ROOT, OUT_TS)} + ${path.relative(ROOT, OUT_MD)}`);
}

main();
