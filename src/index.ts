/**
 * SGP MCP Server - Cloudflare Workers (Multi-Tenant)
 *
 * MCP Server para integração com o ERP SGP (Sistema de Gestão para Provedores).
 * Cada sessão configura suas próprias credenciais via a tool `sgp_configurar`.
 *
 * As tools são geradas a partir da especificação canônica da API oficial do SGP
 * (src/spec/sgp-endpoints.ts, derivada da collection oficial do Postman),
 * garantindo conformidade com os endpoints reais.
 */

// HTML da página de documentação
import indexHtml from './pages/index.html';

import { McpAgent } from 'agents/mcp';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';
import { SGPClient, type SGPConfig } from './sgp-client';
import { sgpTools } from './tools/factory';
import { SGP_ENDPOINTS } from './spec/sgp-endpoints';

// Bindings do Worker
interface Env {
  MCP_OBJECT: DurableObjectNamespace;
}

// Todas as ferramentas derivadas do spec (uma por endpoint real do SGP)
const allTools = sgpTools;

// Seções da API (para documentação)
const SECTIONS = Array.from(new Set(SGP_ENDPOINTS.map((e) => e.section)));

// Schema (JSON, para a página /tools) da configuração de credenciais
const configSchema = {
  type: 'object',
  properties: {
    sgp_url: { type: 'string', description: 'URL base do provedor (ex: https://seuprovedor.sgp.net.br). O prefixo /api é adicionado automaticamente.' },
    auth_type: { type: 'string', enum: ['token', 'basic'], description: 'Tipo de autenticação: token (recomendado) ou basic' },
    token: { type: 'string', description: 'Token de API gerado no SGP em Sistema → Ferramentas → Painel Admin → Tokens (se auth_type=token)' },
    app: { type: 'string', description: 'Nome do aplicativo associado ao token no SGP (se auth_type=token)' },
    username: { type: 'string', description: 'Usuário do SGP (se auth_type=basic)' },
    password: { type: 'string', description: 'Senha do SGP (se auth_type=basic)' }
  },
  required: ['sgp_url', 'auth_type']
};

// Zod shape correspondente (para registro no MCP SDK)
const configShape = {
  sgp_url: z.string().describe('URL base do provedor (ex: https://seuprovedor.sgp.net.br). O prefixo /api é adicionado automaticamente.'),
  auth_type: z.enum(['token', 'basic']).describe('Tipo de autenticação: token (recomendado) ou basic'),
  token: z.string().optional().describe('Token de API (se auth_type=token)'),
  app: z.string().optional().describe('Nome do aplicativo associado ao token (se auth_type=token)'),
  username: z.string().optional().describe('Usuário do SGP (se auth_type=basic)'),
  password: z.string().optional().describe('Senha do SGP (se auth_type=basic)')
};

/**
 * Durable Object MCP: uma instância por sessão MCP.
 * Mantém a configuração SGP da sessão em memória de instância.
 */
export class SGPMcpAgent extends McpAgent<Env> {
  server = new McpServer({ name: 'SGP MCP Server', version: '2.0.0' });

  private currentConfig: SGPConfig | null = null;
  private client: SGPClient | null = null;

  private buildConfig(params: Record<string, unknown>): SGPConfig {
    return {
      baseUrl: params.sgp_url as string,
      authType: (params.auth_type as 'basic' | 'token') || 'token',
      token: params.token as string | undefined,
      app: params.app as string | undefined,
      username: params.username as string | undefined,
      password: params.password as string | undefined
    };
  }

  private getClient(): SGPClient {
    if (this.client) return this.client;
    if (this.currentConfig) {
      this.client = new SGPClient(this.currentConfig);
      return this.client;
    }
    throw new Error('SGP não configurado. Use a ferramenta sgp_configurar primeiro para definir as credenciais.');
  }

  async init() {
    // Tool de configuração (primeira a ser chamada)
    this.server.tool(
      'sgp_configurar',
      'Configura as credenciais de acesso ao SGP. DEVE ser chamada primeiro antes de usar outras ferramentas.',
      configShape,
      async (params) => {
        const config = this.buildConfig(params as Record<string, unknown>);
        this.currentConfig = config;
        this.client = new SGPClient(config);
        return {
          content: [{
            type: 'text' as const,
            text: JSON.stringify({
              status: 'success',
              message: 'SGP configurado com sucesso para esta sessão.',
              sgp_url: config.baseUrl,
              auth_type: config.authType,
              tools_disponiveis: allTools.length,
              proximo_passo: 'Use sgp_status_conexao para validar, ou chame qualquer tool sgp_*.'
            }, null, 2)
          }]
        };
      }
    );

    // Tool de status/diagnóstico (probe em endpoint real)
    this.server.tool(
      'sgp_status_conexao',
      'Verifica se o SGP está configurado nesta sessão e testa a conexão consultando um endpoint real (Portador – Listar).',
      {},
      async () => {
        if (!this.currentConfig) {
          return {
            content: [{
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
            }]
          };
        }
        try {
          const client = this.getClient();
          const probe = SGP_ENDPOINTS.find((e) => e.id === 'sgp_ura_portador_listar');
          const result = probe ? await client.request(probe) : null;
          return {
            content: [{
              type: 'text' as const,
              text: JSON.stringify({
                status: result?.ok ? 'connected' : 'config_saved',
                sgp_url: this.currentConfig.baseUrl,
                auth_type: this.currentConfig.authType,
                probe_endpoint: probe?.path,
                http_status: result?.status,
                api_response: result?.data
              }, null, 2)
            }]
          };
        } catch (error) {
          const message = error instanceof Error ? error.message : 'Erro desconhecido';
          return {
            content: [{ type: 'text' as const, text: JSON.stringify({ status: 'error', sgp_url: this.currentConfig.baseUrl, error: message }, null, 2) }],
            isError: true
          };
        }
      }
    );

    // Registra todas as tools derivadas do spec
    for (const tool of allTools) {
      this.server.tool(
        tool.name,
        tool.description,
        tool.inputShape,
        async (args) => {
          try {
            const client = this.getClient();
            const result = await client.request(tool.endpoint, args as Record<string, string | number | boolean | null | undefined>);
            return {
              content: [{ type: 'text' as const, text: JSON.stringify(result.data, null, 2) }],
              isError: !result.ok
            };
          } catch (error) {
            const message = error instanceof Error ? error.message : 'Erro desconhecido';
            if (message.includes('não configurado')) {
              return {
                content: [{
                  type: 'text' as const,
                  text: JSON.stringify({
                    status: 'error',
                    message,
                    instructions: 'Use a ferramenta sgp_configurar primeiro para definir as credenciais do SGP.',
                    example: { sgp_url: 'https://seuprovedor.sgp.net.br', auth_type: 'token', token: 'seu_token_aqui', app: 'nome_do_app' }
                  }, null, 2)
                }],
                isError: true
              };
            }
            return {
              content: [{ type: 'text' as const, text: JSON.stringify({ status: 'error', message: `Erro ao executar ${tool.name}: ${message}` }, null, 2) }],
              isError: true
            };
          }
        }
      );
    }

    // Recurso informativo da API
    this.server.resource('sgp-info-api', 'sgp://info/api', async (uri) => ({
      contents: [{
        uri: uri.href,
        mimeType: 'application/json',
        text: JSON.stringify({
          name: 'SGP MCP Server - Multi-Tenant',
          version: '2.0.0',
          description: 'MCP Server para integração com múltiplos SGPs, gerado a partir da API oficial.',
          setup: { step1: 'Use sgp_configurar para definir as credenciais', step2: 'Use sgp_status_conexao para validar', step3: 'Chame qualquer tool sgp_*' },
          auth_options: { token: 'Autenticação por token + app (recomendado)', basic: 'Autenticação básica (usuário/senha)' },
          sections: SECTIONS,
          totalTools: allTools.length + 2
        }, null, 2)
      }]
    }));

    // Recurso com a lista de tools
    this.server.resource('sgp-info-tools', 'sgp://info/tools', async (uri) => ({
      contents: [{
        uri: uri.href,
        mimeType: 'application/json',
        text: JSON.stringify([
          { name: 'sgp_configurar', description: 'Configura as credenciais do SGP (CHAMAR PRIMEIRO)' },
          { name: 'sgp_status_conexao', description: 'Verifica status da conexão com o SGP' },
          ...allTools.map((t) => ({ name: t.name, description: t.description }))
        ], null, 2)
      }]
    }));
  }
}

// Handlers de transporte MCP (Streamable HTTP e SSE)
const mcpHandler = SGPMcpAgent.serve('/mcp');
const sseHandler = SGPMcpAgent.serveSSE('/sse');

// Export para Cloudflare Workers
export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === '/') {
      return new Response(indexHtml, { headers: { 'Content-Type': 'text/html; charset=utf-8' } });
    }

    if (url.pathname === '/health') {
      return new Response(JSON.stringify({
        status: 'ok',
        server: 'SGP MCP Server (Multi-Tenant)',
        version: '2.0.0',
        tools: allTools.length + 2,
        sections: SECTIONS,
        endpoints: { docs: '/', health: '/health', tools: '/tools', mcp: '/mcp', sse: '/sse' },
        setup: 'Use a ferramenta sgp_configurar para definir as credenciais do SGP antes de usar outras ferramentas'
      }, null, 2), { headers: { 'Content-Type': 'application/json' } });
    }

    if (url.pathname === '/tools') {
      return new Response(JSON.stringify({
        setup_tools: [
          { name: 'sgp_configurar', description: 'Configura as credenciais do SGP - DEVE ser chamada primeiro', inputSchema: configSchema },
          { name: 'sgp_status_conexao', description: 'Verifica se o SGP está configurado e testa a conexão' }
        ],
        sgp_tools: allTools.map((t) => ({ name: t.name, description: t.description, inputSchema: t.inputSchema }))
      }, null, 2), { headers: { 'Content-Type': 'application/json' } });
    }

    if (url.pathname === '/mcp') {
      return mcpHandler.fetch(request, env, ctx);
    }
    if (url.pathname === '/sse' || url.pathname === '/sse/message') {
      return sseHandler.fetch(request, env, ctx);
    }

    return new Response('Not Found', { status: 404 });
  }
};
