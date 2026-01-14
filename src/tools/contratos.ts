/**
 * Ferramentas MCP para gestão de Contratos
 */

import { z } from 'zod';
import { SGPClient } from '../sgp-client';

// Schemas de validação
export const listarContratosSchema = z.object({
  cliente_id: z.number().optional().describe('ID do cliente para filtrar contratos'),
  status: z.enum(['ativo', 'suspenso', 'cancelado', 'todos']).optional().default('todos').describe('Status do contrato'),
  page: z.number().optional().default(1),
  per_page: z.number().optional().default(20)
});

export const detalhesContratoSchema = z.object({
  contrato_id: z.number().describe('ID do contrato no SGP')
});

export const consultarContratoURASchema = z.object({
  contrato_id: z.number().describe('ID do contrato para consulta via URA')
});

// Funções de ferramentas
export async function listarContratos(client: SGPClient, params: z.infer<typeof listarContratosSchema>) {
  const queryParams: Record<string, string | number | undefined> = {
    page: params.page,
    per_page: params.per_page
  };

  if (params.cliente_id) {
    queryParams.cliente_id = params.cliente_id;
  }
  if (params.status && params.status !== 'todos') {
    queryParams.status = params.status;
  }

  const response = await client.get('/contratos', queryParams);
  return response;
}

export async function detalhesContrato(client: SGPClient, params: z.infer<typeof detalhesContratoSchema>) {
  const response = await client.get(`/contratos/${params.contrato_id}`);
  return response;
}

export async function consultarContratoURA(client: SGPClient, params: z.infer<typeof consultarContratoURASchema>) {
  // Endpoint específico da URA com informações resumidas
  const response = await client.get(`/ura/contrato/${params.contrato_id}`);
  return response;
}

// Definições das ferramentas para registro no MCP
export const contratosTools = [
  {
    name: 'sgp_listar_contratos',
    description: 'Lista contratos do SGP com filtros por cliente e status. Retorna informações como plano, valor, vencimento e situação.',
    inputSchema: {
      type: 'object',
      properties: {
        cliente_id: { type: 'number', description: 'ID do cliente para filtrar contratos' },
        status: {
          type: 'string',
          enum: ['ativo', 'suspenso', 'cancelado', 'todos'],
          description: 'Status do contrato (padrão: todos)'
        },
        page: { type: 'number', description: 'Número da página' },
        per_page: { type: 'number', description: 'Itens por página' }
      }
    },
    handler: listarContratos
  },
  {
    name: 'sgp_detalhes_contrato',
    description: 'Retorna detalhes completos de um contrato específico, incluindo plano, valores, histórico de pagamentos e serviços contratados.',
    inputSchema: {
      type: 'object',
      properties: {
        contrato_id: { type: 'number', description: 'ID do contrato no SGP' }
      },
      required: ['contrato_id']
    },
    handler: detalhesContrato
  },
  {
    name: 'sgp_consultar_contrato_resumido',
    description: 'Consulta resumida de contrato (via URA) - retorna informações essenciais como status, plano e pendências de forma rápida.',
    inputSchema: {
      type: 'object',
      properties: {
        contrato_id: { type: 'number', description: 'ID do contrato' }
      },
      required: ['contrato_id']
    },
    handler: consultarContratoURA
  }
];
