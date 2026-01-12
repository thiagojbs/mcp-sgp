/**
 * Resources do MCP - Dados expostos do SGP
 */

import type { SgpClient } from '../../sgp/client';
import type { McpContent } from '../../types';

export interface ResourceDefinition {
  uri: string;
  uriTemplate?: string;
  name: string;
  description: string;
  mimeType: string;
  handler: (uri: string, sgpClient: SgpClient, env: Env) => Promise<McpContent[]>;
}

/**
 * Resource: Lista de Planos de Internet
 */
const planosInternet: ResourceDefinition = {
  uri: 'sgp://planos/internet',
  name: 'Planos de Internet',
  description: 'Lista todos os planos de internet disponíveis no provedor',
  mimeType: 'application/json',
  handler: async (_uri, sgpClient) => {
    try {
      const planos = await sgpClient.planos.listar();
      return [{
        type: 'text',
        text: JSON.stringify(planos, null, 2),
      }];
    } catch (error) {
      return [{
        type: 'text',
        text: `Erro ao carregar planos: ${error instanceof Error ? error.message : 'Erro desconhecido'}`,
      }];
    }
  },
};

/**
 * Resource: Detalhes de um Cliente
 */
const clienteDetalhes: ResourceDefinition = {
  uri: 'sgp://cliente/{id}',
  uriTemplate: 'sgp://cliente/',
  name: 'Detalhes do Cliente',
  description: 'Informações detalhadas de um cliente específico',
  mimeType: 'application/json',
  handler: async (uri, sgpClient) => {
    const clienteId = uri.replace('sgp://cliente/', '');

    try {
      const cliente = await sgpClient.clientes.obter(clienteId);
      return [{
        type: 'text',
        text: JSON.stringify(cliente, null, 2),
      }];
    } catch (error) {
      return [{
        type: 'text',
        text: `Erro ao carregar cliente: ${error instanceof Error ? error.message : 'Erro desconhecido'}`,
      }];
    }
  },
};

/**
 * Resource: Dashboard de Métricas
 */
const dashboardMetricas: ResourceDefinition = {
  uri: 'sgp://dashboard/metricas',
  name: 'Dashboard de Métricas',
  description: 'Métricas gerais do provedor (clientes ativos, inadimplência, etc)',
  mimeType: 'application/json',
  handler: async (_uri, sgpClient) => {
    try {
      const metricas = await sgpClient.dashboard.metricas();
      return [{
        type: 'text',
        text: JSON.stringify(metricas, null, 2),
      }];
    } catch (error) {
      return [{
        type: 'text',
        text: `Erro ao carregar métricas: ${error instanceof Error ? error.message : 'Erro desconhecido'}`,
      }];
    }
  },
};

/**
 * Resource: Chamados Abertos
 */
const chamadosAbertos: ResourceDefinition = {
  uri: 'sgp://chamados/abertos',
  name: 'Chamados Abertos',
  description: 'Lista de chamados de suporte em aberto',
  mimeType: 'application/json',
  handler: async (_uri, sgpClient) => {
    try {
      const chamados = await sgpClient.chamados.listarAbertos();
      return [{
        type: 'text',
        text: JSON.stringify(chamados, null, 2),
      }];
    } catch (error) {
      return [{
        type: 'text',
        text: `Erro ao carregar chamados: ${error instanceof Error ? error.message : 'Erro desconhecido'}`,
      }];
    }
  },
};

/**
 * Resource: Faturas Vencidas
 */
const faturasVencidas: ResourceDefinition = {
  uri: 'sgp://faturas/vencidas',
  name: 'Faturas Vencidas',
  description: 'Lista de faturas vencidas (inadimplência)',
  mimeType: 'application/json',
  handler: async (_uri, sgpClient) => {
    try {
      const faturas = await sgpClient.faturas.listarVencidas();
      return [{
        type: 'text',
        text: JSON.stringify(faturas, null, 2),
      }];
    } catch (error) {
      return [{
        type: 'text',
        text: `Erro ao carregar faturas vencidas: ${error instanceof Error ? error.message : 'Erro desconhecido'}`,
      }];
    }
  },
};

/**
 * Resource: Status da Rede
 */
const statusRede: ResourceDefinition = {
  uri: 'sgp://rede/status',
  name: 'Status da Rede',
  description: 'Status geral da rede do provedor (concentradores, OLTs, etc)',
  mimeType: 'application/json',
  handler: async (_uri, sgpClient) => {
    try {
      const status = await sgpClient.rede.status();
      return [{
        type: 'text',
        text: JSON.stringify(status, null, 2),
      }];
    } catch (error) {
      return [{
        type: 'text',
        text: `Erro ao carregar status da rede: ${error instanceof Error ? error.message : 'Erro desconhecido'}`,
      }];
    }
  },
};

// Exporta todos os resources
export const resources: ResourceDefinition[] = [
  planosInternet,
  clienteDetalhes,
  dashboardMetricas,
  chamadosAbertos,
  faturasVencidas,
  statusRede,
];
