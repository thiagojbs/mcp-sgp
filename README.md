# MCP Server SGP

Servidor MCP (Model Context Protocol) para integração com o SGP (Sistema de Gestão de Provedores de Internet).

## Stack Tecnológica

Este projeto utiliza **100% infraestrutura Cloudflare**:

| Componente | Tecnologia | Função |
|------------|------------|--------|
| Runtime | Cloudflare Workers | Serverless na edge |
| Linguagem | TypeScript | Type safety |
| Framework | Hono.js | API HTTP |
| Database | Cloudflare D1 | SQLite na edge |
| Cache | Cloudflare KV | Key-value store |
| Storage | Cloudflare R2 | Object storage |
| Queues | Cloudflare Queues | Processamento async |
| State | Durable Objects | Estado persistente |
| DB Proxy | Hyperdrive | Conexão com SGP |

## Funcionalidades MCP

### Tools (Ações)

- `sgp_buscar_cliente` - Busca clientes por ID, CPF/CNPJ ou nome
- `sgp_listar_contratos` - Lista contratos de um cliente
- `sgp_consultar_faturas` - Consulta faturas e boletos
- `sgp_abrir_chamado` - Abre chamados de suporte
- `sgp_verificar_conexao` - Verifica status da conexão
- `sgp_gerar_segunda_via` - Gera segunda via de boletos

### Resources (Dados)

- `sgp://planos/internet` - Planos disponíveis
- `sgp://cliente/{id}` - Dados do cliente
- `sgp://dashboard/metricas` - Métricas gerais
- `sgp://chamados/abertos` - Chamados em aberto
- `sgp://faturas/vencidas` - Inadimplência
- `sgp://rede/status` - Status da rede

### Prompts (Templates)

- `atendimento_cliente` - Contexto completo para atendimento
- `analise_inadimplencia` - Análise de débitos
- `diagnostico_conexao` - Diagnóstico técnico
- `relatorio_diario` - Resumo operacional

## Início Rápido

### Pré-requisitos

- Node.js 18+
- Conta Cloudflare com Workers habilitado
- Wrangler CLI

### Instalação

```bash
# Clone o repositório
git clone https://github.com/thiagojbs/mcp-sgp.git
cd mcp-sgp

# Instale as dependências
npm install

# Configure as variáveis de ambiente
cp wrangler.toml.example wrangler.toml
# Edite wrangler.toml com suas configurações
```

### Configuração do Cloudflare

```bash
# Crie o banco D1
wrangler d1 create mcp-sgp-db

# Crie o namespace KV
wrangler kv:namespace create KV

# Crie o bucket R2
wrangler r2 bucket create mcp-sgp-storage

# Crie a queue
wrangler queues create mcp-sgp-tasks

# Configure os secrets
wrangler secret put SGP_API_URL
wrangler secret put SGP_API_KEY
wrangler secret put SGP_API_SECRET
```

### Desenvolvimento Local

```bash
# Inicia o servidor de desenvolvimento
npm run dev

# Executa os testes
npm test

# Verifica tipos
npm run typecheck
```

### Deploy

```bash
# Deploy para produção
npm run deploy

# Aplica migrations do banco
npm run db:migrate
```

## Endpoints da API

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/` | Informações do servidor |
| GET | `/health` | Health check completo |
| GET | `/health/ready` | Readiness probe |
| GET | `/health/live` | Liveness probe |
| POST | `/mcp` | Endpoint JSON-RPC do MCP |
| GET | `/mcp/sse` | Server-Sent Events |
| GET | `/mcp/info` | Informações do MCP |
| GET | `/mcp/tools` | Lista tools |
| GET | `/mcp/resources` | Lista resources |
| GET | `/mcp/prompts` | Lista prompts |

## Uso com Claude

Configure o MCP Server no seu cliente Claude:

```json
{
  "mcpServers": {
    "sgp": {
      "url": "https://mcp-sgp.your-domain.workers.dev/mcp",
      "transport": "http"
    }
  }
}
```

## Estrutura do Projeto

```
mcp-sgp/
├── src/
│   ├── index.ts              # Entry point
│   ├── types.ts              # Tipos globais
│   ├── mcp/
│   │   ├── server.ts         # MCP Server
│   │   ├── session.ts        # Durable Object
│   │   ├── tools/            # Tools do MCP
│   │   ├── resources/        # Resources do MCP
│   │   └── prompts/          # Prompts do MCP
│   ├── sgp/
│   │   └── client.ts         # Cliente API SGP
│   ├── routes/
│   │   ├── health.ts         # Health checks
│   │   └── mcp.ts            # Rotas MCP
│   ├── db/
│   │   ├── schema.ts         # Schema D1
│   │   └── migrations/       # Migrations SQL
│   └── utils/
│       ├── auth.ts           # Autenticação
│       └── logger.ts         # Logging
├── tests/                    # Testes
├── wrangler.toml             # Config Cloudflare
├── package.json
├── tsconfig.json
└── README.md
```

## Licença

MIT
