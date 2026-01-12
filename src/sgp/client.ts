/**
 * Cliente HTTP para comunicação com a API do SGP
 */

export interface SgpClientConfig {
  baseUrl: string;
  apiKey: string;
  apiSecret: string;
  version: string;
}

export interface SgpClient {
  clientes: ClientesModule;
  contratos: ContratosModule;
  faturas: FaturasModule;
  chamados: ChamadosModule;
  conexao: ConexaoModule;
  planos: PlanosModule;
  dashboard: DashboardModule;
  rede: RedeModule;
  ordens: OrdensModule;
}

// Interfaces dos módulos
interface ClientesModule {
  buscar: (query: string, tipo?: string) => Promise<unknown>;
  obter: (id: string) => Promise<Cliente>;
  listar: (filtros?: Record<string, unknown>) => Promise<unknown[]>;
}

interface ContratosModule {
  listarPorCliente: (clienteId: string, status?: string) => Promise<unknown[]>;
  obter: (id: string) => Promise<unknown>;
}

interface FaturasModule {
  consultar: (clienteId: string, filtros?: Record<string, unknown>) => Promise<unknown[]>;
  listarVencidas: () => Promise<unknown[]>;
  gerarSegundaVia: (faturaId: string, novaData?: string) => Promise<unknown>;
  historicoPagamentos: (clienteId: string) => Promise<HistoricoPagamentos>;
}

interface ChamadosModule {
  abrir: (dados: ChamadoDados) => Promise<unknown>;
  listarAbertos: () => Promise<unknown[]>;
  listarPorCliente: (clienteId: string, filtros?: Record<string, unknown>) => Promise<unknown[]>;
  listarHoje: () => Promise<ChamadosHoje>;
}

interface ConexaoModule {
  verificar: (clienteId: string, contratoId?: string) => Promise<StatusConexao>;
  historico: (clienteId: string) => Promise<HistoricoConexao>;
}

interface PlanosModule {
  listar: () => Promise<unknown[]>;
  obter: (id: string) => Promise<unknown>;
}

interface DashboardModule {
  metricas: () => Promise<Metricas>;
}

interface RedeModule {
  status: () => Promise<unknown>;
}

interface OrdensModule {
  listarHoje: (tipo: string) => Promise<OrdensHoje>;
}

// Tipos auxiliares
interface Cliente {
  id: string;
  nome: string;
  documento: string;
  email: string;
  telefone: string;
  endereco: string;
  dataCadastro: string;
}

interface ChamadoDados {
  clienteId: string;
  categoria: string;
  titulo: string;
  descricao: string;
  prioridade: string;
}

interface StatusConexao {
  status: string;
  ip: string;
  uptime: string;
  sinalOnt?: string;
  ultimaAutenticacao: string;
}

interface HistoricoConexao {
  quedas: number;
  tempoOffline: string;
  reconexoes: number;
}

interface HistoricoPagamentos {
  emDia: number;
  atrasados: number;
  taxaPontualidade: number;
}

interface Metricas {
  clientesAtivos: number;
  taxaInadimplencia: number;
  ticketMedio: number;
}

interface ChamadosHoje {
  novos: number;
  resolvidos: number;
  pendentes: number;
}

interface OrdensHoje {
  agendadas: number;
  concluidas: number;
  pendentes: number;
  solicitados?: number;
  processados?: number;
}

/**
 * Classe base para requisições HTTP
 */
class HttpClient {
  private baseUrl: string;
  private headers: Record<string, string>;

  constructor(config: SgpClientConfig) {
    this.baseUrl = config.baseUrl;
    this.headers = {
      'Content-Type': 'application/json',
      'X-API-Key': config.apiKey,
      'X-API-Secret': config.apiSecret,
      'X-API-Version': config.version,
    };
  }

  async get<T>(path: string, params?: Record<string, string>): Promise<T> {
    const url = new URL(`${this.baseUrl}${path}`);
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        url.searchParams.append(key, value);
      });
    }

    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: this.headers,
    });

    if (!response.ok) {
      throw new Error(`SGP API Error: ${response.status} ${response.statusText}`);
    }

    return response.json() as Promise<T>;
  }

  async post<T>(path: string, body: unknown): Promise<T> {
    const response = await fetch(`${this.baseUrl}${path}`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(`SGP API Error: ${response.status} ${response.statusText}`);
    }

    return response.json() as Promise<T>;
  }
}

/**
 * Cria uma instância do cliente SGP
 */
export function createSgpClient(env: Env): SgpClient {
  const config: SgpClientConfig = {
    baseUrl: env.SGP_API_URL ?? 'https://api.sgp.example.com',
    apiKey: env.SGP_API_KEY ?? '',
    apiSecret: env.SGP_API_SECRET ?? '',
    version: env.SGP_API_VERSION ?? 'v1',
  };

  const http = new HttpClient(config);

  return {
    clientes: {
      buscar: (query, tipo) => http.get('/clientes/buscar', { query, tipo: tipo ?? 'auto' }),
      obter: (id) => http.get(`/clientes/${id}`),
      listar: (filtros) => http.get('/clientes', filtros as Record<string, string>),
    },

    contratos: {
      listarPorCliente: (clienteId, status) =>
        http.get(`/clientes/${clienteId}/contratos`, status ? { status } : undefined),
      obter: (id) => http.get(`/contratos/${id}`),
    },

    faturas: {
      consultar: (clienteId, filtros) =>
        http.get(`/clientes/${clienteId}/faturas`, filtros as Record<string, string>),
      listarVencidas: () => http.get('/faturas/vencidas'),
      gerarSegundaVia: (faturaId, novaData) =>
        http.post(`/faturas/${faturaId}/segunda-via`, { novaDataVencimento: novaData }),
      historicoPagamentos: (clienteId) =>
        http.get(`/clientes/${clienteId}/historico-pagamentos`),
    },

    chamados: {
      abrir: (dados) => http.post('/chamados', dados),
      listarAbertos: () => http.get('/chamados', { status: 'aberto' }),
      listarPorCliente: (clienteId, filtros) =>
        http.get(`/clientes/${clienteId}/chamados`, filtros as Record<string, string>),
      listarHoje: () => http.get('/chamados/hoje'),
    },

    conexao: {
      verificar: (clienteId, contratoId) =>
        http.get(`/clientes/${clienteId}/conexao`, contratoId ? { contratoId } : undefined),
      historico: (clienteId) => http.get(`/clientes/${clienteId}/conexao/historico`),
    },

    planos: {
      listar: () => http.get('/planos'),
      obter: (id) => http.get(`/planos/${id}`),
    },

    dashboard: {
      metricas: () => http.get('/dashboard/metricas'),
    },

    rede: {
      status: () => http.get('/rede/status'),
    },

    ordens: {
      listarHoje: (tipo) => http.get('/ordens/hoje', { tipo }),
    },
  };
}
