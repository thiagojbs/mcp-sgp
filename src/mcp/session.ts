/**
 * Durable Object para gerenciamento de sessões MCP
 * Mantém estado persistente para conexões WebSocket/SSE
 */

import { DurableObject } from 'cloudflare:workers';
import type { McpSession } from '../types';

export class McpSessionDO extends DurableObject<Env> {
  private session: McpSession | null = null;
  private messageBuffer: unknown[] = [];

  constructor(state: DurableObjectState, env: Env) {
    super(state, env);
  }

  /**
   * Inicializa uma nova sessão MCP
   */
  async initialize(clientInfo?: { name: string; version: string }): Promise<McpSession> {
    const now = Date.now();

    this.session = {
      id: this.ctx.id.toString(),
      createdAt: now,
      lastActivity: now,
      clientInfo,
    };

    await this.ctx.storage.put('session', this.session);

    return this.session;
  }

  /**
   * Obtém a sessão atual
   */
  async getSession(): Promise<McpSession | null> {
    if (!this.session) {
      this.session = await this.ctx.storage.get('session') ?? null;
    }
    return this.session;
  }

  /**
   * Atualiza timestamp de última atividade
   */
  async touch(): Promise<void> {
    if (this.session) {
      this.session.lastActivity = Date.now();
      await this.ctx.storage.put('session', this.session);
    }
  }

  /**
   * Adiciona mensagem ao buffer (para SSE)
   */
  async pushMessage(message: unknown): Promise<void> {
    this.messageBuffer.push(message);

    // Limita buffer a 100 mensagens
    if (this.messageBuffer.length > 100) {
      this.messageBuffer.shift();
    }
  }

  /**
   * Obtém e limpa mensagens do buffer
   */
  async popMessages(): Promise<unknown[]> {
    const messages = [...this.messageBuffer];
    this.messageBuffer = [];
    return messages;
  }

  /**
   * Encerra a sessão
   */
  async destroy(): Promise<void> {
    this.session = null;
    this.messageBuffer = [];
    await this.ctx.storage.deleteAll();
  }

  /**
   * Handler HTTP para o Durable Object
   */
  async fetch(request: Request): Promise<Response> {
    const url = new URL(request.url);
    const path = url.pathname;

    switch (path) {
      case '/initialize':
        if (request.method !== 'POST') {
          return new Response('Method not allowed', { status: 405 });
        }
        const body = await request.json() as { clientInfo?: { name: string; version: string } };
        const session = await this.initialize(body.clientInfo);
        return Response.json(session);

      case '/session':
        const currentSession = await this.getSession();
        if (!currentSession) {
          return new Response('Session not found', { status: 404 });
        }
        return Response.json(currentSession);

      case '/touch':
        if (request.method !== 'POST') {
          return new Response('Method not allowed', { status: 405 });
        }
        await this.touch();
        return new Response('OK');

      case '/messages':
        if (request.method === 'POST') {
          const message = await request.json();
          await this.pushMessage(message);
          return new Response('OK');
        } else {
          const messages = await this.popMessages();
          return Response.json(messages);
        }

      case '/destroy':
        if (request.method !== 'POST') {
          return new Response('Method not allowed', { status: 405 });
        }
        await this.destroy();
        return new Response('OK');

      default:
        return new Response('Not found', { status: 404 });
    }
  }
}
