# SGP MCP Server

MCP Server para integração com o **SGP (Sistema de Gestão para Provedores)** de internet, desenvolvido para rodar no Cloudflare Workers.

## 🚀 Funcionalidades

Este MCP Server expõe **50+ ferramentas** para que assistentes de IA possam interagir com o SGP:

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

### Clientes
- `sgp_consultar_cliente` - Consulta clientes por CPF/CNPJ, telefone ou nome
- `sgp_detalhes_cliente` - Detalhes completos de um cliente

### Contratos
- `sgp_listar_contratos` - Lista contratos com filtros
- `sgp_detalhes_contrato` - Detalhes de um contrato
- `sgp_consultar_contrato_resumido` - Consulta rápida via URA

### Faturas
- `sgp_listar_faturas` - Lista faturas com filtros
- `sgp_detalhes_fatura` - Detalhes de uma fatura
- `sgp_segunda_via_fatura` - Gera segunda via
- `sgp_faturas_contrato` - Faturas de um contrato (URA)
- `sgp_listar_boletos` - Lista boletos
- `sgp_detalhes_boleto` - Detalhes de um boleto
- `sgp_gerar_boleto` - Gera novo boleto

### Chamados
- `sgp_listar_chamados` - Lista chamados com filtros
- `sgp_detalhes_chamado` - Detalhes de um chamado
- `sgp_abrir_chamado` - Abre novo chamado
- `sgp_interagir_chamado` - Adiciona interação
- `sgp_atribuir_chamado` - Atribui a atendente
- `sgp_finalizar_chamado` - Finaliza atendimento
- `sgp_listar_categorias_chamado` - Lista categorias
- `sgp_listar_interacoes_chamado` - Histórico de interações

### Ordens de Serviço
- `sgp_listar_ordens_servico` - Lista OS com filtros
- `sgp_detalhes_ordem_servico` - Detalhes de uma OS
- `sgp_criar_ordem_servico` - Cria nova OS
- `sgp_atualizar_status_ordem` - Atualiza status (iniciar, pausar, finalizar, etc.)
- `sgp_reagendar_ordem` - Reagenda OS
- `sgp_transferir_ordem` - Transfere para outro técnico
- `sgp_comentario_ordem` - Adiciona comentário
- `sgp_listar_comentarios_ordem` - Lista comentários
- `sgp_listar_tipos_os` - Lista tipos de OS
- `sgp_listar_tecnicos` - Lista técnicos
- `sgp_agenda_tecnico` - Consulta agenda de técnico

### FTTH
- `sgp_listar_onus` - Lista ONUs
- `sgp_detalhes_onu` - Detalhes de uma ONU
- `sgp_provisionar_onu` - Provisiona ONU
- `sgp_desprovisionar_onu` - Desprovisiona ONU
- `sgp_reiniciar_onu` - Reinicia ONU
- `sgp_status_onu` - Status em tempo real
- `sgp_listar_olts` - Lista OLTs
- `sgp_detalhes_olt` - Detalhes de uma OLT
- `sgp_listar_caixas` - Lista caixas (CTO/CEO)
- `sgp_detalhes_caixa` - Detalhes de uma caixa
- `sgp_listar_splitters` - Lista splitters
- `sgp_detalhes_splitter` - Detalhes de um splitter

### Estoque
- `sgp_listar_produtos` - Lista produtos
- `sgp_detalhes_produto` - Detalhes de um produto
- `sgp_listar_movimentacoes` - Lista movimentações
- `sgp_cadastrar_movimentacao` - Registra entrada/saída
- `sgp_listar_fornecedores` - Lista fornecedores
- `sgp_listar_categorias_estoque` - Lista categorias
- `sgp_listar_inventarios` - Lista inventários
- `sgp_detalhes_inventario` - Detalhes de um inventário

### RADIUS
- `sgp_listar_usuarios_radius` - Lista usuários RADIUS
- `sgp_detalhes_usuario_radius` - Detalhes de um usuário
- `sgp_bloquear_usuario_radius` - Bloqueia usuário
- `sgp_desbloquear_usuario_radius` - Desbloqueia usuário
- `sgp_resetar_senha_radius` - Reseta senha
- `sgp_listar_sessoes_radius` - Lista sessões
- `sgp_detalhes_sessao_radius` - Detalhes de uma sessão
- `sgp_encerrar_sessao_radius` - Encerra sessão
- `sgp_listar_grupos_radius` - Lista grupos
- `sgp_listar_nas` - Lista servidores NAS
- `sgp_detalhes_nas` - Detalhes de um NAS
- `sgp_listar_accounting_radius` - Histórico de accounting

## 📄 Licença

MIT

## 🤝 Suporte

Para dúvidas sobre a API do SGP, consulte a [documentação oficial](https://documenter.getpostman.com/view/6682240/UzXKVyUs).
