/**
 * Ferramentas MCP para gestão de Clientes/Assinantes
 */

import { z } from 'zod';
import { SGPClient } from '../sgp-client';

// Schemas de validação
export const consultarClienteSchema = z.object({
  cpfcnpj: z.string().optional().describe('CPF ou CNPJ do cliente (somente números)'),
  telefone: z.string().optional().describe('Telefone do cliente'),
  nome: z.string().optional().describe('Nome do cliente para busca'),
  page: z.number().optional().default(1).describe('Número da página'),
  per_page: z.number().optional().default(20).describe('Itens por página (máx 100)')
});

export const detalhesClienteSchema = z.object({
  cliente_id: z.number().describe('ID do cliente no SGP')
});

// Funções de ferramentas
export async function consultarCliente(client: SGPClient, params: z.infer<typeof consultarClienteSchema>) {
  // Usa o endpoint da URA para consulta geral
  if (params.cpfcnpj || params.telefone) {
    const response = await client.post('/ura/cliente', {
      cpfcnpj: params.cpfcnpj,
      telefone: params.telefone
    });
    return response;
  }

  // Para busca por nome, usa listagem com filtro
  const response = await client.get('/clientes', {
    nome: params.nome,
    page: params.page,
    per_page: params.per_page
  });
  return response;
}

export async function detalhesCliente(client: SGPClient, params: z.infer<typeof detalhesClienteSchema>) {
  const response = await client.get(`/clientes/${params.cliente_id}`);
  return response;
}

// Definições das ferramentas para registro no MCP
export const clientesTools = [
  {
    name: 'sgp_consultar_cliente',
    description: 'Consulta clientes no SGP por CPF/CNPJ, telefone ou nome. Retorna dados cadastrais, contratos ativos e status do cliente.',
    inputSchema: {
      type: 'object',
      properties: {
        cpfcnpj: { type: 'string', description: 'CPF ou CNPJ do cliente (somente números)' },
        telefone: { type: 'string', description: 'Telefone do cliente' },
        nome: { type: 'string', description: 'Nome do cliente para busca' },
        page: { type: 'number', description: 'Número da página (padrão: 1)' },
        per_page: { type: 'number', description: 'Itens por página (padrão: 20, máx: 100)' }
      }
    },
    handler: consultarCliente
  },
  {
    name: 'sgp_detalhes_cliente',
    description: 'Retorna os detalhes completos de um cliente específico pelo ID, incluindo todos os dados cadastrais e histórico.',
    inputSchema: {
      type: 'object',
      properties: {
        cliente_id: { type: 'number', description: 'ID do cliente no SGP' }
      },
      required: ['cliente_id']
    },
    handler: detalhesCliente
  }
];
