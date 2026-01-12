/**
 * Rotas do MCP Server
 * Implementa endpoints para comunicação MCP via HTTP e SSE
 */

import { Hono } from 'hono';
import { streamSSE } from 'hono/streaming';
import type { AppContext } from '../types';

export const mcpRoutes = new Hono<AppContext>();

/**
 * POST /mcp - Endpoint principal JSON-RPC
 * Recebe mensagens MCP e retorna respostas
 */
mcpRoutes.post('/', async (c) => {
  const mcpServer = c.get('mcpServer');

  try {
    const message = await c.req.json();

    // Log da mensagem recebida (em ambiente de desenvolvimento)
    if (c.env.ENVIRONMENT === 'development') {
      console.log('MCP Request:', JSON.stringify(message));
    }

    const response = await mcpServer.handleMessage(message);

    // Notificações não têm resposta
    if (response === null) {
      return c.body(null, 204);
    }

    return c.json(response);
  } catch (error) {
    console.error('MCP Error:', error);
    return c.json({
      jsonrpc: '2.0',
      error: {
        code: -32700,
        message: 'Parse error',
      },
    }, 400);
  }
});

/**
 * GET /mcp/sse - Server-Sent Events para comunicação streaming
 * Mantém conexão aberta para receber mensagens do servidor
 */
mcpRoutes.get('/sse', async (c) => {
  const sessionId = c.req.header('X-MCP-Session-Id') ?? crypto.randomUUID();

  // Obtém ou cria Durable Object para a sessão
  const sessionDO = c.env.MCP_SESSION.get(
    c.env.MCP_SESSION.idFromName(sessionId)
  );

  // Inicializa sessão se necessária
  await sessionDO.fetch(new Request('https://internal/initialize', {
    method: 'POST',
    body: JSON.stringify({ clientInfo: { name: 'unknown', version: '0.0.0' } }),
  }));

  return streamSSE(c, async (stream) => {
    // Envia evento de conexão estabelecida
    await stream.writeSSE({
      event: 'connected',
      data: JSON.stringify({ sessionId }),
    });

    // Loop de polling para mensagens (em produção, usar WebSocket ou Durable Object alarm)
    let isConnected = true;
    const pollInterval = 1000; // 1 segundo

    while (isConnected) {
      try {
        // Verifica se há mensagens pendentes
        const messagesResponse = await sessionDO.fetch(
          new Request('https://internal/messages', { method: 'GET' })
        );
        const messages = await messagesResponse.json() as unknown[];

        // Envia mensagens pendentes
        for (const message of messages) {
          await stream.writeSSE({
            event: 'message',
            data: JSON.stringify(message),
          });
        }

        // Atualiza timestamp de atividade
        await sessionDO.fetch(
          new Request('https://internal/touch', { method: 'POST' })
        );

        // Aguarda antes do próximo poll
        await stream.sleep(pollInterval);
      } catch (error) {
        console.error('SSE Error:', error);
        isConnected = false;
      }
    }
  });
});

/**
 * POST /mcp/sse - Envia mensagem para uma sessão SSE
 */
mcpRoutes.post('/sse', async (c) => {
  const sessionId = c.req.header('X-MCP-Session-Id');

  if (!sessionId) {
    return c.json({ error: 'Session ID required' }, 400);
  }

  const mcpServer = c.get('mcpServer');
  const message = await c.req.json();

  // Processa a mensagem
  const response = await mcpServer.handleMessage(message);

  // Se houver resposta, envia para o Durable Object
  if (response !== null) {
    const sessionDO = c.env.MCP_SESSION.get(
      c.env.MCP_SESSION.idFromName(sessionId)
    );

    await sessionDO.fetch(new Request('https://internal/messages', {
      method: 'POST',
      body: JSON.stringify(response),
    }));
  }

  return c.json({ success: true });
});

/**
 * GET /mcp/info - Informações do servidor MCP
 */
mcpRoutes.get('/info', async (c) => {
  const mcpServer = c.get('mcpServer');
  return c.json(mcpServer.getServerInfo());
});

/**
 * GET /mcp/tools - Lista todas as tools disponíveis
 */
mcpRoutes.get('/tools', async (c) => {
  const mcpServer = c.get('mcpServer');
  const tools = await mcpServer.listTools();
  return c.json({ tools });
});

/**
 * GET /mcp/resources - Lista todos os resources disponíveis
 */
mcpRoutes.get('/resources', async (c) => {
  const mcpServer = c.get('mcpServer');
  const resources = await mcpServer.listResources();
  return c.json({ resources });
});

/**
 * GET /mcp/prompts - Lista todos os prompts disponíveis
 */
mcpRoutes.get('/prompts', async (c) => {
  const mcpServer = c.get('mcpServer');
  const prompts = await mcpServer.listPrompts();
  return c.json({ prompts });
});
