/**
 * Ferramentas MCP para Termos de Aceite
 * Gestão de termos, versões e aceites de clientes
 */

import { SGPClient } from '../sgp-client';

// === Termos ===
export async function listarTermos(client: SGPClient, params: { ativo?: boolean; page?: number; per_page?: number }) {
  const queryParams: Record<string, string | number | undefined> = {
    page: params.page || 1,
    per_page: params.per_page || 20
  };
  if (params.ativo !== undefined) queryParams.ativo = params.ativo ? 1 : 0;
  return client.get('/termos', queryParams);
}

export async function cadastrarTermo(client: SGPClient, params: { titulo: string; descricao: string; conteudo: string; obrigatorio?: boolean }) {
  return client.post('/termos', params);
}

export async function detalhesTermo(client: SGPClient, params: { termo_id: number }) {
  return client.get(`/termos/${params.termo_id}`);
}

export async function atualizarTermo(client: SGPClient, params: { termo_id: number; titulo?: string; descricao?: string; ativo?: boolean }) {
  return client.put(`/termos/${params.termo_id}`, params);
}

export async function excluirTermo(client: SGPClient, params: { termo_id: number }) {
  return client.delete(`/termos/${params.termo_id}`);
}

// === Versões ===
export async function listarVersoesTermo(client: SGPClient, params: { termo_id: number; page?: number; per_page?: number }) {
  return client.get(`/termos/${params.termo_id}/versoes`, {
    page: params.page || 1,
    per_page: params.per_page || 20
  });
}

export async function cadastrarVersaoTermo(client: SGPClient, params: { termo_id: number; conteudo: string; versao: string; changelog?: string }) {
  return client.post(`/termos/${params.termo_id}/versoes`, {
    conteudo: params.conteudo,
    versao: params.versao,
    changelog: params.changelog
  });
}

export async function detalhesVersaoTermo(client: SGPClient, params: { termo_id: number; versao_id: number }) {
  return client.get(`/termos/${params.termo_id}/versoes/${params.versao_id}`);
}

export async function atualizarVersaoTermo(client: SGPClient, params: { termo_id: number; versao_id: number; conteudo?: string; ativa?: boolean }) {
  return client.put(`/termos/${params.termo_id}/versoes/${params.versao_id}`, {
    conteudo: params.conteudo,
    ativa: params.ativa
  });
}

export async function excluirVersaoTermo(client: SGPClient, params: { termo_id: number; versao_id: number }) {
  return client.delete(`/termos/${params.termo_id}/versoes/${params.versao_id}`);
}

// === Aceites ===
export async function listarAceitesTermo(client: SGPClient, params: { termo_id: number; cliente_id?: number; page?: number; per_page?: number }) {
  const queryParams: Record<string, string | number | undefined> = {
    page: params.page || 1,
    per_page: params.per_page || 20
  };
  if (params.cliente_id) queryParams.cliente_id = params.cliente_id;
  return client.get(`/termos/${params.termo_id}/aceites`, queryParams);
}

export async function registrarAceiteTermo(client: SGPClient, params: { termo_id: number; cliente_id: number; versao_id?: number; ip?: string; user_agent?: string }) {
  return client.post(`/termos/${params.termo_id}/aceites`, {
    cliente_id: params.cliente_id,
    versao_id: params.versao_id,
    ip: params.ip,
    user_agent: params.user_agent
  });
}

export async function detalhesAceiteTermo(client: SGPClient, params: { termo_id: number; aceite_id: number }) {
  return client.get(`/termos/${params.termo_id}/aceites/${params.aceite_id}`);
}

export async function cancelarAceiteTermo(client: SGPClient, params: { termo_id: number; aceite_id: number; motivo?: string }) {
  return client.post(`/termos/${params.termo_id}/aceites/${params.aceite_id}/cancelar`, {
    motivo: params.motivo
  });
}

export async function verificarAceite(client: SGPClient, params: { termo_id: number; cliente_id: number }) {
  return client.post('/termos/verificar-aceite', {
    termo_id: params.termo_id,
    cliente_id: params.cliente_id
  });
}

// Definições das ferramentas
export const termosTools = [
  // Termos
  {
    name: 'sgp_listar_termos',
    description: 'Lista termos de aceite cadastrados no SGP.',
    inputSchema: {
      type: 'object',
      properties: {
        ativo: { type: 'boolean', description: 'Filtrar por termos ativos' },
        page: { type: 'number' },
        per_page: { type: 'number' }
      }
    },
    handler: listarTermos
  },
  {
    name: 'sgp_cadastrar_termo',
    description: 'Cadastra um novo termo de aceite.',
    inputSchema: {
      type: 'object',
      properties: {
        titulo: { type: 'string', description: 'Título do termo' },
        descricao: { type: 'string', description: 'Descrição breve' },
        conteudo: { type: 'string', description: 'Conteúdo completo do termo' },
        obrigatorio: { type: 'boolean', description: 'Se é obrigatório aceitar' }
      },
      required: ['titulo', 'descricao', 'conteudo']
    },
    handler: cadastrarTermo
  },
  {
    name: 'sgp_detalhes_termo',
    description: 'Retorna detalhes de um termo de aceite específico.',
    inputSchema: {
      type: 'object',
      properties: {
        termo_id: { type: 'number', description: 'ID do termo' }
      },
      required: ['termo_id']
    },
    handler: detalhesTermo
  },
  {
    name: 'sgp_atualizar_termo',
    description: 'Atualiza dados de um termo de aceite.',
    inputSchema: {
      type: 'object',
      properties: {
        termo_id: { type: 'number', description: 'ID do termo' },
        titulo: { type: 'string', description: 'Título do termo' },
        descricao: { type: 'string', description: 'Descrição breve' },
        ativo: { type: 'boolean', description: 'Se o termo está ativo' }
      },
      required: ['termo_id']
    },
    handler: atualizarTermo
  },
  {
    name: 'sgp_excluir_termo',
    description: 'Exclui um termo de aceite.',
    inputSchema: {
      type: 'object',
      properties: {
        termo_id: { type: 'number', description: 'ID do termo' }
      },
      required: ['termo_id']
    },
    handler: excluirTermo
  },
  // Versões
  {
    name: 'sgp_listar_versoes_termo',
    description: 'Lista versões de um termo de aceite.',
    inputSchema: {
      type: 'object',
      properties: {
        termo_id: { type: 'number', description: 'ID do termo' },
        page: { type: 'number' },
        per_page: { type: 'number' }
      },
      required: ['termo_id']
    },
    handler: listarVersoesTermo
  },
  {
    name: 'sgp_cadastrar_versao_termo',
    description: 'Cadastra uma nova versão de um termo de aceite.',
    inputSchema: {
      type: 'object',
      properties: {
        termo_id: { type: 'number', description: 'ID do termo' },
        conteudo: { type: 'string', description: 'Conteúdo da versão' },
        versao: { type: 'string', description: 'Número da versão (ex: 1.0, 2.0)' },
        changelog: { type: 'string', description: 'Descrição das mudanças' }
      },
      required: ['termo_id', 'conteudo', 'versao']
    },
    handler: cadastrarVersaoTermo
  },
  {
    name: 'sgp_detalhes_versao_termo',
    description: 'Retorna detalhes de uma versão específica de um termo.',
    inputSchema: {
      type: 'object',
      properties: {
        termo_id: { type: 'number', description: 'ID do termo' },
        versao_id: { type: 'number', description: 'ID da versão' }
      },
      required: ['termo_id', 'versao_id']
    },
    handler: detalhesVersaoTermo
  },
  {
    name: 'sgp_atualizar_versao_termo',
    description: 'Atualiza uma versão de termo.',
    inputSchema: {
      type: 'object',
      properties: {
        termo_id: { type: 'number', description: 'ID do termo' },
        versao_id: { type: 'number', description: 'ID da versão' },
        conteudo: { type: 'string', description: 'Conteúdo atualizado' },
        ativa: { type: 'boolean', description: 'Se a versão está ativa' }
      },
      required: ['termo_id', 'versao_id']
    },
    handler: atualizarVersaoTermo
  },
  {
    name: 'sgp_excluir_versao_termo',
    description: 'Exclui uma versão de termo.',
    inputSchema: {
      type: 'object',
      properties: {
        termo_id: { type: 'number', description: 'ID do termo' },
        versao_id: { type: 'number', description: 'ID da versão' }
      },
      required: ['termo_id', 'versao_id']
    },
    handler: excluirVersaoTermo
  },
  // Aceites
  {
    name: 'sgp_listar_aceites_termo',
    description: 'Lista aceites registrados para um termo.',
    inputSchema: {
      type: 'object',
      properties: {
        termo_id: { type: 'number', description: 'ID do termo' },
        cliente_id: { type: 'number', description: 'ID do cliente para filtrar' },
        page: { type: 'number' },
        per_page: { type: 'number' }
      },
      required: ['termo_id']
    },
    handler: listarAceitesTermo
  },
  {
    name: 'sgp_registrar_aceite_termo',
    description: 'Registra aceite de um termo por um cliente.',
    inputSchema: {
      type: 'object',
      properties: {
        termo_id: { type: 'number', description: 'ID do termo' },
        cliente_id: { type: 'number', description: 'ID do cliente' },
        versao_id: { type: 'number', description: 'ID da versão aceita' },
        ip: { type: 'string', description: 'IP do cliente' },
        user_agent: { type: 'string', description: 'User agent do navegador' }
      },
      required: ['termo_id', 'cliente_id']
    },
    handler: registrarAceiteTermo
  },
  {
    name: 'sgp_detalhes_aceite_termo',
    description: 'Retorna detalhes de um aceite específico.',
    inputSchema: {
      type: 'object',
      properties: {
        termo_id: { type: 'number', description: 'ID do termo' },
        aceite_id: { type: 'number', description: 'ID do aceite' }
      },
      required: ['termo_id', 'aceite_id']
    },
    handler: detalhesAceiteTermo
  },
  {
    name: 'sgp_cancelar_aceite_termo',
    description: 'Cancela um aceite de termo.',
    inputSchema: {
      type: 'object',
      properties: {
        termo_id: { type: 'number', description: 'ID do termo' },
        aceite_id: { type: 'number', description: 'ID do aceite' },
        motivo: { type: 'string', description: 'Motivo do cancelamento' }
      },
      required: ['termo_id', 'aceite_id']
    },
    handler: cancelarAceiteTermo
  },
  {
    name: 'sgp_verificar_aceite',
    description: 'Verifica se um cliente aceitou um termo específico.',
    inputSchema: {
      type: 'object',
      properties: {
        termo_id: { type: 'number', description: 'ID do termo' },
        cliente_id: { type: 'number', description: 'ID do cliente' }
      },
      required: ['termo_id', 'cliente_id']
    },
    handler: verificarAceite
  }
];
