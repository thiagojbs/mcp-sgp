/**
 * Fábrica de tools MCP a partir da especificação canônica de endpoints do SGP.
 *
 * Cada endpoint em src/spec/sgp-endpoints.ts vira exatamente uma tool MCP,
 * garantindo conformidade com a API real por construção (sem endpoints inventados).
 */

import { z, type ZodRawShape } from 'zod';
import { SGP_ENDPOINTS, type SgpEndpoint } from '../spec/sgp-endpoints';

/** Schema JSON simples (para listagem em /tools — documentação). */
export interface JsonSchema {
  type: 'object';
  properties: Record<string, { type: string; description: string }>;
  required?: string[];
}

export interface SgpTool {
  name: string;
  description: string;
  /** Schema JSON para documentação (endpoint HTTP /tools). */
  inputSchema: JsonSchema;
  /** Zod raw shape para registro no MCP SDK. */
  inputShape: ZodRawShape;
  endpoint: SgpEndpoint;
}

function buildInputSchema(ep: SgpEndpoint): JsonSchema {
  const properties: JsonSchema['properties'] = {};
  for (const name of ep.pathParams) {
    properties[name] = { type: 'string', description: `${name} (variável de caminho, obrigatório)` };
  }
  for (const name of ep.queryParams) {
    properties[name] = { type: 'string', description: `${name} (filtro/parâmetro de query)` };
  }
  for (const name of ep.bodyParams) {
    properties[name] = { type: 'string', description: `${name} (parâmetro de corpo)` };
  }
  const schema: JsonSchema = { type: 'object', properties };
  if (ep.pathParams.length > 0) schema.required = [...ep.pathParams];
  return schema;
}

function buildInputShape(ep: SgpEndpoint): ZodRawShape {
  const shape: ZodRawShape = {};
  for (const name of ep.pathParams) {
    shape[name] = z.string().describe(`${name} (variável de caminho, obrigatório)`);
  }
  for (const name of ep.queryParams) {
    shape[name] = z.string().optional().describe(`${name} (filtro/parâmetro de query)`);
  }
  for (const name of ep.bodyParams) {
    shape[name] = z.string().optional().describe(`${name} (parâmetro de corpo)`);
  }
  return shape;
}

function buildDescription(ep: SgpEndpoint): string {
  const base = `[${ep.section}] ${ep.name} — ${ep.method} ${ep.path}`;
  return ep.description ? `${base} · ${ep.description}` : base;
}

/** Todas as tools derivadas do spec (uma por endpoint). */
export const sgpTools: SgpTool[] = SGP_ENDPOINTS.map((ep) => ({
  name: ep.id,
  description: buildDescription(ep),
  inputSchema: buildInputSchema(ep),
  inputShape: buildInputShape(ep),
  endpoint: ep,
}));
