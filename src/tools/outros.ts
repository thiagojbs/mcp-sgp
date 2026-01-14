/**
 * Ferramentas MCP para funcionalidades diversas
 * Cidades, Estados, CEP, Logs, Notificações, Configurações e Relatórios
 */

import { SGPClient } from '../sgp-client';

// === Localização ===
export async function listarCidades(client: SGPClient, params: { estado_id?: number; nome?: string; page?: number; per_page?: number }) {
  const queryParams: Record<string, string | number | undefined> = {
    page: params.page || 1,
    per_page: params.per_page || 50
  };
  if (params.estado_id) queryParams.estado_id = params.estado_id;
  if (params.nome) queryParams.nome = params.nome;
  return client.get('/cidades', queryParams);
}

export async function listarEstados(client: SGPClient, _params: Record<string, unknown>) {
  return client.get('/estados');
}

export async function consultarCEP(client: SGPClient, params: { cep: string }) {
  return client.get(`/cep/${params.cep}`);
}

// === Logs ===
export async function listarLogs(client: SGPClient, params: { usuario_id?: number; acao?: string; modulo?: string; data_inicio?: string; data_fim?: string; page?: number; per_page?: number }) {
  const queryParams: Record<string, string | number | undefined> = {
    page: params.page || 1,
    per_page: params.per_page || 50
  };
  if (params.usuario_id) queryParams.usuario_id = params.usuario_id;
  if (params.acao) queryParams.acao = params.acao;
  if (params.modulo) queryParams.modulo = params.modulo;
  if (params.data_inicio) queryParams.data_inicio = params.data_inicio;
  if (params.data_fim) queryParams.data_fim = params.data_fim;
  return client.get('/logs', queryParams);
}

// === Notificações ===
export async function listarNotificacoes(client: SGPClient, params: { lidas?: boolean; page?: number; per_page?: number }) {
  const queryParams: Record<string, string | number | undefined> = {
    page: params.page || 1,
    per_page: params.per_page || 20
  };
  if (params.lidas !== undefined) queryParams.lidas = params.lidas ? 1 : 0;
  return client.get('/notificacoes', queryParams);
}

export async function marcarNotificacaoLida(client: SGPClient, params: { notificacao_id: number }) {
  return client.put(`/notificacoes/${params.notificacao_id}/ler`, {});
}

export async function marcarTodasNotificacoesLidas(client: SGPClient, _params: Record<string, unknown>) {
  return client.put('/notificacoes/ler-todas', {});
}

// === Configurações ===
export async function listarConfiguracoes(client: SGPClient, params: { grupo?: string; page?: number; per_page?: number }) {
  const queryParams: Record<string, string | number | undefined> = {
    page: params.page || 1,
    per_page: params.per_page || 100
  };
  if (params.grupo) queryParams.grupo = params.grupo;
  return client.get('/configuracoes', queryParams);
}

export async function obterConfiguracao(client: SGPClient, params: { chave: string }) {
  return client.get(`/configuracoes/${params.chave}`);
}

export async function atualizarConfiguracao(client: SGPClient, params: { chave: string; valor: string | number | boolean }) {
  return client.put(`/configuracoes/${params.chave}`, { valor: params.valor });
}

// === Relatórios ===
export async function listarRelatorios(client: SGPClient, params: { categoria?: string; page?: number; per_page?: number }) {
  const queryParams: Record<string, string | number | undefined> = {
    page: params.page || 1,
    per_page: params.per_page || 50
  };
  if (params.categoria) queryParams.categoria = params.categoria;
  return client.get('/relatorios', queryParams);
}

export async function gerarRelatorio(client: SGPClient, params: { relatorio_id: number; parametros?: Record<string, unknown>; formato?: string }) {
  return client.post(`/relatorios/${params.relatorio_id}`, {
    parametros: params.parametros,
    formato: params.formato || 'pdf'
  });
}

// Definições das ferramentas
export const outrosTools = [
  // Localização
  {
    name: 'sgp_listar_cidades',
    description: 'Lista cidades cadastradas no SGP. Pode filtrar por estado.',
    inputSchema: {
      type: 'object',
      properties: {
        estado_id: { type: 'number', description: 'ID do estado para filtrar' },
        nome: { type: 'string', description: 'Nome da cidade para busca' },
        page: { type: 'number' },
        per_page: { type: 'number' }
      }
    },
    handler: listarCidades
  },
  {
    name: 'sgp_listar_estados',
    description: 'Lista todos os estados cadastrados no SGP.',
    inputSchema: {
      type: 'object',
      properties: {}
    },
    handler: listarEstados
  },
  {
    name: 'sgp_consultar_cep',
    description: 'Consulta informações de endereço por CEP.',
    inputSchema: {
      type: 'object',
      properties: {
        cep: { type: 'string', description: 'CEP a consultar (apenas números)' }
      },
      required: ['cep']
    },
    handler: consultarCEP
  },
  // Logs
  {
    name: 'sgp_listar_logs',
    description: 'Lista logs de atividades do sistema. Útil para auditoria.',
    inputSchema: {
      type: 'object',
      properties: {
        usuario_id: { type: 'number', description: 'ID do usuário para filtrar' },
        acao: { type: 'string', description: 'Tipo de ação (criar, atualizar, excluir)' },
        modulo: { type: 'string', description: 'Módulo do sistema' },
        data_inicio: { type: 'string', description: 'Data inicial (YYYY-MM-DD)' },
        data_fim: { type: 'string', description: 'Data final (YYYY-MM-DD)' },
        page: { type: 'number' },
        per_page: { type: 'number' }
      }
    },
    handler: listarLogs
  },
  // Notificações
  {
    name: 'sgp_listar_notificacoes',
    description: 'Lista notificações do usuário.',
    inputSchema: {
      type: 'object',
      properties: {
        lidas: { type: 'boolean', description: 'Filtrar por lidas/não lidas' },
        page: { type: 'number' },
        per_page: { type: 'number' }
      }
    },
    handler: listarNotificacoes
  },
  {
    name: 'sgp_marcar_notificacao_lida',
    description: 'Marca uma notificação como lida.',
    inputSchema: {
      type: 'object',
      properties: {
        notificacao_id: { type: 'number', description: 'ID da notificação' }
      },
      required: ['notificacao_id']
    },
    handler: marcarNotificacaoLida
  },
  {
    name: 'sgp_marcar_todas_notificacoes_lidas',
    description: 'Marca todas as notificações como lidas.',
    inputSchema: {
      type: 'object',
      properties: {}
    },
    handler: marcarTodasNotificacoesLidas
  },
  // Configurações
  {
    name: 'sgp_listar_configuracoes',
    description: 'Lista configurações do sistema.',
    inputSchema: {
      type: 'object',
      properties: {
        grupo: { type: 'string', description: 'Grupo de configurações para filtrar' },
        page: { type: 'number' },
        per_page: { type: 'number' }
      }
    },
    handler: listarConfiguracoes
  },
  {
    name: 'sgp_obter_configuracao',
    description: 'Obtém o valor de uma configuração específica.',
    inputSchema: {
      type: 'object',
      properties: {
        chave: { type: 'string', description: 'Chave da configuração' }
      },
      required: ['chave']
    },
    handler: obterConfiguracao
  },
  {
    name: 'sgp_atualizar_configuracao',
    description: 'Atualiza o valor de uma configuração.',
    inputSchema: {
      type: 'object',
      properties: {
        chave: { type: 'string', description: 'Chave da configuração' },
        valor: { type: 'string', description: 'Novo valor' }
      },
      required: ['chave', 'valor']
    },
    handler: atualizarConfiguracao
  },
  // Relatórios
  {
    name: 'sgp_listar_relatorios',
    description: 'Lista relatórios disponíveis no SGP.',
    inputSchema: {
      type: 'object',
      properties: {
        categoria: { type: 'string', description: 'Categoria de relatórios' },
        page: { type: 'number' },
        per_page: { type: 'number' }
      }
    },
    handler: listarRelatorios
  },
  {
    name: 'sgp_gerar_relatorio',
    description: 'Gera um relatório com os parâmetros especificados.',
    inputSchema: {
      type: 'object',
      properties: {
        relatorio_id: { type: 'number', description: 'ID do relatório' },
        parametros: { type: 'object', description: 'Parâmetros do relatório' },
        formato: { type: 'string', description: 'Formato de saída (pdf, xlsx, csv)' }
      },
      required: ['relatorio_id']
    },
    handler: gerarRelatorio
  }
];
