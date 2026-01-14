/**
 * Ferramentas MCP para gestão de Chamados de Suporte
 * CRUD completo de Chamados, Categorias, Prioridades, Interações e Anexos
 */

import { SGPClient } from '../sgp-client';

// === Chamados - CRUD Completo ===
export async function listarChamados(client: SGPClient, params: { cliente_id?: number; status?: string; categoria_id?: number; prioridade?: string; data_inicio?: string; data_fim?: string; page?: number; per_page?: number }) {
  const queryParams: Record<string, string | number | undefined> = {
    page: params.page || 1,
    per_page: params.per_page || 20
  };
  if (params.cliente_id) queryParams.cliente_id = params.cliente_id;
  if (params.status && params.status !== 'todos') queryParams.status = params.status;
  if (params.categoria_id) queryParams.categoria_id = params.categoria_id;
  if (params.prioridade && params.prioridade !== 'todas') queryParams.prioridade = params.prioridade;
  if (params.data_inicio) queryParams.data_inicio = params.data_inicio;
  if (params.data_fim) queryParams.data_fim = params.data_fim;
  return client.get('/suporte/chamados', queryParams);
}

export async function abrirChamado(client: SGPClient, params: { cliente_id: number; contrato_id?: number; categoria_id: number; prioridade?: string; titulo: string; descricao: string; atendente_id?: number }) {
  return client.post('/suporte/chamados', params);
}

export async function detalhesChamado(client: SGPClient, params: { chamado_id: number }) {
  return client.get(`/suporte/chamados/${params.chamado_id}`);
}

export async function atualizarChamado(client: SGPClient, params: { chamado_id: number; categoria_id?: number; prioridade?: string; titulo?: string }) {
  const { chamado_id, ...data } = params;
  return client.put(`/suporte/chamados/${chamado_id}`, data);
}

export async function excluirChamado(client: SGPClient, params: { chamado_id: number }) {
  return client.delete(`/suporte/chamados/${params.chamado_id}`);
}

export async function cancelarChamado(client: SGPClient, params: { chamado_id: number; motivo?: string }) {
  return client.post(`/suporte/chamados/${params.chamado_id}/cancelar`, { motivo: params.motivo });
}

export async function atribuirChamado(client: SGPClient, params: { chamado_id: number; atendente_id: number }) {
  return client.post(`/suporte/chamados/${params.chamado_id}/atribuir`, { atendente_id: params.atendente_id });
}

export async function iniciarAtendimentoChamado(client: SGPClient, params: { chamado_id: number }) {
  return client.post(`/suporte/chamados/${params.chamado_id}/iniciar-atendimento`);
}

export async function finalizarAtendimentoChamado(client: SGPClient, params: { chamado_id: number; solucao: string }) {
  return client.post(`/suporte/chamados/${params.chamado_id}/finalizar-atendimento`, { solucao: params.solucao });
}

// === Interações ===
export async function adicionarInteracaoChamado(client: SGPClient, params: { chamado_id: number; mensagem: string; interno?: boolean }) {
  return client.post(`/suporte/chamados/${params.chamado_id}/interacoes`, {
    mensagem: params.mensagem,
    interno: params.interno
  });
}

export async function listarInteracoesChamado(client: SGPClient, params: { chamado_id: number }) {
  return client.get(`/suporte/chamados/${params.chamado_id}/interacoes`);
}

// === Anexos ===
export async function adicionarAnexoChamado(client: SGPClient, params: { chamado_id: number; arquivo: string; nome: string; tipo?: string }) {
  return client.post(`/suporte/chamados/${params.chamado_id}/anexos`, {
    arquivo: params.arquivo,
    nome: params.nome,
    tipo: params.tipo
  });
}

export async function listarAnexosChamado(client: SGPClient, params: { chamado_id: number }) {
  return client.get(`/suporte/chamados/${params.chamado_id}/anexos`);
}

export async function removerAnexoChamado(client: SGPClient, params: { chamado_id: number; anexo_id: number }) {
  return client.delete(`/suporte/chamados/${params.chamado_id}/anexos/${params.anexo_id}`);
}

// === Categorias - CRUD Completo ===
export async function listarCategoriasChamado(client: SGPClient, params: { page?: number; per_page?: number }) {
  return client.get('/suporte/categorias', {
    page: params.page || 1,
    per_page: params.per_page || 50
  });
}

export async function cadastrarCategoriaChamado(client: SGPClient, params: { nome: string; descricao?: string; pai_id?: number }) {
  return client.post('/suporte/categorias', params);
}

export async function detalhesCategoriaChamado(client: SGPClient, params: { categoria_id: number }) {
  return client.get(`/suporte/categorias/${params.categoria_id}`);
}

export async function atualizarCategoriaChamado(client: SGPClient, params: { categoria_id: number; nome?: string; descricao?: string; ativa?: boolean }) {
  const { categoria_id, ...data } = params;
  return client.put(`/suporte/categorias/${categoria_id}`, data);
}

export async function excluirCategoriaChamado(client: SGPClient, params: { categoria_id: number }) {
  return client.delete(`/suporte/categorias/${params.categoria_id}`);
}

// === Prioridades - CRUD Completo ===
export async function listarPrioridadesChamado(client: SGPClient, params: { page?: number; per_page?: number }) {
  return client.get('/suporte/prioridades', {
    page: params.page || 1,
    per_page: params.per_page || 20
  });
}

export async function cadastrarPrioridadeChamado(client: SGPClient, params: { nome: string; cor?: string; sla_horas?: number; ordem?: number }) {
  return client.post('/suporte/prioridades', params);
}

export async function detalhesPrioridadeChamado(client: SGPClient, params: { prioridade_id: number }) {
  return client.get(`/suporte/prioridades/${params.prioridade_id}`);
}

export async function atualizarPrioridadeChamado(client: SGPClient, params: { prioridade_id: number; nome?: string; cor?: string; sla_horas?: number; ordem?: number; ativa?: boolean }) {
  const { prioridade_id, ...data } = params;
  return client.put(`/suporte/prioridades/${prioridade_id}`, data);
}

export async function excluirPrioridadeChamado(client: SGPClient, params: { prioridade_id: number }) {
  return client.delete(`/suporte/prioridades/${params.prioridade_id}`);
}

// Definições das ferramentas
export const chamadosTools = [
  // Chamados
  {
    name: 'sgp_listar_chamados',
    description: 'Lista chamados de suporte com filtros.',
    inputSchema: {
      type: 'object',
      properties: {
        cliente_id: { type: 'number', description: 'ID do cliente' },
        status: { type: 'string', enum: ['aberto', 'em_atendimento', 'aguardando', 'resolvido', 'fechado', 'todos'], description: 'Status' },
        categoria_id: { type: 'number', description: 'ID da categoria' },
        prioridade: { type: 'string', enum: ['baixa', 'media', 'alta', 'urgente', 'todas'], description: 'Prioridade' },
        data_inicio: { type: 'string', description: 'Data inicial (YYYY-MM-DD)' },
        data_fim: { type: 'string', description: 'Data final (YYYY-MM-DD)' },
        page: { type: 'number' },
        per_page: { type: 'number' }
      }
    },
    handler: listarChamados
  },
  {
    name: 'sgp_abrir_chamado',
    description: 'Abre um novo chamado de suporte.',
    inputSchema: {
      type: 'object',
      properties: {
        cliente_id: { type: 'number', description: 'ID do cliente' },
        contrato_id: { type: 'number', description: 'ID do contrato' },
        categoria_id: { type: 'number', description: 'ID da categoria' },
        prioridade: { type: 'string', enum: ['baixa', 'media', 'alta', 'urgente'], description: 'Prioridade' },
        titulo: { type: 'string', description: 'Título do chamado' },
        descricao: { type: 'string', description: 'Descrição do problema' },
        atendente_id: { type: 'number', description: 'ID do atendente' }
      },
      required: ['cliente_id', 'categoria_id', 'titulo', 'descricao']
    },
    handler: abrirChamado
  },
  {
    name: 'sgp_detalhes_chamado',
    description: 'Retorna detalhes de um chamado.',
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
    name: 'sgp_atualizar_chamado',
    description: 'Atualiza dados de um chamado.',
    inputSchema: {
      type: 'object',
      properties: {
        chamado_id: { type: 'number', description: 'ID do chamado' },
        categoria_id: { type: 'number', description: 'ID da categoria' },
        prioridade: { type: 'string', description: 'Prioridade' },
        titulo: { type: 'string', description: 'Título' }
      },
      required: ['chamado_id']
    },
    handler: atualizarChamado
  },
  {
    name: 'sgp_excluir_chamado',
    description: 'Exclui um chamado.',
    inputSchema: {
      type: 'object',
      properties: {
        chamado_id: { type: 'number', description: 'ID do chamado' }
      },
      required: ['chamado_id']
    },
    handler: excluirChamado
  },
  {
    name: 'sgp_cancelar_chamado',
    description: 'Cancela um chamado.',
    inputSchema: {
      type: 'object',
      properties: {
        chamado_id: { type: 'number', description: 'ID do chamado' },
        motivo: { type: 'string', description: 'Motivo do cancelamento' }
      },
      required: ['chamado_id']
    },
    handler: cancelarChamado
  },
  {
    name: 'sgp_atribuir_chamado',
    description: 'Atribui um chamado a um atendente.',
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
    name: 'sgp_iniciar_atendimento_chamado',
    description: 'Inicia o atendimento de um chamado.',
    inputSchema: {
      type: 'object',
      properties: {
        chamado_id: { type: 'number', description: 'ID do chamado' }
      },
      required: ['chamado_id']
    },
    handler: iniciarAtendimentoChamado
  },
  {
    name: 'sgp_finalizar_atendimento_chamado',
    description: 'Finaliza o atendimento de um chamado.',
    inputSchema: {
      type: 'object',
      properties: {
        chamado_id: { type: 'number', description: 'ID do chamado' },
        solucao: { type: 'string', description: 'Solução aplicada' }
      },
      required: ['chamado_id', 'solucao']
    },
    handler: finalizarAtendimentoChamado
  },
  // Interações
  {
    name: 'sgp_adicionar_interacao_chamado',
    description: 'Adiciona uma interação a um chamado.',
    inputSchema: {
      type: 'object',
      properties: {
        chamado_id: { type: 'number', description: 'ID do chamado' },
        mensagem: { type: 'string', description: 'Mensagem da interação' },
        interno: { type: 'boolean', description: 'Se é nota interna' }
      },
      required: ['chamado_id', 'mensagem']
    },
    handler: adicionarInteracaoChamado
  },
  {
    name: 'sgp_listar_interacoes_chamado',
    description: 'Lista interações de um chamado.',
    inputSchema: {
      type: 'object',
      properties: {
        chamado_id: { type: 'number', description: 'ID do chamado' }
      },
      required: ['chamado_id']
    },
    handler: listarInteracoesChamado
  },
  // Anexos
  {
    name: 'sgp_adicionar_anexo_chamado',
    description: 'Adiciona um anexo a um chamado.',
    inputSchema: {
      type: 'object',
      properties: {
        chamado_id: { type: 'number', description: 'ID do chamado' },
        arquivo: { type: 'string', description: 'Arquivo em Base64' },
        nome: { type: 'string', description: 'Nome do arquivo' },
        tipo: { type: 'string', description: 'Tipo do arquivo' }
      },
      required: ['chamado_id', 'arquivo', 'nome']
    },
    handler: adicionarAnexoChamado
  },
  {
    name: 'sgp_listar_anexos_chamado',
    description: 'Lista anexos de um chamado.',
    inputSchema: {
      type: 'object',
      properties: {
        chamado_id: { type: 'number', description: 'ID do chamado' }
      },
      required: ['chamado_id']
    },
    handler: listarAnexosChamado
  },
  {
    name: 'sgp_remover_anexo_chamado',
    description: 'Remove um anexo de um chamado.',
    inputSchema: {
      type: 'object',
      properties: {
        chamado_id: { type: 'number', description: 'ID do chamado' },
        anexo_id: { type: 'number', description: 'ID do anexo' }
      },
      required: ['chamado_id', 'anexo_id']
    },
    handler: removerAnexoChamado
  },
  // Categorias
  {
    name: 'sgp_listar_categorias_chamado',
    description: 'Lista categorias de chamados.',
    inputSchema: {
      type: 'object',
      properties: {
        page: { type: 'number' },
        per_page: { type: 'number' }
      }
    },
    handler: listarCategoriasChamado
  },
  {
    name: 'sgp_cadastrar_categoria_chamado',
    description: 'Cadastra uma nova categoria de chamado.',
    inputSchema: {
      type: 'object',
      properties: {
        nome: { type: 'string', description: 'Nome da categoria' },
        descricao: { type: 'string', description: 'Descrição' },
        pai_id: { type: 'number', description: 'ID da categoria pai' }
      },
      required: ['nome']
    },
    handler: cadastrarCategoriaChamado
  },
  {
    name: 'sgp_detalhes_categoria_chamado',
    description: 'Retorna detalhes de uma categoria de chamado.',
    inputSchema: {
      type: 'object',
      properties: {
        categoria_id: { type: 'number', description: 'ID da categoria' }
      },
      required: ['categoria_id']
    },
    handler: detalhesCategoriaChamado
  },
  {
    name: 'sgp_atualizar_categoria_chamado',
    description: 'Atualiza uma categoria de chamado.',
    inputSchema: {
      type: 'object',
      properties: {
        categoria_id: { type: 'number', description: 'ID da categoria' },
        nome: { type: 'string', description: 'Nome' },
        descricao: { type: 'string', description: 'Descrição' },
        ativa: { type: 'boolean', description: 'Se está ativa' }
      },
      required: ['categoria_id']
    },
    handler: atualizarCategoriaChamado
  },
  {
    name: 'sgp_excluir_categoria_chamado',
    description: 'Exclui uma categoria de chamado.',
    inputSchema: {
      type: 'object',
      properties: {
        categoria_id: { type: 'number', description: 'ID da categoria' }
      },
      required: ['categoria_id']
    },
    handler: excluirCategoriaChamado
  },
  // Prioridades
  {
    name: 'sgp_listar_prioridades_chamado',
    description: 'Lista prioridades de chamados.',
    inputSchema: {
      type: 'object',
      properties: {
        page: { type: 'number' },
        per_page: { type: 'number' }
      }
    },
    handler: listarPrioridadesChamado
  },
  {
    name: 'sgp_cadastrar_prioridade_chamado',
    description: 'Cadastra uma nova prioridade de chamado.',
    inputSchema: {
      type: 'object',
      properties: {
        nome: { type: 'string', description: 'Nome da prioridade' },
        cor: { type: 'string', description: 'Cor em hexadecimal' },
        sla_horas: { type: 'number', description: 'SLA em horas' },
        ordem: { type: 'number', description: 'Ordem de exibição' }
      },
      required: ['nome']
    },
    handler: cadastrarPrioridadeChamado
  },
  {
    name: 'sgp_detalhes_prioridade_chamado',
    description: 'Retorna detalhes de uma prioridade de chamado.',
    inputSchema: {
      type: 'object',
      properties: {
        prioridade_id: { type: 'number', description: 'ID da prioridade' }
      },
      required: ['prioridade_id']
    },
    handler: detalhesPrioridadeChamado
  },
  {
    name: 'sgp_atualizar_prioridade_chamado',
    description: 'Atualiza uma prioridade de chamado.',
    inputSchema: {
      type: 'object',
      properties: {
        prioridade_id: { type: 'number', description: 'ID da prioridade' },
        nome: { type: 'string', description: 'Nome' },
        cor: { type: 'string', description: 'Cor' },
        sla_horas: { type: 'number', description: 'SLA em horas' },
        ordem: { type: 'number', description: 'Ordem' },
        ativa: { type: 'boolean', description: 'Se está ativa' }
      },
      required: ['prioridade_id']
    },
    handler: atualizarPrioridadeChamado
  },
  {
    name: 'sgp_excluir_prioridade_chamado',
    description: 'Exclui uma prioridade de chamado.',
    inputSchema: {
      type: 'object',
      properties: {
        prioridade_id: { type: 'number', description: 'ID da prioridade' }
      },
      required: ['prioridade_id']
    },
    handler: excluirPrioridadeChamado
  }
];
