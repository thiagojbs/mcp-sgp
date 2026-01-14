/**
 * Ferramentas MCP para gestão de Faturas e Boletos
 */

import { z } from 'zod';
import { SGPClient } from '../sgp-client';

// Schemas de validação
export const listarFaturasSchema = z.object({
  contrato_id: z.number().optional().describe('ID do contrato para filtrar faturas'),
  cliente_id: z.number().optional().describe('ID do cliente para filtrar faturas'),
  status: z.enum(['aberta', 'paga', 'vencida', 'cancelada', 'todas']).optional().default('todas'),
  data_inicio: z.string().optional().describe('Data inicial (formato: YYYY-MM-DD)'),
  data_fim: z.string().optional().describe('Data final (formato: YYYY-MM-DD)'),
  page: z.number().optional().default(1),
  per_page: z.number().optional().default(20)
});

export const detalhesFaturaSchema = z.object({
  fatura_id: z.number().describe('ID da fatura no SGP')
});

export const segundaViaFaturaSchema = z.object({
  fatura_id: z.number().describe('ID da fatura para gerar segunda via')
});

export const listarFaturasURASchema = z.object({
  contrato_id: z.number().describe('ID do contrato para listar faturas')
});

export const listarBoletosSchema = z.object({
  status: z.enum(['pendente', 'pago', 'vencido', 'cancelado', 'todos']).optional().default('todos'),
  page: z.number().optional().default(1),
  per_page: z.number().optional().default(20)
});

export const detalhesBoletoSchema = z.object({
  boleto_id: z.number().describe('ID do boleto')
});

export const gerarBoletoSchema = z.object({
  fatura_id: z.number().describe('ID da fatura para gerar boleto'),
  vencimento: z.string().optional().describe('Nova data de vencimento (formato: YYYY-MM-DD)')
});

// Funções de ferramentas
export async function listarFaturas(client: SGPClient, params: z.infer<typeof listarFaturasSchema>) {
  const queryParams: Record<string, string | number | undefined> = {
    page: params.page,
    per_page: params.per_page
  };

  if (params.contrato_id) queryParams.contrato_id = params.contrato_id;
  if (params.cliente_id) queryParams.cliente_id = params.cliente_id;
  if (params.status && params.status !== 'todas') queryParams.status = params.status;
  if (params.data_inicio) queryParams.data_inicio = params.data_inicio;
  if (params.data_fim) queryParams.data_fim = params.data_fim;

  const response = await client.get('/faturas', queryParams);
  return response;
}

export async function detalhesFatura(client: SGPClient, params: z.infer<typeof detalhesFaturaSchema>) {
  const response = await client.get(`/faturas/${params.fatura_id}`);
  return response;
}

export async function segundaViaFatura(client: SGPClient, params: z.infer<typeof segundaViaFaturaSchema>) {
  // Gera segunda via - retorna link do boleto/PIX atualizado
  const response = await client.post(`/faturas/${params.fatura_id}/segunda-via`);
  return response;
}

export async function listarFaturasURA(client: SGPClient, params: z.infer<typeof listarFaturasURASchema>) {
  const response = await client.get(`/ura/faturas/${params.contrato_id}`);
  return response;
}

export async function listarBoletos(client: SGPClient, params: z.infer<typeof listarBoletosSchema>) {
  const queryParams: Record<string, string | number | undefined> = {
    page: params.page,
    per_page: params.per_page
  };
  if (params.status && params.status !== 'todos') queryParams.status = params.status;

  const response = await client.get('/boletos/listar', queryParams);
  return response;
}

export async function detalhesBoleto(client: SGPClient, params: z.infer<typeof detalhesBoletoSchema>) {
  const response = await client.get(`/boletos/detalhes/${params.boleto_id}`);
  return response;
}

export async function gerarBoleto(client: SGPClient, params: z.infer<typeof gerarBoletoSchema>) {
  const response = await client.post('/boletos/gerar', {
    fatura_id: params.fatura_id,
    vencimento: params.vencimento
  });
  return response;
}

// Definições das ferramentas para registro no MCP
export const faturasTools = [
  {
    name: 'sgp_listar_faturas',
    description: 'Lista faturas do SGP com filtros por contrato, cliente, status e período. Retorna valores, vencimentos e situação de pagamento.',
    inputSchema: {
      type: 'object',
      properties: {
        contrato_id: { type: 'number', description: 'ID do contrato' },
        cliente_id: { type: 'number', description: 'ID do cliente' },
        status: {
          type: 'string',
          enum: ['aberta', 'paga', 'vencida', 'cancelada', 'todas'],
          description: 'Status da fatura'
        },
        data_inicio: { type: 'string', description: 'Data inicial (YYYY-MM-DD)' },
        data_fim: { type: 'string', description: 'Data final (YYYY-MM-DD)' },
        page: { type: 'number' },
        per_page: { type: 'number' }
      }
    },
    handler: listarFaturas
  },
  {
    name: 'sgp_detalhes_fatura',
    description: 'Retorna detalhes completos de uma fatura específica, incluindo itens, valores, descontos e informações de pagamento.',
    inputSchema: {
      type: 'object',
      properties: {
        fatura_id: { type: 'number', description: 'ID da fatura' }
      },
      required: ['fatura_id']
    },
    handler: detalhesFatura
  },
  {
    name: 'sgp_segunda_via_fatura',
    description: 'Gera segunda via de uma fatura. Retorna link atualizado do boleto/PIX para pagamento.',
    inputSchema: {
      type: 'object',
      properties: {
        fatura_id: { type: 'number', description: 'ID da fatura' }
      },
      required: ['fatura_id']
    },
    handler: segundaViaFatura
  },
  {
    name: 'sgp_faturas_contrato',
    description: 'Lista faturas de um contrato específico (consulta rápida via URA). Ideal para verificar pendências de pagamento.',
    inputSchema: {
      type: 'object',
      properties: {
        contrato_id: { type: 'number', description: 'ID do contrato' }
      },
      required: ['contrato_id']
    },
    handler: listarFaturasURA
  },
  {
    name: 'sgp_listar_boletos',
    description: 'Lista boletos gerados no sistema com filtros por status.',
    inputSchema: {
      type: 'object',
      properties: {
        status: {
          type: 'string',
          enum: ['pendente', 'pago', 'vencido', 'cancelado', 'todos'],
          description: 'Status do boleto'
        },
        page: { type: 'number' },
        per_page: { type: 'number' }
      }
    },
    handler: listarBoletos
  },
  {
    name: 'sgp_detalhes_boleto',
    description: 'Retorna detalhes de um boleto específico, incluindo linha digitável, código de barras e informações para pagamento.',
    inputSchema: {
      type: 'object',
      properties: {
        boleto_id: { type: 'number', description: 'ID do boleto' }
      },
      required: ['boleto_id']
    },
    handler: detalhesBoleto
  },
  {
    name: 'sgp_gerar_boleto',
    description: 'Gera um novo boleto para uma fatura, opcionalmente com nova data de vencimento.',
    inputSchema: {
      type: 'object',
      properties: {
        fatura_id: { type: 'number', description: 'ID da fatura' },
        vencimento: { type: 'string', description: 'Nova data de vencimento (YYYY-MM-DD)' }
      },
      required: ['fatura_id']
    },
    handler: gerarBoleto
  }
];
