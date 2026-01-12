/**
 * MCP Server SGP - Entry Point
 * Cloudflare Worker que expõe um servidor MCP para integração com o SGP
 */

import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';
import { McpServer } from './mcp/server';
import { McpSessionDO } from './mcp/session';
import { createSgpClient } from './sgp/client';
import { healthCheck } from './routes/health';
import { mcpRoutes } from './routes/mcp';
import type { AppContext } from './types';

// Re-export Durable Object para o Cloudflare
export { McpSessionDO };

const app = new Hono<AppContext>();

// Middlewares globais
app.use('*', logger());
app.use('*', cors({
  origin: '*',
  allowMethods: ['GET', 'POST', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization', 'X-MCP-Session-Id'],
}));

// Middleware para injetar dependências
app.use('*', async (c, next) => {
  const sgpClient = createSgpClient(c.env);
  const mcpServer = new McpServer(c.env, sgpClient);

  c.set('sgpClient', sgpClient);
  c.set('mcpServer', mcpServer);

  await next();
});

// Rotas
app.route('/health', healthCheck);
app.route('/mcp', mcpRoutes);

// Rota raiz
app.get('/', (c) => {
  return c.json({
    name: 'MCP Server SGP',
    version: '0.1.0',
    description: 'Model Context Protocol Server para integração com SGP',
    endpoints: {
      health: '/health',
      mcp: '/mcp',
      sse: '/mcp/sse',
    },
    documentation: 'https://github.com/thiagojbs/mcp-sgp',
  });
});

// Handler principal do Worker
export default {
  fetch: app.fetch,

  // Handler para Queue consumers
  async queue(batch: MessageBatch<QueueMessage>, env: Env): Promise<void> {
    for (const message of batch.messages) {
      try {
        console.log(`Processing queue message: ${message.body.type}`);
        // TODO: Implementar processamento de tarefas assíncronas
        message.ack();
      } catch (error) {
        console.error('Queue processing error:', error);
        message.retry();
      }
    }
  },

  // Handler para Scheduled events (cron)
  async scheduled(event: ScheduledEvent, env: Env, ctx: ExecutionContext): Promise<void> {
    console.log(`Scheduled event triggered: ${event.cron}`);
    // TODO: Implementar tarefas agendadas (sincronização, limpeza, etc.)
  },
};
