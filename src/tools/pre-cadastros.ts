/**
 * Ferramentas MCP para Pré-Cadastros
 * Gestão de leads e prospectos antes da efetivação do contrato
 */

import { SGPClient } from '../sgp-client';

// === Pré-Cadastros ===
export async function listarPreCadastros(client: SGPClient, params: { status_id?: number; origem_id?: number; data_inicio?: string; data_fim?: string; page?: number; per_page?: number }) {
  const queryParams: Record<string, string | number | undefined> = {
    page: params.page || 1,
    per_page: params.per_page || 20
  };
  if (params.status_id) queryParams.status_id = params.status_id;
  if (params.origem_id) queryParams.origem_id = params.origem_id;
  if (params.data_inicio) queryParams.data_inicio = params.data_inicio;
  if (params.data_fim) queryParams.data_fim = params.data_fim;
  return client.get('/pre-cadastros', queryParams);
}

export async function cadastrarPreCadastro(client: SGPClient, params: { nome: string; cpfcnpj?: string; email?: string; telefone: string; endereco?: string; cidade_id?: number; plano_id?: number; origem_id?: number; observacao?: string }) {
  return client.post('/pre-cadastros', params);
}

export async function detalhesPreCadastro(client: SGPClient, params: { pre_cadastro_id: number }) {
  return client.get(`/pre-cadastros/${params.pre_cadastro_id}`);
}

export async function atualizarPreCadastro(client: SGPClient, params: { pre_cadastro_id: number; nome?: string; email?: string; telefone?: string; status_id?: number; observacao?: string }) {
  const { pre_cadastro_id, ...data } = params;
  return client.put(`/pre-cadastros/${pre_cadastro_id}`, data);
}

export async function excluirPreCadastro(client: SGPClient, params: { pre_cadastro_id: number }) {
  return client.delete(`/pre-cadastros/${params.pre_cadastro_id}`);
}

export async function converterPreCadastro(client: SGPClient, params: { pre_cadastro_id: number; plano_id: number; vendedor_id?: number }) {
  return client.post(`/pre-cadastros/${params.pre_cadastro_id}/converter`, {
    plano_id: params.plano_id,
    vendedor_id: params.vendedor_id
  });
}

export async function cancelarPreCadastro(client: SGPClient, params: { pre_cadastro_id: number; motivo?: string }) {
  return client.post(`/pre-cadastros/${params.pre_cadastro_id}/cancelar`, {
    motivo: params.motivo
  });
}

// === Origens ===
export async function listarOrigensPreCadastro(client: SGPClient, params: { page?: number; per_page?: number }) {
  return client.get('/pre-cadastros/origens', {
    page: params.page || 1,
    per_page: params.per_page || 50
  });
}

export async function cadastrarOrigemPreCadastro(client: SGPClient, params: { nome: string; descricao?: string }) {
  return client.post('/pre-cadastros/origens', params);
}

export async function detalhesOrigemPreCadastro(client: SGPClient, params: { origem_id: number }) {
  return client.get(`/pre-cadastros/origens/${params.origem_id}`);
}

export async function atualizarOrigemPreCadastro(client: SGPClient, params: { origem_id: number; nome?: string; descricao?: string; ativa?: boolean }) {
  const { origem_id, ...data } = params;
  return client.put(`/pre-cadastros/origens/${origem_id}`, data);
}

export async function excluirOrigemPreCadastro(client: SGPClient, params: { origem_id: number }) {
  return client.delete(`/pre-cadastros/origens/${params.origem_id}`);
}

// === Status ===
export async function listarStatusPreCadastro(client: SGPClient, params: { page?: number; per_page?: number }) {
  return client.get('/pre-cadastros/status', {
    page: params.page || 1,
    per_page: params.per_page || 50
  });
}

export async function cadastrarStatusPreCadastro(client: SGPClient, params: { nome: string; cor?: string; ordem?: number }) {
  return client.post('/pre-cadastros/status', params);
}

export async function detalhesStatusPreCadastro(client: SGPClient, params: { status_id: number }) {
  return client.get(`/pre-cadastros/status/${params.status_id}`);
}

export async function atualizarStatusPreCadastro(client: SGPClient, params: { status_id: number; nome?: string; cor?: string; ordem?: number; ativo?: boolean }) {
  const { status_id, ...data } = params;
  return client.put(`/pre-cadastros/status/${status_id}`, data);
}

export async function excluirStatusPreCadastro(client: SGPClient, params: { status_id: number }) {
  return client.delete(`/pre-cadastros/status/${params.status_id}`);
}

// Definições das ferramentas
export const preCadastrosTools = [
  // Pré-Cadastros
  {
    name: 'sgp_listar_pre_cadastros',
    description: 'Lista pré-cadastros (leads/prospectos) registrados.',
    inputSchema: {
      type: 'object',
      properties: {
        status_id: { type: 'number', description: 'ID do status para filtrar' },
        origem_id: { type: 'number', description: 'ID da origem para filtrar' },
        data_inicio: { type: 'string', description: 'Data inicial (YYYY-MM-DD)' },
        data_fim: { type: 'string', description: 'Data final (YYYY-MM-DD)' },
        page: { type: 'number' },
        per_page: { type: 'number' }
      }
    },
    handler: listarPreCadastros
  },
  {
    name: 'sgp_cadastrar_pre_cadastro',
    description: 'Registra um novo pré-cadastro (lead/prospecto).',
    inputSchema: {
      type: 'object',
      properties: {
        nome: { type: 'string', description: 'Nome do prospecto' },
        cpfcnpj: { type: 'string', description: 'CPF ou CNPJ' },
        email: { type: 'string', description: 'Email' },
        telefone: { type: 'string', description: 'Telefone de contato' },
        endereco: { type: 'string', description: 'Endereço' },
        cidade_id: { type: 'number', description: 'ID da cidade' },
        plano_id: { type: 'number', description: 'ID do plano de interesse' },
        origem_id: { type: 'number', description: 'ID da origem do lead' },
        observacao: { type: 'string', description: 'Observações' }
      },
      required: ['nome', 'telefone']
    },
    handler: cadastrarPreCadastro
  },
  {
    name: 'sgp_detalhes_pre_cadastro',
    description: 'Retorna detalhes de um pré-cadastro.',
    inputSchema: {
      type: 'object',
      properties: {
        pre_cadastro_id: { type: 'number', description: 'ID do pré-cadastro' }
      },
      required: ['pre_cadastro_id']
    },
    handler: detalhesPreCadastro
  },
  {
    name: 'sgp_atualizar_pre_cadastro',
    description: 'Atualiza dados de um pré-cadastro.',
    inputSchema: {
      type: 'object',
      properties: {
        pre_cadastro_id: { type: 'number', description: 'ID do pré-cadastro' },
        nome: { type: 'string', description: 'Nome' },
        email: { type: 'string', description: 'Email' },
        telefone: { type: 'string', description: 'Telefone' },
        status_id: { type: 'number', description: 'ID do novo status' },
        observacao: { type: 'string', description: 'Observações' }
      },
      required: ['pre_cadastro_id']
    },
    handler: atualizarPreCadastro
  },
  {
    name: 'sgp_excluir_pre_cadastro',
    description: 'Exclui um pré-cadastro.',
    inputSchema: {
      type: 'object',
      properties: {
        pre_cadastro_id: { type: 'number', description: 'ID do pré-cadastro' }
      },
      required: ['pre_cadastro_id']
    },
    handler: excluirPreCadastro
  },
  {
    name: 'sgp_converter_pre_cadastro',
    description: 'Converte um pré-cadastro em cliente efetivo com contrato.',
    inputSchema: {
      type: 'object',
      properties: {
        pre_cadastro_id: { type: 'number', description: 'ID do pré-cadastro' },
        plano_id: { type: 'number', description: 'ID do plano a contratar' },
        vendedor_id: { type: 'number', description: 'ID do vendedor responsável' }
      },
      required: ['pre_cadastro_id', 'plano_id']
    },
    handler: converterPreCadastro
  },
  {
    name: 'sgp_cancelar_pre_cadastro',
    description: 'Cancela um pré-cadastro (lead perdido).',
    inputSchema: {
      type: 'object',
      properties: {
        pre_cadastro_id: { type: 'number', description: 'ID do pré-cadastro' },
        motivo: { type: 'string', description: 'Motivo do cancelamento' }
      },
      required: ['pre_cadastro_id']
    },
    handler: cancelarPreCadastro
  },
  // Origens
  {
    name: 'sgp_listar_origens_pre_cadastro',
    description: 'Lista origens de pré-cadastro (canais de captação).',
    inputSchema: {
      type: 'object',
      properties: {
        page: { type: 'number' },
        per_page: { type: 'number' }
      }
    },
    handler: listarOrigensPreCadastro
  },
  {
    name: 'sgp_cadastrar_origem_pre_cadastro',
    description: 'Cadastra uma nova origem de pré-cadastro.',
    inputSchema: {
      type: 'object',
      properties: {
        nome: { type: 'string', description: 'Nome da origem' },
        descricao: { type: 'string', description: 'Descrição' }
      },
      required: ['nome']
    },
    handler: cadastrarOrigemPreCadastro
  },
  {
    name: 'sgp_detalhes_origem_pre_cadastro',
    description: 'Retorna detalhes de uma origem de pré-cadastro.',
    inputSchema: {
      type: 'object',
      properties: {
        origem_id: { type: 'number', description: 'ID da origem' }
      },
      required: ['origem_id']
    },
    handler: detalhesOrigemPreCadastro
  },
  {
    name: 'sgp_atualizar_origem_pre_cadastro',
    description: 'Atualiza uma origem de pré-cadastro.',
    inputSchema: {
      type: 'object',
      properties: {
        origem_id: { type: 'number', description: 'ID da origem' },
        nome: { type: 'string', description: 'Nome' },
        descricao: { type: 'string', description: 'Descrição' },
        ativa: { type: 'boolean', description: 'Se está ativa' }
      },
      required: ['origem_id']
    },
    handler: atualizarOrigemPreCadastro
  },
  {
    name: 'sgp_excluir_origem_pre_cadastro',
    description: 'Exclui uma origem de pré-cadastro.',
    inputSchema: {
      type: 'object',
      properties: {
        origem_id: { type: 'number', description: 'ID da origem' }
      },
      required: ['origem_id']
    },
    handler: excluirOrigemPreCadastro
  },
  // Status
  {
    name: 'sgp_listar_status_pre_cadastro',
    description: 'Lista status disponíveis para pré-cadastros.',
    inputSchema: {
      type: 'object',
      properties: {
        page: { type: 'number' },
        per_page: { type: 'number' }
      }
    },
    handler: listarStatusPreCadastro
  },
  {
    name: 'sgp_cadastrar_status_pre_cadastro',
    description: 'Cadastra um novo status de pré-cadastro.',
    inputSchema: {
      type: 'object',
      properties: {
        nome: { type: 'string', description: 'Nome do status' },
        cor: { type: 'string', description: 'Cor em hexadecimal (#RRGGBB)' },
        ordem: { type: 'number', description: 'Ordem de exibição' }
      },
      required: ['nome']
    },
    handler: cadastrarStatusPreCadastro
  },
  {
    name: 'sgp_detalhes_status_pre_cadastro',
    description: 'Retorna detalhes de um status de pré-cadastro.',
    inputSchema: {
      type: 'object',
      properties: {
        status_id: { type: 'number', description: 'ID do status' }
      },
      required: ['status_id']
    },
    handler: detalhesStatusPreCadastro
  },
  {
    name: 'sgp_atualizar_status_pre_cadastro',
    description: 'Atualiza um status de pré-cadastro.',
    inputSchema: {
      type: 'object',
      properties: {
        status_id: { type: 'number', description: 'ID do status' },
        nome: { type: 'string', description: 'Nome' },
        cor: { type: 'string', description: 'Cor em hexadecimal' },
        ordem: { type: 'number', description: 'Ordem de exibição' },
        ativo: { type: 'boolean', description: 'Se está ativo' }
      },
      required: ['status_id']
    },
    handler: atualizarStatusPreCadastro
  },
  {
    name: 'sgp_excluir_status_pre_cadastro',
    description: 'Exclui um status de pré-cadastro.',
    inputSchema: {
      type: 'object',
      properties: {
        status_id: { type: 'number', description: 'ID do status' }
      },
      required: ['status_id']
    },
    handler: excluirStatusPreCadastro
  }
];
