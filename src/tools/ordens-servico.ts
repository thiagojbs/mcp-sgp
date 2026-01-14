/**
 * Ferramentas MCP para gestão de Ordens de Serviço
 * CRUD completo de OS, Tipos, Técnicos, Anexos e Comentários
 */

import { SGPClient } from '../sgp-client';

// === Ordens de Serviço - CRUD Completo ===
export async function listarOrdens(client: SGPClient, params: { cliente_id?: number; tecnico_id?: number; tipo_id?: number; status?: string; data_inicio?: string; data_fim?: string; page?: number; per_page?: number }) {
  const queryParams: Record<string, string | number | undefined> = {
    page: params.page || 1,
    per_page: params.per_page || 20
  };
  if (params.cliente_id) queryParams.cliente_id = params.cliente_id;
  if (params.tecnico_id) queryParams.tecnico_id = params.tecnico_id;
  if (params.tipo_id) queryParams.tipo_id = params.tipo_id;
  if (params.status && params.status !== 'todas') queryParams.status = params.status;
  if (params.data_inicio) queryParams.data_inicio = params.data_inicio;
  if (params.data_fim) queryParams.data_fim = params.data_fim;
  return client.get('/ordens', queryParams);
}

export async function criarOrdem(client: SGPClient, params: { cliente_id: number; contrato_id?: number; tipo_id: number; tecnico_id?: number; data_agendamento?: string; hora_agendamento?: string; descricao: string; endereco?: string; observacoes?: string }) {
  return client.post('/ordens', params);
}

export async function detalhesOrdem(client: SGPClient, params: { ordem_id: number }) {
  return client.get(`/ordens/${params.ordem_id}`);
}

export async function atualizarOrdem(client: SGPClient, params: { ordem_id: number; tipo_id?: number; tecnico_id?: number; descricao?: string; endereco?: string; observacoes?: string }) {
  const { ordem_id, ...data } = params;
  return client.put(`/ordens/${ordem_id}`, data);
}

export async function excluirOrdem(client: SGPClient, params: { ordem_id: number }) {
  return client.delete(`/ordens/${params.ordem_id}`);
}

export async function cancelarOrdem(client: SGPClient, params: { ordem_id: number; motivo: string }) {
  return client.post(`/ordens/${params.ordem_id}/cancelar`, { motivo: params.motivo });
}

export async function iniciarOrdem(client: SGPClient, params: { ordem_id: number; observacoes?: string }) {
  return client.post(`/ordens/${params.ordem_id}/iniciar`, { observacoes: params.observacoes });
}

export async function pausarOrdem(client: SGPClient, params: { ordem_id: number; motivo: string }) {
  return client.post(`/ordens/${params.ordem_id}/pausar`, { motivo: params.motivo });
}

export async function retomarOrdem(client: SGPClient, params: { ordem_id: number; observacoes?: string }) {
  return client.post(`/ordens/${params.ordem_id}/retomar`, { observacoes: params.observacoes });
}

export async function finalizarOrdem(client: SGPClient, params: { ordem_id: number; observacoes?: string; solucao?: string }) {
  return client.post(`/ordens/${params.ordem_id}/finalizar`, { observacoes: params.observacoes, solucao: params.solucao });
}

export async function reagendarOrdem(client: SGPClient, params: { ordem_id: number; data_agendamento: string; hora_agendamento?: string; motivo: string }) {
  return client.post(`/ordens/${params.ordem_id}/reagendar`, {
    data_agendamento: params.data_agendamento,
    hora_agendamento: params.hora_agendamento,
    motivo: params.motivo
  });
}

export async function transferirOrdem(client: SGPClient, params: { ordem_id: number; tecnico_id: number; motivo?: string }) {
  return client.post(`/ordens/${params.ordem_id}/transferir`, {
    tecnico_id: params.tecnico_id,
    motivo: params.motivo
  });
}

// === Comentários ===
export async function adicionarComentarioOrdem(client: SGPClient, params: { ordem_id: number; comentario: string }) {
  return client.post(`/ordens/${params.ordem_id}/comentarios`, { comentario: params.comentario });
}

export async function listarComentariosOrdem(client: SGPClient, params: { ordem_id: number }) {
  return client.get(`/ordens/${params.ordem_id}/comentarios`);
}

// === Anexos ===
export async function adicionarAnexoOrdem(client: SGPClient, params: { ordem_id: number; arquivo: string; nome: string; tipo?: string }) {
  return client.post(`/ordens/${params.ordem_id}/anexos`, {
    arquivo: params.arquivo,
    nome: params.nome,
    tipo: params.tipo
  });
}

export async function listarAnexosOrdem(client: SGPClient, params: { ordem_id: number }) {
  return client.get(`/ordens/${params.ordem_id}/anexos`);
}

export async function removerAnexoOrdem(client: SGPClient, params: { ordem_id: number; anexo_id: number }) {
  return client.delete(`/ordens/${params.ordem_id}/anexos/${params.anexo_id}`);
}

// === Tipos de OS - CRUD Completo ===
export async function listarTiposOS(client: SGPClient, params: { page?: number; per_page?: number }) {
  return client.get('/ordens/tipos', {
    page: params.page || 1,
    per_page: params.per_page || 50
  });
}

export async function cadastrarTipoOS(client: SGPClient, params: { nome: string; descricao?: string; tempo_estimado?: number; cor?: string }) {
  return client.post('/ordens/tipos', params);
}

export async function detalhesTipoOS(client: SGPClient, params: { tipo_id: number }) {
  return client.get(`/ordens/tipos/${params.tipo_id}`);
}

export async function atualizarTipoOS(client: SGPClient, params: { tipo_id: number; nome?: string; descricao?: string; tempo_estimado?: number; cor?: string }) {
  const { tipo_id, ...data } = params;
  return client.put(`/ordens/tipos/${tipo_id}`, data);
}

export async function excluirTipoOS(client: SGPClient, params: { tipo_id: number }) {
  return client.delete(`/ordens/tipos/${params.tipo_id}`);
}

// === Técnicos ===
export async function listarTecnicos(client: SGPClient, params: { disponivel?: boolean }) {
  const queryParams: Record<string, string | number | undefined> = {};
  if (params.disponivel !== undefined) queryParams.disponivel = params.disponivel ? 1 : 0;
  return client.get('/ordens/tecnicos', queryParams);
}

export async function agendaTecnico(client: SGPClient, params: { tecnico_id: number; data?: string; data_inicio?: string; data_fim?: string }) {
  const queryParams: Record<string, string | number | undefined> = {};
  if (params.data) queryParams.data = params.data;
  if (params.data_inicio) queryParams.data_inicio = params.data_inicio;
  if (params.data_fim) queryParams.data_fim = params.data_fim;
  return client.get(`/ordens/tecnicos/${params.tecnico_id}/agenda`, queryParams);
}

// Definições das ferramentas
export const ordensServicoTools = [
  // Ordens de Serviço
  {
    name: 'sgp_listar_ordens_servico',
    description: 'Lista ordens de serviço com filtros por cliente, técnico, tipo, status e período.',
    inputSchema: {
      type: 'object',
      properties: {
        cliente_id: { type: 'number', description: 'ID do cliente' },
        tecnico_id: { type: 'number', description: 'ID do técnico' },
        tipo_id: { type: 'number', description: 'ID do tipo de OS' },
        status: { type: 'string', enum: ['pendente', 'agendada', 'em_execucao', 'pausada', 'finalizada', 'cancelada', 'todas'], description: 'Status' },
        data_inicio: { type: 'string', description: 'Data inicial (YYYY-MM-DD)' },
        data_fim: { type: 'string', description: 'Data final (YYYY-MM-DD)' },
        page: { type: 'number' },
        per_page: { type: 'number' }
      }
    },
    handler: listarOrdens
  },
  {
    name: 'sgp_criar_ordem_servico',
    description: 'Cria uma nova ordem de serviço.',
    inputSchema: {
      type: 'object',
      properties: {
        cliente_id: { type: 'number', description: 'ID do cliente' },
        contrato_id: { type: 'number', description: 'ID do contrato' },
        tipo_id: { type: 'number', description: 'ID do tipo de OS' },
        tecnico_id: { type: 'number', description: 'ID do técnico' },
        data_agendamento: { type: 'string', description: 'Data de agendamento (YYYY-MM-DD)' },
        hora_agendamento: { type: 'string', description: 'Hora de agendamento (HH:MM)' },
        descricao: { type: 'string', description: 'Descrição do serviço' },
        endereco: { type: 'string', description: 'Endereço de execução' },
        observacoes: { type: 'string', description: 'Observações' }
      },
      required: ['cliente_id', 'tipo_id', 'descricao']
    },
    handler: criarOrdem
  },
  {
    name: 'sgp_detalhes_ordem_servico',
    description: 'Retorna detalhes de uma ordem de serviço.',
    inputSchema: {
      type: 'object',
      properties: {
        ordem_id: { type: 'number', description: 'ID da OS' }
      },
      required: ['ordem_id']
    },
    handler: detalhesOrdem
  },
  {
    name: 'sgp_atualizar_ordem_servico',
    description: 'Atualiza dados de uma ordem de serviço.',
    inputSchema: {
      type: 'object',
      properties: {
        ordem_id: { type: 'number', description: 'ID da OS' },
        tipo_id: { type: 'number', description: 'ID do tipo' },
        tecnico_id: { type: 'number', description: 'ID do técnico' },
        descricao: { type: 'string', description: 'Descrição' },
        endereco: { type: 'string', description: 'Endereço' },
        observacoes: { type: 'string', description: 'Observações' }
      },
      required: ['ordem_id']
    },
    handler: atualizarOrdem
  },
  {
    name: 'sgp_excluir_ordem_servico',
    description: 'Exclui uma ordem de serviço.',
    inputSchema: {
      type: 'object',
      properties: {
        ordem_id: { type: 'number', description: 'ID da OS' }
      },
      required: ['ordem_id']
    },
    handler: excluirOrdem
  },
  {
    name: 'sgp_cancelar_ordem_servico',
    description: 'Cancela uma ordem de serviço.',
    inputSchema: {
      type: 'object',
      properties: {
        ordem_id: { type: 'number', description: 'ID da OS' },
        motivo: { type: 'string', description: 'Motivo do cancelamento' }
      },
      required: ['ordem_id', 'motivo']
    },
    handler: cancelarOrdem
  },
  {
    name: 'sgp_iniciar_ordem_servico',
    description: 'Inicia a execução de uma ordem de serviço.',
    inputSchema: {
      type: 'object',
      properties: {
        ordem_id: { type: 'number', description: 'ID da OS' },
        observacoes: { type: 'string', description: 'Observações' }
      },
      required: ['ordem_id']
    },
    handler: iniciarOrdem
  },
  {
    name: 'sgp_pausar_ordem_servico',
    description: 'Pausa a execução de uma ordem de serviço.',
    inputSchema: {
      type: 'object',
      properties: {
        ordem_id: { type: 'number', description: 'ID da OS' },
        motivo: { type: 'string', description: 'Motivo da pausa' }
      },
      required: ['ordem_id', 'motivo']
    },
    handler: pausarOrdem
  },
  {
    name: 'sgp_retomar_ordem_servico',
    description: 'Retoma a execução de uma ordem de serviço pausada.',
    inputSchema: {
      type: 'object',
      properties: {
        ordem_id: { type: 'number', description: 'ID da OS' },
        observacoes: { type: 'string', description: 'Observações' }
      },
      required: ['ordem_id']
    },
    handler: retomarOrdem
  },
  {
    name: 'sgp_finalizar_ordem_servico',
    description: 'Finaliza uma ordem de serviço.',
    inputSchema: {
      type: 'object',
      properties: {
        ordem_id: { type: 'number', description: 'ID da OS' },
        observacoes: { type: 'string', description: 'Observações' },
        solucao: { type: 'string', description: 'Solução aplicada' }
      },
      required: ['ordem_id']
    },
    handler: finalizarOrdem
  },
  {
    name: 'sgp_reagendar_ordem_servico',
    description: 'Reagenda uma ordem de serviço.',
    inputSchema: {
      type: 'object',
      properties: {
        ordem_id: { type: 'number', description: 'ID da OS' },
        data_agendamento: { type: 'string', description: 'Nova data (YYYY-MM-DD)' },
        hora_agendamento: { type: 'string', description: 'Nova hora (HH:MM)' },
        motivo: { type: 'string', description: 'Motivo do reagendamento' }
      },
      required: ['ordem_id', 'data_agendamento', 'motivo']
    },
    handler: reagendarOrdem
  },
  {
    name: 'sgp_transferir_ordem_servico',
    description: 'Transfere uma OS para outro técnico.',
    inputSchema: {
      type: 'object',
      properties: {
        ordem_id: { type: 'number', description: 'ID da OS' },
        tecnico_id: { type: 'number', description: 'ID do novo técnico' },
        motivo: { type: 'string', description: 'Motivo da transferência' }
      },
      required: ['ordem_id', 'tecnico_id']
    },
    handler: transferirOrdem
  },
  // Comentários
  {
    name: 'sgp_adicionar_comentario_os',
    description: 'Adiciona um comentário a uma OS.',
    inputSchema: {
      type: 'object',
      properties: {
        ordem_id: { type: 'number', description: 'ID da OS' },
        comentario: { type: 'string', description: 'Texto do comentário' }
      },
      required: ['ordem_id', 'comentario']
    },
    handler: adicionarComentarioOrdem
  },
  {
    name: 'sgp_listar_comentarios_os',
    description: 'Lista comentários de uma OS.',
    inputSchema: {
      type: 'object',
      properties: {
        ordem_id: { type: 'number', description: 'ID da OS' }
      },
      required: ['ordem_id']
    },
    handler: listarComentariosOrdem
  },
  // Anexos
  {
    name: 'sgp_adicionar_anexo_os',
    description: 'Adiciona um anexo a uma OS.',
    inputSchema: {
      type: 'object',
      properties: {
        ordem_id: { type: 'number', description: 'ID da OS' },
        arquivo: { type: 'string', description: 'Arquivo em Base64' },
        nome: { type: 'string', description: 'Nome do arquivo' },
        tipo: { type: 'string', description: 'Tipo do arquivo' }
      },
      required: ['ordem_id', 'arquivo', 'nome']
    },
    handler: adicionarAnexoOrdem
  },
  {
    name: 'sgp_listar_anexos_os',
    description: 'Lista anexos de uma OS.',
    inputSchema: {
      type: 'object',
      properties: {
        ordem_id: { type: 'number', description: 'ID da OS' }
      },
      required: ['ordem_id']
    },
    handler: listarAnexosOrdem
  },
  {
    name: 'sgp_remover_anexo_os',
    description: 'Remove um anexo de uma OS.',
    inputSchema: {
      type: 'object',
      properties: {
        ordem_id: { type: 'number', description: 'ID da OS' },
        anexo_id: { type: 'number', description: 'ID do anexo' }
      },
      required: ['ordem_id', 'anexo_id']
    },
    handler: removerAnexoOrdem
  },
  // Tipos de OS
  {
    name: 'sgp_listar_tipos_os',
    description: 'Lista tipos de ordem de serviço.',
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
    name: 'sgp_cadastrar_tipo_os',
    description: 'Cadastra um novo tipo de OS.',
    inputSchema: {
      type: 'object',
      properties: {
        nome: { type: 'string', description: 'Nome do tipo' },
        descricao: { type: 'string', description: 'Descrição' },
        tempo_estimado: { type: 'number', description: 'Tempo estimado em minutos' },
        cor: { type: 'string', description: 'Cor em hexadecimal' }
      },
      required: ['nome']
    },
    handler: cadastrarTipoOS
  },
  {
    name: 'sgp_detalhes_tipo_os',
    description: 'Retorna detalhes de um tipo de OS.',
    inputSchema: {
      type: 'object',
      properties: {
        tipo_id: { type: 'number', description: 'ID do tipo' }
      },
      required: ['tipo_id']
    },
    handler: detalhesTipoOS
  },
  {
    name: 'sgp_atualizar_tipo_os',
    description: 'Atualiza um tipo de OS.',
    inputSchema: {
      type: 'object',
      properties: {
        tipo_id: { type: 'number', description: 'ID do tipo' },
        nome: { type: 'string', description: 'Nome' },
        descricao: { type: 'string', description: 'Descrição' },
        tempo_estimado: { type: 'number', description: 'Tempo estimado' },
        cor: { type: 'string', description: 'Cor' }
      },
      required: ['tipo_id']
    },
    handler: atualizarTipoOS
  },
  {
    name: 'sgp_excluir_tipo_os',
    description: 'Exclui um tipo de OS.',
    inputSchema: {
      type: 'object',
      properties: {
        tipo_id: { type: 'number', description: 'ID do tipo' }
      },
      required: ['tipo_id']
    },
    handler: excluirTipoOS
  },
  // Técnicos
  {
    name: 'sgp_listar_tecnicos',
    description: 'Lista técnicos disponíveis para OS.',
    inputSchema: {
      type: 'object',
      properties: {
        disponivel: { type: 'boolean', description: 'Filtrar apenas disponíveis' }
      }
    },
    handler: listarTecnicos
  },
  {
    name: 'sgp_agenda_tecnico',
    description: 'Consulta a agenda de um técnico.',
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
