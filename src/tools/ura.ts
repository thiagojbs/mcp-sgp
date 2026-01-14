/**
 * Ferramentas MCP para URA (Unidade de Resposta Audível)
 * Integração com sistemas de atendimento telefônico automatizado
 */

import { SGPClient } from '../sgp-client';

// === Cliente URA ===
export async function uraConsultarCliente(client: SGPClient, params: { cpfcnpj?: string; telefone?: string }) {
  return client.post('/ura/cliente', {
    cpfcnpj: params.cpfcnpj,
    telefone: params.telefone
  });
}

// === Contrato URA ===
export async function uraConsultarContrato(client: SGPClient, params: { contrato_id: number }) {
  return client.get(`/ura/contrato/${params.contrato_id}`);
}

// === Faturas URA ===
export async function uraListarFaturas(client: SGPClient, params: { contrato_id: number }) {
  return client.get(`/ura/faturas/${params.contrato_id}`);
}

export async function uraDetalhesFatura(client: SGPClient, params: { contrato_id: number; fatura_id: number }) {
  return client.get(`/ura/faturas/${params.contrato_id}/${params.fatura_id}`);
}

// === Chamados URA ===
export async function uraAbrirChamado(client: SGPClient, params: { cliente_id: number; contrato_id?: number; categoria_id?: number; descricao: string; telefone_retorno?: string }) {
  return client.post('/ura/chamados/abrir', params);
}

export async function uraConsultarChamado(client: SGPClient, params: { chamado_id: number }) {
  return client.get(`/ura/chamados/${params.chamado_id}`);
}

export async function uraListarChamadosCliente(client: SGPClient, params: { cliente_id: number }) {
  return client.get(`/ura/chamados/cliente/${params.cliente_id}`);
}

// === Atendimentos URA ===
export async function uraRegistrarAtendimento(client: SGPClient, params: { cliente_id?: number; telefone: string; opcao_menu?: string; duracao?: number; resultado?: string; observacao?: string }) {
  return client.post('/ura/atendimentos', params);
}

export async function uraConsultarAtendimento(client: SGPClient, params: { atendimento_id: number }) {
  return client.get(`/ura/atendimentos/${params.atendimento_id}`);
}

export async function uraListarAtendimentosCliente(client: SGPClient, params: { cliente_id: number; page?: number; per_page?: number }) {
  return client.get(`/ura/atendimentos/cliente/${params.cliente_id}`, {
    page: params.page || 1,
    per_page: params.per_page || 20
  });
}

// === Menu e Filas ===
export async function uraListarMenu(client: SGPClient, _params: Record<string, unknown>) {
  return client.get('/ura/menu');
}

export async function uraStatusFilas(client: SGPClient, _params: Record<string, unknown>) {
  return client.get('/ura/filas/status');
}

// Definições das ferramentas
export const uraTools = [
  {
    name: 'sgp_ura_consultar_cliente',
    description: 'Consulta cliente pela URA usando CPF/CNPJ ou telefone. Retorna dados básicos do cliente.',
    inputSchema: {
      type: 'object',
      properties: {
        cpfcnpj: { type: 'string', description: 'CPF ou CNPJ do cliente' },
        telefone: { type: 'string', description: 'Telefone do cliente' }
      }
    },
    handler: uraConsultarCliente
  },
  {
    name: 'sgp_ura_consultar_contrato',
    description: 'Consulta informações de um contrato para a URA.',
    inputSchema: {
      type: 'object',
      properties: {
        contrato_id: { type: 'number', description: 'ID do contrato' }
      },
      required: ['contrato_id']
    },
    handler: uraConsultarContrato
  },
  {
    name: 'sgp_ura_listar_faturas',
    description: 'Lista faturas de um contrato para a URA.',
    inputSchema: {
      type: 'object',
      properties: {
        contrato_id: { type: 'number', description: 'ID do contrato' }
      },
      required: ['contrato_id']
    },
    handler: uraListarFaturas
  },
  {
    name: 'sgp_ura_detalhes_fatura',
    description: 'Retorna detalhes de uma fatura específica para a URA.',
    inputSchema: {
      type: 'object',
      properties: {
        contrato_id: { type: 'number', description: 'ID do contrato' },
        fatura_id: { type: 'number', description: 'ID da fatura' }
      },
      required: ['contrato_id', 'fatura_id']
    },
    handler: uraDetalhesFatura
  },
  {
    name: 'sgp_ura_abrir_chamado',
    description: 'Abre um chamado de suporte pela URA.',
    inputSchema: {
      type: 'object',
      properties: {
        cliente_id: { type: 'number', description: 'ID do cliente' },
        contrato_id: { type: 'number', description: 'ID do contrato' },
        categoria_id: { type: 'number', description: 'ID da categoria' },
        descricao: { type: 'string', description: 'Descrição do problema' },
        telefone_retorno: { type: 'string', description: 'Telefone para retorno' }
      },
      required: ['cliente_id', 'descricao']
    },
    handler: uraAbrirChamado
  },
  {
    name: 'sgp_ura_consultar_chamado',
    description: 'Consulta status de um chamado pela URA.',
    inputSchema: {
      type: 'object',
      properties: {
        chamado_id: { type: 'number', description: 'ID do chamado' }
      },
      required: ['chamado_id']
    },
    handler: uraConsultarChamado
  },
  {
    name: 'sgp_ura_listar_chamados_cliente',
    description: 'Lista chamados de um cliente pela URA.',
    inputSchema: {
      type: 'object',
      properties: {
        cliente_id: { type: 'number', description: 'ID do cliente' }
      },
      required: ['cliente_id']
    },
    handler: uraListarChamadosCliente
  },
  {
    name: 'sgp_ura_registrar_atendimento',
    description: 'Registra um atendimento telefônico realizado pela URA.',
    inputSchema: {
      type: 'object',
      properties: {
        cliente_id: { type: 'number', description: 'ID do cliente (se identificado)' },
        telefone: { type: 'string', description: 'Telefone que ligou' },
        opcao_menu: { type: 'string', description: 'Opção do menu selecionada' },
        duracao: { type: 'number', description: 'Duração da ligação em segundos' },
        resultado: { type: 'string', description: 'Resultado do atendimento' },
        observacao: { type: 'string', description: 'Observações adicionais' }
      },
      required: ['telefone']
    },
    handler: uraRegistrarAtendimento
  },
  {
    name: 'sgp_ura_consultar_atendimento',
    description: 'Consulta detalhes de um atendimento URA específico.',
    inputSchema: {
      type: 'object',
      properties: {
        atendimento_id: { type: 'number', description: 'ID do atendimento' }
      },
      required: ['atendimento_id']
    },
    handler: uraConsultarAtendimento
  },
  {
    name: 'sgp_ura_listar_atendimentos_cliente',
    description: 'Lista atendimentos URA de um cliente.',
    inputSchema: {
      type: 'object',
      properties: {
        cliente_id: { type: 'number', description: 'ID do cliente' },
        page: { type: 'number' },
        per_page: { type: 'number' }
      },
      required: ['cliente_id']
    },
    handler: uraListarAtendimentosCliente
  },
  {
    name: 'sgp_ura_listar_menu',
    description: 'Lista opções de menu configuradas na URA.',
    inputSchema: {
      type: 'object',
      properties: {}
    },
    handler: uraListarMenu
  },
  {
    name: 'sgp_ura_status_filas',
    description: 'Retorna status das filas de atendimento da URA.',
    inputSchema: {
      type: 'object',
      properties: {}
    },
    handler: uraStatusFilas
  }
];
