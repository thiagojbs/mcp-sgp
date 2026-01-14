/**
 * Ferramentas MCP para gestão de Chamados de Suporte
 */

import { z } from 'zod';
import { SGPClient } from '../sgp-client';

// Schemas de validação
export const listarChamadosSchema = z.object({
  cliente_id: z.number().optional().describe('ID do cliente'),
  status: z.enum(['aberto', 'em_atendimento', 'aguardando', 'resolvido', 'fechado', 'todos']).optional().default('todos'),
  categoria_id: z.number().optional().describe('ID da categoria'),
  prioridade: z.enum(['baixa', 'media', 'alta', 'urgente', 'todas']).optional().default('todas'),
  data_inicio: z.string().optional().describe('Data inicial (YYYY-MM-DD)'),
  data_fim: z.string().optional().describe('Data final (YYYY-MM-DD)'),
  page: z.number().optional().default(1),
  per_page: z.number().optional().default(20)
});

export const detalhesChamadoSchema = z.object({
  chamado_id: z.number().describe('ID do chamado')
});

export const abrirChamadoSchema = z.object({
  cliente_id: z.number().describe('ID do cliente'),
  contrato_id: z.number().optional().describe('ID do contrato relacionado'),
  categoria_id: z.number().describe('ID da categoria do chamado'),
  prioridade: z.enum(['baixa', 'media', 'alta', 'urgente']).optional().default('media'),
  titulo: z.string().describe('Título/assunto do chamado'),
  descricao: z.string().describe('Descrição detalhada do problema'),
  atendente_id: z.number().optional().describe('ID do atendente para atribuição')
});

export const interagirChamadoSchema = z.object({
  chamado_id: z.number().describe('ID do chamado'),
  mensagem: z.string().describe('Mensagem da interação'),
  interno: z.boolean().optional().default(false).describe('Se é uma nota interna (não visível ao cliente)')
});

export const atribuirChamadoSchema = z.object({
  chamado_id: z.number().describe('ID do chamado'),
  atendente_id: z.number().describe('ID do atendente')
});

export const finalizarChamadoSchema = z.object({
  chamado_id: z.number().describe('ID do chamado'),
  solucao: z.string().describe('Descrição da solução aplicada')
});

export const listarCategoriasSchema = z.object({
  page: z.number().optional().default(1),
  per_page: z.number().optional().default(50)
});

// Funções de ferramentas
export async function listarChamados(client: SGPClient, params: z.infer<typeof listarChamadosSchema>) {
  const queryParams: Record<string, string | number | undefined> = {
    page: params.page,
    per_page: params.per_page
  };

  if (params.cliente_id) queryParams.cliente_id = params.cliente_id;
  if (params.status && params.status !== 'todos') queryParams.status = params.status;
  if (params.categoria_id) queryParams.categoria_id = params.categoria_id;
  if (params.prioridade && params.prioridade !== 'todas') queryParams.prioridade = params.prioridade;
  if (params.data_inicio) queryParams.data_inicio = params.data_inicio;
  if (params.data_fim) queryParams.data_fim = params.data_fim;

  const response = await client.get('/suporte/chamados', queryParams);
  return response;
}

export async function detalhesChamado(client: SGPClient, params: z.infer<typeof detalhesChamadoSchema>) {
  const response = await client.get(`/suporte/chamados/${params.chamado_id}`);
  return response;
}

export async function abrirChamado(client: SGPClient, params: z.infer<typeof abrirChamadoSchema>) {
  const response = await client.post('/suporte/chamados', {
    cliente_id: params.cliente_id,
    contrato_id: params.contrato_id,
    categoria_id: params.categoria_id,
    prioridade: params.prioridade,
    titulo: params.titulo,
    descricao: params.descricao,
    atendente_id: params.atendente_id
  });
  return response;
}

export async function interagirChamado(client: SGPClient, params: z.infer<typeof interagirChamadoSchema>) {
  const response = await client.post(`/suporte/chamados/${params.chamado_id}/interacoes`, {
    mensagem: params.mensagem,
    interno: params.interno
  });
  return response;
}

export async function atribuirChamado(client: SGPClient, params: z.infer<typeof atribuirChamadoSchema>) {
  const response = await client.post(`/suporte/chamados/${params.chamado_id}/atribuir`, {
    atendente_id: params.atendente_id
  });
  return response;
}

export async function finalizarChamado(client: SGPClient, params: z.infer<typeof finalizarChamadoSchema>) {
  const response = await client.post(`/suporte/chamados/${params.chamado_id}/finalizar-atendimento`, {
    solucao: params.solucao
  });
  return response;
}

export async function listarCategorias(client: SGPClient, params: z.infer<typeof listarCategoriasSchema>) {
  const response = await client.get('/suporte/categorias', {
    page: params.page,
    per_page: params.per_page
  });
  return response;
}

export async function listarInteracoes(client: SGPClient, params: z.infer<typeof detalhesChamadoSchema>) {
  const response = await client.get(`/suporte/chamados/${params.chamado_id}/interacoes`);
  return response;
}

// Definições das ferramentas para registro no MCP
export const chamadosTools = [
  {
    name: 'sgp_listar_chamados',
    description: 'Lista chamados de suporte com filtros por cliente, status, categoria, prioridade e período.',
    inputSchema: {
      type: 'object',
      properties: {
        cliente_id: { type: 'number', description: 'ID do cliente' },
        status: {
          type: 'string',
          enum: ['aberto', 'em_atendimento', 'aguardando', 'resolvido', 'fechado', 'todos'],
          description: 'Status do chamado'
        },
        categoria_id: { type: 'number', description: 'ID da categoria' },
        prioridade: {
          type: 'string',
          enum: ['baixa', 'media', 'alta', 'urgente', 'todas'],
          description: 'Prioridade do chamado'
        },
        data_inicio: { type: 'string', description: 'Data inicial (YYYY-MM-DD)' },
        data_fim: { type: 'string', description: 'Data final (YYYY-MM-DD)' },
        page: { type: 'number' },
        per_page: { type: 'number' }
      }
    },
    handler: listarChamados
  },
  {
    name: 'sgp_detalhes_chamado',
    description: 'Retorna detalhes completos de um chamado, incluindo histórico de interações, anexos e informações do atendimento.',
    inputSchema: {
      type: 'object',
      properties: {
        chamado_id: { type: 'number', description: 'ID do chamado' }
      },
      required: ['chamado_id']
    },
    handler: detalhesChamado
  },
  {
    name: 'sgp_abrir_chamado',
    description: 'Abre um novo chamado de suporte para um cliente. Requer título, descrição e categoria.',
    inputSchema: {
      type: 'object',
      properties: {
        cliente_id: { type: 'number', description: 'ID do cliente' },
        contrato_id: { type: 'number', description: 'ID do contrato relacionado' },
        categoria_id: { type: 'number', description: 'ID da categoria' },
        prioridade: {
          type: 'string',
          enum: ['baixa', 'media', 'alta', 'urgente'],
          description: 'Prioridade do chamado'
        },
        titulo: { type: 'string', description: 'Título do chamado' },
        descricao: { type: 'string', description: 'Descrição detalhada do problema' },
        atendente_id: { type: 'number', description: 'ID do atendente para atribuição' }
      },
      required: ['cliente_id', 'categoria_id', 'titulo', 'descricao']
    },
    handler: abrirChamado
  },
  {
    name: 'sgp_interagir_chamado',
    description: 'Adiciona uma interação/resposta a um chamado existente. Pode ser visível ao cliente ou nota interna.',
    inputSchema: {
      type: 'object',
      properties: {
        chamado_id: { type: 'number', description: 'ID do chamado' },
        mensagem: { type: 'string', description: 'Mensagem da interação' },
        interno: { type: 'boolean', description: 'Se é nota interna (não visível ao cliente)' }
      },
      required: ['chamado_id', 'mensagem']
    },
    handler: interagirChamado
  },
  {
    name: 'sgp_atribuir_chamado',
    description: 'Atribui um chamado a um atendente específico.',
    inputSchema: {
      type: 'object',
      properties: {
        chamado_id: { type: 'number', description: 'ID do chamado' },
        atendente_id: { type: 'number', description: 'ID do atendente' }
      },
      required: ['chamado_id', 'atendente_id']
    },
    handler: atribuirChamado
  },
  {
    name: 'sgp_finalizar_chamado',
    description: 'Finaliza o atendimento de um chamado, registrando a solução aplicada.',
    inputSchema: {
      type: 'object',
      properties: {
        chamado_id: { type: 'number', description: 'ID do chamado' },
        solucao: { type: 'string', description: 'Descrição da solução aplicada' }
      },
      required: ['chamado_id', 'solucao']
    },
    handler: finalizarChamado
  },
  {
    name: 'sgp_listar_categorias_chamado',
    description: 'Lista as categorias disponíveis para abertura de chamados de suporte.',
    inputSchema: {
      type: 'object',
      properties: {
        page: { type: 'number' },
        per_page: { type: 'number' }
      }
    },
    handler: listarCategorias
  },
  {
    name: 'sgp_listar_interacoes_chamado',
    description: 'Lista todas as interações/histórico de um chamado específico.',
    inputSchema: {
      type: 'object',
      properties: {
        chamado_id: { type: 'number', description: 'ID do chamado' }
      },
      required: ['chamado_id']
    },
    handler: listarInteracoes
  }
];
