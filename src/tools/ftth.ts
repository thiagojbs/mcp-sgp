/**
 * Ferramentas MCP para gestão de FTTH (Fiber to the Home)
 * Gerenciamento de ONUs, OLTs, Caixas e Splitters
 */

import { z } from 'zod';
import { SGPClient } from '../sgp-client';

// === ONUs ===
export const listarONUsSchema = z.object({
  olt_id: z.number().optional().describe('ID da OLT para filtrar'),
  status: z.enum(['online', 'offline', 'provisionada', 'desprovisionada', 'todas']).optional().default('todas'),
  cliente_id: z.number().optional().describe('ID do cliente'),
  page: z.number().optional().default(1),
  per_page: z.number().optional().default(20)
});

export const detalhesONUSchema = z.object({
  onu_id: z.number().describe('ID da ONU')
});

export const provisionarONUSchema = z.object({
  onu_id: z.number().describe('ID da ONU'),
  serial: z.string().optional().describe('Serial da ONU'),
  vlan: z.number().optional().describe('VLAN para provisionamento'),
  perfil: z.string().optional().describe('Perfil de velocidade')
});

export const statusONUSchema = z.object({
  onu_id: z.number().describe('ID da ONU')
});

// === OLTs ===
export const listarOLTsSchema = z.object({
  status: z.enum(['online', 'offline', 'todas']).optional().default('todas'),
  page: z.number().optional().default(1),
  per_page: z.number().optional().default(20)
});

export const detalhesOLTSchema = z.object({
  olt_id: z.number().describe('ID da OLT')
});

// === Caixas ===
export const listarCaixasSchema = z.object({
  tipo: z.enum(['cto', 'ceo', 'todas']).optional().default('todas'),
  page: z.number().optional().default(1),
  per_page: z.number().optional().default(20)
});

export const detalhesCaixaSchema = z.object({
  caixa_id: z.number().describe('ID da caixa')
});

// === Splitters ===
export const listarSplittersSchema = z.object({
  caixa_id: z.number().optional().describe('ID da caixa para filtrar'),
  page: z.number().optional().default(1),
  per_page: z.number().optional().default(20)
});

export const detalhesSplitterSchema = z.object({
  splitter_id: z.number().describe('ID do splitter')
});

// Funções de ferramentas - ONUs
export async function listarONUs(client: SGPClient, params: z.infer<typeof listarONUsSchema>) {
  const queryParams: Record<string, string | number | undefined> = {
    page: params.page,
    per_page: params.per_page
  };
  if (params.olt_id) queryParams.olt_id = params.olt_id;
  if (params.status && params.status !== 'todas') queryParams.status = params.status;
  if (params.cliente_id) queryParams.cliente_id = params.cliente_id;

  return client.get('/ftth/onus', queryParams);
}

export async function detalhesONU(client: SGPClient, params: z.infer<typeof detalhesONUSchema>) {
  return client.get(`/ftth/onus/${params.onu_id}`);
}

export async function provisionarONU(client: SGPClient, params: z.infer<typeof provisionarONUSchema>) {
  return client.post(`/ftth/onus/${params.onu_id}/provisionar`, {
    serial: params.serial,
    vlan: params.vlan,
    perfil: params.perfil
  });
}

export async function desprovisionarONU(client: SGPClient, params: z.infer<typeof detalhesONUSchema>) {
  return client.post(`/ftth/onus/${params.onu_id}/desprovisionar`);
}

export async function reiniciarONU(client: SGPClient, params: z.infer<typeof detalhesONUSchema>) {
  return client.post(`/ftth/onus/${params.onu_id}/reiniciar`);
}

export async function statusONU(client: SGPClient, params: z.infer<typeof statusONUSchema>) {
  return client.get(`/ftth/onus/${params.onu_id}/status`);
}

// Funções de ferramentas - OLTs
export async function listarOLTs(client: SGPClient, params: z.infer<typeof listarOLTsSchema>) {
  const queryParams: Record<string, string | number | undefined> = {
    page: params.page,
    per_page: params.per_page
  };
  if (params.status && params.status !== 'todas') queryParams.status = params.status;

  return client.get('/ftth/olts', queryParams);
}

export async function detalhesOLT(client: SGPClient, params: z.infer<typeof detalhesOLTSchema>) {
  return client.get(`/ftth/olts/${params.olt_id}`);
}

// Funções de ferramentas - Caixas
export async function listarCaixas(client: SGPClient, params: z.infer<typeof listarCaixasSchema>) {
  const queryParams: Record<string, string | number | undefined> = {
    page: params.page,
    per_page: params.per_page
  };
  if (params.tipo && params.tipo !== 'todas') queryParams.tipo = params.tipo;

  return client.get('/ftth/caixas', queryParams);
}

export async function detalhesCaixa(client: SGPClient, params: z.infer<typeof detalhesCaixaSchema>) {
  return client.get(`/ftth/caixas/${params.caixa_id}`);
}

// Funções de ferramentas - Splitters
export async function listarSplitters(client: SGPClient, params: z.infer<typeof listarSplittersSchema>) {
  const queryParams: Record<string, string | number | undefined> = {
    page: params.page,
    per_page: params.per_page
  };
  if (params.caixa_id) queryParams.caixa_id = params.caixa_id;

  return client.get('/ftth/splitters', queryParams);
}

export async function detalhesSplitter(client: SGPClient, params: z.infer<typeof detalhesSplitterSchema>) {
  return client.get(`/ftth/splitters/${params.splitter_id}`);
}

// Definições das ferramentas para registro no MCP
export const ftthTools = [
  // ONUs
  {
    name: 'sgp_listar_onus',
    description: 'Lista ONUs (equipamentos do cliente) cadastradas no SGP. Pode filtrar por OLT, status ou cliente.',
    inputSchema: {
      type: 'object',
      properties: {
        olt_id: { type: 'number', description: 'ID da OLT para filtrar' },
        status: {
          type: 'string',
          enum: ['online', 'offline', 'provisionada', 'desprovisionada', 'todas'],
          description: 'Status da ONU'
        },
        cliente_id: { type: 'number', description: 'ID do cliente' },
        page: { type: 'number' },
        per_page: { type: 'number' }
      }
    },
    handler: listarONUs
  },
  {
    name: 'sgp_detalhes_onu',
    description: 'Retorna detalhes de uma ONU específica, incluindo sinal óptico, VLAN, perfil e cliente vinculado.',
    inputSchema: {
      type: 'object',
      properties: {
        onu_id: { type: 'number', description: 'ID da ONU' }
      },
      required: ['onu_id']
    },
    handler: detalhesONU
  },
  {
    name: 'sgp_provisionar_onu',
    description: 'Provisiona uma ONU na OLT. Configura a ONU para funcionar na rede do provedor.',
    inputSchema: {
      type: 'object',
      properties: {
        onu_id: { type: 'number', description: 'ID da ONU' },
        serial: { type: 'string', description: 'Serial da ONU' },
        vlan: { type: 'number', description: 'VLAN para provisionamento' },
        perfil: { type: 'string', description: 'Perfil de velocidade' }
      },
      required: ['onu_id']
    },
    handler: provisionarONU
  },
  {
    name: 'sgp_desprovisionar_onu',
    description: 'Remove o provisionamento de uma ONU da OLT.',
    inputSchema: {
      type: 'object',
      properties: {
        onu_id: { type: 'number', description: 'ID da ONU' }
      },
      required: ['onu_id']
    },
    handler: desprovisionarONU
  },
  {
    name: 'sgp_reiniciar_onu',
    description: 'Reinicia uma ONU remotamente. Útil para resolver problemas de conexão.',
    inputSchema: {
      type: 'object',
      properties: {
        onu_id: { type: 'number', description: 'ID da ONU' }
      },
      required: ['onu_id']
    },
    handler: reiniciarONU
  },
  {
    name: 'sgp_status_onu',
    description: 'Consulta o status atual de uma ONU em tempo real (online/offline, sinal óptico, uptime, etc.).',
    inputSchema: {
      type: 'object',
      properties: {
        onu_id: { type: 'number', description: 'ID da ONU' }
      },
      required: ['onu_id']
    },
    handler: statusONU
  },
  // OLTs
  {
    name: 'sgp_listar_olts',
    description: 'Lista OLTs (equipamentos concentradores) cadastradas no SGP.',
    inputSchema: {
      type: 'object',
      properties: {
        status: {
          type: 'string',
          enum: ['online', 'offline', 'todas'],
          description: 'Status da OLT'
        },
        page: { type: 'number' },
        per_page: { type: 'number' }
      }
    },
    handler: listarOLTs
  },
  {
    name: 'sgp_detalhes_olt',
    description: 'Retorna detalhes de uma OLT específica, incluindo PONs, ocupação e informações de rede.',
    inputSchema: {
      type: 'object',
      properties: {
        olt_id: { type: 'number', description: 'ID da OLT' }
      },
      required: ['olt_id']
    },
    handler: detalhesOLT
  },
  // Caixas
  {
    name: 'sgp_listar_caixas',
    description: 'Lista caixas de atendimento (CTO/CEO) cadastradas no SGP.',
    inputSchema: {
      type: 'object',
      properties: {
        tipo: {
          type: 'string',
          enum: ['cto', 'ceo', 'todas'],
          description: 'Tipo de caixa'
        },
        page: { type: 'number' },
        per_page: { type: 'number' }
      }
    },
    handler: listarCaixas
  },
  {
    name: 'sgp_detalhes_caixa',
    description: 'Retorna detalhes de uma caixa de atendimento, incluindo localização, splitters e portas disponíveis.',
    inputSchema: {
      type: 'object',
      properties: {
        caixa_id: { type: 'number', description: 'ID da caixa' }
      },
      required: ['caixa_id']
    },
    handler: detalhesCaixa
  },
  // Splitters
  {
    name: 'sgp_listar_splitters',
    description: 'Lista splitters (divisores ópticos) cadastrados no SGP.',
    inputSchema: {
      type: 'object',
      properties: {
        caixa_id: { type: 'number', description: 'ID da caixa para filtrar' },
        page: { type: 'number' },
        per_page: { type: 'number' }
      }
    },
    handler: listarSplitters
  },
  {
    name: 'sgp_detalhes_splitter',
    description: 'Retorna detalhes de um splitter, incluindo portas ocupadas e disponíveis.',
    inputSchema: {
      type: 'object',
      properties: {
        splitter_id: { type: 'number', description: 'ID do splitter' }
      },
      required: ['splitter_id']
    },
    handler: detalhesSplitter
  }
];
