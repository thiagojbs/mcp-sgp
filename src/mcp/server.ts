/**
 * MCP Server - Implementação do servidor Model Context Protocol
 */

import type { SgpClient } from '../sgp/client';
import type {
  McpServerConfig,
  McpTool,
  McpToolResult,
  McpResource,
  McpPrompt,
  McpContent,
} from '../types';
import { tools } from './tools';
import { resources } from './resources';
import { prompts } from './prompts';

export class McpServer {
  private env: Env;
  private sgpClient: SgpClient;
  private config: McpServerConfig;

  constructor(env: Env, sgpClient: SgpClient) {
    this.env = env;
    this.sgpClient = sgpClient;
    this.config = {
      name: 'mcp-sgp',
      version: '0.1.0',
      capabilities: {
        tools: true,
        resources: true,
        prompts: true,
        logging: true,
      },
    };
  }

  /**
   * Retorna informações do servidor para o handshake inicial
   */
  getServerInfo() {
    return {
      protocolVersion: '2024-11-05',
      serverInfo: {
        name: this.config.name,
        version: this.config.version,
      },
      capabilities: {
        tools: this.config.capabilities.tools ? {} : undefined,
        resources: this.config.capabilities.resources ? { subscribe: true } : undefined,
        prompts: this.config.capabilities.prompts ? {} : undefined,
        logging: this.config.capabilities.logging ? {} : undefined,
      },
    };
  }

  /**
   * Lista todas as tools disponíveis
   */
  async listTools(): Promise<McpTool[]> {
    return tools.map((tool) => ({
      name: tool.name,
      description: tool.description,
      inputSchema: tool.inputSchema,
    }));
  }

  /**
   * Executa uma tool específica
   */
  async callTool(name: string, args: Record<string, unknown>): Promise<McpToolResult> {
    const tool = tools.find((t) => t.name === name);

    if (!tool) {
      return {
        content: [{ type: 'text', text: `Tool não encontrada: ${name}` }],
        isError: true,
      };
    }

    try {
      const result = await tool.handler(args, this.sgpClient, this.env);
      return result;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
      return {
        content: [{ type: 'text', text: `Erro ao executar tool: ${errorMessage}` }],
        isError: true,
      };
    }
  }

  /**
   * Lista todos os resources disponíveis
   */
  async listResources(): Promise<McpResource[]> {
    return resources.map((resource) => ({
      uri: resource.uri,
      name: resource.name,
      description: resource.description,
      mimeType: resource.mimeType,
    }));
  }

  /**
   * Lê um resource específico
   */
  async readResource(uri: string): Promise<McpContent[]> {
    const resource = resources.find((r) => r.uri === uri || uri.startsWith(r.uriTemplate ?? ''));

    if (!resource) {
      return [{ type: 'text', text: `Resource não encontrado: ${uri}` }];
    }

    try {
      const content = await resource.handler(uri, this.sgpClient, this.env);
      return content;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
      return [{ type: 'text', text: `Erro ao ler resource: ${errorMessage}` }];
    }
  }

  /**
   * Lista todos os prompts disponíveis
   */
  async listPrompts(): Promise<McpPrompt[]> {
    return prompts.map((prompt) => ({
      name: prompt.name,
      description: prompt.description,
      arguments: prompt.arguments,
    }));
  }

  /**
   * Obtém um prompt específico com argumentos
   */
  async getPrompt(name: string, args: Record<string, string>): Promise<{ messages: Array<{ role: string; content: McpContent }> }> {
    const prompt = prompts.find((p) => p.name === name);

    if (!prompt) {
      return {
        messages: [{
          role: 'user',
          content: { type: 'text', text: `Prompt não encontrado: ${name}` },
        }],
      };
    }

    try {
      const messages = await prompt.handler(args, this.sgpClient, this.env);
      return { messages };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
      return {
        messages: [{
          role: 'user',
          content: { type: 'text', text: `Erro ao processar prompt: ${errorMessage}` },
        }],
      };
    }
  }

  /**
   * Processa mensagem JSON-RPC do MCP
   */
  async handleMessage(message: unknown): Promise<unknown> {
    const msg = message as { jsonrpc: string; id?: number; method: string; params?: Record<string, unknown> };

    if (msg.jsonrpc !== '2.0') {
      return this.createError(msg.id, -32600, 'Invalid Request');
    }

    try {
      switch (msg.method) {
        case 'initialize':
          return this.createResponse(msg.id, this.getServerInfo());

        case 'initialized':
          return null; // Notificação, sem resposta

        case 'tools/list':
          return this.createResponse(msg.id, { tools: await this.listTools() });

        case 'tools/call':
          const toolParams = msg.params as { name: string; arguments?: Record<string, unknown> };
          const toolResult = await this.callTool(toolParams.name, toolParams.arguments ?? {});
          return this.createResponse(msg.id, toolResult);

        case 'resources/list':
          return this.createResponse(msg.id, { resources: await this.listResources() });

        case 'resources/read':
          const resourceParams = msg.params as { uri: string };
          const resourceContent = await this.readResource(resourceParams.uri);
          return this.createResponse(msg.id, { contents: resourceContent });

        case 'prompts/list':
          return this.createResponse(msg.id, { prompts: await this.listPrompts() });

        case 'prompts/get':
          const promptParams = msg.params as { name: string; arguments?: Record<string, string> };
          const promptResult = await this.getPrompt(promptParams.name, promptParams.arguments ?? {});
          return this.createResponse(msg.id, promptResult);

        case 'ping':
          return this.createResponse(msg.id, {});

        default:
          return this.createError(msg.id, -32601, `Method not found: ${msg.method}`);
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Internal error';
      return this.createError(msg.id, -32603, errorMessage);
    }
  }

  private createResponse(id: number | undefined, result: unknown) {
    return {
      jsonrpc: '2.0',
      id,
      result,
    };
  }

  private createError(id: number | undefined, code: number, message: string) {
    return {
      jsonrpc: '2.0',
      id,
      error: { code, message },
    };
  }
}
