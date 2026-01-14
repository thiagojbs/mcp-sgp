/**
 * Ferramentas MCP para gestão de Estoque
 * CRUD completo de Produtos, Movimentações, Fornecedores, Categorias e Inventário
 */

import { SGPClient } from '../sgp-client';

// === Produtos - CRUD Completo ===
export async function listarProdutos(client: SGPClient, params: { categoria_id?: number; nome?: string; codigo?: string; estoque_minimo?: boolean; page?: number; per_page?: number }) {
  const queryParams: Record<string, string | number | undefined> = {
    page: params.page || 1,
    per_page: params.per_page || 20
  };
  if (params.categoria_id) queryParams.categoria_id = params.categoria_id;
  if (params.nome) queryParams.nome = params.nome;
  if (params.codigo) queryParams.codigo = params.codigo;
  if (params.estoque_minimo) queryParams.estoque_minimo = 1;
  return client.get('/estoque/produtos', queryParams);
}

export async function cadastrarProduto(client: SGPClient, params: { nome: string; codigo?: string; categoria_id?: number; unidade?: string; estoque_minimo?: number; valor_custo?: number; valor_venda?: number; descricao?: string }) {
  return client.post('/estoque/produtos', params);
}

export async function detalhesProduto(client: SGPClient, params: { produto_id: number }) {
  return client.get(`/estoque/produtos/${params.produto_id}`);
}

export async function atualizarProduto(client: SGPClient, params: { produto_id: number; nome?: string; codigo?: string; categoria_id?: number; unidade?: string; estoque_minimo?: number; valor_custo?: number; valor_venda?: number; descricao?: string }) {
  const { produto_id, ...data } = params;
  return client.put(`/estoque/produtos/${produto_id}`, data);
}

export async function excluirProduto(client: SGPClient, params: { produto_id: number }) {
  return client.delete(`/estoque/produtos/${params.produto_id}`);
}

// === Movimentações ===
export async function listarMovimentacoes(client: SGPClient, params: { produto_id?: number; tipo?: string; data_inicio?: string; data_fim?: string; page?: number; per_page?: number }) {
  const queryParams: Record<string, string | number | undefined> = {
    page: params.page || 1,
    per_page: params.per_page || 20
  };
  if (params.produto_id) queryParams.produto_id = params.produto_id;
  if (params.tipo && params.tipo !== 'todas') queryParams.tipo = params.tipo;
  if (params.data_inicio) queryParams.data_inicio = params.data_inicio;
  if (params.data_fim) queryParams.data_fim = params.data_fim;
  return client.get('/estoque/movimentacoes', queryParams);
}

export async function cadastrarMovimentacao(client: SGPClient, params: { produto_id: number; tipo: string; quantidade: number; motivo: string; fornecedor_id?: number; ordem_id?: number; valor_unitario?: number }) {
  return client.post('/estoque/movimentacoes', params);
}

export async function detalhesMovimentacao(client: SGPClient, params: { movimentacao_id: number }) {
  return client.get(`/estoque/movimentacoes/${params.movimentacao_id}`);
}

export async function cancelarMovimentacao(client: SGPClient, params: { movimentacao_id: number; motivo?: string }) {
  return client.post(`/estoque/movimentacoes/${params.movimentacao_id}/cancelar`, {
    motivo: params.motivo
  });
}

// === Fornecedores - CRUD Completo ===
export async function listarFornecedores(client: SGPClient, params: { nome?: string; page?: number; per_page?: number }) {
  const queryParams: Record<string, string | number | undefined> = {
    page: params.page || 1,
    per_page: params.per_page || 20
  };
  if (params.nome) queryParams.nome = params.nome;
  return client.get('/estoque/fornecedores', queryParams);
}

export async function cadastrarFornecedor(client: SGPClient, params: { nome: string; cnpj?: string; email?: string; telefone?: string; endereco?: string; contato?: string }) {
  return client.post('/estoque/fornecedores', params);
}

export async function detalhesFornecedor(client: SGPClient, params: { fornecedor_id: number }) {
  return client.get(`/estoque/fornecedores/${params.fornecedor_id}`);
}

export async function atualizarFornecedor(client: SGPClient, params: { fornecedor_id: number; nome?: string; cnpj?: string; email?: string; telefone?: string; endereco?: string; contato?: string }) {
  const { fornecedor_id, ...data } = params;
  return client.put(`/estoque/fornecedores/${fornecedor_id}`, data);
}

export async function excluirFornecedor(client: SGPClient, params: { fornecedor_id: number }) {
  return client.delete(`/estoque/fornecedores/${params.fornecedor_id}`);
}

// === Categorias - CRUD Completo ===
export async function listarCategoriasEstoque(client: SGPClient, params: { page?: number; per_page?: number }) {
  return client.get('/estoque/categorias', {
    page: params.page || 1,
    per_page: params.per_page || 50
  });
}

export async function cadastrarCategoriaEstoque(client: SGPClient, params: { nome: string; descricao?: string }) {
  return client.post('/estoque/categorias', params);
}

export async function detalhesCategoriaEstoque(client: SGPClient, params: { categoria_id: number }) {
  return client.get(`/estoque/categorias/${params.categoria_id}`);
}

export async function atualizarCategoriaEstoque(client: SGPClient, params: { categoria_id: number; nome?: string; descricao?: string }) {
  const { categoria_id, ...data } = params;
  return client.put(`/estoque/categorias/${categoria_id}`, data);
}

export async function excluirCategoriaEstoque(client: SGPClient, params: { categoria_id: number }) {
  return client.delete(`/estoque/categorias/${params.categoria_id}`);
}

// === Inventário ===
export async function iniciarInventario(client: SGPClient, params: { nome?: string; observacao?: string }) {
  return client.post('/estoque/inventario/iniciar', params);
}

export async function listarInventarios(client: SGPClient, params: { status?: string; page?: number; per_page?: number }) {
  const queryParams: Record<string, string | number | undefined> = {
    page: params.page || 1,
    per_page: params.per_page || 20
  };
  if (params.status && params.status !== 'todos') queryParams.status = params.status;
  return client.get('/estoque/inventario', queryParams);
}

export async function detalhesInventario(client: SGPClient, params: { inventario_id: number }) {
  return client.get(`/estoque/inventario/${params.inventario_id}`);
}

export async function finalizarInventario(client: SGPClient, params: { inventario_id: number; ajustar_estoque?: boolean }) {
  return client.post(`/estoque/inventario/${params.inventario_id}/finalizar`, {
    ajustar_estoque: params.ajustar_estoque
  });
}

export async function cancelarInventario(client: SGPClient, params: { inventario_id: number; motivo?: string }) {
  return client.post(`/estoque/inventario/${params.inventario_id}/cancelar`, {
    motivo: params.motivo
  });
}

// Definições das ferramentas para registro no MCP
export const estoqueTools = [
  // Produtos
  {
    name: 'sgp_listar_produtos',
    description: 'Lista produtos do estoque. Pode filtrar por categoria, nome, código ou estoque mínimo.',
    inputSchema: {
      type: 'object',
      properties: {
        categoria_id: { type: 'number', description: 'ID da categoria' },
        nome: { type: 'string', description: 'Nome do produto' },
        codigo: { type: 'string', description: 'Código do produto' },
        estoque_minimo: { type: 'boolean', description: 'Filtrar abaixo do estoque mínimo' },
        page: { type: 'number' },
        per_page: { type: 'number' }
      }
    },
    handler: listarProdutos
  },
  {
    name: 'sgp_cadastrar_produto',
    description: 'Cadastra um novo produto no estoque.',
    inputSchema: {
      type: 'object',
      properties: {
        nome: { type: 'string', description: 'Nome do produto' },
        codigo: { type: 'string', description: 'Código do produto' },
        categoria_id: { type: 'number', description: 'ID da categoria' },
        unidade: { type: 'string', description: 'Unidade de medida' },
        estoque_minimo: { type: 'number', description: 'Estoque mínimo' },
        valor_custo: { type: 'number', description: 'Valor de custo' },
        valor_venda: { type: 'number', description: 'Valor de venda' },
        descricao: { type: 'string', description: 'Descrição' }
      },
      required: ['nome']
    },
    handler: cadastrarProduto
  },
  {
    name: 'sgp_detalhes_produto',
    description: 'Retorna detalhes de um produto.',
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
    name: 'sgp_atualizar_produto',
    description: 'Atualiza dados de um produto.',
    inputSchema: {
      type: 'object',
      properties: {
        produto_id: { type: 'number', description: 'ID do produto' },
        nome: { type: 'string' },
        codigo: { type: 'string' },
        categoria_id: { type: 'number' },
        unidade: { type: 'string' },
        estoque_minimo: { type: 'number' },
        valor_custo: { type: 'number' },
        valor_venda: { type: 'number' },
        descricao: { type: 'string' }
      },
      required: ['produto_id']
    },
    handler: atualizarProduto
  },
  {
    name: 'sgp_excluir_produto',
    description: 'Exclui um produto do estoque.',
    inputSchema: {
      type: 'object',
      properties: {
        produto_id: { type: 'number', description: 'ID do produto' }
      },
      required: ['produto_id']
    },
    handler: excluirProduto
  },
  // Movimentações
  {
    name: 'sgp_listar_movimentacoes',
    description: 'Lista movimentações de estoque.',
    inputSchema: {
      type: 'object',
      properties: {
        produto_id: { type: 'number', description: 'ID do produto' },
        tipo: { type: 'string', enum: ['entrada', 'saida', 'todas'], description: 'Tipo' },
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
    description: 'Registra uma movimentação de estoque.',
    inputSchema: {
      type: 'object',
      properties: {
        produto_id: { type: 'number', description: 'ID do produto' },
        tipo: { type: 'string', enum: ['entrada', 'saida'], description: 'Tipo' },
        quantidade: { type: 'number', description: 'Quantidade' },
        motivo: { type: 'string', description: 'Motivo' },
        fornecedor_id: { type: 'number', description: 'ID do fornecedor' },
        ordem_id: { type: 'number', description: 'ID da OS' },
        valor_unitario: { type: 'number', description: 'Valor unitário' }
      },
      required: ['produto_id', 'tipo', 'quantidade', 'motivo']
    },
    handler: cadastrarMovimentacao
  },
  {
    name: 'sgp_detalhes_movimentacao',
    description: 'Retorna detalhes de uma movimentação.',
    inputSchema: {
      type: 'object',
      properties: {
        movimentacao_id: { type: 'number', description: 'ID da movimentação' }
      },
      required: ['movimentacao_id']
    },
    handler: detalhesMovimentacao
  },
  {
    name: 'sgp_cancelar_movimentacao',
    description: 'Cancela uma movimentação de estoque.',
    inputSchema: {
      type: 'object',
      properties: {
        movimentacao_id: { type: 'number', description: 'ID da movimentação' },
        motivo: { type: 'string', description: 'Motivo do cancelamento' }
      },
      required: ['movimentacao_id']
    },
    handler: cancelarMovimentacao
  },
  // Fornecedores
  {
    name: 'sgp_listar_fornecedores',
    description: 'Lista fornecedores cadastrados.',
    inputSchema: {
      type: 'object',
      properties: {
        nome: { type: 'string', description: 'Nome para busca' },
        page: { type: 'number' },
        per_page: { type: 'number' }
      }
    },
    handler: listarFornecedores
  },
  {
    name: 'sgp_cadastrar_fornecedor',
    description: 'Cadastra um novo fornecedor.',
    inputSchema: {
      type: 'object',
      properties: {
        nome: { type: 'string', description: 'Nome do fornecedor' },
        cnpj: { type: 'string', description: 'CNPJ' },
        email: { type: 'string', description: 'Email' },
        telefone: { type: 'string', description: 'Telefone' },
        endereco: { type: 'string', description: 'Endereço' },
        contato: { type: 'string', description: 'Nome do contato' }
      },
      required: ['nome']
    },
    handler: cadastrarFornecedor
  },
  {
    name: 'sgp_detalhes_fornecedor',
    description: 'Retorna detalhes de um fornecedor.',
    inputSchema: {
      type: 'object',
      properties: {
        fornecedor_id: { type: 'number', description: 'ID do fornecedor' }
      },
      required: ['fornecedor_id']
    },
    handler: detalhesFornecedor
  },
  {
    name: 'sgp_atualizar_fornecedor',
    description: 'Atualiza dados de um fornecedor.',
    inputSchema: {
      type: 'object',
      properties: {
        fornecedor_id: { type: 'number', description: 'ID do fornecedor' },
        nome: { type: 'string' },
        cnpj: { type: 'string' },
        email: { type: 'string' },
        telefone: { type: 'string' },
        endereco: { type: 'string' },
        contato: { type: 'string' }
      },
      required: ['fornecedor_id']
    },
    handler: atualizarFornecedor
  },
  {
    name: 'sgp_excluir_fornecedor',
    description: 'Exclui um fornecedor.',
    inputSchema: {
      type: 'object',
      properties: {
        fornecedor_id: { type: 'number', description: 'ID do fornecedor' }
      },
      required: ['fornecedor_id']
    },
    handler: excluirFornecedor
  },
  // Categorias
  {
    name: 'sgp_listar_categorias_estoque',
    description: 'Lista categorias de produtos.',
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
    name: 'sgp_cadastrar_categoria_estoque',
    description: 'Cadastra uma nova categoria de produtos.',
    inputSchema: {
      type: 'object',
      properties: {
        nome: { type: 'string', description: 'Nome da categoria' },
        descricao: { type: 'string', description: 'Descrição' }
      },
      required: ['nome']
    },
    handler: cadastrarCategoriaEstoque
  },
  {
    name: 'sgp_detalhes_categoria_estoque',
    description: 'Retorna detalhes de uma categoria de estoque.',
    inputSchema: {
      type: 'object',
      properties: {
        categoria_id: { type: 'number', description: 'ID da categoria' }
      },
      required: ['categoria_id']
    },
    handler: detalhesCategoriaEstoque
  },
  {
    name: 'sgp_atualizar_categoria_estoque',
    description: 'Atualiza uma categoria de estoque.',
    inputSchema: {
      type: 'object',
      properties: {
        categoria_id: { type: 'number', description: 'ID da categoria' },
        nome: { type: 'string', description: 'Nome' },
        descricao: { type: 'string', description: 'Descrição' }
      },
      required: ['categoria_id']
    },
    handler: atualizarCategoriaEstoque
  },
  {
    name: 'sgp_excluir_categoria_estoque',
    description: 'Exclui uma categoria de estoque.',
    inputSchema: {
      type: 'object',
      properties: {
        categoria_id: { type: 'number', description: 'ID da categoria' }
      },
      required: ['categoria_id']
    },
    handler: excluirCategoriaEstoque
  },
  // Inventário
  {
    name: 'sgp_iniciar_inventario',
    description: 'Inicia um novo inventário de estoque.',
    inputSchema: {
      type: 'object',
      properties: {
        nome: { type: 'string', description: 'Nome do inventário' },
        observacao: { type: 'string', description: 'Observações' }
      }
    },
    handler: iniciarInventario
  },
  {
    name: 'sgp_listar_inventarios',
    description: 'Lista inventários realizados.',
    inputSchema: {
      type: 'object',
      properties: {
        status: { type: 'string', enum: ['em_andamento', 'finalizado', 'cancelado', 'todos'], description: 'Status' },
        page: { type: 'number' },
        per_page: { type: 'number' }
      }
    },
    handler: listarInventarios
  },
  {
    name: 'sgp_detalhes_inventario',
    description: 'Retorna detalhes de um inventário.',
    inputSchema: {
      type: 'object',
      properties: {
        inventario_id: { type: 'number', description: 'ID do inventário' }
      },
      required: ['inventario_id']
    },
    handler: detalhesInventario
  },
  {
    name: 'sgp_finalizar_inventario',
    description: 'Finaliza um inventário.',
    inputSchema: {
      type: 'object',
      properties: {
        inventario_id: { type: 'number', description: 'ID do inventário' },
        ajustar_estoque: { type: 'boolean', description: 'Ajustar automaticamente o estoque' }
      },
      required: ['inventario_id']
    },
    handler: finalizarInventario
  },
  {
    name: 'sgp_cancelar_inventario',
    description: 'Cancela um inventário.',
    inputSchema: {
      type: 'object',
      properties: {
        inventario_id: { type: 'number', description: 'ID do inventário' },
        motivo: { type: 'string', description: 'Motivo do cancelamento' }
      },
      required: ['inventario_id']
    },
    handler: cancelarInventario
  }
];
