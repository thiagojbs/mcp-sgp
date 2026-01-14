/**
 * Ferramentas MCP para Remessa/Retorno
 * Geração de arquivos de remessa e processamento de retorno bancário
 */

import { SGPClient } from '../sgp-client';

// Funções de ferramentas

// === Remessa ===
export async function gerarRemessa(client: SGPClient, params: { banco_id?: number; data_vencimento?: string; filtros?: Record<string, unknown> }) {
  return client.post('/remessa/gerar', params);
}

export async function listarRemessas(client: SGPClient, params: { data_inicio?: string; data_fim?: string; banco_id?: number; page?: number; per_page?: number }) {
  const queryParams: Record<string, string | number | undefined> = {
    page: params.page || 1,
    per_page: params.per_page || 20
  };
  if (params.data_inicio) queryParams.data_inicio = params.data_inicio;
  if (params.data_fim) queryParams.data_fim = params.data_fim;
  if (params.banco_id) queryParams.banco_id = params.banco_id;

  return client.get('/remessa/listar', queryParams);
}

export async function downloadRemessa(client: SGPClient, params: { remessa_id: number }) {
  return client.get(`/remessa/download/${params.remessa_id}`);
}

// === Retorno ===
export async function processarRetorno(client: SGPClient, params: { arquivo: string; banco_id?: number }) {
  return client.post('/retorno/processar', params);
}

export async function listarRetornos(client: SGPClient, params: { data_inicio?: string; data_fim?: string; banco_id?: number; page?: number; per_page?: number }) {
  const queryParams: Record<string, string | number | undefined> = {
    page: params.page || 1,
    per_page: params.per_page || 20
  };
  if (params.data_inicio) queryParams.data_inicio = params.data_inicio;
  if (params.data_fim) queryParams.data_fim = params.data_fim;
  if (params.banco_id) queryParams.banco_id = params.banco_id;

  return client.get('/retorno/listar', queryParams);
}

export async function detalhesRetorno(client: SGPClient, params: { retorno_id: number }) {
  return client.get(`/retorno/detalhes/${params.retorno_id}`);
}

// === Boletos ===
export async function listarBoletos(client: SGPClient, params: { cliente_id?: number; contrato_id?: number; status?: string; page?: number; per_page?: number }) {
  const queryParams: Record<string, string | number | undefined> = {
    page: params.page || 1,
    per_page: params.per_page || 20
  };
  if (params.cliente_id) queryParams.cliente_id = params.cliente_id;
  if (params.contrato_id) queryParams.contrato_id = params.contrato_id;
  if (params.status) queryParams.status = params.status;

  return client.get('/boletos/listar', queryParams);
}

export async function gerarBoleto(client: SGPClient, params: { fatura_id: number; banco_id?: number }) {
  return client.post('/boletos/gerar', params);
}

export async function detalhesBoleto(client: SGPClient, params: { boleto_id: number }) {
  return client.get(`/boletos/detalhes/${params.boleto_id}`);
}

export async function cancelarBoleto(client: SGPClient, params: { boleto_id: number; motivo?: string }) {
  return client.post(`/boletos/cancelar/${params.boleto_id}`, { motivo: params.motivo });
}

// Definições das ferramentas para registro no MCP
export const remessaRetornoTools = [
  // Remessa
  {
    name: 'sgp_gerar_remessa',
    description: 'Gera um arquivo de remessa bancária para envio ao banco com os boletos a serem registrados.',
    inputSchema: {
      type: 'object',
      properties: {
        banco_id: { type: 'number', description: 'ID do banco para geração' },
        data_vencimento: { type: 'string', description: 'Data de vencimento (YYYY-MM-DD)' },
        filtros: { type: 'object', description: 'Filtros adicionais' }
      }
    },
    handler: gerarRemessa
  },
  {
    name: 'sgp_listar_remessas',
    description: 'Lista arquivos de remessa gerados. Pode filtrar por período e banco.',
    inputSchema: {
      type: 'object',
      properties: {
        data_inicio: { type: 'string', description: 'Data inicial (YYYY-MM-DD)' },
        data_fim: { type: 'string', description: 'Data final (YYYY-MM-DD)' },
        banco_id: { type: 'number', description: 'ID do banco' },
        page: { type: 'number' },
        per_page: { type: 'number' }
      }
    },
    handler: listarRemessas
  },
  {
    name: 'sgp_download_remessa',
    description: 'Faz download de um arquivo de remessa específico.',
    inputSchema: {
      type: 'object',
      properties: {
        remessa_id: { type: 'number', description: 'ID da remessa' }
      },
      required: ['remessa_id']
    },
    handler: downloadRemessa
  },
  // Retorno
  {
    name: 'sgp_processar_retorno',
    description: 'Processa um arquivo de retorno bancário para baixa automática de boletos pagos.',
    inputSchema: {
      type: 'object',
      properties: {
        arquivo: { type: 'string', description: 'Conteúdo do arquivo de retorno em Base64' },
        banco_id: { type: 'number', description: 'ID do banco' }
      },
      required: ['arquivo']
    },
    handler: processarRetorno
  },
  {
    name: 'sgp_listar_retornos',
    description: 'Lista arquivos de retorno processados. Pode filtrar por período e banco.',
    inputSchema: {
      type: 'object',
      properties: {
        data_inicio: { type: 'string', description: 'Data inicial (YYYY-MM-DD)' },
        data_fim: { type: 'string', description: 'Data final (YYYY-MM-DD)' },
        banco_id: { type: 'number', description: 'ID do banco' },
        page: { type: 'number' },
        per_page: { type: 'number' }
      }
    },
    handler: listarRetornos
  },
  {
    name: 'sgp_detalhes_retorno',
    description: 'Retorna detalhes de um arquivo de retorno processado, incluindo boletos baixados.',
    inputSchema: {
      type: 'object',
      properties: {
        retorno_id: { type: 'number', description: 'ID do retorno' }
      },
      required: ['retorno_id']
    },
    handler: detalhesRetorno
  },
  // Boletos
  {
    name: 'sgp_listar_boletos',
    description: 'Lista boletos gerados. Pode filtrar por cliente, contrato e status.',
    inputSchema: {
      type: 'object',
      properties: {
        cliente_id: { type: 'number', description: 'ID do cliente' },
        contrato_id: { type: 'number', description: 'ID do contrato' },
        status: { type: 'string', description: 'Status do boleto (pendente, pago, vencido, cancelado)' },
        page: { type: 'number' },
        per_page: { type: 'number' }
      }
    },
    handler: listarBoletos
  },
  {
    name: 'sgp_gerar_boleto',
    description: 'Gera um novo boleto para uma fatura.',
    inputSchema: {
      type: 'object',
      properties: {
        fatura_id: { type: 'number', description: 'ID da fatura' },
        banco_id: { type: 'number', description: 'ID do banco' }
      },
      required: ['fatura_id']
    },
    handler: gerarBoleto
  },
  {
    name: 'sgp_detalhes_boleto',
    description: 'Retorna detalhes de um boleto específico, incluindo linha digitável e código de barras.',
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
    name: 'sgp_cancelar_boleto',
    description: 'Cancela um boleto específico.',
    inputSchema: {
      type: 'object',
      properties: {
        boleto_id: { type: 'number', description: 'ID do boleto' },
        motivo: { type: 'string', description: 'Motivo do cancelamento' }
      },
      required: ['boleto_id']
    },
    handler: cancelarBoleto
  }
];
