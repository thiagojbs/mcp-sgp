/**
 * Prompts do MCP - Templates de prompts para interações comuns
 */

import type { SgpClient } from '../../sgp/client';
import type { McpContent, McpPromptArgument } from '../../types';

export interface PromptDefinition {
  name: string;
  description: string;
  arguments?: McpPromptArgument[];
  handler: (
    args: Record<string, string>,
    sgpClient: SgpClient,
    env: Env
  ) => Promise<Array<{ role: string; content: McpContent }>>;
}

/**
 * Prompt: Atendimento ao Cliente
 */
const atendimentoCliente: PromptDefinition = {
  name: 'atendimento_cliente',
  description: 'Inicia um atendimento ao cliente com contexto completo',
  arguments: [
    {
      name: 'clienteId',
      description: 'ID do cliente a ser atendido',
      required: true,
    },
    {
      name: 'motivo',
      description: 'Motivo do contato (opcional)',
      required: false,
    },
  ],
  handler: async (args, sgpClient) => {
    const { clienteId, motivo } = args;

    try {
      // Busca informações do cliente
      const cliente = await sgpClient.clientes.obter(clienteId);
      const contratos = await sgpClient.contratos.listarPorCliente(clienteId);
      const faturas = await sgpClient.faturas.consultar(clienteId, { status: 'aberta', limite: 5 });
      const chamados = await sgpClient.chamados.listarPorCliente(clienteId, { limite: 3 });

      const contexto = `
## Contexto do Atendimento

### Dados do Cliente
- **Nome:** ${cliente.nome}
- **Documento:** ${cliente.documento}
- **Email:** ${cliente.email}
- **Telefone:** ${cliente.telefone}
- **Endereço:** ${cliente.endereco}

### Contratos Ativos
${contratos.map((c: { id: string; plano: string; status: string; valor: number }) => `- ${c.id}: ${c.plano} (${c.status}) - R$ ${c.valor}`).join('\n')}

### Faturas em Aberto
${faturas.length > 0 ? faturas.map((f: { id: string; vencimento: string; valor: number; status: string }) => `- ${f.id}: Venc. ${f.vencimento} - R$ ${f.valor} (${f.status})`).join('\n') : 'Nenhuma fatura em aberto'}

### Últimos Chamados
${chamados.length > 0 ? chamados.map((ch: { id: string; titulo: string; status: string }) => `- ${ch.id}: ${ch.titulo} (${ch.status})`).join('\n') : 'Nenhum chamado recente'}

${motivo ? `### Motivo do Contato\n${motivo}` : ''}

---

Você está atendendo este cliente. Use as tools disponíveis para ajudá-lo com suas solicitações.
`;

      return [{
        role: 'user',
        content: { type: 'text', text: contexto },
      }];
    } catch (error) {
      return [{
        role: 'user',
        content: {
          type: 'text',
          text: `Erro ao carregar contexto do cliente: ${error instanceof Error ? error.message : 'Erro desconhecido'}`,
        },
      }];
    }
  },
};

/**
 * Prompt: Análise de Inadimplência
 */
const analiseInadimplencia: PromptDefinition = {
  name: 'analise_inadimplencia',
  description: 'Analisa a situação de inadimplência de um cliente',
  arguments: [
    {
      name: 'clienteId',
      description: 'ID do cliente para análise',
      required: true,
    },
  ],
  handler: async (args, sgpClient) => {
    const { clienteId } = args;

    try {
      const cliente = await sgpClient.clientes.obter(clienteId);
      const faturasVencidas = await sgpClient.faturas.consultar(clienteId, { status: 'vencida' });
      const historicoPagamentos = await sgpClient.faturas.historicoPagamentos(clienteId);

      const totalDivida = faturasVencidas.reduce((acc: number, f: { valor: number }) => acc + f.valor, 0);

      const contexto = `
## Análise de Inadimplência

### Cliente
- **Nome:** ${cliente.nome}
- **Documento:** ${cliente.documento}
- **Cliente desde:** ${cliente.dataCadastro}

### Situação Atual
- **Total em Dívida:** R$ ${totalDivida.toFixed(2)}
- **Faturas Vencidas:** ${faturasVencidas.length}

### Faturas Vencidas
${faturasVencidas.map((f: { id: string; vencimento: string; valor: number; diasAtraso: number }) => `- ${f.id}: Venc. ${f.vencimento} - R$ ${f.valor} (${f.diasAtraso} dias de atraso)`).join('\n')}

### Histórico de Pagamentos (últimos 6 meses)
- Pagamentos em dia: ${historicoPagamentos.emDia}
- Pagamentos atrasados: ${historicoPagamentos.atrasados}
- Taxa de pontualidade: ${historicoPagamentos.taxaPontualidade}%

---

Analise a situação deste cliente e sugira as melhores ações para recuperação do débito.
`;

      return [{
        role: 'user',
        content: { type: 'text', text: contexto },
      }];
    } catch (error) {
      return [{
        role: 'user',
        content: {
          type: 'text',
          text: `Erro ao carregar análise: ${error instanceof Error ? error.message : 'Erro desconhecido'}`,
        },
      }];
    }
  },
};

/**
 * Prompt: Diagnóstico de Conexão
 */
const diagnosticoConexao: PromptDefinition = {
  name: 'diagnostico_conexao',
  description: 'Realiza diagnóstico completo da conexão de um cliente',
  arguments: [
    {
      name: 'clienteId',
      description: 'ID do cliente',
      required: true,
    },
    {
      name: 'sintomas',
      description: 'Descrição dos sintomas reportados',
      required: false,
    },
  ],
  handler: async (args, sgpClient) => {
    const { clienteId, sintomas } = args;

    try {
      const cliente = await sgpClient.clientes.obter(clienteId);
      const contrato = await sgpClient.contratos.listarPorCliente(clienteId, 'ativo');
      const statusConexao = await sgpClient.conexao.verificar(clienteId);
      const historicoConexao = await sgpClient.conexao.historico(clienteId);

      const contexto = `
## Diagnóstico de Conexão

### Cliente
- **Nome:** ${cliente.nome}
- **Endereço:** ${cliente.endereco}

### Plano Contratado
- **Plano:** ${contrato[0]?.plano ?? 'N/A'}
- **Velocidade:** ${contrato[0]?.velocidade ?? 'N/A'}

### Status Atual da Conexão
- **Status:** ${statusConexao.status}
- **IP:** ${statusConexao.ip}
- **Uptime:** ${statusConexao.uptime}
- **Sinal ONT:** ${statusConexao.sinalOnt ?? 'N/A'}
- **Última Autenticação:** ${statusConexao.ultimaAutenticacao}

### Histórico (últimas 24h)
- Quedas detectadas: ${historicoConexao.quedas}
- Tempo offline total: ${historicoConexao.tempoOffline}
- Reconexões: ${historicoConexao.reconexoes}

${sintomas ? `### Sintomas Reportados\n${sintomas}` : ''}

---

Com base nessas informações, realize o diagnóstico e sugira as ações necessárias.
`;

      return [{
        role: 'user',
        content: { type: 'text', text: contexto },
      }];
    } catch (error) {
      return [{
        role: 'user',
        content: {
          type: 'text',
          text: `Erro ao realizar diagnóstico: ${error instanceof Error ? error.message : 'Erro desconhecido'}`,
        },
      }];
    }
  },
};

/**
 * Prompt: Relatório Diário
 */
const relatorioDiario: PromptDefinition = {
  name: 'relatorio_diario',
  description: 'Gera um resumo das operações do dia',
  arguments: [],
  handler: async (_args, sgpClient) => {
    try {
      const metricas = await sgpClient.dashboard.metricas();
      const chamadosHoje = await sgpClient.chamados.listarHoje();
      const instalacoes = await sgpClient.ordens.listarHoje('instalacao');
      const cancelamentos = await sgpClient.ordens.listarHoje('cancelamento');

      const contexto = `
## Relatório Diário - ${new Date().toLocaleDateString('pt-BR')}

### Métricas Gerais
- **Clientes Ativos:** ${metricas.clientesAtivos}
- **Taxa de Inadimplência:** ${metricas.taxaInadimplencia}%
- **Ticket Médio:** R$ ${metricas.ticketMedio}

### Operações do Dia
- **Novos Chamados:** ${chamadosHoje.novos}
- **Chamados Resolvidos:** ${chamadosHoje.resolvidos}
- **Chamados Pendentes:** ${chamadosHoje.pendentes}

### Instalações
- **Agendadas:** ${instalacoes.agendadas}
- **Concluídas:** ${instalacoes.concluidas}
- **Pendentes:** ${instalacoes.pendentes}

### Cancelamentos
- **Solicitados:** ${cancelamentos.solicitados}
- **Processados:** ${cancelamentos.processados}

---

Analise esses dados e forneça insights sobre as operações do dia.
`;

      return [{
        role: 'user',
        content: { type: 'text', text: contexto },
      }];
    } catch (error) {
      return [{
        role: 'user',
        content: {
          type: 'text',
          text: `Erro ao gerar relatório: ${error instanceof Error ? error.message : 'Erro desconhecido'}`,
        },
      }];
    }
  },
};

// Exporta todos os prompts
export const prompts: PromptDefinition[] = [
  atendimentoCliente,
  analiseInadimplencia,
  diagnosticoConexao,
  relatorioDiario,
];
