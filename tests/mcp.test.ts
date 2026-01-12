/**
 * Testes do MCP Server
 */

import { describe, it, expect, beforeAll } from 'vitest';
import { SELF } from 'cloudflare:test';

describe('MCP Server', () => {
  describe('Health Check', () => {
    it('should return health status', async () => {
      const response = await SELF.fetch('http://localhost/health');
      const data = await response.json() as { status: string };

      expect(response.status).toBe(200);
      expect(data).toHaveProperty('status');
    });

    it('should return liveness', async () => {
      const response = await SELF.fetch('http://localhost/health/live');
      const data = await response.json() as { alive: boolean };

      expect(response.status).toBe(200);
      expect(data.alive).toBe(true);
    });
  });

  describe('Root Endpoint', () => {
    it('should return server info', async () => {
      const response = await SELF.fetch('http://localhost/');
      const data = await response.json() as { name: string; version: string };

      expect(response.status).toBe(200);
      expect(data.name).toBe('MCP Server SGP');
      expect(data.version).toBe('0.1.0');
    });
  });

  describe('MCP Endpoints', () => {
    it('should return MCP server info', async () => {
      const response = await SELF.fetch('http://localhost/mcp/info');
      const data = await response.json() as { protocolVersion: string; serverInfo: { name: string } };

      expect(response.status).toBe(200);
      expect(data).toHaveProperty('protocolVersion');
      expect(data.serverInfo.name).toBe('mcp-sgp');
    });

    it('should list available tools', async () => {
      const response = await SELF.fetch('http://localhost/mcp/tools');
      const data = await response.json() as { tools: Array<{ name: string }> };

      expect(response.status).toBe(200);
      expect(data.tools).toBeInstanceOf(Array);
      expect(data.tools.length).toBeGreaterThan(0);
    });

    it('should list available resources', async () => {
      const response = await SELF.fetch('http://localhost/mcp/resources');
      const data = await response.json() as { resources: Array<{ uri: string }> };

      expect(response.status).toBe(200);
      expect(data.resources).toBeInstanceOf(Array);
    });

    it('should list available prompts', async () => {
      const response = await SELF.fetch('http://localhost/mcp/prompts');
      const data = await response.json() as { prompts: Array<{ name: string }> };

      expect(response.status).toBe(200);
      expect(data.prompts).toBeInstanceOf(Array);
    });
  });

  describe('MCP JSON-RPC', () => {
    it('should handle initialize request', async () => {
      const response = await SELF.fetch('http://localhost/mcp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jsonrpc: '2.0',
          id: 1,
          method: 'initialize',
          params: {
            protocolVersion: '2024-11-05',
            clientInfo: { name: 'test', version: '1.0.0' },
            capabilities: {},
          },
        }),
      });

      const data = await response.json() as { jsonrpc: string; id: number; result: { serverInfo: { name: string } } };

      expect(response.status).toBe(200);
      expect(data.jsonrpc).toBe('2.0');
      expect(data.id).toBe(1);
      expect(data.result.serverInfo.name).toBe('mcp-sgp');
    });

    it('should handle tools/list request', async () => {
      const response = await SELF.fetch('http://localhost/mcp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jsonrpc: '2.0',
          id: 2,
          method: 'tools/list',
        }),
      });

      const data = await response.json() as { result: { tools: Array<{ name: string }> } };

      expect(response.status).toBe(200);
      expect(data.result.tools).toBeInstanceOf(Array);
    });

    it('should handle ping request', async () => {
      const response = await SELF.fetch('http://localhost/mcp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jsonrpc: '2.0',
          id: 3,
          method: 'ping',
        }),
      });

      const data = await response.json() as { jsonrpc: string; id: number; result: Record<string, unknown> };

      expect(response.status).toBe(200);
      expect(data.result).toEqual({});
    });

    it('should return error for unknown method', async () => {
      const response = await SELF.fetch('http://localhost/mcp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jsonrpc: '2.0',
          id: 4,
          method: 'unknown/method',
        }),
      });

      const data = await response.json() as { error: { code: number } };

      expect(response.status).toBe(200);
      expect(data.error.code).toBe(-32601);
    });
  });
});
