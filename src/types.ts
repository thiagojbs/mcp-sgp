/**
 * Tipos globais da aplicação
 */

import type { Context } from 'hono';
import type { McpServer } from './mcp/server';
import type { SgpClient } from './sgp/client';

// Contexto da aplicação Hono
export interface AppContext {
  Bindings: Env;
  Variables: {
    sgpClient: SgpClient;
    mcpServer: McpServer;
  };
}

// Tipo helper para contexto nas rotas
export type AppContextType = Context<AppContext>;

// Resposta padrão da API
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: Record<string, unknown>;
  };
  meta?: {
    timestamp: number;
    requestId?: string;
  };
}

// Configuração do servidor MCP
export interface McpServerConfig {
  name: string;
  version: string;
  capabilities: McpCapabilities;
}

export interface McpCapabilities {
  tools: boolean;
  resources: boolean;
  prompts: boolean;
  logging: boolean;
}

// Tipos para Tools do MCP
export interface McpTool {
  name: string;
  description: string;
  inputSchema: Record<string, unknown>;
}

export interface McpToolResult {
  content: McpContent[];
  isError?: boolean;
}

export interface McpContent {
  type: 'text' | 'image' | 'resource';
  text?: string;
  data?: string;
  mimeType?: string;
}

// Tipos para Resources do MCP
export interface McpResource {
  uri: string;
  name: string;
  description?: string;
  mimeType?: string;
}

// Tipos para Prompts do MCP
export interface McpPrompt {
  name: string;
  description?: string;
  arguments?: McpPromptArgument[];
}

export interface McpPromptArgument {
  name: string;
  description?: string;
  required?: boolean;
}

// Tipos para sessão MCP
export interface McpSession {
  id: string;
  createdAt: number;
  lastActivity: number;
  clientInfo?: {
    name: string;
    version: string;
  };
}

// Log levels
export type LogLevel = 'debug' | 'info' | 'warn' | 'error';
