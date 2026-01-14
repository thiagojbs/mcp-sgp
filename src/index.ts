/**
 * SGP MCP Server - Cloudflare Workers (Multi-Tenant)
 *
 * MCP Server para integração com o ERP SGP (Sistema de Gestão para Provedores)
 * Suporta múltiplos SGPs - cada cliente pode configurar suas próprias credenciais
 *
 * Permite que assistentes de IA interajam com o SGP para:
 * - Consultar clientes, contratos e faturas
 * - Gerenciar chamados de suporte
 * - Controlar ordens de serviço
 * - Administrar rede FTTH (ONUs, OLTs, etc.)
 * - Gerenciar estoque
 * - Monitorar RADIUS
 */

import { McpAgent } from 'agents/mcp';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { SGPClient, SGPConfig } from './sgp-client';

// Importação das ferramentas
import { clientesTools } from './tools/clientes';
import { contratosTools } from './tools/contratos';
import { faturasTools } from './tools/faturas';
import { chamadosTools } from './tools/chamados';
import { ordensServicoTools } from './tools/ordens-servico';
import { ftthTools } from './tools/ftth';
import { estoqueTools } from './tools/estoque';
import { radiusTools } from './tools/radius';

// Interface de ambiente
interface Env {
  // Não requer variáveis fixas - credenciais são passadas por parâmetro
}

// Todas as ferramentas combinadas
const allTools = [
  ...clientesTools,
  ...contratosTools,
  ...faturasTools,
  ...chamadosTools,
  ...ordensServicoTools,
  ...ftthTools,
  ...estoqueTools,
  ...radiusTools
];

// Schema para configuração de credenciais
const configSchema = {
  type: 'object',
  properties: {
    sgp_url: {
      type: 'string',
      description: 'URL base da API do SGP (ex: https://seuprovedor.sgp.net.br/api)'
    },
    auth_type: {
      type: 'string',
      enum: ['token', 'basic'],
      description: 'Tipo de autenticação: token ou basic'
    },
    token: {
      type: 'string',
      description: 'Token de API (se auth_type=token)'
    },
    app: {
      type: 'string',
      description: 'Nome do aplicativo no SGP (se auth_type=token)'
    },
    username: {
      type: 'string',
      description: 'Usuário (se auth_type=basic)'
    },
    password: {
      type: 'string',
      description: 'Senha (se auth_type=basic)'
    }
  },
  required: ['sgp_url', 'auth_type']
};

// Cache de clientes SGP por sessão
const clientCache = new Map<string, SGPClient>();

// Classe do MCP Agent
export class SGPMcpAgent extends McpAgent {
  server = new McpServer({
    name: 'SGP MCP Server',
    version: '1.0.0'
  });

  private currentConfig: SGPConfig | null = null;
  private sessionId: string;

  constructor() {
    super();
    this.sessionId = crypto.randomUUID();
  }

  private getSGPClient(params?: Record<string, unknown>): SGPClient {
    // Se params contém credenciais, usa elas
    if (params?.sgp_url) {
      const config: SGPConfig = {
        baseUrl: params.sgp_url as string,
        authType: (params.auth_type as 'basic' | 'token') || 'token',
        token: params.token as string,
        app: params.app as string,
        username: params.username as string,
        password: params.password as string
      };
      this.currentConfig = config;
      const client = new SGPClient(config);
      clientCache.set(this.sessionId, client);
      return client;
    }

    // Se já tem configuração na sessão, usa ela
    if (clientCache.has(this.sessionId)) {
      return clientCache.get(this.sessionId)!;
    }

    // Se tem configuração atual
    if (this.currentConfig) {
      return new SGPClient(this.currentConfig);
    }

    throw new Error('SGP não configurado. Use a ferramenta sgp_configurar primeiro para definir as credenciais.');
  }

  async init() {
    // Ferramenta de configuração (primeira a ser chamada)
    this.server.tool(
      'sgp_configurar',
      'Configura as credenciais de acesso ao SGP. DEVE ser chamada primeiro antes de usar outras ferramentas. Cada provedor tem sua própria URL e credenciais.',
      configSchema,
      async (params: Record<string, unknown>) => {
        try {
          const client = this.getSGPClient(params);

          // Testa a conexão
          const testResponse = await client.get('/status');

          return {
            content: [
              {
                type: 'text' as const,
                text: JSON.stringify({
                  status: 'success',
                  message: 'SGP configurado com sucesso!',
                  sgp_url: params.sgp_url,
                  auth_type: params.auth_type,
                  connection_test: testResponse
                }, null, 2)
              }
            ]
          };
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';

          // Mesmo com erro no teste, salva a configuração
          if (params.sgp_url) {
            const config: SGPConfig = {
              baseUrl: params.sgp_url as string,
              authType: (params.auth_type as 'basic' | 'token') || 'token',
              token: params.token as string,
              app: params.app as string,
              username: params.username as string,
              password: params.password as string
            };
            this.currentConfig = config;
            clientCache.set(this.sessionId, new SGPClient(config));
          }

          return {
            content: [
              {
                type: 'text' as const,
                text: JSON.stringify({
                  status: 'warning',
                  message: 'Credenciais salvas, mas não foi possível testar a conexão.',
                  error: errorMessage,
                  sgp_url: params.sgp_url,
                  auth_type: params.auth_type
                }, null, 2)
              }
            ]
          };
        }
      }
    );

    // Ferramenta para verificar configuração atual
    this.server.tool(
      'sgp_status_conexao',
      'Verifica se o SGP está configurado e testa a conexão.',
      {
        type: 'object',
        properties: {}
      },
      async () => {
        if (!this.currentConfig && !clientCache.has(this.sessionId)) {
          return {
            content: [
              {
                type: 'text' as const,
                text: JSON.stringify({
                  status: 'not_configured',
                  message: 'SGP não configurado. Use sgp_configurar primeiro.',
                  instructions: {
                    tool: 'sgp_configurar',
                    required_params: ['sgp_url', 'auth_type'],
                    optional_params_token: ['token', 'app'],
                    optional_params_basic: ['username', 'password']
                  }
                }, null, 2)
              }
            ]
          };
        }

        try {
          const client = this.getSGPClient();
          const response = await client.get('/status');
          return {
            content: [
              {
                type: 'text' as const,
                text: JSON.stringify({
                  status: 'connected',
                  sgp_url: this.currentConfig?.baseUrl,
                  auth_type: this.currentConfig?.authType,
                  api_status: response
                }, null, 2)
              }
            ]
          };
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
          return {
            content: [
              {
                type: 'text' as const,
                text: JSON.stringify({
                  status: 'error',
                  sgp_url: this.currentConfig?.baseUrl,
                  error: errorMessage
                }, null, 2)
              }
            ],
            isError: true
          };
        }
      }
    );

    // Registra todas as outras ferramentas
    for (const tool of allTools) {
      this.server.tool(
        tool.name,
        tool.description,
        tool.inputSchema,
        async (params: Record<string, unknown>) => {
          try {
            const client = this.getSGPClient(params);
            const result = await tool.handler(client, params as never);
            return {
              content: [
                {
                  type: 'text' as const,
                  text: JSON.stringify(result, null, 2)
                }
              ]
            };
          } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';

            // Verifica se é erro de configuração
            if (errorMessage.includes('não configurado')) {
              return {
                content: [
                  {
                    type: 'text' as const,
                    text: JSON.stringify({
                      status: 'error',
                      message: errorMessage,
                      instructions: 'Use a ferramenta sgp_configurar primeiro para definir as credenciais do SGP.',
                      example: {
                        sgp_url: 'https://seuprovedor.sgp.net.br/api',
                        auth_type: 'token',
                        token: 'seu_token_aqui',
                        app: 'nome_do_app'
                      }
                    }, null, 2)
                  }
                ],
                isError: true
              };
            }

            return {
              content: [
                {
                  type: 'text' as const,
                  text: JSON.stringify({
                    status: 'error',
                    message: `Erro ao executar ${tool.name}: ${errorMessage}`
                  }, null, 2)
                }
              ],
              isError: true
            };
          }
        }
      );
    }

    // Registra recursos informativos
    this.server.resource(
      'sgp://info/api',
      'Informações da API do SGP',
      async () => ({
        contents: [
          {
            uri: 'sgp://info/api',
            mimeType: 'application/json',
            text: JSON.stringify({
              name: 'SGP MCP Server - Multi-Tenant',
              version: '1.0.0',
              description: 'MCP Server para integração com múltiplos SGPs',
              setup: {
                step1: 'Use sgp_configurar para definir as credenciais',
                step2: 'Depois use as outras ferramentas normalmente'
              },
              auth_options: {
                token: 'Autenticação por token (recomendado)',
                basic: 'Autenticação básica (usuário/senha)'
              },
              categories: [
                'Clientes/Assinantes',
                'Contratos',
                'Faturas e Boletos',
                'Chamados de Suporte',
                'Ordens de Serviço',
                'FTTH (ONUs, OLTs, Caixas, Splitters)',
                'Estoque',
                'RADIUS'
              ],
              totalTools: allTools.length + 2 // +2 para sgp_configurar e sgp_status_conexao
            }, null, 2)
          }
        ]
      })
    );

    this.server.resource(
      'sgp://info/tools',
      'Lista de ferramentas disponíveis',
      async () => ({
        contents: [
          {
            uri: 'sgp://info/tools',
            mimeType: 'application/json',
            text: JSON.stringify([
              {
                name: 'sgp_configurar',
                description: 'Configura as credenciais do SGP (CHAMAR PRIMEIRO)'
              },
              {
                name: 'sgp_status_conexao',
                description: 'Verifica status da conexão com o SGP'
              },
              ...allTools.map(t => ({
                name: t.name,
                description: t.description
              }))
            ], null, 2)
          }
        ]
      })
    );
  }
}

// Export para Cloudflare Workers
export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);

    // Health check
    if (url.pathname === '/health' || url.pathname === '/') {
      return new Response(JSON.stringify({
        status: 'ok',
        server: 'SGP MCP Server (Multi-Tenant)',
        version: '1.0.0',
        description: 'MCP Server para integração com múltiplos SGPs de diferentes provedores',
        tools: allTools.length + 2,
        endpoints: {
          mcp: '/mcp',
          sse: '/sse'
        },
        setup: 'Use a ferramenta sgp_configurar para definir as credenciais do SGP antes de usar outras ferramentas'
      }), {
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Lista de ferramentas
    if (url.pathname === '/tools') {
      return new Response(JSON.stringify({
        setup_tools: [
          {
            name: 'sgp_configurar',
            description: 'Configura as credenciais do SGP - DEVE ser chamada primeiro',
            inputSchema: configSchema
          },
          {
            name: 'sgp_status_conexao',
            description: 'Verifica se o SGP está configurado e testa a conexão'
          }
        ],
        sgp_tools: allTools.map(t => ({
          name: t.name,
          description: t.description,
          inputSchema: t.inputSchema
        }))
      }, null, 2), {
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // MCP endpoints (streamable HTTP e SSE)
    if (url.pathname === '/mcp' || url.pathname === '/sse') {
      const agent = new SGPMcpAgent();
      await agent.init();
      return agent.fetch(request, env, ctx);
    }

    return new Response('Not Found', { status: 404 });
  }
};
