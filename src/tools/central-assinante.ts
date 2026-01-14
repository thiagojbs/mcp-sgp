/**
 * Ferramentas da Central do Assinante
 *
 * Endpoints para o portal de autoatendimento do assinante/cliente final.
 * IMPORTANTE: Usa autenticação diferente (CPF/CNPJ + Senha do assinante)
 */

import { SGPClient } from '../sgp-client';

// Interface para as ferramentas
interface SGPTool {
  name: string;
  description: string;
  inputSchema: Record<string, unknown>;
  handler: (client: SGPClient, params: Record<string, unknown>) => Promise<unknown>;
}

// ==================== CONTRATOS ====================

const centralContratosListar: SGPTool = {
  name: 'central_contratos_listar',
  description: 'Lista os contratos do assinante logado na central. Requer autenticação do assinante (CPF/CNPJ + senha).',
  inputSchema: {
    type: 'object',
    properties: {
      cpf_cnpj: {
        type: 'string',
        description: 'CPF ou CNPJ do assinante (somente números)'
      },
      senha: {
        type: 'string',
        description: 'Senha de acesso à central do assinante'
      },
      status: {
        type: 'string',
        enum: ['ativo', 'inativo', 'suspenso', 'cancelado', 'todos'],
        description: 'Filtrar por status do contrato'
      }
    },
    required: ['cpf_cnpj', 'senha']
  },
  handler: async (client: SGPClient, params: Record<string, unknown>) => {
    return client.post('/central/auth/contratos', {
      cpf_cnpj: params.cpf_cnpj,
      senha: params.senha,
      status: params.status || 'todos'
    });
  }
};

const centralContratoDetalhes: SGPTool = {
  name: 'central_contrato_detalhes',
  description: 'Obtém detalhes de um contrato específico do assinante. Inclui informações do plano, valores e data de vencimento.',
  inputSchema: {
    type: 'object',
    properties: {
      cpf_cnpj: {
        type: 'string',
        description: 'CPF ou CNPJ do assinante (somente números)'
      },
      senha: {
        type: 'string',
        description: 'Senha de acesso à central do assinante'
      },
      contrato_id: {
        type: 'integer',
        description: 'ID do contrato'
      }
    },
    required: ['cpf_cnpj', 'senha', 'contrato_id']
  },
  handler: async (client: SGPClient, params: Record<string, unknown>) => {
    return client.post(`/central/auth/contratos/${params.contrato_id}`, {
      cpf_cnpj: params.cpf_cnpj,
      senha: params.senha
    });
  }
};

// ==================== FATURAS ====================

const centralFaturasListar: SGPTool = {
  name: 'central_faturas_listar',
  description: 'Lista as faturas do assinante. Pode filtrar por status (aberta, paga, vencida, etc).',
  inputSchema: {
    type: 'object',
    properties: {
      cpf_cnpj: {
        type: 'string',
        description: 'CPF ou CNPJ do assinante (somente números)'
      },
      senha: {
        type: 'string',
        description: 'Senha de acesso à central do assinante'
      },
      status: {
        type: 'string',
        enum: ['aberta', 'paga', 'vencida', 'cancelada', 'todas'],
        description: 'Filtrar por status da fatura'
      },
      contrato_id: {
        type: 'integer',
        description: 'Filtrar faturas de um contrato específico'
      },
      limite: {
        type: 'integer',
        description: 'Quantidade máxima de faturas a retornar'
      }
    },
    required: ['cpf_cnpj', 'senha']
  },
  handler: async (client: SGPClient, params: Record<string, unknown>) => {
    return client.post('/central/auth/faturas', {
      cpf_cnpj: params.cpf_cnpj,
      senha: params.senha,
      status: params.status || 'todas',
      contrato_id: params.contrato_id,
      limite: params.limite || 50
    });
  }
};

const centralFaturaDetalhes: SGPTool = {
  name: 'central_fatura_detalhes',
  description: 'Obtém detalhes completos de uma fatura específica. Inclui itens, valores, código de barras e linha digitável.',
  inputSchema: {
    type: 'object',
    properties: {
      cpf_cnpj: {
        type: 'string',
        description: 'CPF ou CNPJ do assinante (somente números)'
      },
      senha: {
        type: 'string',
        description: 'Senha de acesso à central do assinante'
      },
      fatura_id: {
        type: 'integer',
        description: 'ID da fatura'
      }
    },
    required: ['cpf_cnpj', 'senha', 'fatura_id']
  },
  handler: async (client: SGPClient, params: Record<string, unknown>) => {
    return client.post(`/central/auth/faturas/${params.fatura_id}`, {
      cpf_cnpj: params.cpf_cnpj,
      senha: params.senha
    });
  }
};

const centralFaturaSegundaVia: SGPTool = {
  name: 'central_fatura_segunda_via',
  description: 'Gera segunda via de uma fatura (boleto atualizado). Retorna novo código de barras e linha digitável.',
  inputSchema: {
    type: 'object',
    properties: {
      cpf_cnpj: {
        type: 'string',
        description: 'CPF ou CNPJ do assinante (somente números)'
      },
      senha: {
        type: 'string',
        description: 'Senha de acesso à central do assinante'
      },
      fatura_id: {
        type: 'integer',
        description: 'ID da fatura'
      },
      forma_envio: {
        type: 'string',
        enum: ['email', 'sms', 'whatsapp', 'nenhum'],
        description: 'Como enviar a segunda via (opcional)'
      }
    },
    required: ['cpf_cnpj', 'senha', 'fatura_id']
  },
  handler: async (client: SGPClient, params: Record<string, unknown>) => {
    return client.post(`/central/auth/faturas/${params.fatura_id}/segunda-via`, {
      cpf_cnpj: params.cpf_cnpj,
      senha: params.senha,
      forma_envio: params.forma_envio || 'nenhum'
    });
  }
};

// ==================== CHAMADOS ====================

const centralChamadosListar: SGPTool = {
  name: 'central_chamados_listar',
  description: 'Lista os chamados de suporte do assinante. Pode filtrar por status.',
  inputSchema: {
    type: 'object',
    properties: {
      cpf_cnpj: {
        type: 'string',
        description: 'CPF ou CNPJ do assinante (somente números)'
      },
      senha: {
        type: 'string',
        description: 'Senha de acesso à central do assinante'
      },
      status: {
        type: 'string',
        enum: ['aberto', 'em_andamento', 'aguardando_cliente', 'resolvido', 'fechado', 'todos'],
        description: 'Filtrar por status do chamado'
      },
      limite: {
        type: 'integer',
        description: 'Quantidade máxima de chamados a retornar'
      }
    },
    required: ['cpf_cnpj', 'senha']
  },
  handler: async (client: SGPClient, params: Record<string, unknown>) => {
    return client.post('/central/auth/chamados', {
      cpf_cnpj: params.cpf_cnpj,
      senha: params.senha,
      status: params.status || 'todos',
      limite: params.limite || 50
    });
  }
};

const centralChamadoAbrir: SGPTool = {
  name: 'central_chamado_abrir',
  description: 'Abre um novo chamado de suporte pelo portal do assinante.',
  inputSchema: {
    type: 'object',
    properties: {
      cpf_cnpj: {
        type: 'string',
        description: 'CPF ou CNPJ do assinante (somente números)'
      },
      senha: {
        type: 'string',
        description: 'Senha de acesso à central do assinante'
      },
      contrato_id: {
        type: 'integer',
        description: 'ID do contrato relacionado ao chamado'
      },
      categoria: {
        type: 'string',
        enum: ['suporte_tecnico', 'financeiro', 'comercial', 'cancelamento', 'outros'],
        description: 'Categoria do chamado'
      },
      assunto: {
        type: 'string',
        description: 'Assunto/título do chamado'
      },
      descricao: {
        type: 'string',
        description: 'Descrição detalhada do problema ou solicitação'
      },
      prioridade: {
        type: 'string',
        enum: ['baixa', 'normal', 'alta', 'urgente'],
        description: 'Prioridade do chamado'
      }
    },
    required: ['cpf_cnpj', 'senha', 'contrato_id', 'categoria', 'assunto', 'descricao']
  },
  handler: async (client: SGPClient, params: Record<string, unknown>) => {
    return client.post('/central/auth/chamados/abrir', {
      cpf_cnpj: params.cpf_cnpj,
      senha: params.senha,
      contrato_id: params.contrato_id,
      categoria: params.categoria,
      assunto: params.assunto,
      descricao: params.descricao,
      prioridade: params.prioridade || 'normal'
    });
  }
};

const centralChamadoDetalhes: SGPTool = {
  name: 'central_chamado_detalhes',
  description: 'Obtém detalhes completos de um chamado, incluindo histórico de interações.',
  inputSchema: {
    type: 'object',
    properties: {
      cpf_cnpj: {
        type: 'string',
        description: 'CPF ou CNPJ do assinante (somente números)'
      },
      senha: {
        type: 'string',
        description: 'Senha de acesso à central do assinante'
      },
      chamado_id: {
        type: 'integer',
        description: 'ID do chamado'
      }
    },
    required: ['cpf_cnpj', 'senha', 'chamado_id']
  },
  handler: async (client: SGPClient, params: Record<string, unknown>) => {
    return client.post(`/central/auth/chamados/${params.chamado_id}`, {
      cpf_cnpj: params.cpf_cnpj,
      senha: params.senha
    });
  }
};

const centralChamadoInteragir: SGPTool = {
  name: 'central_chamado_interagir',
  description: 'Adiciona uma nova interação/mensagem em um chamado existente.',
  inputSchema: {
    type: 'object',
    properties: {
      cpf_cnpj: {
        type: 'string',
        description: 'CPF ou CNPJ do assinante (somente números)'
      },
      senha: {
        type: 'string',
        description: 'Senha de acesso à central do assinante'
      },
      chamado_id: {
        type: 'integer',
        description: 'ID do chamado'
      },
      mensagem: {
        type: 'string',
        description: 'Texto da mensagem/interação'
      }
    },
    required: ['cpf_cnpj', 'senha', 'chamado_id', 'mensagem']
  },
  handler: async (client: SGPClient, params: Record<string, unknown>) => {
    return client.post(`/central/auth/chamados/${params.chamado_id}/interagir`, {
      cpf_cnpj: params.cpf_cnpj,
      senha: params.senha,
      mensagem: params.mensagem
    });
  }
};

// ==================== PLANOS ====================

const centralPlanosListar: SGPTool = {
  name: 'central_planos_listar',
  description: 'Lista os planos disponíveis para upgrade/mudança. Mostra planos superiores ao atual do assinante.',
  inputSchema: {
    type: 'object',
    properties: {
      cpf_cnpj: {
        type: 'string',
        description: 'CPF ou CNPJ do assinante (somente números)'
      },
      senha: {
        type: 'string',
        description: 'Senha de acesso à central do assinante'
      },
      contrato_id: {
        type: 'integer',
        description: 'ID do contrato para verificar planos disponíveis'
      }
    },
    required: ['cpf_cnpj', 'senha', 'contrato_id']
  },
  handler: async (client: SGPClient, params: Record<string, unknown>) => {
    return client.post('/central/auth/planos', {
      cpf_cnpj: params.cpf_cnpj,
      senha: params.senha,
      contrato_id: params.contrato_id
    });
  }
};

const centralPlanoSolicitarUpgrade: SGPTool = {
  name: 'central_plano_solicitar_upgrade',
  description: 'Solicita upgrade de plano pelo portal do assinante. Gera uma solicitação para análise.',
  inputSchema: {
    type: 'object',
    properties: {
      cpf_cnpj: {
        type: 'string',
        description: 'CPF ou CNPJ do assinante (somente números)'
      },
      senha: {
        type: 'string',
        description: 'Senha de acesso à central do assinante'
      },
      contrato_id: {
        type: 'integer',
        description: 'ID do contrato atual'
      },
      plano_novo_id: {
        type: 'integer',
        description: 'ID do novo plano desejado'
      },
      observacao: {
        type: 'string',
        description: 'Observação adicional sobre a solicitação'
      }
    },
    required: ['cpf_cnpj', 'senha', 'contrato_id', 'plano_novo_id']
  },
  handler: async (client: SGPClient, params: Record<string, unknown>) => {
    return client.post('/central/auth/planos/solicitar-upgrade', {
      cpf_cnpj: params.cpf_cnpj,
      senha: params.senha,
      contrato_id: params.contrato_id,
      plano_novo_id: params.plano_novo_id,
      observacao: params.observacao
    });
  }
};

// ==================== CONSUMO ====================

const centralConsumoConsultar: SGPTool = {
  name: 'central_consumo_consultar',
  description: 'Consulta o consumo de dados/tráfego do assinante. Mostra uso atual e histórico.',
  inputSchema: {
    type: 'object',
    properties: {
      cpf_cnpj: {
        type: 'string',
        description: 'CPF ou CNPJ do assinante (somente números)'
      },
      senha: {
        type: 'string',
        description: 'Senha de acesso à central do assinante'
      },
      contrato_id: {
        type: 'integer',
        description: 'ID do contrato'
      },
      periodo: {
        type: 'string',
        enum: ['dia', 'semana', 'mes', 'ano'],
        description: 'Período para consulta do consumo'
      },
      data_inicio: {
        type: 'string',
        description: 'Data inicial para consulta (YYYY-MM-DD)'
      },
      data_fim: {
        type: 'string',
        description: 'Data final para consulta (YYYY-MM-DD)'
      }
    },
    required: ['cpf_cnpj', 'senha', 'contrato_id']
  },
  handler: async (client: SGPClient, params: Record<string, unknown>) => {
    return client.post('/central/auth/consumo', {
      cpf_cnpj: params.cpf_cnpj,
      senha: params.senha,
      contrato_id: params.contrato_id,
      periodo: params.periodo || 'mes',
      data_inicio: params.data_inicio,
      data_fim: params.data_fim
    });
  }
};

// ==================== PERFIL ====================

const centralPerfilConsultar: SGPTool = {
  name: 'central_perfil_consultar',
  description: 'Consulta os dados cadastrais do assinante no perfil.',
  inputSchema: {
    type: 'object',
    properties: {
      cpf_cnpj: {
        type: 'string',
        description: 'CPF ou CNPJ do assinante (somente números)'
      },
      senha: {
        type: 'string',
        description: 'Senha de acesso à central do assinante'
      }
    },
    required: ['cpf_cnpj', 'senha']
  },
  handler: async (client: SGPClient, params: Record<string, unknown>) => {
    return client.post('/central/auth/perfil', {
      cpf_cnpj: params.cpf_cnpj,
      senha: params.senha
    });
  }
};

const centralPerfilAtualizar: SGPTool = {
  name: 'central_perfil_atualizar',
  description: 'Atualiza os dados cadastrais do assinante (email, telefone, etc).',
  inputSchema: {
    type: 'object',
    properties: {
      cpf_cnpj: {
        type: 'string',
        description: 'CPF ou CNPJ do assinante (somente números)'
      },
      senha: {
        type: 'string',
        description: 'Senha de acesso à central do assinante'
      },
      email: {
        type: 'string',
        description: 'Novo email de contato'
      },
      telefone: {
        type: 'string',
        description: 'Novo telefone de contato'
      },
      celular: {
        type: 'string',
        description: 'Novo celular de contato'
      },
      receber_email: {
        type: 'boolean',
        description: 'Receber notificações por email'
      },
      receber_sms: {
        type: 'boolean',
        description: 'Receber notificações por SMS'
      },
      receber_whatsapp: {
        type: 'boolean',
        description: 'Receber notificações por WhatsApp'
      }
    },
    required: ['cpf_cnpj', 'senha']
  },
  handler: async (client: SGPClient, params: Record<string, unknown>) => {
    return client.post('/central/auth/perfil/atualizar', {
      cpf_cnpj: params.cpf_cnpj,
      senha: params.senha,
      email: params.email,
      telefone: params.telefone,
      celular: params.celular,
      receber_email: params.receber_email,
      receber_sms: params.receber_sms,
      receber_whatsapp: params.receber_whatsapp
    });
  }
};

const centralSenhaAlterar: SGPTool = {
  name: 'central_senha_alterar',
  description: 'Altera a senha de acesso à central do assinante.',
  inputSchema: {
    type: 'object',
    properties: {
      cpf_cnpj: {
        type: 'string',
        description: 'CPF ou CNPJ do assinante (somente números)'
      },
      senha_atual: {
        type: 'string',
        description: 'Senha atual do assinante'
      },
      senha_nova: {
        type: 'string',
        description: 'Nova senha desejada'
      },
      senha_confirmacao: {
        type: 'string',
        description: 'Confirmação da nova senha'
      }
    },
    required: ['cpf_cnpj', 'senha_atual', 'senha_nova', 'senha_confirmacao']
  },
  handler: async (client: SGPClient, params: Record<string, unknown>) => {
    return client.post('/central/auth/senha/alterar', {
      cpf_cnpj: params.cpf_cnpj,
      senha_atual: params.senha_atual,
      senha_nova: params.senha_nova,
      senha_confirmacao: params.senha_confirmacao
    });
  }
};

// Exporta todas as ferramentas da Central do Assinante
export const centralAssinanteTools: SGPTool[] = [
  // Contratos (2)
  centralContratosListar,
  centralContratoDetalhes,

  // Faturas (3)
  centralFaturasListar,
  centralFaturaDetalhes,
  centralFaturaSegundaVia,

  // Chamados (4)
  centralChamadosListar,
  centralChamadoAbrir,
  centralChamadoDetalhes,
  centralChamadoInteragir,

  // Planos (2)
  centralPlanosListar,
  centralPlanoSolicitarUpgrade,

  // Consumo (1)
  centralConsumoConsultar,

  // Perfil (3)
  centralPerfilConsultar,
  centralPerfilAtualizar,
  centralSenhaAlterar
];
