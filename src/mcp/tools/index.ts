/**
 * Tools do MCP - Ações que podem ser executadas no SGP
 */

import type { SgpClient } from '../../sgp/client';
import type { McpToolResult } from '../../types';

export interface ToolDefinition {
  name: string;
  description: string;
  inputSchema: Record<string, unknown>;
  handler: (args: Record<string, unknown>, sgpClient: SgpClient, env: Env) => Promise<McpToolResult>;
}

/**
 * Tool: Buscar Cliente
 */
const buscarCliente: ToolDefinition = {
  name: 'sgp_buscar_cliente',
  description: 'Busca informações de um cliente no SGP por ID, CPF/CNPJ ou nome',
  inputSchema: {
    type: 'object',
    properties: {
      query: {
        type: 'string',
        description: 'Termo de busca (ID, CPF/CNPJ ou nome do cliente)',
      },
      tipo: {
        type: 'string',
        enum: ['id', 'documento', 'nome'],
        description: 'Tipo de busca a ser realizada',
      },
    },
    required: ['query'],
  },
  handler: async (args, sgpClient) => {
    const { query, tipo } = args as { query: string; tipo?: string };

    try {
      const cliente = await sgpClient.clientes.buscar(query, tipo);
      return {
        content: [{
          type: 'text',
          text: JSON.stringify(cliente, null, 2),
        }],
      };
    } catch (error) {
      return {
        content: [{
          type: 'text',
          text: `Erro ao buscar cliente: ${error instanceof Error ? error.message : 'Erro desconhecido'}`,
        }],
        isError: true,
      };
    }
  },
};

/**
 * Tool: Listar Contratos do Cliente
 */
const listarContratos: ToolDefinition = {
  name: 'sgp_listar_contratos',
  description: 'Lista todos os contratos de um cliente específico',
  inputSchema: {
    type: 'object',
    properties: {
      clienteId: {
        type: 'string',
        description: 'ID do cliente no SGP',
      },
      status: {
        type: 'string',
        enum: ['ativo', 'inativo', 'suspenso', 'todos'],
        description: 'Filtrar por status do contrato',
      },
    },
    required: ['clienteId'],
  },
  handler: async (args, sgpClient) => {
    const { clienteId, status } = args as { clienteId: string; status?: string };

    try {
      const contratos = await sgpClient.contratos.listarPorCliente(clienteId, status);
      return {
        content: [{
          type: 'text',
          text: JSON.stringify(contratos, null, 2),
        }],
      };
    } catch (error) {
      return {
        content: [{
          type: 'text',
          text: `Erro ao listar contratos: ${error instanceof Error ? error.message : 'Erro desconhecido'}`,
        }],
        isError: true,
      };
    }
  },
};

/**
 * Tool: Consultar Faturas
 */
const consultarFaturas: ToolDefinition = {
  name: 'sgp_consultar_faturas',
  description: 'Consulta faturas de um cliente ou contrato',
  inputSchema: {
    type: 'object',
    properties: {
      clienteId: {
        type: 'string',
        description: 'ID do cliente no SGP',
      },
      contratoId: {
        type: 'string',
        description: 'ID do contrato (opcional)',
      },
      status: {
        type: 'string',
        enum: ['aberta', 'paga', 'vencida', 'todas'],
        description: 'Filtrar por status da fatura',
      },
      limite: {
        type: 'number',
        description: 'Número máximo de faturas a retornar',
      },
    },
    required: ['clienteId'],
  },
  handler: async (args, sgpClient) => {
    const { clienteId, contratoId, status, limite } = args as {
      clienteId: string;
      contratoId?: string;
      status?: string;
      limite?: number;
    };

    try {
      const faturas = await sgpClient.faturas.consultar(clienteId, { contratoId, status, limite });
      return {
        content: [{
          type: 'text',
          text: JSON.stringify(faturas, null, 2),
        }],
      };
    } catch (error) {
      return {
        content: [{
          type: 'text',
          text: `Erro ao consultar faturas: ${error instanceof Error ? error.message : 'Erro desconhecido'}`,
        }],
        isError: true,
      };
    }
  },
};

/**
 * Tool: Abrir Chamado de Suporte
 */
const abrirChamado: ToolDefinition = {
  name: 'sgp_abrir_chamado',
  description: 'Abre um novo chamado de suporte técnico para um cliente',
  inputSchema: {
    type: 'object',
    properties: {
      clienteId: {
        type: 'string',
        description: 'ID do cliente no SGP',
      },
      categoria: {
        type: 'string',
        enum: ['conexao', 'lentidao', 'financeiro', 'instalacao', 'outros'],
        description: 'Categoria do chamado',
      },
      titulo: {
        type: 'string',
        description: 'Título resumido do problema',
      },
      descricao: {
        type: 'string',
        description: 'Descrição detalhada do problema',
      },
      prioridade: {
        type: 'string',
        enum: ['baixa', 'media', 'alta', 'urgente'],
        description: 'Prioridade do chamado',
      },
    },
    required: ['clienteId', 'categoria', 'titulo', 'descricao'],
  },
  handler: async (args, sgpClient) => {
    const { clienteId, categoria, titulo, descricao, prioridade } = args as {
      clienteId: string;
      categoria: string;
      titulo: string;
      descricao: string;
      prioridade?: string;
    };

    try {
      const chamado = await sgpClient.chamados.abrir({
        clienteId,
        categoria,
        titulo,
        descricao,
        prioridade: prioridade ?? 'media',
      });
      return {
        content: [{
          type: 'text',
          text: `Chamado aberto com sucesso!\n\n${JSON.stringify(chamado, null, 2)}`,
        }],
      };
    } catch (error) {
      return {
        content: [{
          type: 'text',
          text: `Erro ao abrir chamado: ${error instanceof Error ? error.message : 'Erro desconhecido'}`,
        }],
        isError: true,
      };
    }
  },
};

/**
 * Tool: Verificar Conexão do Cliente
 */
const verificarConexao: ToolDefinition = {
  name: 'sgp_verificar_conexao',
  description: 'Verifica o status da conexão de internet de um cliente',
  inputSchema: {
    type: 'object',
    properties: {
      clienteId: {
        type: 'string',
        description: 'ID do cliente no SGP',
      },
      contratoId: {
        type: 'string',
        description: 'ID do contrato específico (opcional)',
      },
    },
    required: ['clienteId'],
  },
  handler: async (args, sgpClient) => {
    const { clienteId, contratoId } = args as { clienteId: string; contratoId?: string };

    try {
      const status = await sgpClient.conexao.verificar(clienteId, contratoId);
      return {
        content: [{
          type: 'text',
          text: JSON.stringify(status, null, 2),
        }],
      };
    } catch (error) {
      return {
        content: [{
          type: 'text',
          text: `Erro ao verificar conexão: ${error instanceof Error ? error.message : 'Erro desconhecido'}`,
        }],
        isError: true,
      };
    }
  },
};

/**
 * Tool: Gerar Segunda Via de Boleto
 */
const gerarSegundaVia: ToolDefinition = {
  name: 'sgp_gerar_segunda_via',
  description: 'Gera segunda via de boleto para uma fatura',
  inputSchema: {
    type: 'object',
    properties: {
      faturaId: {
        type: 'string',
        description: 'ID da fatura',
      },
      novaDataVencimento: {
        type: 'string',
        description: 'Nova data de vencimento (formato: YYYY-MM-DD)',
      },
    },
    required: ['faturaId'],
  },
  handler: async (args, sgpClient) => {
    const { faturaId, novaDataVencimento } = args as { faturaId: string; novaDataVencimento?: string };

    try {
      const boleto = await sgpClient.faturas.gerarSegundaVia(faturaId, novaDataVencimento);
      return {
        content: [{
          type: 'text',
          text: `Segunda via gerada com sucesso!\n\n${JSON.stringify(boleto, null, 2)}`,
        }],
      };
    } catch (error) {
      return {
        content: [{
          type: 'text',
          text: `Erro ao gerar segunda via: ${error instanceof Error ? error.message : 'Erro desconhecido'}`,
        }],
        isError: true,
      };
    }
  },
};

// Exporta todas as tools
export const tools: ToolDefinition[] = [
  buscarCliente,
  listarContratos,
  consultarFaturas,
  abrirChamado,
  verificarConexao,
  gerarSegundaVia,
];
