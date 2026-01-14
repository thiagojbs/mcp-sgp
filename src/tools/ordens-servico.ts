/**
 * Ferramentas MCP para gestão de Ordens de Serviço
 */

import { z } from 'zod';
import { SGPClient } from '../sgp-client';

// Schemas de validação
export const listarOrdensSchema = z.object({
  cliente_id: z.number().optional().describe('ID do cliente'),
  tecnico_id: z.number().optional().describe('ID do técnico'),
  tipo_id: z.number().optional().describe('ID do tipo de OS'),
  status: z.enum(['pendente', 'agendada', 'em_execucao', 'pausada', 'finalizada', 'cancelada', 'todas']).optional().default('todas'),
  data_inicio: z.string().optional().describe('Data inicial (YYYY-MM-DD)'),
  data_fim: z.string().optional().describe('Data final (YYYY-MM-DD)'),
  page: z.number().optional().default(1),
  per_page: z.number().optional().default(20)
});

export const detalhesOrdemSchema = z.object({
  ordem_id: z.number().describe('ID da ordem de serviço')
});

export const criarOrdemSchema = z.object({
  cliente_id: z.number().describe('ID do cliente'),
  contrato_id: z.number().optional().describe('ID do contrato relacionado'),
  tipo_id: z.number().describe('ID do tipo de OS'),
  tecnico_id: z.number().optional().describe('ID do técnico'),
  data_agendamento: z.string().optional().describe('Data de agendamento (YYYY-MM-DD)'),
  hora_agendamento: z.string().optional().describe('Hora de agendamento (HH:MM)'),
  descricao: z.string().describe('Descrição do serviço'),
  endereco: z.string().optional().describe('Endereço de execução (se diferente do cadastro)'),
  observacoes: z.string().optional().describe('Observações adicionais')
});

export const atualizarStatusOrdemSchema = z.object({
  ordem_id: z.number().describe('ID da ordem de serviço'),
  acao: z.enum(['iniciar', 'pausar', 'retomar', 'finalizar', 'cancelar']).describe('Ação a ser executada'),
  motivo: z.string().optional().describe('Motivo (obrigatório para cancelar/pausar)'),
  observacoes: z.string().optional().describe('Observações da ação')
});

export const reagendarOrdemSchema = z.object({
  ordem_id: z.number().describe('ID da ordem de serviço'),
  data_agendamento: z.string().describe('Nova data (YYYY-MM-DD)'),
  hora_agendamento: z.string().optional().describe('Nova hora (HH:MM)'),
  motivo: z.string().describe('Motivo do reagendamento')
});

export const transferirOrdemSchema = z.object({
  ordem_id: z.number().describe('ID da ordem de serviço'),
  tecnico_id: z.number().describe('ID do novo técnico'),
  motivo: z.string().optional().describe('Motivo da transferência')
});

export const comentarioOrdemSchema = z.object({
  ordem_id: z.number().describe('ID da ordem de serviço'),
  comentario: z.string().describe('Texto do comentário')
});

export const listarTiposOSSchema = z.object({
  page: z.number().optional().default(1),
  per_page: z.number().optional().default(50)
});

export const listarTecnicosSchema = z.object({
  disponivel: z.boolean().optional().describe('Filtrar apenas técnicos disponíveis')
});

export const agendaTecnicoSchema = z.object({
  tecnico_id: z.number().describe('ID do técnico'),
  data: z.string().optional().describe('Data específica (YYYY-MM-DD)'),
  data_inicio: z.string().optional().describe('Data inicial do período'),
  data_fim: z.string().optional().describe('Data final do período')
});

// Funções de ferramentas
export async function listarOrdens(client: SGPClient, params: z.infer<typeof listarOrdensSchema>) {
  const queryParams: Record<string, string | number | undefined> = {
    page: params.page,
    per_page: params.per_page
  };

  if (params.cliente_id) queryParams.cliente_id = params.cliente_id;
  if (params.tecnico_id) queryParams.tecnico_id = params.tecnico_id;
  if (params.tipo_id) queryParams.tipo_id = params.tipo_id;
  if (params.status && params.status !== 'todas') queryParams.status = params.status;
  if (params.data_inicio) queryParams.data_inicio = params.data_inicio;
  if (params.data_fim) queryParams.data_fim = params.data_fim;

  const response = await client.get('/ordens', queryParams);
  return response;
}

export async function detalhesOrdem(client: SGPClient, params: z.infer<typeof detalhesOrdemSchema>) {
  const response = await client.get(`/ordens/${params.ordem_id}`);
  return response;
}

export async function criarOrdem(client: SGPClient, params: z.infer<typeof criarOrdemSchema>) {
  const response = await client.post('/ordens', params);
  return response;
}

export async function atualizarStatusOrdem(client: SGPClient, params: z.infer<typeof atualizarStatusOrdemSchema>) {
  const endpoint = `/ordens/${params.ordem_id}/${params.acao}`;
  const body: Record<string, unknown> = {};
  if (params.motivo) body.motivo = params.motivo;
  if (params.observacoes) body.observacoes = params.observacoes;

  const response = await client.post(endpoint, body);
  return response;
}

export async function reagendarOrdem(client: SGPClient, params: z.infer<typeof reagendarOrdemSchema>) {
  const response = await client.post(`/ordens/${params.ordem_id}/reagendar`, {
    data_agendamento: params.data_agendamento,
    hora_agendamento: params.hora_agendamento,
    motivo: params.motivo
  });
  return response;
}

export async function transferirOrdem(client: SGPClient, params: z.infer<typeof transferirOrdemSchema>) {
  const response = await client.post(`/ordens/${params.ordem_id}/transferir`, {
    tecnico_id: params.tecnico_id,
    motivo: params.motivo
  });
  return response;
}

export async function adicionarComentarioOrdem(client: SGPClient, params: z.infer<typeof comentarioOrdemSchema>) {
  const response = await client.post(`/ordens/${params.ordem_id}/comentarios`, {
    comentario: params.comentario
  });
  return response;
}

export async function listarComentariosOrdem(client: SGPClient, params: z.infer<typeof detalhesOrdemSchema>) {
  const response = await client.get(`/ordens/${params.ordem_id}/comentarios`);
  return response;
}

export async function listarTiposOS(client: SGPClient, params: z.infer<typeof listarTiposOSSchema>) {
  const response = await client.get('/ordens/tipos', {
    page: params.page,
    per_page: params.per_page
  });
  return response;
}

export async function listarTecnicos(client: SGPClient, params: z.infer<typeof listarTecnicosSchema>) {
  const queryParams: Record<string, string | number | undefined> = {};
  if (params.disponivel !== undefined) queryParams.disponivel = params.disponivel ? 1 : 0;

  const response = await client.get('/ordens/tecnicos', queryParams);
  return response;
}

export async function agendaTecnico(client: SGPClient, params: z.infer<typeof agendaTecnicoSchema>) {
  const queryParams: Record<string, string | number | undefined> = {};
  if (params.data) queryParams.data = params.data;
  if (params.data_inicio) queryParams.data_inicio = params.data_inicio;
  if (params.data_fim) queryParams.data_fim = params.data_fim;

  const response = await client.get(`/ordens/tecnicos/${params.tecnico_id}/agenda`, queryParams);
  return response;
}

// Definições das ferramentas para registro no MCP
export const ordensServicoTools = [
  {
    name: 'sgp_listar_ordens_servico',
    description: 'Lista ordens de serviço com filtros por cliente, técnico, tipo, status e período.',
    inputSchema: {
      type: 'object',
      properties: {
        cliente_id: { type: 'number', description: 'ID do cliente' },
        tecnico_id: { type: 'number', description: 'ID do técnico' },
        tipo_id: { type: 'number', description: 'ID do tipo de OS' },
        status: {
          type: 'string',
          enum: ['pendente', 'agendada', 'em_execucao', 'pausada', 'finalizada', 'cancelada', 'todas'],
          description: 'Status da OS'
        },
        data_inicio: { type: 'string', description: 'Data inicial (YYYY-MM-DD)' },
        data_fim: { type: 'string', description: 'Data final (YYYY-MM-DD)' },
        page: { type: 'number' },
        per_page: { type: 'number' }
      }
    },
    handler: listarOrdens
  },
  {
    name: 'sgp_detalhes_ordem_servico',
    description: 'Retorna detalhes completos de uma ordem de serviço, incluindo histórico, comentários e informações do técnico.',
    inputSchema: {
      type: 'object',
      properties: {
        ordem_id: { type: 'number', description: 'ID da ordem de serviço' }
      },
      required: ['ordem_id']
    },
    handler: detalhesOrdem
  },
  {
    name: 'sgp_criar_ordem_servico',
    description: 'Cria uma nova ordem de serviço. Pode agendar instalação, manutenção ou outros tipos de serviço.',
    inputSchema: {
      type: 'object',
      properties: {
        cliente_id: { type: 'number', description: 'ID do cliente' },
        contrato_id: { type: 'number', description: 'ID do contrato relacionado' },
        tipo_id: { type: 'number', description: 'ID do tipo de OS' },
        tecnico_id: { type: 'number', description: 'ID do técnico' },
        data_agendamento: { type: 'string', description: 'Data de agendamento (YYYY-MM-DD)' },
        hora_agendamento: { type: 'string', description: 'Hora de agendamento (HH:MM)' },
        descricao: { type: 'string', description: 'Descrição do serviço' },
        endereco: { type: 'string', description: 'Endereço de execução' },
        observacoes: { type: 'string', description: 'Observações adicionais' }
      },
      required: ['cliente_id', 'tipo_id', 'descricao']
    },
    handler: criarOrdem
  },
  {
    name: 'sgp_atualizar_status_ordem',
    description: 'Atualiza o status de uma OS (iniciar, pausar, retomar, finalizar ou cancelar).',
    inputSchema: {
      type: 'object',
      properties: {
        ordem_id: { type: 'number', description: 'ID da ordem de serviço' },
        acao: {
          type: 'string',
          enum: ['iniciar', 'pausar', 'retomar', 'finalizar', 'cancelar'],
          description: 'Ação a ser executada'
        },
        motivo: { type: 'string', description: 'Motivo (obrigatório para cancelar/pausar)' },
        observacoes: { type: 'string', description: 'Observações da ação' }
      },
      required: ['ordem_id', 'acao']
    },
    handler: atualizarStatusOrdem
  },
  {
    name: 'sgp_reagendar_ordem',
    description: 'Reagenda uma ordem de serviço para nova data/hora.',
    inputSchema: {
      type: 'object',
      properties: {
        ordem_id: { type: 'number', description: 'ID da ordem de serviço' },
        data_agendamento: { type: 'string', description: 'Nova data (YYYY-MM-DD)' },
        hora_agendamento: { type: 'string', description: 'Nova hora (HH:MM)' },
        motivo: { type: 'string', description: 'Motivo do reagendamento' }
      },
      required: ['ordem_id', 'data_agendamento', 'motivo']
    },
    handler: reagendarOrdem
  },
  {
    name: 'sgp_transferir_ordem',
    description: 'Transfere uma ordem de serviço para outro técnico.',
    inputSchema: {
      type: 'object',
      properties: {
        ordem_id: { type: 'number', description: 'ID da ordem de serviço' },
        tecnico_id: { type: 'number', description: 'ID do novo técnico' },
        motivo: { type: 'string', description: 'Motivo da transferência' }
      },
      required: ['ordem_id', 'tecnico_id']
    },
    handler: transferirOrdem
  },
  {
    name: 'sgp_comentario_ordem',
    description: 'Adiciona um comentário a uma ordem de serviço.',
    inputSchema: {
      type: 'object',
      properties: {
        ordem_id: { type: 'number', description: 'ID da ordem de serviço' },
        comentario: { type: 'string', description: 'Texto do comentário' }
      },
      required: ['ordem_id', 'comentario']
    },
    handler: adicionarComentarioOrdem
  },
  {
    name: 'sgp_listar_comentarios_ordem',
    description: 'Lista todos os comentários de uma ordem de serviço.',
    inputSchema: {
      type: 'object',
      properties: {
        ordem_id: { type: 'number', description: 'ID da ordem de serviço' }
      },
      required: ['ordem_id']
    },
    handler: listarComentariosOrdem
  },
  {
    name: 'sgp_listar_tipos_os',
    description: 'Lista os tipos de ordem de serviço disponíveis (instalação, manutenção, etc.).',
    inputSchema: {
      type: 'object',
      properties: {
        page: { type: 'number' },
        per_page: { type: 'number' }
      }
    },
    handler: listarTiposOS
  },
  {
    name: 'sgp_listar_tecnicos',
    description: 'Lista os técnicos disponíveis para atribuição de ordens de serviço.',
    inputSchema: {
      type: 'object',
      properties: {
        disponivel: { type: 'boolean', description: 'Filtrar apenas técnicos disponíveis' }
      }
    },
    handler: listarTecnicos
  },
  {
    name: 'sgp_agenda_tecnico',
    description: 'Consulta a agenda de um técnico específico para verificar disponibilidade.',
    inputSchema: {
      type: 'object',
      properties: {
        tecnico_id: { type: 'number', description: 'ID do técnico' },
        data: { type: 'string', description: 'Data específica (YYYY-MM-DD)' },
        data_inicio: { type: 'string', description: 'Data inicial do período' },
        data_fim: { type: 'string', description: 'Data final do período' }
      },
      required: ['tecnico_id']
    },
    handler: agendaTecnico
  }
];
