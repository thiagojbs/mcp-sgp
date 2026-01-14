/**
 * Ferramentas MCP para gestão de RADIUS
 * Usuários, Grupos, NAS e Sessões
 */

import { z } from 'zod';
import { SGPClient } from '../sgp-client';

// Schemas
export const listarUsuariosRADIUSSchema = z.object({
  status: z.enum(['ativo', 'bloqueado', 'todos']).optional().default('todos'),
  grupo_id: z.number().optional().describe('ID do grupo RADIUS'),
  username: z.string().optional().describe('Username para busca'),
  page: z.number().optional().default(1),
  per_page: z.number().optional().default(20)
});

export const detalhesUsuarioRADIUSSchema = z.object({
  usuario_id: z.number().describe('ID do usuário RADIUS')
});

export const bloquearUsuarioSchema = z.object({
  usuario_id: z.number().describe('ID do usuário RADIUS'),
  motivo: z.string().optional().describe('Motivo do bloqueio')
});

export const listarSessoesSchema = z.object({
  usuario_id: z.number().optional().describe('ID do usuário RADIUS'),
  nas_id: z.number().optional().describe('ID do NAS'),
  ativa: z.boolean().optional().describe('Filtrar apenas sessões ativas'),
  page: z.number().optional().default(1),
  per_page: z.number().optional().default(20)
});

export const detalhesSessaoSchema = z.object({
  sessao_id: z.number().describe('ID da sessão')
});

export const encerrarSessaoSchema = z.object({
  sessao_id: z.number().describe('ID da sessão'),
  motivo: z.string().optional().describe('Motivo do encerramento')
});

export const listarGruposRADIUSSchema = z.object({
  page: z.number().optional().default(1),
  per_page: z.number().optional().default(50)
});

export const listarNASSchema = z.object({
  status: z.enum(['online', 'offline', 'todos']).optional().default('todos'),
  page: z.number().optional().default(1),
  per_page: z.number().optional().default(20)
});

export const detalhesNASSchema = z.object({
  nas_id: z.number().describe('ID do NAS')
});

export const listarAccountingSchema = z.object({
  usuario_id: z.number().optional().describe('ID do usuário'),
  data_inicio: z.string().optional().describe('Data inicial (YYYY-MM-DD)'),
  data_fim: z.string().optional().describe('Data final (YYYY-MM-DD)'),
  page: z.number().optional().default(1),
  per_page: z.number().optional().default(20)
});

// Funções de ferramentas
export async function listarUsuariosRADIUS(client: SGPClient, params: z.infer<typeof listarUsuariosRADIUSSchema>) {
  const queryParams: Record<string, string | number | undefined> = {
    page: params.page,
    per_page: params.per_page
  };
  if (params.status && params.status !== 'todos') queryParams.status = params.status;
  if (params.grupo_id) queryParams.grupo_id = params.grupo_id;
  if (params.username) queryParams.username = params.username;

  return client.get('/radius/usuarios', queryParams);
}

export async function detalhesUsuarioRADIUS(client: SGPClient, params: z.infer<typeof detalhesUsuarioRADIUSSchema>) {
  return client.get(`/radius/usuarios/${params.usuario_id}`);
}

export async function bloquearUsuario(client: SGPClient, params: z.infer<typeof bloquearUsuarioSchema>) {
  return client.post(`/radius/usuarios/${params.usuario_id}/bloquear`, {
    motivo: params.motivo
  });
}

export async function desbloquearUsuario(client: SGPClient, params: z.infer<typeof detalhesUsuarioRADIUSSchema>) {
  return client.post(`/radius/usuarios/${params.usuario_id}/desbloquear`);
}

export async function resetarSenhaRADIUS(client: SGPClient, params: z.infer<typeof detalhesUsuarioRADIUSSchema>) {
  return client.post(`/radius/usuarios/${params.usuario_id}/resetar-senha`);
}

export async function listarSessoes(client: SGPClient, params: z.infer<typeof listarSessoesSchema>) {
  const queryParams: Record<string, string | number | undefined> = {
    page: params.page,
    per_page: params.per_page
  };
  if (params.usuario_id) queryParams.usuario_id = params.usuario_id;
  if (params.nas_id) queryParams.nas_id = params.nas_id;
  if (params.ativa !== undefined) queryParams.ativa = params.ativa ? 1 : 0;

  return client.get('/radius/sessoes', queryParams);
}

export async function detalhesSessao(client: SGPClient, params: z.infer<typeof detalhesSessaoSchema>) {
  return client.get(`/radius/sessoes/${params.sessao_id}`);
}

export async function encerrarSessao(client: SGPClient, params: z.infer<typeof encerrarSessaoSchema>) {
  return client.post(`/radius/sessoes/${params.sessao_id}/encerrar`, {
    motivo: params.motivo
  });
}

export async function listarGruposRADIUS(client: SGPClient, params: z.infer<typeof listarGruposRADIUSSchema>) {
  return client.get('/radius/grupos', {
    page: params.page,
    per_page: params.per_page
  });
}

export async function listarNAS(client: SGPClient, params: z.infer<typeof listarNASSchema>) {
  const queryParams: Record<string, string | number | undefined> = {
    page: params.page,
    per_page: params.per_page
  };
  if (params.status && params.status !== 'todos') queryParams.status = params.status;

  return client.get('/radius/nas', queryParams);
}

export async function detalhesNAS(client: SGPClient, params: z.infer<typeof detalhesNASSchema>) {
  return client.get(`/radius/nas/${params.nas_id}`);
}

export async function listarAccounting(client: SGPClient, params: z.infer<typeof listarAccountingSchema>) {
  const queryParams: Record<string, string | number | undefined> = {
    page: params.page,
    per_page: params.per_page
  };
  if (params.usuario_id) queryParams.usuario_id = params.usuario_id;
  if (params.data_inicio) queryParams.data_inicio = params.data_inicio;
  if (params.data_fim) queryParams.data_fim = params.data_fim;

  return client.get('/radius/accounting', queryParams);
}

// Definições das ferramentas para registro no MCP
export const radiusTools = [
  {
    name: 'sgp_listar_usuarios_radius',
    description: 'Lista usuários RADIUS cadastrados no SGP. Pode filtrar por status, grupo ou username.',
    inputSchema: {
      type: 'object',
      properties: {
        status: {
          type: 'string',
          enum: ['ativo', 'bloqueado', 'todos'],
          description: 'Status do usuário'
        },
        grupo_id: { type: 'number', description: 'ID do grupo RADIUS' },
        username: { type: 'string', description: 'Username para busca' },
        page: { type: 'number' },
        per_page: { type: 'number' }
      }
    },
    handler: listarUsuariosRADIUS
  },
  {
    name: 'sgp_detalhes_usuario_radius',
    description: 'Retorna detalhes de um usuário RADIUS, incluindo grupo, atributos e última sessão.',
    inputSchema: {
      type: 'object',
      properties: {
        usuario_id: { type: 'number', description: 'ID do usuário RADIUS' }
      },
      required: ['usuario_id']
    },
    handler: detalhesUsuarioRADIUS
  },
  {
    name: 'sgp_bloquear_usuario_radius',
    description: 'Bloqueia um usuário RADIUS, impedindo novas conexões.',
    inputSchema: {
      type: 'object',
      properties: {
        usuario_id: { type: 'number', description: 'ID do usuário' },
        motivo: { type: 'string', description: 'Motivo do bloqueio' }
      },
      required: ['usuario_id']
    },
    handler: bloquearUsuario
  },
  {
    name: 'sgp_desbloquear_usuario_radius',
    description: 'Desbloqueia um usuário RADIUS, permitindo novas conexões.',
    inputSchema: {
      type: 'object',
      properties: {
        usuario_id: { type: 'number', description: 'ID do usuário' }
      },
      required: ['usuario_id']
    },
    handler: desbloquearUsuario
  },
  {
    name: 'sgp_resetar_senha_radius',
    description: 'Reseta a senha de um usuário RADIUS.',
    inputSchema: {
      type: 'object',
      properties: {
        usuario_id: { type: 'number', description: 'ID do usuário' }
      },
      required: ['usuario_id']
    },
    handler: resetarSenhaRADIUS
  },
  {
    name: 'sgp_listar_sessoes_radius',
    description: 'Lista sessões RADIUS. Pode filtrar por usuário, NAS ou status (ativa/encerrada).',
    inputSchema: {
      type: 'object',
      properties: {
        usuario_id: { type: 'number', description: 'ID do usuário' },
        nas_id: { type: 'number', description: 'ID do NAS' },
        ativa: { type: 'boolean', description: 'Filtrar apenas sessões ativas' },
        page: { type: 'number' },
        per_page: { type: 'number' }
      }
    },
    handler: listarSessoes
  },
  {
    name: 'sgp_detalhes_sessao_radius',
    description: 'Retorna detalhes de uma sessão RADIUS, incluindo duração, tráfego e informações de conexão.',
    inputSchema: {
      type: 'object',
      properties: {
        sessao_id: { type: 'number', description: 'ID da sessão' }
      },
      required: ['sessao_id']
    },
    handler: detalhesSessao
  },
  {
    name: 'sgp_encerrar_sessao_radius',
    description: 'Encerra uma sessão RADIUS ativa (desconecta o usuário).',
    inputSchema: {
      type: 'object',
      properties: {
        sessao_id: { type: 'number', description: 'ID da sessão' },
        motivo: { type: 'string', description: 'Motivo do encerramento' }
      },
      required: ['sessao_id']
    },
    handler: encerrarSessao
  },
  {
    name: 'sgp_listar_grupos_radius',
    description: 'Lista grupos RADIUS disponíveis (perfis de velocidade/acesso).',
    inputSchema: {
      type: 'object',
      properties: {
        page: { type: 'number' },
        per_page: { type: 'number' }
      }
    },
    handler: listarGruposRADIUS
  },
  {
    name: 'sgp_listar_nas',
    description: 'Lista servidores NAS (Network Access Server) cadastrados.',
    inputSchema: {
      type: 'object',
      properties: {
        status: {
          type: 'string',
          enum: ['online', 'offline', 'todos'],
          description: 'Status do NAS'
        },
        page: { type: 'number' },
        per_page: { type: 'number' }
      }
    },
    handler: listarNAS
  },
  {
    name: 'sgp_detalhes_nas',
    description: 'Retorna detalhes de um NAS específico.',
    inputSchema: {
      type: 'object',
      properties: {
        nas_id: { type: 'number', description: 'ID do NAS' }
      },
      required: ['nas_id']
    },
    handler: detalhesNAS
  },
  {
    name: 'sgp_listar_accounting_radius',
    description: 'Lista registros de accounting RADIUS (histórico de uso e tráfego).',
    inputSchema: {
      type: 'object',
      properties: {
        usuario_id: { type: 'number', description: 'ID do usuário' },
        data_inicio: { type: 'string', description: 'Data inicial (YYYY-MM-DD)' },
        data_fim: { type: 'string', description: 'Data final (YYYY-MM-DD)' },
        page: { type: 'number' },
        per_page: { type: 'number' }
      }
    },
    handler: listarAccounting
  }
];
