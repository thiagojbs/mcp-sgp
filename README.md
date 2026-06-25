# SGP MCP Server

MCP Server para integração com o **SGP (Sistema de Gestão para Provedores)** de internet, desenvolvido para rodar no Cloudflare Workers.

## 🚀 Funcionalidades

Este MCP Server expõe **237 ferramentas** (uma por endpoint da API oficial do SGP) + 2 utilitárias (`sgp_configurar`, `sgp_status_conexao`), geradas a partir da especificação canônica em [`docs/endpoint-map.md`](docs/endpoint-map.md) (derivada da collection oficial do Postman). Para que assistentes de IA possam interagir com o SGP:

### Clientes e Contratos
- Consultar clientes por CPF/CNPJ, telefone ou nome
- Listar e detalhar contratos
- Verificar status e pendências

### Financeiro
- Listar faturas (abertas, pagas, vencidas)
- Gerar segunda via de faturas
- Consultar e gerar boletos

### Suporte
- Abrir e gerenciar chamados
- Adicionar interações
- Atribuir a atendentes
- Finalizar atendimentos

### Ordens de Serviço
- Criar OS de instalação, manutenção, etc.
- Agendar e reagendar serviços
- Transferir entre técnicos
- Consultar agenda de técnicos

### FTTH (Rede Óptica)
- Gerenciar ONUs (provisionar, reiniciar, status)
- Consultar OLTs
- Gerenciar caixas (CTO/CEO)
- Consultar splitters

### Estoque
- Listar produtos e categorias
- Registrar movimentações (entrada/saída)
- Consultar fornecedores
- Gerenciar inventários

### RADIUS
- Gerenciar usuários RADIUS
- Bloquear/desbloquear conexões
- Monitorar sessões ativas
- Encerrar sessões
- Consultar accounting

## 📦 Instalação

### 1. Clone ou copie o projeto

```bash
# Se estiver usando como template
npm create cloudflare@latest -- sgp-mcp-server --template=cloudflare/ai/demos/remote-mcp-authless
# Ou simplesmente copie os arquivos para seu projeto
```

### 2. Instale as dependências

```bash
cd sgp-mcp-server
npm install
```

### 3. Configure as credenciais

Edite o arquivo `wrangler.toml` ou use secrets:

```bash
# URL do seu SGP
wrangler secret put SGP_API_URL
# Digite: https://seu-provedor.sgp.net.br/api

# Para autenticação por Token (recomendado)
wrangler secret put SGP_TOKEN
wrangler secret put SGP_APP

# OU para autenticação Basic
wrangler secret put SGP_USERNAME
wrangler secret put SGP_PASSWORD
```

### 4. Deploy

```bash
# Login na Cloudflare
npx wrangler login

# Deploy
npx wrangler deploy
```

Após o deploy, seu MCP Server estará disponível em:
```
https://sgp-mcp-server.<seu-account>.workers.dev
```

## 🔧 Configuração

### Variáveis de Ambiente

| Variável | Descrição | Obrigatório |
|----------|-----------|-------------|
| `SGP_API_URL` | URL base da API do SGP | Sim |
| `SGP_AUTH_TYPE` | Tipo de autenticação: `basic` ou `token` | Não (padrão: token) |
| `SGP_TOKEN` | Token de API (se auth_type=token) | Condicional |
| `SGP_APP` | Nome do app (se auth_type=token) | Condicional |
| `SGP_USERNAME` | Usuário (se auth_type=basic) | Condicional |
| `SGP_PASSWORD` | Senha (se auth_type=basic) | Condicional |

### Exemplo de wrangler.toml

```toml
name = "sgp-mcp-server"
main = "src/index.ts"
compatibility_date = "2024-12-01"
compatibility_flags = ["nodejs_compat"]

[vars]
SGP_API_URL = "https://demo.sgp.net.br/api"
SGP_AUTH_TYPE = "token"
```

## 🔌 Conectando Clientes MCP

### Claude Desktop

Adicione ao seu `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "sgp": {
      "command": "npx",
      "args": [
        "mcp-remote",
        "https://sgp-mcp-server.<seu-account>.workers.dev/sse"
      ]
    }
  }
}
```

### Cloudflare AI Playground

1. Acesse: https://playground.ai.cloudflare.com/
2. Clique em "Add MCP Server"
3. Cole a URL: `https://sgp-mcp-server.<seu-account>.workers.dev/sse`

### Outros Clientes MCP

Use o endpoint `/mcp` para Streamable HTTP ou `/sse` para Server-Sent Events.

## 📚 Endpoints

| Endpoint | Descrição |
|----------|-----------|
| `/` ou `/health` | Health check |
| `/tools` | Lista todas as ferramentas disponíveis |
| `/mcp` | Endpoint MCP (Streamable HTTP) |
| `/sse` | Endpoint MCP (Server-Sent Events) |

## 🛠️ Desenvolvimento Local

```bash
# Rodar localmente
npm run dev

# O servidor estará em http://localhost:8787
```

Para testar com o MCP Inspector:
```bash
npx @anthropic/mcp-inspector http://localhost:8787/sse
```

## 📋 Lista de Ferramentas

As **237 tools** são geradas automaticamente a partir da especificação oficial
(uma por endpoint real do SGP). A lista completa e detalhada — com método HTTP,
caminho, parâmetros de caminho/query/corpo — está em
[`docs/endpoint-map.md`](docs/endpoint-map.md).

Convenção de nomes: `sgp_<seção>_<ação>` (ex.: `sgp_ura_cliente_consultar`,
`sgp_ftth_listar_onu`, `sgp_os_ordem_de_servico_criar`).

| Seção | Tools | Prefixo |
|---|---|---|
| Central Assinante | 33 | `sgp_central_*` |
| URA | 69 | `sgp_ura_*` |
| FTTH | 29 | `sgp_ftth_*` |
| Estoque | 32 | `sgp_estoque_*` |
| Ordem de Serviço | 26 | `sgp_os_*` |
| CRM | 12 | `sgp_crm_*` |
| Gerenciador CPE | 12 | `sgp_cpe_*` |
| Suporte | 9 | `sgp_suporte_*` |
| Pré-Cadastro | 5 | `sgp_precadastro_*` |
| RADIUS | 5 | `sgp_radius_*` |
| Remessa / Retorno | 2 | `sgp_remessa_*` |
| Termo de Aceite | 2 | `sgp_termo_*` |
| Outros | 1 | `sgp_outros_*` |
| **Total** | **237** | + `sgp_configurar`, `sgp_status_conexao` |

> Fonte da verdade: `docs/sgp-api-spec.postman_collection.json` → `src/spec/sgp-endpoints.ts`.
> Para regenerar após uma atualização da API, reimporte a collection e rode o gerador.

## 📄 Licença

MIT

## 🤝 Suporte

Para dúvidas sobre a API do SGP, consulte a [documentação oficial](https://documenter.getpostman.com/view/6682240/UzXKVyUs).
