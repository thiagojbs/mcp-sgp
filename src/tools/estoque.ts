/**
 * Ferramentas MCP para gestão de Estoque
 * Produtos, Movimentações, Fornecedores e Inventário
 */

import { z } from 'zod';
import { SGPClient } from '../sgp-client';

// Schemas
export const listarProdutosSchema = z.object({
  categoria_id: z.number().optional().describe('ID da categoria'),
  nome: z.string().optional().describe('Nome do produto para busca'),
  codigo: z.string().optional().describe('Código do produto'),
  estoque_minimo: z.boolean().optional().describe('Filtrar produtos abaixo do estoque mínimo'),
  page: z.number().optional().default(1),
  per_page: z.number().optional().default(20)
});

export const detalhesProdutoSchema = z.object({
  produto_id: z.number().describe('ID do produto')
});

export const listarMovimentacoesSchema = z.object({
  produto_id: z.number().optional().describe('ID do produto'),
  tipo: z.enum(['entrada', 'saida', 'todas']).optional().default('todas'),
  data_inicio: z.string().optional().describe('Data inicial (YYYY-MM-DD)'),
  data_fim: z.string().optional().describe('Data final (YYYY-MM-DD)'),
  page: z.number().optional().default(1),
  per_page: z.number().optional().default(20)
});

export const cadastrarMovimentacaoSchema = z.object({
  produto_id: z.number().describe('ID do produto'),
  tipo: z.enum(['entrada', 'saida']).describe('Tipo de movimentação'),
  quantidade: z.number().describe('Quantidade'),
  motivo: z.string().describe('Motivo/descrição da movimentação'),
  fornecedor_id: z.number().optional().describe('ID do fornecedor (para entradas)'),
  ordem_id: z.number().optional().describe('ID da OS relacionada'),
  valor_unitario: z.number().optional().describe('Valor unitário')
});

export const listarFornecedoresSchema = z.object({
  nome: z.string().optional().describe('Nome do fornecedor para busca'),
  page: z.number().optional().default(1),
  per_page: z.number().optional().default(20)
});

export const listarCategoriasEstoqueSchema = z.object({
  page: z.number().optional().default(1),
  per_page: z.number().optional().default(50)
});

export const listarInventariosSchema = z.object({
  status: z.enum(['em_andamento', 'finalizado', 'cancelado', 'todos']).optional().default('todos'),
  page: z.number().optional().default(1),
  per_page: z.number().optional().default(20)
});

export const detalhesInventarioSchema = z.object({
  inventario_id: z.number().describe('ID do inventário')
});

// Funções de ferramentas
export async function listarProdutos(client: SGPClient, params: z.infer<typeof listarProdutosSchema>) {
  const queryParams: Record<string, string | number | undefined> = {
    page: params.page,
    per_page: params.per_page
  };
  if (params.categoria_id) queryParams.categoria_id = params.categoria_id;
  if (params.nome) queryParams.nome = params.nome;
  if (params.codigo) queryParams.codigo = params.codigo;
  if (params.estoque_minimo) queryParams.estoque_minimo = 1;

  return client.get('/estoque/produtos', queryParams);
}

export async function detalhesProduto(client: SGPClient, params: z.infer<typeof detalhesProdutoSchema>) {
  return client.get(`/estoque/produtos/${params.produto_id}`);
}

export async function listarMovimentacoes(client: SGPClient, params: z.infer<typeof listarMovimentacoesSchema>) {
  const queryParams: Record<string, string | number | undefined> = {
    page: params.page,
    per_page: params.per_page
  };
  if (params.produto_id) queryParams.produto_id = params.produto_id;
  if (params.tipo && params.tipo !== 'todas') queryParams.tipo = params.tipo;
  if (params.data_inicio) queryParams.data_inicio = params.data_inicio;
  if (params.data_fim) queryParams.data_fim = params.data_fim;

  return client.get('/estoque/movimentacoes', queryParams);
}

export async function cadastrarMovimentacao(client: SGPClient, params: z.infer<typeof cadastrarMovimentacaoSchema>) {
  return client.post('/estoque/movimentacoes', params);
}

export async function listarFornecedores(client: SGPClient, params: z.infer<typeof listarFornecedoresSchema>) {
  const queryParams: Record<string, string | number | undefined> = {
    page: params.page,
    per_page: params.per_page
  };
  if (params.nome) queryParams.nome = params.nome;

  return client.get('/estoque/fornecedores', queryParams);
}

export async function listarCategoriasEstoque(client: SGPClient, params: z.infer<typeof listarCategoriasEstoqueSchema>) {
  return client.get('/estoque/categorias', {
    page: params.page,
    per_page: params.per_page
  });
}

export async function listarInventarios(client: SGPClient, params: z.infer<typeof listarInventariosSchema>) {
  const queryParams: Record<string, string | number | undefined> = {
    page: params.page,
    per_page: params.per_page
  };
  if (params.status && params.status !== 'todos') queryParams.status = params.status;

  return client.get('/estoque/inventario', queryParams);
}

export async function detalhesInventario(client: SGPClient, params: z.infer<typeof detalhesInventarioSchema>) {
  return client.get(`/estoque/inventario/${params.inventario_id}`);
}

// Definições das ferramentas para registro no MCP
export const estoqueTools = [
  {
    name: 'sgp_listar_produtos',
    description: 'Lista produtos do estoque do SGP. Pode filtrar por categoria, nome, código ou produtos abaixo do estoque mínimo.',
    inputSchema: {
      type: 'object',
      properties: {
        categoria_id: { type: 'number', description: 'ID da categoria' },
        nome: { type: 'string', description: 'Nome do produto para busca' },
        codigo: { type: 'string', description: 'Código do produto' },
        estoque_minimo: { type: 'boolean', description: 'Filtrar produtos abaixo do estoque mínimo' },
        page: { type: 'number' },
        per_page: { type: 'number' }
      }
    },
    handler: listarProdutos
  },
  {
    name: 'sgp_detalhes_produto',
    description: 'Retorna detalhes de um produto do estoque, incluindo quantidade disponível, preço e histórico de movimentações.',
    inputSchema: {
      type: 'object',
      properties: {
        produto_id: { type: 'number', description: 'ID do produto' }
      },
      required: ['produto_id']
    },
    handler: detalhesProduto
  },
  {
    name: 'sgp_listar_movimentacoes',
    description: 'Lista movimentações de estoque (entradas e saídas). Pode filtrar por produto, tipo e período.',
    inputSchema: {
      type: 'object',
      properties: {
        produto_id: { type: 'number', description: 'ID do produto' },
        tipo: {
          type: 'string',
          enum: ['entrada', 'saida', 'todas'],
          description: 'Tipo de movimentação'
        },
        data_inicio: { type: 'string', description: 'Data inicial (YYYY-MM-DD)' },
        data_fim: { type: 'string', description: 'Data final (YYYY-MM-DD)' },
        page: { type: 'number' },
        per_page: { type: 'number' }
      }
    },
    handler: listarMovimentacoes
  },
  {
    name: 'sgp_cadastrar_movimentacao',
    description: 'Registra uma entrada ou saída de produto no estoque.',
    inputSchema: {
      type: 'object',
      properties: {
        produto_id: { type: 'number', description: 'ID do produto' },
        tipo: {
          type: 'string',
          enum: ['entrada', 'saida'],
          description: 'Tipo de movimentação'
        },
        quantidade: { type: 'number', description: 'Quantidade' },
        motivo: { type: 'string', description: 'Motivo/descrição' },
        fornecedor_id: { type: 'number', description: 'ID do fornecedor (para entradas)' },
        ordem_id: { type: 'number', description: 'ID da OS relacionada' },
        valor_unitario: { type: 'number', description: 'Valor unitário' }
      },
      required: ['produto_id', 'tipo', 'quantidade', 'motivo']
    },
    handler: cadastrarMovimentacao
  },
  {
    name: 'sgp_listar_fornecedores',
    description: 'Lista fornecedores cadastrados no SGP.',
    inputSchema: {
      type: 'object',
      properties: {
        nome: { type: 'string', description: 'Nome do fornecedor para busca' },
        page: { type: 'number' },
        per_page: { type: 'number' }
      }
    },
    handler: listarFornecedores
  },
  {
    name: 'sgp_listar_categorias_estoque',
    description: 'Lista categorias de produtos do estoque.',
    inputSchema: {
      type: 'object',
      properties: {
        page: { type: 'number' },
        per_page: { type: 'number' }
      }
    },
    handler: listarCategoriasEstoque
  },
  {
    name: 'sgp_listar_inventarios',
    description: 'Lista inventários de estoque realizados.',
    inputSchema: {
      type: 'object',
      properties: {
        status: {
          type: 'string',
          enum: ['em_andamento', 'finalizado', 'cancelado', 'todos'],
          description: 'Status do inventário'
        },
        page: { type: 'number' },
        per_page: { type: 'number' }
      }
    },
    handler: listarInventarios
  },
  {
    name: 'sgp_detalhes_inventario',
    description: 'Retorna detalhes de um inventário específico, incluindo itens conferidos e divergências.',
    inputSchema: {
      type: 'object',
      properties: {
        inventario_id: { type: 'number', description: 'ID do inventário' }
      },
      required: ['inventario_id']
    },
    handler: detalhesInventario
  }
];
