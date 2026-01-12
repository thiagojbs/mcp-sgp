/**
 * Schema do banco de dados D1
 * Define as tabelas utilizadas pelo MCP Server
 */

export const schema = `
-- Tabela de logs de auditoria
CREATE TABLE IF NOT EXISTS audit_logs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  timestamp TEXT NOT NULL DEFAULT (datetime('now')),
  session_id TEXT,
  action TEXT NOT NULL,
  tool_name TEXT,
  resource_uri TEXT,
  input_params TEXT,
  output_result TEXT,
  duration_ms INTEGER,
  error TEXT,
  client_ip TEXT,
  user_agent TEXT
);

-- Índices para consultas frequentes
CREATE INDEX IF NOT EXISTS idx_audit_logs_timestamp ON audit_logs(timestamp);
CREATE INDEX IF NOT EXISTS idx_audit_logs_session ON audit_logs(session_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_action ON audit_logs(action);

-- Tabela de cache de dados do SGP
CREATE TABLE IF NOT EXISTS sgp_cache (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL,
  expires_at TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- Índice para limpeza de cache expirado
CREATE INDEX IF NOT EXISTS idx_sgp_cache_expires ON sgp_cache(expires_at);

-- Tabela de sessões MCP
CREATE TABLE IF NOT EXISTS mcp_sessions (
  id TEXT PRIMARY KEY,
  client_name TEXT,
  client_version TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  last_activity TEXT NOT NULL DEFAULT (datetime('now')),
  metadata TEXT
);

-- Índice para limpeza de sessões inativas
CREATE INDEX IF NOT EXISTS idx_mcp_sessions_activity ON mcp_sessions(last_activity);

-- Tabela de métricas de uso
CREATE TABLE IF NOT EXISTS usage_metrics (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  date TEXT NOT NULL,
  tool_name TEXT NOT NULL,
  call_count INTEGER NOT NULL DEFAULT 0,
  error_count INTEGER NOT NULL DEFAULT 0,
  avg_duration_ms REAL,
  UNIQUE(date, tool_name)
);

-- Índice para consultas de métricas
CREATE INDEX IF NOT EXISTS idx_usage_metrics_date ON usage_metrics(date);
`;

/**
 * Tipos TypeScript para as tabelas
 */
export interface AuditLog {
  id: number;
  timestamp: string;
  session_id: string | null;
  action: string;
  tool_name: string | null;
  resource_uri: string | null;
  input_params: string | null;
  output_result: string | null;
  duration_ms: number | null;
  error: string | null;
  client_ip: string | null;
  user_agent: string | null;
}

export interface SgpCache {
  key: string;
  value: string;
  expires_at: string;
  created_at: string;
}

export interface McpSession {
  id: string;
  client_name: string | null;
  client_version: string | null;
  created_at: string;
  last_activity: string;
  metadata: string | null;
}

export interface UsageMetric {
  id: number;
  date: string;
  tool_name: string;
  call_count: number;
  error_count: number;
  avg_duration_ms: number | null;
}
