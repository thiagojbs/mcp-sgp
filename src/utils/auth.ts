/**
 * Utilitários de autenticação
 */

import { Hono } from 'hono';
import type { AppContext } from '../types';

interface TokenPayload {
  sub: string;
  iat: number;
  exp: number;
  scope?: string[];
}

/**
 * Verifica se um token Bearer é válido
 */
export async function verifyBearerToken(
  token: string,
  env: Env
): Promise<TokenPayload | null> {
  try {
    // Em produção, implementar verificação JWT adequada
    // Por enquanto, verifica apenas se o token corresponde a uma API key válida
    const storedToken = await env.KV.get(`auth:token:${token}`);

    if (!storedToken) {
      return null;
    }

    const payload = JSON.parse(storedToken) as TokenPayload;

    // Verifica expiração
    if (payload.exp && payload.exp < Date.now() / 1000) {
      return null;
    }

    return payload;
  } catch {
    return null;
  }
}

/**
 * Middleware de autenticação
 */
export function authMiddleware() {
  return async (c: ReturnType<typeof Hono.prototype.get> extends (path: string, handler: infer H) => unknown ? Parameters<H>[0] : never, next: () => Promise<void>) => {
    const authHeader = c.req.header('Authorization');

    if (!authHeader?.startsWith('Bearer ')) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const token = authHeader.slice(7);
    const ctx = c as unknown as { env: Env; set: (key: string, value: unknown) => void };
    const payload = await verifyBearerToken(token, ctx.env);

    if (!payload) {
      return c.json({ error: 'Invalid token' }, 401);
    }

    ctx.set('auth', payload);
    await next();
  };
}

/**
 * Gera um token de API para um cliente
 */
export async function generateApiToken(
  clientId: string,
  env: Env,
  expiresIn: number = 86400 // 24 horas
): Promise<string> {
  const token = crypto.randomUUID();

  const payload: TokenPayload = {
    sub: clientId,
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + expiresIn,
  };

  await env.KV.put(
    `auth:token:${token}`,
    JSON.stringify(payload),
    { expirationTtl: expiresIn }
  );

  return token;
}

/**
 * Revoga um token de API
 */
export async function revokeApiToken(token: string, env: Env): Promise<void> {
  await env.KV.delete(`auth:token:${token}`);
}

/**
 * Verifica permissões de escopo
 */
export function hasScope(payload: TokenPayload, requiredScope: string): boolean {
  if (!payload.scope) {
    return false;
  }

  return payload.scope.includes(requiredScope) || payload.scope.includes('*');
}
