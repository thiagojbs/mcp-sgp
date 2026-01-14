/**
 * Ferramentas MCP para gestão de FTTH (Fiber to the Home)
 * Gerenciamento completo de ONUs, OLTs, Caixas e Splitters
 */

import { SGPClient } from '../sgp-client';

// === ONUs - CRUD Completo ===
export async function listarONUs(client: SGPClient, params: { olt_id?: number; status?: string; cliente_id?: number; page?: number; per_page?: number }) {
  const queryParams: Record<string, string | number | undefined> = {
    page: params.page || 1,
    per_page: params.per_page || 20
  };
  if (params.olt_id) queryParams.olt_id = params.olt_id;
  if (params.status && params.status !== 'todas') queryParams.status = params.status;
  if (params.cliente_id) queryParams.cliente_id = params.cliente_id;
  return client.get('/ftth/onus', queryParams);
}

export async function cadastrarONU(client: SGPClient, params: { serial: string; modelo?: string; olt_id?: number; pon?: number; cliente_id?: number }) {
  return client.post('/ftth/onus', params);
}

export async function detalhesONU(client: SGPClient, params: { onu_id: number }) {
  return client.get(`/ftth/onus/${params.onu_id}`);
}

export async function atualizarONU(client: SGPClient, params: { onu_id: number; serial?: string; modelo?: string; olt_id?: number; pon?: number; cliente_id?: number }) {
  const { onu_id, ...data } = params;
  return client.put(`/ftth/onus/${onu_id}`, data);
}

export async function excluirONU(client: SGPClient, params: { onu_id: number }) {
  return client.delete(`/ftth/onus/${params.onu_id}`);
}

export async function provisionarONU(client: SGPClient, params: { onu_id: number; serial?: string; vlan?: number; perfil?: string }) {
  return client.post(`/ftth/onus/${params.onu_id}/provisionar`, {
    serial: params.serial,
    vlan: params.vlan,
    perfil: params.perfil
  });
}

export async function desprovisionarONU(client: SGPClient, params: { onu_id: number }) {
  return client.post(`/ftth/onus/${params.onu_id}/desprovisionar`);
}

export async function reiniciarONU(client: SGPClient, params: { onu_id: number }) {
  return client.post(`/ftth/onus/${params.onu_id}/reiniciar`);
}

export async function statusONU(client: SGPClient, params: { onu_id: number }) {
  return client.get(`/ftth/onus/${params.onu_id}/status`);
}

// === OLTs - CRUD Completo ===
export async function listarOLTs(client: SGPClient, params: { status?: string; page?: number; per_page?: number }) {
  const queryParams: Record<string, string | number | undefined> = {
    page: params.page || 1,
    per_page: params.per_page || 20
  };
  if (params.status && params.status !== 'todas') queryParams.status = params.status;
  return client.get('/ftth/olts', queryParams);
}

export async function cadastrarOLT(client: SGPClient, params: { nome: string; ip: string; fabricante?: string; modelo?: string; porta_ssh?: number; usuario?: string; senha?: string }) {
  return client.post('/ftth/olts', params);
}

export async function detalhesOLT(client: SGPClient, params: { olt_id: number }) {
  return client.get(`/ftth/olts/${params.olt_id}`);
}

export async function atualizarOLT(client: SGPClient, params: { olt_id: number; nome?: string; ip?: string; fabricante?: string; modelo?: string; porta_ssh?: number; usuario?: string; senha?: string }) {
  const { olt_id, ...data } = params;
  return client.put(`/ftth/olts/${olt_id}`, data);
}

export async function excluirOLT(client: SGPClient, params: { olt_id: number }) {
  return client.delete(`/ftth/olts/${params.olt_id}`);
}

// === Caixas - CRUD Completo ===
export async function listarCaixas(client: SGPClient, params: { tipo?: string; page?: number; per_page?: number }) {
  const queryParams: Record<string, string | number | undefined> = {
    page: params.page || 1,
    per_page: params.per_page || 20
  };
  if (params.tipo && params.tipo !== 'todas') queryParams.tipo = params.tipo;
  return client.get('/ftth/caixas', queryParams);
}

export async function cadastrarCaixa(client: SGPClient, params: { nome: string; tipo: string; latitude?: number; longitude?: number; endereco?: string; capacidade?: number }) {
  return client.post('/ftth/caixas', params);
}

export async function detalhesCaixa(client: SGPClient, params: { caixa_id: number }) {
  return client.get(`/ftth/caixas/${params.caixa_id}`);
}

export async function atualizarCaixa(client: SGPClient, params: { caixa_id: number; nome?: string; tipo?: string; latitude?: number; longitude?: number; endereco?: string; capacidade?: number }) {
  const { caixa_id, ...data } = params;
  return client.put(`/ftth/caixas/${caixa_id}`, data);
}

export async function excluirCaixa(client: SGPClient, params: { caixa_id: number }) {
  return client.delete(`/ftth/caixas/${params.caixa_id}`);
}

// === Splitters - CRUD Completo ===
export async function listarSplitters(client: SGPClient, params: { caixa_id?: number; page?: number; per_page?: number }) {
  const queryParams: Record<string, string | number | undefined> = {
    page: params.page || 1,
    per_page: params.per_page || 20
  };
  if (params.caixa_id) queryParams.caixa_id = params.caixa_id;
  return client.get('/ftth/splitters', queryParams);
}

export async function cadastrarSplitter(client: SGPClient, params: { caixa_id: number; tipo: string; portas: number; porta_entrada?: number }) {
  return client.post('/ftth/splitters', params);
}

export async function detalhesSplitter(client: SGPClient, params: { splitter_id: number }) {
  return client.get(`/ftth/splitters/${params.splitter_id}`);
}

export async function atualizarSplitter(client: SGPClient, params: { splitter_id: number; tipo?: string; portas?: number; porta_entrada?: number }) {
  const { splitter_id, ...data } = params;
  return client.put(`/ftth/splitters/${splitter_id}`, data);
}

export async function excluirSplitter(client: SGPClient, params: { splitter_id: number }) {
  return client.delete(`/ftth/splitters/${params.splitter_id}`);
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
        status: { type: 'string', enum: ['online', 'offline', 'provisionada', 'desprovisionada', 'todas'], description: 'Status da ONU' },
        cliente_id: { type: 'number', description: 'ID do cliente' },
        page: { type: 'number' },
        per_page: { type: 'number' }
      }
    },
    handler: listarONUs
  },
  {
    name: 'sgp_cadastrar_onu',
    description: 'Cadastra uma nova ONU no SGP.',
    inputSchema: {
      type: 'object',
      properties: {
        serial: { type: 'string', description: 'Serial da ONU' },
        modelo: { type: 'string', description: 'Modelo da ONU' },
        olt_id: { type: 'number', description: 'ID da OLT' },
        pon: { type: 'number', description: 'Porta PON' },
        cliente_id: { type: 'number', description: 'ID do cliente' }
      },
      required: ['serial']
    },
    handler: cadastrarONU
  },
  {
    name: 'sgp_detalhes_onu',
    description: 'Retorna detalhes de uma ONU específica.',
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
    name: 'sgp_atualizar_onu',
    description: 'Atualiza dados de uma ONU.',
    inputSchema: {
      type: 'object',
      properties: {
        onu_id: { type: 'number', description: 'ID da ONU' },
        serial: { type: 'string', description: 'Serial da ONU' },
        modelo: { type: 'string', description: 'Modelo da ONU' },
        olt_id: { type: 'number', description: 'ID da OLT' },
        pon: { type: 'number', description: 'Porta PON' },
        cliente_id: { type: 'number', description: 'ID do cliente' }
      },
      required: ['onu_id']
    },
    handler: atualizarONU
  },
  {
    name: 'sgp_excluir_onu',
    description: 'Exclui uma ONU do SGP.',
    inputSchema: {
      type: 'object',
      properties: {
        onu_id: { type: 'number', description: 'ID da ONU' }
      },
      required: ['onu_id']
    },
    handler: excluirONU
  },
  {
    name: 'sgp_provisionar_onu',
    description: 'Provisiona uma ONU na OLT.',
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
    description: 'Remove o provisionamento de uma ONU.',
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
    description: 'Reinicia uma ONU remotamente.',
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
    description: 'Consulta o status atual de uma ONU em tempo real.',
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
    description: 'Lista OLTs (equipamentos concentradores) cadastradas.',
    inputSchema: {
      type: 'object',
      properties: {
        status: { type: 'string', enum: ['online', 'offline', 'todas'], description: 'Status da OLT' },
        page: { type: 'number' },
        per_page: { type: 'number' }
      }
    },
    handler: listarOLTs
  },
  {
    name: 'sgp_cadastrar_olt',
    description: 'Cadastra uma nova OLT.',
    inputSchema: {
      type: 'object',
      properties: {
        nome: { type: 'string', description: 'Nome da OLT' },
        ip: { type: 'string', description: 'Endereço IP' },
        fabricante: { type: 'string', description: 'Fabricante' },
        modelo: { type: 'string', description: 'Modelo' },
        porta_ssh: { type: 'number', description: 'Porta SSH' },
        usuario: { type: 'string', description: 'Usuário de acesso' },
        senha: { type: 'string', description: 'Senha de acesso' }
      },
      required: ['nome', 'ip']
    },
    handler: cadastrarOLT
  },
  {
    name: 'sgp_detalhes_olt',
    description: 'Retorna detalhes de uma OLT específica.',
    inputSchema: {
      type: 'object',
      properties: {
        olt_id: { type: 'number', description: 'ID da OLT' }
      },
      required: ['olt_id']
    },
    handler: detalhesOLT
  },
  {
    name: 'sgp_atualizar_olt',
    description: 'Atualiza dados de uma OLT.',
    inputSchema: {
      type: 'object',
      properties: {
        olt_id: { type: 'number', description: 'ID da OLT' },
        nome: { type: 'string', description: 'Nome da OLT' },
        ip: { type: 'string', description: 'Endereço IP' },
        fabricante: { type: 'string', description: 'Fabricante' },
        modelo: { type: 'string', description: 'Modelo' },
        porta_ssh: { type: 'number', description: 'Porta SSH' },
        usuario: { type: 'string', description: 'Usuário de acesso' },
        senha: { type: 'string', description: 'Senha de acesso' }
      },
      required: ['olt_id']
    },
    handler: atualizarOLT
  },
  {
    name: 'sgp_excluir_olt',
    description: 'Exclui uma OLT do SGP.',
    inputSchema: {
      type: 'object',
      properties: {
        olt_id: { type: 'number', description: 'ID da OLT' }
      },
      required: ['olt_id']
    },
    handler: excluirOLT
  },
  // Caixas
  {
    name: 'sgp_listar_caixas',
    description: 'Lista caixas de atendimento (CTO/CEO) cadastradas.',
    inputSchema: {
      type: 'object',
      properties: {
        tipo: { type: 'string', enum: ['cto', 'ceo', 'todas'], description: 'Tipo de caixa' },
        page: { type: 'number' },
        per_page: { type: 'number' }
      }
    },
    handler: listarCaixas
  },
  {
    name: 'sgp_cadastrar_caixa',
    description: 'Cadastra uma nova caixa de atendimento.',
    inputSchema: {
      type: 'object',
      properties: {
        nome: { type: 'string', description: 'Nome/código da caixa' },
        tipo: { type: 'string', description: 'Tipo (CTO ou CEO)' },
        latitude: { type: 'number', description: 'Latitude' },
        longitude: { type: 'number', description: 'Longitude' },
        endereco: { type: 'string', description: 'Endereço' },
        capacidade: { type: 'number', description: 'Capacidade de portas' }
      },
      required: ['nome', 'tipo']
    },
    handler: cadastrarCaixa
  },
  {
    name: 'sgp_detalhes_caixa',
    description: 'Retorna detalhes de uma caixa de atendimento.',
    inputSchema: {
      type: 'object',
      properties: {
        caixa_id: { type: 'number', description: 'ID da caixa' }
      },
      required: ['caixa_id']
    },
    handler: detalhesCaixa
  },
  {
    name: 'sgp_atualizar_caixa',
    description: 'Atualiza dados de uma caixa de atendimento.',
    inputSchema: {
      type: 'object',
      properties: {
        caixa_id: { type: 'number', description: 'ID da caixa' },
        nome: { type: 'string', description: 'Nome/código' },
        tipo: { type: 'string', description: 'Tipo' },
        latitude: { type: 'number', description: 'Latitude' },
        longitude: { type: 'number', description: 'Longitude' },
        endereco: { type: 'string', description: 'Endereço' },
        capacidade: { type: 'number', description: 'Capacidade' }
      },
      required: ['caixa_id']
    },
    handler: atualizarCaixa
  },
  {
    name: 'sgp_excluir_caixa',
    description: 'Exclui uma caixa de atendimento.',
    inputSchema: {
      type: 'object',
      properties: {
        caixa_id: { type: 'number', description: 'ID da caixa' }
      },
      required: ['caixa_id']
    },
    handler: excluirCaixa
  },
  // Splitters
  {
    name: 'sgp_listar_splitters',
    description: 'Lista splitters (divisores ópticos) cadastrados.',
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
    name: 'sgp_cadastrar_splitter',
    description: 'Cadastra um novo splitter.',
    inputSchema: {
      type: 'object',
      properties: {
        caixa_id: { type: 'number', description: 'ID da caixa onde está o splitter' },
        tipo: { type: 'string', description: 'Tipo do splitter (1x8, 1x16, etc)' },
        portas: { type: 'number', description: 'Número de portas' },
        porta_entrada: { type: 'number', description: 'Porta de entrada' }
      },
      required: ['caixa_id', 'tipo', 'portas']
    },
    handler: cadastrarSplitter
  },
  {
    name: 'sgp_detalhes_splitter',
    description: 'Retorna detalhes de um splitter.',
    inputSchema: {
      type: 'object',
      properties: {
        splitter_id: { type: 'number', description: 'ID do splitter' }
      },
      required: ['splitter_id']
    },
    handler: detalhesSplitter
  },
  {
    name: 'sgp_atualizar_splitter',
    description: 'Atualiza dados de um splitter.',
    inputSchema: {
      type: 'object',
      properties: {
        splitter_id: { type: 'number', description: 'ID do splitter' },
        tipo: { type: 'string', description: 'Tipo' },
        portas: { type: 'number', description: 'Número de portas' },
        porta_entrada: { type: 'number', description: 'Porta de entrada' }
      },
      required: ['splitter_id']
    },
    handler: atualizarSplitter
  },
  {
    name: 'sgp_excluir_splitter',
    description: 'Exclui um splitter.',
    inputSchema: {
      type: 'object',
      properties: {
        splitter_id: { type: 'number', description: 'ID do splitter' }
      },
      required: ['splitter_id']
    },
    handler: excluirSplitter
  }
];
