/**
 * Cliente HTTP para a API do SGP
 * Suporta autenticação por Basic Auth e Token
 */

export interface SGPConfig {
  baseUrl: string;
  authType: 'basic' | 'token';
  username?: string;
  password?: string;
  token?: string;
  app?: string;
}

export interface SGPResponse<T = unknown> {
  status: 'success' | 'error';
  message: string;
  data?: T;
  errors?: Record<string, string[]>;
}

export interface PaginatedResponse<T> {
  current_page: number;
  data: T[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
}

export class SGPClient {
  private config: SGPConfig;

  constructor(config: SGPConfig) {
    this.config = config;
  }

  private getAuthHeaders(): Record<string, string> {
    if (this.config.authType === 'basic' && this.config.username && this.config.password) {
      const credentials = btoa(`${this.config.username}:${this.config.password}`);
      return {
        'Authorization': `Basic ${credentials}`
      };
    }
    return {};
  }

  private getAuthParams(): URLSearchParams {
    const params = new URLSearchParams();
    if (this.config.authType === 'token' && this.config.token) {
      params.set('token', this.config.token);
      if (this.config.app) {
        params.set('app', this.config.app);
      }
    }
    return params;
  }

  private buildUrl(endpoint: string, queryParams?: Record<string, string | number | undefined>): string {
    const url = new URL(`${this.config.baseUrl}${endpoint}`);

    // Adiciona parâmetros de autenticação por token
    const authParams = this.getAuthParams();
    authParams.forEach((value, key) => url.searchParams.set(key, value));

    // Adiciona parâmetros adicionais
    if (queryParams) {
      Object.entries(queryParams).forEach(([key, value]) => {
        if (value !== undefined) {
          url.searchParams.set(key, String(value));
        }
      });
    }

    return url.toString();
  }

  async get<T>(endpoint: string, queryParams?: Record<string, string | number | undefined>): Promise<SGPResponse<T>> {
    const url = this.buildUrl(endpoint, queryParams);

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...this.getAuthHeaders()
      }
    });

    return response.json() as Promise<SGPResponse<T>>;
  }

  async post<T>(endpoint: string, body?: Record<string, unknown>): Promise<SGPResponse<T>> {
    const url = this.buildUrl(endpoint);

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...this.getAuthHeaders()
      },
      body: body ? JSON.stringify(body) : undefined
    });

    return response.json() as Promise<SGPResponse<T>>;
  }

  async put<T>(endpoint: string, body?: Record<string, unknown>): Promise<SGPResponse<T>> {
    const url = this.buildUrl(endpoint);

    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...this.getAuthHeaders()
      },
      body: body ? JSON.stringify(body) : undefined
    });

    return response.json() as Promise<SGPResponse<T>>;
  }

  async delete<T>(endpoint: string): Promise<SGPResponse<T>> {
    const url = this.buildUrl(endpoint);

    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        ...this.getAuthHeaders()
      }
    });

    return response.json() as Promise<SGPResponse<T>>;
  }
}
