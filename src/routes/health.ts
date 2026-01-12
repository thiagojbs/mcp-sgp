/**
 * Rotas de Health Check
 */

import { Hono } from 'hono';
import type { AppContext } from '../types';

export const healthCheck = new Hono<AppContext>();

healthCheck.get('/', async (c) => {
  const startTime = Date.now();

  // Verifica conectividade com D1
  let dbStatus = 'unknown';
  try {
    await c.env.DB.prepare('SELECT 1').first();
    dbStatus = 'healthy';
  } catch {
    dbStatus = 'unhealthy';
  }

  // Verifica conectividade com KV
  let kvStatus = 'unknown';
  try {
    await c.env.KV.get('health-check');
    kvStatus = 'healthy';
  } catch {
    kvStatus = 'unhealthy';
  }

  const responseTime = Date.now() - startTime;

  return c.json({
    status: dbStatus === 'healthy' && kvStatus === 'healthy' ? 'healthy' : 'degraded',
    timestamp: new Date().toISOString(),
    responseTime: `${responseTime}ms`,
    version: '0.1.0',
    services: {
      database: dbStatus,
      cache: kvStatus,
    },
    environment: c.env.ENVIRONMENT,
  });
});

healthCheck.get('/ready', async (c) => {
  // Readiness check - verifica se o serviço está pronto para receber tráfego
  try {
    await c.env.DB.prepare('SELECT 1').first();
    return c.json({ ready: true });
  } catch {
    return c.json({ ready: false }, 503);
  }
});

healthCheck.get('/live', (c) => {
  // Liveness check - verifica se o serviço está vivo
  return c.json({ alive: true });
});
