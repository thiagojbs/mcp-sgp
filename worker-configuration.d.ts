// Tipos gerados automaticamente para bindings do Cloudflare Worker
// Executar `npm run cf-typegen` para atualizar

interface Env {
  // Variáveis de ambiente
  ENVIRONMENT: string;
  SGP_API_VERSION: string;
  LOG_LEVEL: string;

  // Secrets (configurar via wrangler secret put)
  SGP_API_URL: string;
  SGP_API_KEY: string;
  SGP_API_SECRET: string;

  // Cloudflare D1 Database
  DB: D1Database;

  // Cloudflare KV Namespace
  KV: KVNamespace;

  // Cloudflare R2 Bucket
  R2: R2Bucket;

  // Cloudflare Queue
  QUEUE: Queue<QueueMessage>;

  // Durable Objects
  MCP_SESSION: DurableObjectNamespace;

  // Hyperdrive (conexão com banco SGP)
  HYPERDRIVE: Hyperdrive;
}

// Tipos para mensagens da Queue
interface QueueMessage {
  type: string;
  payload: Record<string, unknown>;
  timestamp: number;
}

// Tipos para Durable Objects
declare class McpSessionDO extends DurableObject {
  constructor(state: DurableObjectState, env: Env);
}
