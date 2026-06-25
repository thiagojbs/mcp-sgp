/**
 * Especificação canônica dos endpoints da API do SGP.
 *
 * GERADO automaticamente por scripts/generate-spec.cjs a partir da collection oficial
 * (docs/sgp-api-spec.postman_collection.json). NÃO editar à mão.
 *
 * Total de endpoints: 237
 */

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
export type BodyMode = 'none' | 'form' | 'json';

export interface SgpEndpoint {
  /** Nome único da tool MCP (ex: sgp_ura_cliente_consultar) */
  id: string;
  /** Rótulo legível (nome original na collection) */
  name: string;
  /** Seção da API (Central Assinante, URA, FTTH, ...) */
  section: string;
  /** Método HTTP */
  method: HttpMethod;
  /** Caminho relativo à base (ex: /api/ura/consultacliente/); pode conter {var} */
  path: string;
  /** Variáveis de caminho obrigatórias */
  pathParams: string[];
  /** Parâmetros enviados na query string */
  queryParams: string[];
  /** Como o corpo é enviado */
  bodyMode: BodyMode;
  /** Parâmetros enviados no corpo (token/app NÃO entram aqui — vêm da config) */
  bodyParams: string[];
  /** Descrição curta */
  description: string;
}

export const SGP_ENDPOINTS: SgpEndpoint[] = [
  {
    "id": "sgp_central_contrato_listar",
    "name": "Contrato - Listar",
    "section": "Central Assinante",
    "method": "POST",
    "path": "/api/central/contratos",
    "pathParams": [],
    "queryParams": [],
    "bodyMode": "form",
    "bodyParams": [
      "cpfcnpj",
      "senha"
    ],
    "description": "| **Parâmetro** | **Tipo** | **Descrição** | | --- | --- | --- | | cpfcnpj | string | CPF / CNPJ do Cliente | | senha | string | Senha do Cliente |"
  },
  {
    "id": "sgp_central_servico_internet_verificar_disponibilidade",
    "name": "Serviço Internet – Verificar disponibilidade",
    "section": "Central Assinante",
    "method": "POST",
    "path": "/api/central/verificaacesso/",
    "pathParams": [],
    "queryParams": [],
    "bodyMode": "form",
    "bodyParams": [
      "cpfcnpj",
      "senha",
      "contrato"
    ],
    "description": "| **Parâmetro** | **Tipo** | **Descrição** | | --- | --- | --- | | cpfcnpj | string | CPF / CNPJ do Cliente | | senha | string | Senha do Cliente | | contrato | integer | ID do Contrato |"
  },
  {
    "id": "sgp_central_servico_internet_extrato_de_trafego",
    "name": "Serviço Internet – Extrato de Tráfego",
    "section": "Central Assinante",
    "method": "POST",
    "path": "/api/central/extratouso/",
    "pathParams": [],
    "queryParams": [],
    "bodyMode": "form",
    "bodyParams": [
      "cpfcnpj",
      "senha",
      "contrato",
      "ano",
      "mes"
    ],
    "description": "| **Parâmetro** | **Tipo** | **Descrição** | | --- | --- | --- | | cpfcnpj | string | CPF / CNPJ do Cliente | | senha | string | Senha do Cliente | | contrato | integer | ID do Contrato | | ano | integer | Ano | | mes | integer | Mês |"
  },
  {
    "id": "sgp_central_contrato_liberacao_por_confianca",
    "name": "Contrato – Liberação por Confiança",
    "section": "Central Assinante",
    "method": "POST",
    "path": "/api/central/promessapagamento/",
    "pathParams": [],
    "queryParams": [],
    "bodyMode": "form",
    "bodyParams": [
      "cpfcnpj",
      "senha",
      "contrato"
    ],
    "description": "| **Parâmetro** | **Tipo** | **Descrição** | | --- | --- | --- | | cpfcnpj | string | CPF / CNPJ do Cliente | | senha | string | Senha do Cliente | | contrato | integer | ID do Contrato |"
  },
  {
    "id": "sgp_central_chamado_listar",
    "name": "Chamado – Listar",
    "section": "Central Assinante",
    "method": "POST",
    "path": "/api/central/chamado/list/",
    "pathParams": [],
    "queryParams": [],
    "bodyMode": "form",
    "bodyParams": [
      "cpfcnpj",
      "senha",
      "contrato",
      "cliente",
      "os",
      "status",
      "oc_status",
      "pop",
      "data_cadastro_inicio",
      "data_cadastro_fim",
      "data_agendamento_inicio",
      "data_agendamento_fim",
      "data_finalizacao_inicio",
      "data_finalizacao_fim"
    ],
    "description": "| **Parâmetro** | **Tipo** | **Descrição** | | --- | --- | --- | | cpfcnpj | string | CPF / CNPJ do Cliente | | senha | string | Senha do Cliente | | contrato | integer | ID do Contrato | | cliente | integer | ID do Cliente | | os | integer | ID da Ordem de Serviço | | status | integer | ID do Statu"
  },
  {
    "id": "sgp_central_tipos_de_ocorrencia_listar",
    "name": "Tipos de Ocorrência – Listar",
    "section": "Central Assinante",
    "method": "POST",
    "path": "/api/central/tipoocorrencia/list/",
    "pathParams": [],
    "queryParams": [],
    "bodyMode": "form",
    "bodyParams": [
      "cpfcnpj",
      "senha"
    ],
    "description": "| **Parâmetro** | **Tipo** | **Descrição** | | --- | --- | --- | | cpfcnpj | string | CPF / CNPJ do Cliente | | senha | string | Senha do Cliente |"
  },
  {
    "id": "sgp_central_chamado_criar",
    "name": "Chamado – Criar",
    "section": "Central Assinante",
    "method": "POST",
    "path": "/api/central/chamado/",
    "pathParams": [],
    "queryParams": [],
    "bodyMode": "form",
    "bodyParams": [
      "cpfcnpj",
      "senha",
      "contrato",
      "conteudo",
      "contato",
      "contato_numero",
      "ocorrenciatipo",
      "setor",
      "responsaveloc",
      "motivoos",
      "sem_os",
      "os_tecnico_responsavel",
      "os_servico_prestado",
      "os_prioridade",
      "data_hora_agendamento"
    ],
    "description": "| **Parâmetro** | **Tipo** | **Descrição** | | --- | --- | --- | | cpfcnpj | string | CPF / CNPJ do Cliente | | senha | string | Senha do Cliente | | contrato | integer | ID do Contrato | | conteudo | string | Conteúdo da OS | | contato | string | Contato | | contato_numero | string | Contato Número"
  },
  {
    "id": "sgp_central_chamado_atualizar",
    "name": "Chamado – Atualizar",
    "section": "Central Assinante",
    "method": "POST",
    "path": "/api/central/chamado/update/{os_id}/",
    "pathParams": [
      "os_id"
    ],
    "queryParams": [],
    "bodyMode": "form",
    "bodyParams": [
      "cpfcnpj",
      "senha",
      "ocorrencia_conteudo",
      "ocorrencia_encerrar",
      "os_servico_prestado",
      "os_observacao",
      "os_anotacao",
      "os_data_agendamento",
      "os_status",
      "os_tecnico_responsavel",
      "os_setor",
      "os_motivo",
      "os_prioridade",
      "notificar_cliente"
    ],
    "description": "| **Parâmetro** | **Tipo** | **Descrição** | | --- | --- | --- | | cpfcnpj | string | CPF / CNPJ do Cliente | | senha | string | Senha do Cliente | | os_anotacao | string | Anotação da OS | | os_observacao | string | Observação da OS | | os_data_agendamento | string | Data de Agendamento da OS | | o"
  },
  {
    "id": "sgp_central_chamado_adicionar_anexo",
    "name": "Chamado – Adicionar Anexo",
    "section": "Central Assinante",
    "method": "POST",
    "path": "/api/central/chamado/{os_id}/anexo/add/",
    "pathParams": [
      "os_id"
    ],
    "queryParams": [],
    "bodyMode": "form",
    "bodyParams": [
      "cpfcnpj",
      "senha",
      "file",
      "file_b64",
      "descricao",
      "filename"
    ],
    "description": "| **Parâmetro** | **Tipo** | **Descrição** | | --- | --- | --- | | cpfcnpj | string | CPF / CNPJ do Cliente | | senha | string | Senha do Cliente | | file | file | Anexo | | file_b64 | string | Formato Base64 | | descricao | string | Descrição do Anexo | | filename | string | Nome do anexo com a ext"
  },
  {
    "id": "sgp_central_ordem_de_servico_adicionar_anotacao",
    "name": "Ordem de Serviço – Adicionar Anotação",
    "section": "Central Assinante",
    "method": "POST",
    "path": "/api/central/chamado/{os_id}/anotacao",
    "pathParams": [
      "os_id"
    ],
    "queryParams": [],
    "bodyMode": "form",
    "bodyParams": [
      "cpfcnpj",
      "senha",
      "anotacao"
    ],
    "description": "| **Parâmetro** | **Tipo** | **Descrição** | | --- | --- | --- | | cpfcnpj | string | CPF / CNPJ do Cliente | | senha | string | Senha do Cliente | | anotacao | string | Anotação do Chamado |"
  },
  {
    "id": "sgp_central_nota_fiscal_listar",
    "name": "Nota Fiscal – Listar",
    "section": "Central Assinante",
    "method": "POST",
    "path": "/api/central/notafiscal/list/",
    "pathParams": [],
    "queryParams": [],
    "bodyMode": "form",
    "bodyParams": [
      "cpfcnpj",
      "senha",
      "contrato"
    ],
    "description": "| **Parâmetro** | **Tipo** | **Descrição** | | --- | --- | --- | | app | string | Nome da Aplicação no SGP (obrigatório) | | token | string | Token da Aplicação no SGP (obrigatório) | | contrato | integer | ID do Contrato (obrigatório) |"
  },
  {
    "id": "sgp_central_nfcom_listar",
    "name": "NFCom - Listar",
    "section": "Central Assinante",
    "method": "POST",
    "path": "/api/central/nfcom/list",
    "pathParams": [],
    "queryParams": [],
    "bodyMode": "form",
    "bodyParams": [
      "usuario",
      "senha",
      "contrato",
      "emitente",
      "status",
      "ambiente",
      "data_emissao_fim",
      "data_emissao_inicio"
    ],
    "description": ""
  },
  {
    "id": "sgp_central_nfcom_baixar",
    "name": "NFCom - Baixar",
    "section": "Central Assinante",
    "method": "POST",
    "path": "/api/central/nfcom/print/{{numero_nota}}",
    "pathParams": [
      "numero_nota"
    ],
    "queryParams": [],
    "bodyMode": "form",
    "bodyParams": [
      "contrato",
      "formato"
    ],
    "description": "| Parâmetro | Tipo | Descrição | | --- | --- | --- | | {{numero_nota}} | Integer | Número da NFCom passado na URL |"
  },
  {
    "id": "sgp_central_nfcom_enviar",
    "name": "NFCom - Enviar",
    "section": "Central Assinante",
    "method": "POST",
    "path": "/api/central/nfcom/enviar/{{id_nota}}",
    "pathParams": [
      "id_nota"
    ],
    "queryParams": [],
    "bodyMode": "form",
    "bodyParams": [
      "contrato",
      "email"
    ],
    "description": "## Enviar NFCom Envia uma NFCom por e-mail para o destinatário informado, identificada pelo ID da nota fiscal na URL. --- ### Detalhes da Requisição | Campo | Valor | | --- | --- | | Método | `POST` | | URL | `{{url}}/api/central/nfcom/enviar/{{id_nota}}` | --- ### Variável de Caminho (Path Variable"
  },
  {
    "id": "sgp_central_nfse_listar",
    "name": "NFSe – Listar",
    "section": "Central Assinante",
    "method": "POST",
    "path": "/api/central/nfse/list/",
    "pathParams": [],
    "queryParams": [],
    "bodyMode": "form",
    "bodyParams": [
      "cpfcnpj",
      "senha",
      "contrato"
    ],
    "description": "| **Parâmetro** | **Tipo** | **Descrição** | | --- | --- | --- | | app | string | Nome da Aplicação no SGP (obrigatório) | | token | string | Token da Aplicação no SGP (obrigatório) | | contrato | integer | ID do Contrato (obrigatório) |"
  },
  {
    "id": "sgp_central_nfse_enviar",
    "name": "NFSe - Enviar",
    "section": "Central Assinante",
    "method": "POST",
    "path": "/api/central/nfse/enviar/{{id_nota}}",
    "pathParams": [
      "id_nota"
    ],
    "queryParams": [],
    "bodyMode": "form",
    "bodyParams": [
      "contrato",
      "email"
    ],
    "description": "## Enviar NFSe Envia uma NFSe por e-mail para o destinatário informado, identificada pelo ID da nota fiscal na URL. --- ### Detalhes da Requisição | Parâmetro | Valor | | --- | --- | | Método | `POST` | | URL | `{{url}}/api/central/nfse/enviar/{{id_nota}}` | --- ### Variável de Caminho (Path Variabl"
  },
  {
    "id": "sgp_central_fatura_listar",
    "name": "Fatura – Listar",
    "section": "Central Assinante",
    "method": "POST",
    "path": "/api/central/titulos/",
    "pathParams": [],
    "queryParams": [],
    "bodyMode": "form",
    "bodyParams": [
      "cpfcnpj",
      "senha",
      "contrato",
      "offset",
      "limit",
      "status",
      "imprimir_nota_fiscal",
      "imprimir_nota_debito"
    ],
    "description": "| **Parâmetro** | **Tipo** | **Descrição** | | --- | --- | --- | | cpfcnpj | string | CPF / CNPJ do Cliente | | senha | string | Senha do Cliente | | contrato | integer | ID do Contrato |"
  },
  {
    "id": "sgp_central_fatura_segunda_via",
    "name": "Fatura – Segunda via",
    "section": "Central Assinante",
    "method": "POST",
    "path": "/api/central/fatura2via/",
    "pathParams": [],
    "queryParams": [],
    "bodyMode": "form",
    "bodyParams": [
      "cpfcnpj",
      "senha",
      "contrato",
      "nao_gerar_os"
    ],
    "description": "| **Parâmetro** | **Tipo** | **Descrição** | | --- | --- | --- | | cpfcnpj | string | CPF / CNPJ do Cliente | | senha | string | Senha do Cliente | | contrato | integer | ID do Contrato | | nao_gerar_os | integer | Não Gerar OS |"
  },
  {
    "id": "sgp_central_fatura_gerar_pix",
    "name": "Fatura – Gerar PIX",
    "section": "Central Assinante",
    "method": "POST",
    "path": "/api/central/pagamento/pix/{id_titulo}",
    "pathParams": [
      "id_titulo"
    ],
    "queryParams": [],
    "bodyMode": "form",
    "bodyParams": [
      "cpfcnpj",
      "senha",
      "contrato"
    ],
    "description": "| **Parâmetro** | **Tipo** | **Descrição** | | --- | --- | --- | | cpfcnpj | string | CPF / CNPJ do Cliente | | senha | string | Senha do Cliente | | contrato | integer | ID do Contrato |"
  },
  {
    "id": "sgp_central_fatura_enviar",
    "name": "Fatura – Enviar",
    "section": "Central Assinante",
    "method": "POST",
    "path": "/api/central/envia2via/",
    "pathParams": [],
    "queryParams": [],
    "bodyMode": "form",
    "bodyParams": [
      "cpfcnpj",
      "senha",
      "contrato",
      "tipo",
      "email",
      "celular"
    ],
    "description": "| **Parâmetro** | **Tipo** | **Descrição** | | --- | --- | --- | | cpfcnpj | string | CPF / CNPJ do Cliente | | senha | string | Senha do Cliente | | contrato | integer | ID do Contrato | | email | string | Email |"
  },
  {
    "id": "sgp_central_fatura_pagar_via_cartao_de_credito",
    "name": "Fatura - Pagar via Cartão de Crédito",
    "section": "Central Assinante",
    "method": "POST",
    "path": "/api/central/pagamento/cartao/{titulo_id}",
    "pathParams": [
      "titulo_id"
    ],
    "queryParams": [],
    "bodyMode": "form",
    "bodyParams": [
      "cpfcnpj",
      "senha",
      "contrato",
      "nome",
      "numero",
      "expira",
      "cvv",
      "cartao_id"
    ],
    "description": "| **Parâmetro** | **Tipo** | **Descrição** | | --- | --- | --- | | cpfcnpj | string | CPF / CNPJ do Cliente | | senha | string | Senha do Cliente | | contrato | integer | ID do Contrato | | nome | string | Nome | | numero | integer | Número | | expira | string | Expira | | cvv | integer | CVV | Paga"
  },
  {
    "id": "sgp_central_fatura_pagar_via_cartao_de_debito",
    "name": "Fatura - Pagar via Cartão de Débito",
    "section": "Central Assinante",
    "method": "POST",
    "path": "/api/central/pagamento/cartao/{titulo_id}/debito/",
    "pathParams": [
      "titulo_id"
    ],
    "queryParams": [],
    "bodyMode": "form",
    "bodyParams": [
      "cpfcnpj",
      "senha",
      "contrato",
      "nome",
      "numero",
      "expira",
      "cvv",
      "cartao_id"
    ],
    "description": "| **Parâmetro** | **Tipo** | **Descrição** | | --- | --- | --- | | cpfcnpj | string | CPF / CNPJ do Cliente | | senha | string | Senha do Cliente | | contrato | integer | ID do Contrato | | nome | string | Nome | | numero | integer | Número | | expira | string | Expira | | cvv | integer | CVV | Paga"
  },
  {
    "id": "sgp_central_fatura_pagar_via_cartao_checkout",
    "name": "Fatura - Pagar via Cartão Checkout",
    "section": "Central Assinante",
    "method": "POST",
    "path": "/api/central/pagamento/checkout/{titulo_id}/cartao/",
    "pathParams": [
      "titulo_id"
    ],
    "queryParams": [],
    "bodyMode": "form",
    "bodyParams": [
      "cpfcnpj",
      "senha",
      "contrato"
    ],
    "description": "| **Parâmetro** | **Tipo** | **Descrição** | | --- | --- | --- | | cpfcnpj | string | CPF / CNPJ do Cliente | | senha | string | Senha do Cliente | | contrato | integer | ID do Contrato |"
  },
  {
    "id": "sgp_central_gateway_cartao_listar",
    "name": "Gateway Cartão - Listar",
    "section": "Central Assinante",
    "method": "POST",
    "path": "/api/centralapp/gatewaycartao/list/",
    "pathParams": [],
    "queryParams": [],
    "bodyMode": "none",
    "bodyParams": [],
    "description": "| **Parâmetro** | **Tipo** | **Descrição** | | --- | --- | --- | | token | string | Token do aplicativo da central do assinante \\[obrigatório\\] | | login | string | Login do contrato \\[obrigatório\\] | | contrato | string | Id do Contrato \\[obrigatório\\] |"
  },
  {
    "id": "sgp_central_cartao_de_credito_cadastrar",
    "name": "Cartão de Crédito - Cadastrar",
    "section": "Central Assinante",
    "method": "POST",
    "path": "/api/centralapp/cadastrarcartao/",
    "pathParams": [],
    "queryParams": [],
    "bodyMode": "none",
    "bodyParams": [],
    "description": "| **Parâmetro** | Tipo | Descrição | | --- | --- | --- | | token | string | Token do aplicativo da central do assinante \\[obrigatório\\] | | login | string | Login do contrato \\[obrigatório\\] | | contrato | integer | Id do Contrato \\[obrigatório\\] | | mes_expira | integer | Mês de expiração do cartão"
  },
  {
    "id": "sgp_central_cartao_de_credito_delete",
    "name": "Cartão de Crédito - Delete",
    "section": "Central Assinante",
    "method": "DELETE",
    "path": "/api/centralapp/deletecartao/{id_cartao}/",
    "pathParams": [
      "id_cartao"
    ],
    "queryParams": [],
    "bodyMode": "form",
    "bodyParams": [
      "contrato",
      "login",
      "password"
    ],
    "description": "| **Parâmetro** | **Tipo** | **Descrição** | | --- | --- | --- | | token | string | Token do aplicativo da central do assinante \\[obrigatório\\] | | contrato | integer | Id do Contrato \\[obrigatório\\] | | login | string | Login ou CPF/CNPJ do contrato (Consulte explicação abaixo) do contrato \\[obriga"
  },
  {
    "id": "sgp_central_cobranca_recorrente_cadastrar",
    "name": "Cobrança Recorrente - Cadastrar",
    "section": "Central Assinante",
    "method": "POST",
    "path": "/api/centralapp/cartao/{id_cartao}/cobrancarecorrente/add/",
    "pathParams": [
      "id_cartao"
    ],
    "queryParams": [],
    "bodyMode": "none",
    "bodyParams": [],
    "description": "| **Parâmetro** | Tipo | Descrição | | --- | --- | --- | | token | string | Token do aplicativo da central do assinante \\[obrigatório\\] | | login | string | Login do contrato \\[obrigatório\\] | | contrato | integer | Id do Contrato \\[obrigatório\\] |"
  },
  {
    "id": "sgp_central_cobranca_recorrente_delete",
    "name": "Cobrança Recorrente - Delete",
    "section": "Central Assinante",
    "method": "POST",
    "path": "/api/centralapp/cartao/{id_cartao}/cobrancarecorrente/delete/",
    "pathParams": [
      "id_cartao"
    ],
    "queryParams": [],
    "bodyMode": "none",
    "bodyParams": [],
    "description": "| **Parâmetro** | Tipo | Descrição | | --- | --- | --- | | token | string | Token do aplicativo da central do assinante \\[obrigatório\\] | | login | string | Login do contrato \\[obrigatório\\] | | contrato | integer | Id do Contrato \\[obrigatório\\] |"
  },
  {
    "id": "sgp_central_declaracao_de_quitacao_baixar",
    "name": "Declaração de Quitação - Baixar",
    "section": "Central Assinante",
    "method": "GET",
    "path": "/api/centralapp/declaracao/quitacao/2026/",
    "pathParams": [],
    "queryParams": [],
    "bodyMode": "none",
    "bodyParams": [],
    "description": "## Declaração de Quitação Retorna a **Declaração de Quitação** referente a um determinado ano para o assinante. --- ## Endpoint ``` shell GET {{url}}/api/centralapp/declaracao/quitacao/{ano}/ ``` --- | Parâmetro | Descrição | | --- | --- | | ano | Ano no formato AAAA. Ex: 2026 | ## Parâmetros da Req"
  },
  {
    "id": "sgp_central_assinatura_detalhe",
    "name": "Assinatura - Detalhe",
    "section": "Central Assinante",
    "method": "POST",
    "path": "/api/centralapp/assinaturas/{id_assinatura/detail/",
    "pathParams": [],
    "queryParams": [],
    "bodyMode": "form",
    "bodyParams": [
      "login",
      "password"
    ],
    "description": "## Assinatura - Detalhe Retorna os detalhes de uma assinatura eletrônica específica, incluindo sua situação atual, URLs dos documentos (original e assinado), datas e horários de cadastro e atualização de status, além de informações sobre o tipo de documento. --- ### Método e URL ``` POST {{url}}/api"
  },
  {
    "id": "sgp_central_assinaturas_listar",
    "name": "Assinaturas - Listar",
    "section": "Central Assinante",
    "method": "POST",
    "path": "/api/centralapp/assinaturas/list",
    "pathParams": [],
    "queryParams": [],
    "bodyMode": "form",
    "bodyParams": [
      "login",
      "password"
    ],
    "description": "## Assinaturas - Listar Retorna a lista de assinaturas eletrônicas associadas ao cliente. --- ### Endpoint `POST {{url}}/api/centralapp/assinaturas/list/` --- ### Corpo da Requisição (form-data) | Campo | Obrigatoriedade | Descrição | | --- | --- | --- | | `login` | Obrigatório | \\[Obrigatório\\] - L"
  },
  {
    "id": "sgp_central_contrato_pdf",
    "name": "Contrato - PDF",
    "section": "Central Assinante",
    "method": "GET",
    "path": "/api/centralapp/contrato/print/{tipo}/",
    "pathParams": [
      "tipo"
    ],
    "queryParams": [],
    "bodyMode": "none",
    "bodyParams": [],
    "description": "## Contrato - PDF Gera e retorna o arquivo PDF de um contrato ou termo associado ao cliente, de acordo com o tipo especificado no parâmetro de rota `tipo`. --- ### Endpoint `POST {{url}}/api/centralapp/contrato/print/{tipo}` --- ### Parâmetro de Rota | Parâmetro | Tipo | Obrigatório | Descrição | | "
  },
  {
    "id": "sgp_central_avisos_listar",
    "name": "Avisos - Listar",
    "section": "Central Assinante",
    "method": "GET",
    "path": "/api/centralapp/avisos/servico/list/",
    "pathParams": [],
    "queryParams": [],
    "bodyMode": "none",
    "bodyParams": [],
    "description": "# Avisos - Listar Lista os avisos de serviço ativos, como manutenções programadas ou alertas operacionais, associados ao aplicativo da central do assinante. --- ### Endpoint `POST {{url}}/api/centralapp/avisos/servico/list/` --- ### Parâmetros do Body (form-data) | Parâmetro | Tipo | Obrigatório | D"
  },
  {
    "id": "sgp_remessa_download_remessa",
    "name": "Download Remessa",
    "section": "Remessa / Retorno",
    "method": "POST",
    "path": "/api/banco/remessa/download/",
    "pathParams": [],
    "queryParams": [],
    "bodyMode": "form",
    "bodyParams": [
      "portador",
      "modelo_arquivo",
      "ocorrencias",
      "data_inicial",
      "data_final",
      "data_emissao_inicial",
      "data_emissao_final",
      "status",
      "pop",
      "status_baixa"
    ],
    "description": ""
  },
  {
    "id": "sgp_remessa_upload_retorno",
    "name": "Upload Retorno",
    "section": "Remessa / Retorno",
    "method": "POST",
    "path": "/api/banco/retorno/upload/",
    "pathParams": [],
    "queryParams": [],
    "bodyMode": "form",
    "bodyParams": [
      "portador",
      "arquivo",
      "previewcheck"
    ],
    "description": ""
  },
  {
    "id": "sgp_ftth_listar_olt",
    "name": "Listar OLT",
    "section": "FTTH",
    "method": "GET",
    "path": "/api/fttx/olt/list/",
    "pathParams": [],
    "queryParams": [],
    "bodyMode": "none",
    "bodyParams": [],
    "description": ""
  },
  {
    "id": "sgp_ftth_listar_pon",
    "name": "Listar PON",
    "section": "FTTH",
    "method": "GET",
    "path": "/api/fttx/olt/{olt_id}/pon/list/",
    "pathParams": [
      "olt_id"
    ],
    "queryParams": [],
    "bodyMode": "none",
    "bodyParams": [],
    "description": ""
  },
  {
    "id": "sgp_ftth_listar_onu_por_olt",
    "name": "Listar ONU por OLT",
    "section": "FTTH",
    "method": "GET",
    "path": "/api/fttx/olt/{olt_id}/onu/list/",
    "pathParams": [
      "olt_id"
    ],
    "queryParams": [],
    "bodyMode": "none",
    "bodyParams": [],
    "description": "| **Parâmetro** | **Tipo** | **Descrição** | | --- | --- | --- | | onuid | integer | ID da ONU | | onuidreal | integer | ONUID da ONU | | slot | integer | Slot da ONU | | pon | integer | PON da ONU | | phy_addr | string | PHY_ADDR da ONU | | cpfcnpj | string | CPF/CNPJ do Cliente | | contrato | inte"
  },
  {
    "id": "sgp_ftth_listar_onu",
    "name": "Listar ONU",
    "section": "FTTH",
    "method": "GET",
    "path": "/api/fttx/onu/list/",
    "pathParams": [],
    "queryParams": [],
    "bodyMode": "none",
    "bodyParams": [],
    "description": "| **Parâmetro** | **Tipo** | **Descrição** | | --- | --- | --- | | onuid | integer | ID da ONU | | slot | integer | Slot da ONU | | pon | integer | PON da ONU | | phy_addr | string | PHY_ADDR da ONU | | cpfcnpj | string | CPF/CNPJ do Cliente | | contrato | integer | ID do Contrato | | servico | inte"
  },
  {
    "id": "sgp_ftth_listar_cto_utilizadas_na_olt",
    "name": "Listar CTO utilizadas na OLT",
    "section": "FTTH",
    "method": "GET",
    "path": "/api/fttx/olt/pon/{olt_id}/splitter/list/",
    "pathParams": [
      "olt_id"
    ],
    "queryParams": [],
    "bodyMode": "none",
    "bodyParams": [],
    "description": "| **Parâmetro** | **Tipo** | **Descrição** | | --- | --- | --- | | pon | integer | PON da CTO | | slot | integer | Slot da CTO |"
  },
  {
    "id": "sgp_ftth_listar_onus_vinculadas_a_cto",
    "name": "Listar ONUs vinculadas a CTO",
    "section": "FTTH",
    "method": "GET",
    "path": "/api/fttx/splitter/{cto_id}/onu/all/",
    "pathParams": [
      "cto_id"
    ],
    "queryParams": [],
    "bodyMode": "none",
    "bodyParams": [],
    "description": "| **Parâmetro** | **Tipo** | **Descrição** | | --- | --- | --- | | onuid | integer | ID da ONU | | slot | integer | Slot da ONU | | pon | integer | PON da ONU | | phy_addr | string | PHY_ADDR da ONU | | cpfcnpj | string | CPF/CNPJ do Cliente | | contrato | integer | ID do Contrato | | servico | inte"
  },
  {
    "id": "sgp_ftth_listar_cto",
    "name": "Listar CTO",
    "section": "FTTH",
    "method": "GET",
    "path": "/api/fttx/splitter/{id}/",
    "pathParams": [
      "id"
    ],
    "queryParams": [],
    "bodyMode": "none",
    "bodyParams": [],
    "description": ""
  },
  {
    "id": "sgp_ftth_listar_todas_cto",
    "name": "Listar todas CTO",
    "section": "FTTH",
    "method": "GET",
    "path": "/api/fttx/splitter/all/",
    "pathParams": [],
    "queryParams": [],
    "bodyMode": "none",
    "bodyParams": [],
    "description": ""
  },
  {
    "id": "sgp_ftth_listar_onus_nao_autorizadas",
    "name": "Listar ONUs não autorizadas",
    "section": "FTTH",
    "method": "GET",
    "path": "/api/fttx/olt/{olt_id}/unauth/",
    "pathParams": [
      "olt_id"
    ],
    "queryParams": [],
    "bodyMode": "none",
    "bodyParams": [],
    "description": ""
  },
  {
    "id": "sgp_ftth_autorizar_onu",
    "name": "Autorizar ONU",
    "section": "FTTH",
    "method": "POST",
    "path": "/api/fttx/olt/{olt_id}/auth/",
    "pathParams": [
      "olt_id"
    ],
    "queryParams": [],
    "bodyMode": "form",
    "bodyParams": [
      "slot",
      "pon",
      "contrato",
      "service",
      "description",
      "onutemplate",
      "onutemplate_plain",
      "splitter",
      "splitter_port",
      "id",
      "onutype",
      "mode",
      "vlan",
      "ident",
      "pppoe_login",
      "pppoe_password",
      "wifi_ssid",
      "wifi_password",
      "wifi_channel",
      "wifi_ssid5",
      "wifi_password5",
      "wifi_channel5",
      "wifi_authmode",
      "wifi_encrypttype",
      "wifi_central",
      "onu_web",
      "onu_web_port",
      "onu_telnet",
      "onu_login",
      "onu_password",
      "no_auth",
      "onuid"
    ],
    "description": "| **Parâmetro** | **Tipo** | **Descrição** | | --- | --- | --- | | slot | integer | Número do slot | | pon | integer | Número do PON | | id | integer | Serial/Mac da ONU | | onutype | integer | Código do tipo da ONU | | vlan | integer | Vlan | | mode | integer | BRIDGE = 1; PPPOE = 2; BRIDGE_WAN = 3"
  },
  {
    "id": "sgp_ftth_resetar_onu",
    "name": "Resetar ONU",
    "section": "FTTH",
    "method": "GET",
    "path": "/api/fttx/onu/{id_onu}/reset/",
    "pathParams": [
      "id_onu"
    ],
    "queryParams": [],
    "bodyMode": "none",
    "bodyParams": [],
    "description": "**{IDENTIFICADOR_ONU}**: Pode ser o ID ou o Serial da ONU. | **Parâmetro** | **Tipo** | **Descrição** | | --- | --- | --- | | default_cfg | integer | Configuração padrão |"
  },
  {
    "id": "sgp_ftth_exportar_onu",
    "name": "Exportar ONU",
    "section": "FTTH",
    "method": "GET",
    "path": "/api/fttx/olt/{olt_id}/onu/export/",
    "pathParams": [
      "olt_id"
    ],
    "queryParams": [],
    "bodyMode": "none",
    "bodyParams": [],
    "description": ""
  },
  {
    "id": "sgp_ftth_onu_info",
    "name": "ONU Info",
    "section": "FTTH",
    "method": "GET",
    "path": "/api/fttx/onu/{id_onu}/info/",
    "pathParams": [
      "id_onu"
    ],
    "queryParams": [],
    "bodyMode": "none",
    "bodyParams": [],
    "description": "**{IDENTIFICADOR_ONU}**: Pode ser o ID ou o Serial da ONU."
  },
  {
    "id": "sgp_ftth_onu_detalhe",
    "name": "ONU Detalhe",
    "section": "FTTH",
    "method": "GET",
    "path": "/api/fttx/onu/{id_onu}/",
    "pathParams": [
      "id_onu"
    ],
    "queryParams": [],
    "bodyMode": "none",
    "bodyParams": [],
    "description": "**{IDENTIFICADOR_ONU}**: Pode ser o ID ou o Serial da ONU."
  },
  {
    "id": "sgp_ftth_alterar_onu",
    "name": "Alterar ONU",
    "section": "FTTH",
    "method": "POST",
    "path": "/api/fttx/onu/{onu_id}/edit/",
    "pathParams": [
      "onu_id"
    ],
    "queryParams": [],
    "bodyMode": "form",
    "bodyParams": [
      "onu_update",
      "wifi_ssid",
      "wifi_password",
      "wifi_channel",
      "wifi_ssid5",
      "wifi_password5",
      "wifi_channel5",
      "wifi_central",
      "onu_web",
      "onu_telnet",
      "onu_login",
      "onu_password",
      "service"
    ],
    "description": "- onu_update = \"wifi\": | **Parâmetro** | **Tipo** | **Descrição** | | --- | --- | --- | | wifi_ssid | string | wifi_ssid | | wifi_password | string | wifi_password | | wifi_ssid5 | string | wifi_ssid5 | | wifi_password5 | string | wifi_password5 | | wifi_central | string | wifi_central | - onu_updat"
  },
  {
    "id": "sgp_ftth_remover_onu",
    "name": "Remover ONU",
    "section": "FTTH",
    "method": "GET",
    "path": "/api/fttx/onu/{id_onu}/deauth/",
    "pathParams": [
      "id_onu"
    ],
    "queryParams": [],
    "bodyMode": "none",
    "bodyParams": [],
    "description": "**{IDENTIFICADOR_ONU}**: Pode ser o ID ou o Serial da ONU. | **Parâmetro** | **Tipo** | **Descrição** | | --- | --- | --- | | no_commit | integer | Remover ONU sem desautorizar na OLT |"
  },
  {
    "id": "sgp_ftth_remover_onu_2",
    "name": "Remover ONU",
    "section": "FTTH",
    "method": "POST",
    "path": "/api/fttx/onu/{id_onu}/deauth/",
    "pathParams": [
      "id_onu"
    ],
    "queryParams": [],
    "bodyMode": "form",
    "bodyParams": [],
    "description": "**{IDENTIFICADOR_ONU}**: Pode ser o ID ou o Serial da ONU. | **Parâmetro** | **Tipo** | **Descrição** | | --- | --- | --- | | no_commit | integer | Remover ONU sem desautorizar na OLT |"
  },
  {
    "id": "sgp_ftth_onu_wifi",
    "name": "ONU Wifi",
    "section": "FTTH",
    "method": "GET",
    "path": "/api/fttx/onu/{identificador_onu}/wifi/",
    "pathParams": [
      "identificador_onu"
    ],
    "queryParams": [],
    "bodyMode": "none",
    "bodyParams": [],
    "description": "**{IDENTIFICADOR_ONU}**: Pode ser o ID ou o Serial da ONU. | **Parâmetro** | **Tipo** | **Descrição** | | --- | --- | --- | | remove | integer | remove |"
  },
  {
    "id": "sgp_ftth_onu_wan",
    "name": "ONU WAN",
    "section": "FTTH",
    "method": "GET",
    "path": "/api/fttx/onu/{identificador_onu}/wan/",
    "pathParams": [
      "identificador_onu"
    ],
    "queryParams": [],
    "bodyMode": "none",
    "bodyParams": [],
    "description": "**{IDENTIFICADOR_ONU}**: Pode ser o ID ou o Serial da ONU. | **Parâmetro** | **Tipo** | **Descrição** | | --- | --- | --- | | remove | integer | remove |"
  },
  {
    "id": "sgp_ftth_onu_cmd",
    "name": "ONU CMD",
    "section": "FTTH",
    "method": "GET",
    "path": "/api/fttx/onu/{identificador_onu}/cmd/{cmd_id}/",
    "pathParams": [
      "identificador_onu",
      "cmd_id"
    ],
    "queryParams": [],
    "bodyMode": "none",
    "bodyParams": [],
    "description": "**{IDENTIFICADOR_ONU}**: Pode ser o ID ou o Serial da ONU. | **Parâmetro** | **Tipo** | **Descrição** | | --- | --- | --- | | cmdrun | string | cmdrun | | cmd_print_result | string | cmd_print_result | | regex_search | string | regex_search |"
  },
  {
    "id": "sgp_ftth_onu_cmd_2",
    "name": "ONU CMD",
    "section": "FTTH",
    "method": "POST",
    "path": "/api/fttx/onu/{identificador_onu}/cmd/{cmd_id}/",
    "pathParams": [
      "identificador_onu",
      "cmd_id"
    ],
    "queryParams": [],
    "bodyMode": "none",
    "bodyParams": [],
    "description": "**{IDENTIFICADOR_ONU}**: Pode ser o ID ou o Serial da ONU. | **Parâmetro** | **Tipo** | **Descrição** | | --- | --- | --- | | cmdrun | string | cmdrun | | cmd_print_result | string | cmd_print_result | | regex_search | string | regex_search |"
  },
  {
    "id": "sgp_ftth_onu_tl1_cmd",
    "name": "ONU TL1 CMD",
    "section": "FTTH",
    "method": "GET",
    "path": "/api/fttx/onu/{identificador_onu}/tl1/cmd/",
    "pathParams": [
      "identificador_onu"
    ],
    "queryParams": [],
    "bodyMode": "none",
    "bodyParams": [],
    "description": "**{IDENTIFICADOR_ONU}**: Pode ser o ID ou o Serial da ONU. | **Parâmetro** | **Tipo** | **Descrição** | | --- | --- | --- | | action | string | Valores: \"add\"; \"delete\"; |"
  },
  {
    "id": "sgp_ftth_onu_historico",
    "name": "ONU Histórico",
    "section": "FTTH",
    "method": "GET",
    "path": "/api/fttx/onu/history/",
    "pathParams": [],
    "queryParams": [],
    "bodyMode": "none",
    "bodyParams": [],
    "description": "| **Parâmetro** | **Tipo** | **Descrição** | | --- | --- | --- | | phy_addr | string | phy_addr | | service | integer | ID do Serviço |"
  },
  {
    "id": "sgp_ftth_cadastrar_cto",
    "name": "Cadastrar CTO",
    "section": "FTTH",
    "method": "POST",
    "path": "/api/fttx/splitter/add/",
    "pathParams": [],
    "queryParams": [],
    "bodyMode": "none",
    "bodyParams": [],
    "description": "| **Parâmetro** | **Tipo** | **Descrição** | | --- | --- | --- | | pon_id | integer | ID da PON | | identificacao | string | Nome da CTO | | portas | integer | Número de portas | | streetpole_id | integer | ID do Poste | | latitude | string | Latitude da CTO | | longitude | string | Longitude da CTO"
  },
  {
    "id": "sgp_ftth_onu_template",
    "name": "ONU Template",
    "section": "FTTH",
    "method": "GET",
    "path": "/api/fttx/onutemplate/list/",
    "pathParams": [],
    "queryParams": [],
    "bodyMode": "none",
    "bodyParams": [],
    "description": ""
  },
  {
    "id": "sgp_ftth_onu_tipo",
    "name": "ONU Tipo",
    "section": "FTTH",
    "method": "GET",
    "path": "/api/fttx/onutype/list/",
    "pathParams": [],
    "queryParams": [],
    "bodyMode": "none",
    "bodyParams": [],
    "description": ""
  },
  {
    "id": "sgp_ftth_onu_modo",
    "name": "ONU Modo",
    "section": "FTTH",
    "method": "GET",
    "path": "/api/fttx/onumode/list/",
    "pathParams": [],
    "queryParams": [],
    "bodyMode": "none",
    "bodyParams": [],
    "description": ""
  },
  {
    "id": "sgp_ftth_servicos",
    "name": "Serviços",
    "section": "FTTH",
    "method": "GET",
    "path": "/api/fttx/service/list/",
    "pathParams": [],
    "queryParams": [],
    "bodyMode": "none",
    "bodyParams": [],
    "description": "| **Parâmetro** | **Tipo** | **Descrição** | | --- | --- | --- | | login | string | Login do Serviço | | contrato | integer | ID do Contrato |"
  },
  {
    "id": "sgp_ftth_adicionar_cto_ao_servico",
    "name": "Adicionar CTO ao Serviço",
    "section": "FTTH",
    "method": "POST",
    "path": "/ws/fttx/splitter/service/add/",
    "pathParams": [],
    "queryParams": [],
    "bodyMode": "none",
    "bodyParams": [],
    "description": "| **Parâmetro** | **Tipo** | **Descrição** | | --- | --- | --- | | service_id | integer | Id do seriço de internet \\[Obrigatório\\] | | splitter_id | integer | Id da CTO \\[Obrigatório\\] | | splitter_port | integer | Porta da CTO \\[Obrigatório\\] |"
  },
  {
    "id": "sgp_estoque_empresa_listar",
    "name": "Empresa – Listar",
    "section": "Estoque",
    "method": "GET",
    "path": "/api/estoque/empresa/list/",
    "pathParams": [],
    "queryParams": [],
    "bodyMode": "none",
    "bodyParams": [],
    "description": "| **Parâmetro** | **Tipo** | **Descrição** | | --- | --- | --- | | cpfcnpj | string | CNPJ da Empresa | | nome | string | Nome Fantasia / Razão Social da Empresa |"
  },
  {
    "id": "sgp_estoque_fornecedor_listar",
    "name": "Fornecedor – Listar",
    "section": "Estoque",
    "method": "GET",
    "path": "/api/estoque/fornecedor/list/",
    "pathParams": [],
    "queryParams": [],
    "bodyMode": "none",
    "bodyParams": [],
    "description": "| **Parâmetro** | **Tipo** | **Descrição** | | --- | --- | --- | | cpfcnpj | string | CNPJ do Fornecedor | | nome | string | Nome Fantasia / Razão Social do Fornecedor |"
  },
  {
    "id": "sgp_estoque_categoria_listar",
    "name": "Categoria – Listar",
    "section": "Estoque",
    "method": "GET",
    "path": "/api/estoque/categoria/list/",
    "pathParams": [],
    "queryParams": [
      "nome"
    ],
    "bodyMode": "none",
    "bodyParams": [],
    "description": "| **Parâmetro** | **Tipo** | **Descrição** | | --- | --- | --- | | nome | string | Nome da Categoria |"
  },
  {
    "id": "sgp_estoque_fabricante_listar",
    "name": "Fabricante – Listar",
    "section": "Estoque",
    "method": "GET",
    "path": "/api/estoque/fabricante/list/",
    "pathParams": [],
    "queryParams": [],
    "bodyMode": "none",
    "bodyParams": [],
    "description": "| **Parâmetro** | **Tipo** | **Descrição** | | --- | --- | --- | | nome | string | Nome do Fabricante |"
  },
  {
    "id": "sgp_estoque_ncm_listar",
    "name": "NCM – Listar",
    "section": "Estoque",
    "method": "GET",
    "path": "/api/estoque/ncm/list/",
    "pathParams": [],
    "queryParams": [],
    "bodyMode": "none",
    "bodyParams": [],
    "description": "| **Parâmetro** | **Tipo** | **Descrição** | | --- | --- | --- | | codigo | string | Código do NCM | | descricao | string | Descrição do NCM |"
  },
  {
    "id": "sgp_estoque_kit_de_instalacao_listar",
    "name": "Kit de Instalação – Listar",
    "section": "Estoque",
    "method": "GET",
    "path": "/api/estoque/kitinstalacao/list/",
    "pathParams": [],
    "queryParams": [],
    "bodyMode": "none",
    "bodyParams": [],
    "description": "| **Parâmetro** | **Tipo** | **Descrição** | | --- | --- | --- | | descricao | string | Descrição do Kit de Instalação |"
  },
  {
    "id": "sgp_estoque_produtos_de_kit_listar",
    "name": "Produtos de Kit – Listar",
    "section": "Estoque",
    "method": "GET",
    "path": "/api/estoque/kitinstalacaoproduto/list/",
    "pathParams": [],
    "queryParams": [],
    "bodyMode": "none",
    "bodyParams": [],
    "description": "| **Parâmetro** | **Tipo** | **Descrição** | | --- | --- | --- | | kitinstalacao_id | string | ID do Kit de Instalação (Obrigatório) |"
  },
  {
    "id": "sgp_estoque_comodato_de_cliente_listar",
    "name": "Comodato de Cliente – Listar",
    "section": "Estoque",
    "method": "GET",
    "path": "/api/estoque/comodato/list/",
    "pathParams": [],
    "queryParams": [],
    "bodyMode": "none",
    "bodyParams": [],
    "description": "| **Parâmetro** | **Tipo** | **Descrição** | | --- | --- | --- | | cliente_id | string | ID do Cliente \\*(Obrigatório) | | clientecontrato_id | string | ID do Contrato \\*(Obrigatório) | | ordemservico_id | string | ID da Ordem de Serviço \\*(Obrigatório) | | data_cadastro_ini | string | Data de Cadas"
  },
  {
    "id": "sgp_estoque_itens_da_comodato_listar",
    "name": "Itens da Comodato – Listar",
    "section": "Estoque",
    "method": "GET",
    "path": "/api/estoque/comodatoitens/list/",
    "pathParams": [],
    "queryParams": [],
    "bodyMode": "none",
    "bodyParams": [],
    "description": "| **Parâmetro** | Tipo | **Descrição** | | --- | --- | --- | | comodato_id | string | ID do Comodato (Obrigatório) |"
  },
  {
    "id": "sgp_estoque_venda_de_cliente_listar",
    "name": "Venda de Cliente – Listar",
    "section": "Estoque",
    "method": "GET",
    "path": "/api/estoque/venda/list/",
    "pathParams": [],
    "queryParams": [],
    "bodyMode": "none",
    "bodyParams": [],
    "description": "| **Parâmetro** | **Tipo** | **Descrição** | | --- | --- | --- | | cliente_id | string | ID do Cliente \\*(Obrigatório) | | clientecontrato_id | string | ID do Contrato \\*(Obrigatório) | | ordemservico_id | string | ID da Ordem de Serviço \\*(Obrigatório) | | data_cadastro_ini | string | Data de Cadas"
  },
  {
    "id": "sgp_estoque_itens_da_venda_listar",
    "name": "Itens da Venda – Listar",
    "section": "Estoque",
    "method": "GET",
    "path": "/api/estoque/vendaitens/list/",
    "pathParams": [],
    "queryParams": [],
    "bodyMode": "none",
    "bodyParams": [],
    "description": "| **Parâmetro** | **Tipo** | **Descrição** | | --- | --- | --- | | venda_id | string | ID da Venda |"
  },
  {
    "id": "sgp_estoque_lancamento_listar",
    "name": "Lançamento – Listar",
    "section": "Estoque",
    "method": "GET",
    "path": "/api/estoque/lancamento/list/",
    "pathParams": [],
    "queryParams": [],
    "bodyMode": "none",
    "bodyParams": [],
    "description": "| **Parâmetro** | **Tipo** | **Descrição** | | --- | --- | --- | | cliente_id | integer | ID do Cliente (\\*) | | clientecontrato_id | integer | ID do Contrato (\\*) | | ordemservico_id | integer | ID da Ordem de Serviço (\\*) | | tipo | integer | Tipo do lançamento (\\*) | | data_cadastro_ini | string "
  },
  {
    "id": "sgp_estoque_itens_do_lancamento_listar",
    "name": "Itens do Lançamento – Listar",
    "section": "Estoque",
    "method": "GET",
    "path": "/api/estoque/lancamentoitem/list/",
    "pathParams": [],
    "queryParams": [],
    "bodyMode": "none",
    "bodyParams": [],
    "description": "| **Parâmetro** | **Tipo** | **Descrição** | | --- | --- | --- | | ordemservico_id | string | ID da Ordem de Serviço (\\*) | | lancamento_id | string | ID do Lançamento | | cliente_id | string | ID do Cliente (\\*) | | clientecontrato_id | string | ID do Contrato (\\*) | (\\*) Um dos 3 parâmetros é obri"
  },
  {
    "id": "sgp_estoque_local_de_estoque_listar",
    "name": "Local de Estoque – Listar",
    "section": "Estoque",
    "method": "GET",
    "path": "/api/estoque/estoque/list/",
    "pathParams": [],
    "queryParams": [],
    "bodyMode": "none",
    "bodyParams": [],
    "description": "| **Parâmetro** | **Tipo** | **Descrição** | | --- | --- | --- | | usuario | string | Nome do Usuário | | descricao | string | Descrição do Estoque | **Basic Auth** opcional com Username/Password para filtrar por usuário."
  },
  {
    "id": "sgp_estoque_saldo_listar",
    "name": "Saldo – Listar",
    "section": "Estoque",
    "method": "GET",
    "path": "/api/estoque/estoque_agregado_referencias/list/",
    "pathParams": [],
    "queryParams": [],
    "bodyMode": "none",
    "bodyParams": [],
    "description": "| **Parâmetro** | **Tipo** | **Descrição** | | --- | --- | --- | | estoque_id | string | ID do Estoque | | produto_id | string | ID do Produto | | referencia | string | Valor da Referência do Produto |"
  },
  {
    "id": "sgp_estoque_produto_listar_quantitativos",
    "name": "Produto – Listar (Quantitativos)",
    "section": "Estoque",
    "method": "GET",
    "path": "/api/estoque/produto/list/",
    "pathParams": [],
    "queryParams": [],
    "bodyMode": "none",
    "bodyParams": [],
    "description": "| **Parâmetro** | **Tipo** | **Descrição** | | --- | --- | --- | | descricao | string | Descrição do Produto | **Basic Auth** opcional com Username/Password para filtrar por usuário."
  },
  {
    "id": "sgp_estoque_produto_listar_cadastrados",
    "name": "Produto – Listar (Cadastrados)",
    "section": "Estoque",
    "method": "GET",
    "path": "/api/estoque/produto/list/all/",
    "pathParams": [],
    "queryParams": [],
    "bodyMode": "none",
    "bodyParams": [],
    "description": "| **Parâmetro** | **Tipo** | **Descrição** | | --- | --- | --- | | retornar_inativos | boolean | Caso enviado, retorna também produtos inativos. | **Basic Auth** opcional com Username/Password para filtrar por usuário."
  },
  {
    "id": "sgp_estoque_unidades_de_medidas_listar",
    "name": "Unidades de Medidas - Listar",
    "section": "Estoque",
    "method": "GET",
    "path": "/api/estoque/unidademedida/list/",
    "pathParams": [],
    "queryParams": [],
    "bodyMode": "none",
    "bodyParams": [],
    "description": "Parâmetros URL: - sigla; - descricao."
  },
  {
    "id": "sgp_estoque_compras_listar",
    "name": "Compras - Listar",
    "section": "Estoque",
    "method": "GET",
    "path": "/api/estoque/compra/list/",
    "pathParams": [],
    "queryParams": [],
    "bodyMode": "none",
    "bodyParams": [],
    "description": "Parâmetros URL: - fornecedor_id (\\*); - data_cadastro_ini (AAAA-MM-DD) (\\*); - data_cadastro_fim (AAAA-MM-DD) (\\*). (\\*) Um dos 3 parâmetros é obrigatório. data_cadastro_ini e data_cadastro_fim são juntamente obrigatórios, se algum informado."
  },
  {
    "id": "sgp_estoque_itens_da_compra_listar",
    "name": "Itens da Compra - Listar",
    "section": "Estoque",
    "method": "GET",
    "path": "/api/estoque/compraitens/list/",
    "pathParams": [],
    "queryParams": [],
    "bodyMode": "none",
    "bodyParams": [],
    "description": "Parâmetros URL: - compra_id"
  },
  {
    "id": "sgp_estoque_transferencias_listar",
    "name": "Transferências - Listar",
    "section": "Estoque",
    "method": "GET",
    "path": "/api/estoque/transferencia/list/",
    "pathParams": [],
    "queryParams": [],
    "bodyMode": "none",
    "bodyParams": [],
    "description": "Parâmetros URL: - data_cadastro_ini (AAAA-MM-DD); - data_cadastro_fim (AAAA-MM-DD). data_cadastro_ini e data_cadastro_fim são obrigatórios."
  },
  {
    "id": "sgp_estoque_lancamento_criar",
    "name": "Lançamento – Criar",
    "section": "Estoque",
    "method": "POST",
    "path": "/api/estoque/lancamentoitem/create/",
    "pathParams": [],
    "queryParams": [],
    "bodyMode": "json",
    "bodyParams": [
      "os_id",
      "cliente_id",
      "clientecontrato_id",
      "comodato",
      "origem_id",
      "itens"
    ],
    "description": "| **Parâmetro** | **Tipo** | **Descrição** | | --- | --- | --- | | itens | array | Array de produtos (\\*) | | origem_id | integer | ID da Origem (\\*) | | os_id | integer | ID da Ordem de Serviço | | cliente_id | integer | ID do Cliente | | clientecontrato_id | integer | ID do Contrato (\\*) | | comod"
  },
  {
    "id": "sgp_estoque_estorno_atualizar",
    "name": "Estorno – Atualizar",
    "section": "Estoque",
    "method": "POST",
    "path": "/api/estoque/lancamentoitem/estorno/",
    "pathParams": [],
    "queryParams": [],
    "bodyMode": "form",
    "bodyParams": [
      "lancamentoitem_id",
      "local_id",
      "os_id",
      "observacao"
    ],
    "description": "| **Parâmetro** | **Tipo** | **Descrição** | | --- | --- | --- | | lancamentoitem_id | integer | ID do Lançamento Item (\\*) | | local_id | integer | ID do Local (\\*) | | os_id | integer | ID da Ordem de Serviço | | observacao | string | Observação | (\\*) É um parâmetro obrigatório."
  },
  {
    "id": "sgp_estoque_produto_cadastrar",
    "name": "Produto - Cadastrar",
    "section": "Estoque",
    "method": "POST",
    "path": "/api/estoque/produto/create/",
    "pathParams": [],
    "queryParams": [],
    "bodyMode": "form",
    "bodyParams": [
      "codigo",
      "descricao",
      "ativo",
      "codigo_barras",
      "tipo_referencia",
      "informar_referencia_saida",
      "categorias",
      "foto",
      "valor_custo",
      "valor_venda",
      "unidade_medida",
      "detalhes",
      "fabricante",
      "modelo",
      "informacoes_adicionais",
      "ncm"
    ],
    "description": "| **Parâmetro** | **Tipo** | **Descrição** | | --- | --- | --- | | codigo | string | Código do Produto | | descricao | string | Descrição do Produto | | codigo_barras | string | Código de Barras do Produto | | tipo_referencia | string | Tipo de Referência | | informar_referencia_saida | string | Per"
  },
  {
    "id": "sgp_estoque_produto_alterar",
    "name": "Produto - Alterar",
    "section": "Estoque",
    "method": "POST",
    "path": "/api/estoque/produto/{produto_id}/update/",
    "pathParams": [
      "produto_id"
    ],
    "queryParams": [],
    "bodyMode": "form",
    "bodyParams": [
      "codigo",
      "descricao",
      "ativo",
      "codigo_barras",
      "tipo_referencia",
      "informar_referencia_saida",
      "categorias",
      "foto",
      "valor_custo",
      "valor_venda",
      "unidade_medida",
      "detalhes",
      "fabricante",
      "modelo",
      "informacoes_adicionais",
      "ncm"
    ],
    "description": "| **Parâmetro** | **Tipo** | **Descrição** | | --- | --- | --- | | codigo | string | Código do Produto | | descricao | string | Descrição do Produto | | codigo_barras | string | Código de Barras do Produto | | tipo_referencia | string | Tipo de Referência | | informar_referencia_saida | string | Per"
  },
  {
    "id": "sgp_estoque_compra_cadastrar",
    "name": "Compra - Cadastrar",
    "section": "Estoque",
    "method": "POST",
    "path": "/api/estoque/compra/create/",
    "pathParams": [],
    "queryParams": [],
    "bodyMode": "json",
    "bodyParams": [
      "fornecedor",
      "empresa",
      "notafiscal",
      "observacao",
      "itens"
    ],
    "description": "| **Parâmetro** | **Tipo** | **Descrição** | | --- | --- | --- | | fornecedor | integer | Fornecedor | | empresa | integer | Empresa | | nota_fiscal | string | Nota Fiscal | | observacao | string | Observação | Itens: | **Parâmetro** | **Tipo** | **Descrição** | | --- | --- | --- | | produto_id | in"
  },
  {
    "id": "sgp_estoque_transferencia_cadastrar",
    "name": "Transferência - Cadastrar",
    "section": "Estoque",
    "method": "POST",
    "path": "/api/estoque/transferencia/create/",
    "pathParams": [],
    "queryParams": [],
    "bodyMode": "json",
    "bodyParams": [
      "origem",
      "destino",
      "responsavel_envio",
      "observacao",
      "itens"
    ],
    "description": "| **Parâmetro** | **Tipo** | **Descrição** | | --- | --- | --- | | origem | integer | Local de Origem | | destino | integer | Local de Destino | | responsavel_envio | integer | Responsável Envio | | observacao | string | Observação | Itens: | **Parâmetro** | **Tipo** | **Descrição** | | --- | --- | "
  },
  {
    "id": "sgp_estoque_vincular_produto_nfe_x_produto_estoque",
    "name": "Vincular Produto NFe X Produto Estoque",
    "section": "Estoque",
    "method": "POST",
    "path": "/api/ura/produtonfe_produtoestoque/vincular/",
    "pathParams": [],
    "queryParams": [],
    "bodyMode": "form",
    "bodyParams": [
      "produto_nfe",
      "produto_estoque"
    ],
    "description": "| **Parâmetro** | **Tipo** | **Descrição** | | --- | --- | --- | | app | string | Nome da Aplicação no SGP (obrigatório) | | token | string | Token da Aplicação no SGP (obrigatório) | | produto_nfe | integer | Produto NFe | | produto_estoque | integer | Produto Estoque |"
  },
  {
    "id": "sgp_estoque_vincular_produto_nfe_x_produto_estoque_patch",
    "name": "Vincular Produto NFe X Produto Estoque  Patch",
    "section": "Estoque",
    "method": "PATCH",
    "path": "/api/ura/produtonfe_produtoestoque/vincular/",
    "pathParams": [],
    "queryParams": [],
    "bodyMode": "form",
    "bodyParams": [
      "produto_nfe",
      "produto_estoque"
    ],
    "description": "| **Parâmetro** | **Tipo** | **Descrição** | | --- | --- | --- | | app | string | Nome da Aplicação no SGP (obrigatório) | | token | string | Token da Aplicação no SGP (obrigatório) | | produto_nfe | integer | Produto NFe | | produto_estoque | integer | Produto Estoque |"
  },
  {
    "id": "sgp_estoque_compra_nfe",
    "name": "Compra - NFe",
    "section": "Estoque",
    "method": "POST",
    "path": "/api/ura/compra/nfe/",
    "pathParams": [],
    "queryParams": [],
    "bodyMode": "json",
    "bodyParams": [
      "nfe",
      "estoque",
      "fornecedor",
      "itens"
    ],
    "description": "| **Parâmetro** | **Tipo** | **Descrição** | | --- | --- | --- | | app | string | Nome da Aplicação no SGP (obrigatório) | | token | string | Token da Aplicação no SGP (obrigatório) | | nfe | integer | ID da NFe | | estoque | integer | ID do Estoque | | fornecedor | integer | ID do Fornecedor | Iten"
  },
  {
    "id": "sgp_estoque_fornecedor_cadastrar",
    "name": "Fornecedor - Cadastrar",
    "section": "Estoque",
    "method": "POST",
    "path": "/api/estoque/fornecedor/create/",
    "pathParams": [],
    "queryParams": [],
    "bodyMode": "form",
    "bodyParams": [
      "nome",
      "tipo_pessoa",
      "sit_fiscal",
      "nome_fantasia",
      "responsavel_empresa",
      "nome_contato",
      "cpf_cnpj",
      "rg",
      "rg_emissor",
      "insc_estadual",
      "insc_municipal",
      "contrib_icms",
      "endereco_logradouro",
      "endereco_numero",
      "endereco_bairro",
      "endereco_cidade",
      "endereco_uf",
      "endereco_cep",
      "endereco_complemento",
      "endereco_ponto_referencia",
      "endereco_pais",
      "endereco_coordenadas",
      "cpais",
      "cmun",
      "email",
      "telefone",
      "celular",
      "fax",
      "observacao",
      "json",
      "ativo"
    ],
    "description": "| **Parâmetro** | **Tipo** | **Descrição** | | --- | --- | --- | | tipo_pessoa | string | Tipo de Pessoa do Fornecedor | | sit_fiscal | string | Situação Fiscal do Fornecedor | | nome | string | Nome do Fornecedor | | nome_fantasia | string | Nome Fantasia do Fornecedor | | responsavel_empresa | str"
  },
  {
    "id": "sgp_estoque_fornecedor_alterar",
    "name": "Fornecedor - Alterar",
    "section": "Estoque",
    "method": "POST",
    "path": "/api/estoque/fornecedor/<fornecedor_id>/update/",
    "pathParams": [],
    "queryParams": [],
    "bodyMode": "form",
    "bodyParams": [
      "nome",
      "tipo_pessoa",
      "sit_fiscal",
      "nome_fantasia",
      "responsavel_empresa",
      "nome_contato",
      "cpf_cnpj",
      "rg",
      "rg_emissor",
      "insc_estadual",
      "insc_municipal",
      "contrib_icms",
      "endereco_logradouro",
      "endereco_numero",
      "endereco_bairro",
      "endereco_cidade",
      "endereco_uf",
      "endereco_cep",
      "endereco_complemento",
      "endereco_ponto_referencia",
      "endereco_pais",
      "endereco_coordenadas",
      "cpais",
      "cmun",
      "email",
      "telefone",
      "celular",
      "fax",
      "observacao",
      "json",
      "ativo"
    ],
    "description": "| **Parâmetro** | **Tipo** | **Descrição** | | --- | --- | --- | | tipo_pessoa | string | Tipo de Pessoa do Fornecedor | | sit_fiscal | string | Situação Fiscal do Fornecedor | | nome | string | Nome do Fornecedor | | nome_fantasia | string | Nome Fantasia do Fornecedor | | responsavel_empresa | str"
  },
  {
    "id": "sgp_termo_termo_exibir",
    "name": "Termo Exibir",
    "section": "Termo de Aceite",
    "method": "GET",
    "path": "/api/contrato/termoaceite/{idcontrato}/",
    "pathParams": [
      "idcontrato"
    ],
    "queryParams": [],
    "bodyMode": "none",
    "bodyParams": [],
    "description": ""
  },
  {
    "id": "sgp_termo_termo_aceitar",
    "name": "Termo Aceitar",
    "section": "Termo de Aceite",
    "method": "POST",
    "path": "/api/contrato/termoaceite/{idcontrato}",
    "pathParams": [
      "idcontrato"
    ],
    "queryParams": [],
    "bodyMode": "form",
    "bodyParams": [
      "aceite"
    ],
    "description": ""
  },
  {
    "id": "sgp_ura_cliente_listar",
    "name": "Cliente – Listar",
    "section": "URA",
    "method": "POST",
    "path": "/api/ura/clientes/",
    "pathParams": [],
    "queryParams": [],
    "bodyMode": "form",
    "bodyParams": [
      "offset",
      "limit",
      "cliente_id",
      "cpfcnpj",
      "cliente_nome",
      "plano",
      "login",
      "contrato",
      "status",
      "portador",
      "telefone",
      "pop",
      "contrato_status",
      "omitir_contratos",
      "omitir_titulos",
      "omitir_contatos",
      "tipo_servico",
      "exibir_conexao",
      "exibir_observacao_cliente",
      "exibir_observacao_servicos",
      "data_cadastro_inicio",
      "data_cadastro_fim",
      "data_alteracao_inicio",
      "data_alteracao_fim",
      "data_vencimento_inicio",
      "data_vencimento_fim",
      "data_contrato_status_inicio",
      "data_contrato_status_fim",
      "data_pagamento_inicio",
      "data_pagamento_fim",
      "cto",
      "cto_porta"
    ],
    "description": "| **Parâmetro** | **Tipo** | **Descrição** | | --- | --- | --- | | app | string | Nome da Aplicação no SGP (obrigatório) | | token | string | Token da Aplicação no SGP (obrigatório) | | offset | integer | Offset da Consulta | | limit | integer | Limit da Consulta | | cliente_id | integer | ID do Cli"
  },
  {
    "id": "sgp_ura_cliente_listagem_resumida",
    "name": "Cliente – Listagem Resumida",
    "section": "URA",
    "method": "POST",
    "path": "/api/ura/listacliente/",
    "pathParams": [],
    "queryParams": [],
    "bodyMode": "form",
    "bodyParams": [
      "pop",
      "status",
      "status_data_inicial",
      "status_data_final",
      "tipo"
    ],
    "description": "| **Parâmetro** | **Tipo** | **Descrição** | | --- | --- | --- | | token | string | Token da Aplicação no SGP (obrigatório) | | app | string | Nome da Aplicação no SGP (obrigatório) | | pop | integer | ID do POP a ser utilizado na filtragem | | status | integer | Status atual do contrato de serviço "
  },
  {
    "id": "sgp_ura_cliente_consultar",
    "name": "Cliente – Consultar",
    "section": "URA",
    "method": "POST",
    "path": "/api/ura/consultacliente/",
    "pathParams": [],
    "queryParams": [],
    "bodyMode": "form",
    "bodyParams": [
      "cpfcnpj",
      "contrato",
      "nome",
      "mac_controle",
      "mac_dhcp",
      "servico_serial",
      "onu_serial",
      "login",
      "email",
      "senha",
      "telefone",
      "radius",
      "incluir_unificados",
      "tservico",
      "status",
      "atrasado",
      "servicos_dados",
      "plano",
      "titulo_status",
      "exibir_observacao_cliente",
      "exibir_observacao_servicos",
      "pop",
      "assinatura_eletronica",
      "exibir_historico_status"
    ],
    "description": "| **Parâmetro** | **Tipo** | **Descrição** | | --- | --- | --- | | app | string | Nome da Aplicação no SGP (obrigatório) | | token | string | Token da Aplicação no SGP (obrigatório) | | cpfcnpj | string | CPF / CNPJ do Cliente\\* | | contrato | string | ID do Contrato\\* | | nome | string | Nome do Cl"
  },
  {
    "id": "sgp_ura_cliente_sem_fatura",
    "name": "Cliente - Sem Fatura",
    "section": "URA",
    "method": "POST",
    "path": "/api/ura/clientes/semfatura/",
    "pathParams": [],
    "queryParams": [],
    "bodyMode": "form",
    "bodyParams": [
      "periodo"
    ],
    "description": "| **Parâmetro** | **Tipo** | Descrição | | --- | --- | --- | | app | string | Nome da Aplicação no SGP (obrigatório) | | token | string | Token da Aplicação no SGP (obrigatório) | | periodo | string | Período de consulta (Formato AAAA-MM) |"
  },
  {
    "id": "sgp_ura_contato_criar",
    "name": "Contato – Criar",
    "section": "URA",
    "method": "POST",
    "path": "/api/ura/contato/add/",
    "pathParams": [],
    "queryParams": [],
    "bodyMode": "form",
    "bodyParams": [
      "contato",
      "contrato",
      "tipo"
    ],
    "description": "| **Parâmetro** | **Tipo** | **Descrição** | | --- | --- | --- | | app | string | Nome da Aplicação no SGP (obrigatório) | | token | string | Token da Aplicação no SGP (obrigatório) | | contrato | integer | ID do Contrato | | tipo | string | Tipo do Contato | | contato | string | Contato | **tipo**:"
  },
  {
    "id": "sgp_ura_viabilidade_consultar",
    "name": "Viabilidade – Consultar",
    "section": "URA",
    "method": "POST",
    "path": "/api/ura/viabilidade/",
    "pathParams": [],
    "queryParams": [],
    "bodyMode": "form",
    "bodyParams": [
      "logradouro",
      "numero_inicial",
      "numero_final",
      "bairro",
      "cep",
      "cidade"
    ],
    "description": "Consulta Viabilidade"
  },
  {
    "id": "sgp_ura_viabilidade_consultar_via_gateway",
    "name": "Viabilidade – Consultar via Gateway",
    "section": "URA",
    "method": "GET",
    "path": "/api/ura/viabilidadeinstalacao",
    "pathParams": [],
    "queryParams": [],
    "bodyMode": "none",
    "bodyParams": [],
    "description": "| **Parâmetro** | **Tipo** | **Descrição** | | --- | --- | --- | | gateway | integer | ID da Gateway de mapas | | raio | integer | Raio de consulta | | coordenada | string | Coordenada do ponto a ser consultado (Modelo \"X.XXXXX,Y.YYYYY\") |"
  },
  {
    "id": "sgp_ura_contrato_listar",
    "name": "Contrato – Listar",
    "section": "URA",
    "method": "POST",
    "path": "/api/ura/listacontrato/",
    "pathParams": [],
    "queryParams": [],
    "bodyMode": "form",
    "bodyParams": [
      "contrato",
      "plano",
      "tipo",
      "status",
      "exibir_endereco"
    ],
    "description": "| **Parâmetro** | **Tipo** | **Descrição** | | --- | --- | --- | | app | string | Nome da Aplicação no SGP (obrigatório) | | token | string | Token da Aplicação no SGP (obrigatório) | | contrato | integer | ID do Contrato | | status | integer | Status do Contrato | | tipo | string | Tipo de Pessoa |"
  },
  {
    "id": "sgp_ura_contrato_atualizar",
    "name": "Contrato – Atualizar",
    "section": "URA",
    "method": "POST",
    "path": "/api/ura/contrato/edit/",
    "pathParams": [],
    "queryParams": [],
    "bodyMode": "form",
    "bodyParams": [
      "contrato",
      "sms_desativado",
      "forma_cobranca",
      "portador",
      "debito_banco",
      "debito_agencia",
      "debito_conta",
      "tag_add",
      "tag_remove"
    ],
    "description": "| **Parâmetro** | **Tipo** | **Descrição** | | --- | --- | --- | | app | string | Nome da Aplicação no SGP (obrigatório) | | token | string | Token da Aplicação no SGP (obrigatório) | | contrato | integer | ID do Contrato | | sms_desativado | boolean | Alterar checkbox 'SMS Desativado?' | | forma_co"
  },
  {
    "id": "sgp_ura_contrato_imprimir",
    "name": "Contrato – Imprimir",
    "section": "URA",
    "method": "GET",
    "path": "/api/contratos/print/{tipo_contrato}",
    "pathParams": [
      "tipo_contrato"
    ],
    "queryParams": [],
    "bodyMode": "none",
    "bodyParams": [],
    "description": "| **Parâmetro** | **Tipo** | **Descrição** | | --- | --- | --- | | app | string | Nome da Aplicação no SGP (obrigatório) | | token | string | Token da Aplicação no SGP (obrigatório) | | contrato | integer | ID do Contrato (obrigatório para token+app, recomendado para outros) | | cpfcnpj | integer | "
  },
  {
    "id": "sgp_ura_contrato_liberacao_por_confianca",
    "name": "Contrato – Liberação por Confiança",
    "section": "URA",
    "method": "POST",
    "path": "/api/ura/liberacaopromessa/",
    "pathParams": [],
    "queryParams": [],
    "bodyMode": "form",
    "bodyParams": [
      "contrato",
      "data_promessa",
      "uracontato",
      "enviar_sms",
      "uraIP",
      "conteudo"
    ],
    "description": "| **Parâmetro** | **Tipo** | **Descrição** | | --- | --- | --- | | app | string | Nome da Aplicação no SGP (obrigatório) | | token | string | Token da Aplicação no SGP (obrigatório) | | contrato | string | ID do Contrato (obrigatório) | | data_promessa | string | Data de Promessa, formato: \"AAAA-MM-"
  },
  {
    "id": "sgp_ura_servico_internet_verificar_disponibilidade",
    "name": "Serviço Internet – Verificar disponibilidade",
    "section": "URA",
    "method": "POST",
    "path": "/api/ura/verificaacesso/",
    "pathParams": [],
    "queryParams": [],
    "bodyMode": "form",
    "bodyParams": [
      "contrato",
      "telefone",
      "status_all",
      "status_filter",
      "uracontato",
      "protocolo_ura"
    ],
    "description": ""
  },
  {
    "id": "sgp_ura_portador_listar",
    "name": "Portador – Listar",
    "section": "URA",
    "method": "GET",
    "path": "/api/ura/portador/",
    "pathParams": [],
    "queryParams": [],
    "bodyMode": "none",
    "bodyParams": [],
    "description": "| **Parâmetro** | **Tipo** | **Descrição** | | --- | --- | --- | | app | string | Nome da Aplicação no SGP (obrigatório) | | token | string | Token da Aplicação no SGP (obrigatório) |"
  },
  {
    "id": "sgp_ura_motivos_de_status_listar",
    "name": "Motivos de Status – Listar",
    "section": "URA",
    "method": "POST",
    "path": "/api/ura/contrato/status/motivos/",
    "pathParams": [],
    "queryParams": [],
    "bodyMode": "form",
    "bodyParams": [],
    "description": ""
  },
  {
    "id": "sgp_ura_status_do_contrato_atualizar",
    "name": "Status do Contrato – Atualizar",
    "section": "URA",
    "method": "POST",
    "path": "/api/ura/contrato/status/edit/",
    "pathParams": [],
    "queryParams": [],
    "bodyMode": "form",
    "bodyParams": [
      "contrato",
      "status",
      "motivo"
    ],
    "description": "| **Parâmetro** | **Tipo** | **Descrição** | | --- | --- | --- | | app | string | Nome da Aplicação no SGP (obrigatório) | | token | string | Token da Aplicação no SGP (obrigatório) | | contrato | integer | ID do Contrato | | status | integer | Status do Contrato | | motivo | integer | ID do Motivo "
  },
  {
    "id": "sgp_ura_senha_do_servico_atualizar",
    "name": "Senha do Serviço – Atualizar",
    "section": "URA",
    "method": "POST",
    "path": "/api/ura/cliente/servico/senha/edit/",
    "pathParams": [],
    "queryParams": [],
    "bodyMode": "form",
    "bodyParams": [
      "servico",
      "tipo",
      "senha"
    ],
    "description": "| **Parâmetro** | **Tipo** | **Descrição** | | --- | --- | --- | | app | string | Nome da Aplicação no SGP (obrigatório) | | token | string | Token da Aplicação no SGP (obrigatório) | | servico | integer | ID do Serviço | | tipo | integer | Tipo do Serviço | | senha | string | Senha do Serviço | ###"
  },
  {
    "id": "sgp_ura_cpe_manage_consultar",
    "name": "CPE Manage – Consultar",
    "section": "URA",
    "method": "GET",
    "path": "/api/ura/cpemanage/",
    "pathParams": [],
    "queryParams": [],
    "bodyMode": "none",
    "bodyParams": [],
    "description": ""
  },
  {
    "id": "sgp_ura_cpe_manage_atualizar",
    "name": "CPE Manage – Atualizar",
    "section": "URA",
    "method": "POST",
    "path": "/api/ura/cpemanage/",
    "pathParams": [],
    "queryParams": [],
    "bodyMode": "form",
    "bodyParams": [
      "contrato",
      "servico",
      "wifi_status",
      "novo_ssid",
      "nova_senha",
      "wifi_status_5g",
      "novo_ssid_5g",
      "nova_senha_5g"
    ],
    "description": ""
  },
  {
    "id": "sgp_ura_plano_listar",
    "name": "Plano – Listar",
    "section": "URA",
    "method": "GET",
    "path": "/api/ura/consultaplano/",
    "pathParams": [],
    "queryParams": [],
    "bodyMode": "none",
    "bodyParams": [],
    "description": "| **Parâmetro (Body)** | **Tipo** | **Descrição** | | --- | --- | --- | | app | string | Nome da Aplicação no SGP (obrigatório) | | token | string | Token da Aplicação no SGP (obrigatório) | | **Parâmetro (Query)** | **Tipo** | **Descrição** | | --- | --- | --- | | pop | integer | Retornar apenas pl"
  },
  {
    "id": "sgp_ura_feriado_listar",
    "name": "Feriado – Listar",
    "section": "URA",
    "method": "GET",
    "path": "/api/model/feriado/",
    "pathParams": [],
    "queryParams": [],
    "bodyMode": "none",
    "bodyParams": [],
    "description": "| **Parâmetro** | **Tipo** | **Descrição** | | --- | --- | --- | | app | string | Nome da Aplicação no SGP (obrigatório) | | token | string | Token da Aplicação no SGP (obrigatório) | | pop | integer | ID do Pop | | tipo | integer | ID do Tipo | | ano | integer | Ano do Feriado | | mes | integer | M"
  },
  {
    "id": "sgp_ura_classificacao_listar",
    "name": "Classificação - Listar",
    "section": "URA",
    "method": "GET",
    "path": "/api/ura/classificacoes/list/",
    "pathParams": [],
    "queryParams": [],
    "bodyMode": "none",
    "bodyParams": [],
    "description": ""
  },
  {
    "id": "sgp_ura_configuracoes_variaveis_listar",
    "name": "Configurações (Variáveis) – Listar",
    "section": "URA",
    "method": "POST",
    "path": "/api/ura/configuracoes/",
    "pathParams": [],
    "queryParams": [],
    "bodyMode": "form",
    "bodyParams": [
      "configuracao"
    ],
    "description": "Listar Configurações"
  },
  {
    "id": "sgp_ura_notificacao_no_sistema_criar",
    "name": "Notificação no Sistema – Criar",
    "section": "URA",
    "method": "POST",
    "path": "/api/ura/notificacaosistema/",
    "pathParams": [],
    "queryParams": [],
    "bodyMode": "form",
    "bodyParams": [
      "contrato",
      "cpfcnpj",
      "uracontato",
      "uraagent"
    ],
    "description": ""
  },
  {
    "id": "sgp_ura_ocorrencia_listar",
    "name": "Ocorrência – Listar",
    "section": "URA",
    "method": "POST",
    "path": "/api/ura/ocorrencia/list/",
    "pathParams": [],
    "queryParams": [],
    "bodyMode": "form",
    "bodyParams": [
      "offset",
      "limit",
      "ocorrencia",
      "status",
      "pop",
      "tipo",
      "contrato",
      "contrato_status",
      "data_cadastro_inicio",
      "data_cadastro_fim",
      "hora_cadastro_inicio",
      "hora_cadastro_fim",
      "data_agendamento_inicio",
      "data_agendamento_fim",
      "hora_agendamento_inicio",
      "hora_agendamento_fim",
      "data_finalizacao_inicio",
      "data_finalizacao_fim",
      "hora_finalizacao_inicio",
      "hora_finalizacao_fim"
    ],
    "description": "| **Parâmetro** | **Tipo** | **Descrição** | | --- | --- | --- | | app | string | Nome da Aplicação no SGP (obrigatório) | | token | string | Token da Aplicação no SGP (obrigatório) | | offset | integer | Offset da Consulta | | limit | integer | Limit da Consulta | | ocorrencia | string | Número da "
  },
  {
    "id": "sgp_ura_ordem_de_servico_listar",
    "name": "Ordem de Serviço – Listar",
    "section": "URA",
    "method": "POST",
    "path": "/api/ura/ordemservico/list/",
    "pathParams": [],
    "queryParams": [],
    "bodyMode": "form",
    "bodyParams": [
      "offset",
      "limit",
      "ordem_servico",
      "status",
      "pop",
      "motivo",
      "contrato",
      "contrato_status",
      "data_cadastro_inicio",
      "data_cadastro_fim",
      "hora_cadastro_inicio",
      "hora_cadastro_fim",
      "data_agendamento_inicio",
      "data_agendamento_fim",
      "hora_agendamento_inicio",
      "hora_agendamento_fim",
      "data_finalizacao_inicio",
      "data_finalizacao_fim",
      "hora_finalizacao_inicio",
      "hora_finalizacao_fim"
    ],
    "description": "| **Parâmetro** | **Tipo** | **Descrição** | | --- | --- | --- | | app | string | Nome da Aplicação no SGP (obrigatório) | | token | string | Token da Aplicação no SGP (obrigatório) | | offset | integer | Offset da Consulta | | limit | integer | Limit da Consulta | | ordem_servico | integer | ID da "
  },
  {
    "id": "sgp_ura_metodo_de_ocorrencia_listar",
    "name": "Método de Ocorrência – Listar",
    "section": "URA",
    "method": "GET",
    "path": "/api/ura/ocorrencia/metodo/list/",
    "pathParams": [],
    "queryParams": [],
    "bodyMode": "none",
    "bodyParams": [],
    "description": "| **Parâmetro** | **Tipo** | **Descrição** | | --- | --- | --- | | app | string | Nome da Aplicação no SGP (obrigatório) | | token | string | Token da Aplicação no SGP (obrigatório) |"
  },
  {
    "id": "sgp_ura_tecnico_listar",
    "name": "Técnico – Listar",
    "section": "URA",
    "method": "POST",
    "path": "/api/ura/tecnicos/",
    "pathParams": [],
    "queryParams": [],
    "bodyMode": "form",
    "bodyParams": [],
    "description": "| **Parâmetro** | **Tipo** | **Descrição** | | --- | --- | --- | | app | string | Nome da Aplicação no SGP (obrigatório) | | token | string | Token da Aplicação no SGP (obrigatório) |"
  },
  {
    "id": "sgp_ura_chamado_criar",
    "name": "Chamado – Criar",
    "section": "URA",
    "method": "POST",
    "path": "/api/ura/chamado/",
    "pathParams": [],
    "queryParams": [],
    "bodyMode": "json",
    "bodyParams": [
      "contrato",
      "ocorrenciatipo",
      "tipoclassificacoes"
    ],
    "description": "| **Parâmetro** | **Tipo** | **Descrição** | | --- | --- | --- | | token | string | Token da Aplicação no SGP (obrigatório) | | app | string | Nome da Aplicação no SGP (obrigatório) | | contrato | integer | ID do Contrato (obrigatório) | | conteudo | string | Conteúdo da ocorrência e ordem de serviç"
  },
  {
    "id": "sgp_ura_chamado_anexar_audio",
    "name": "Chamado – Anexar Áudio",
    "section": "URA",
    "method": "POST",
    "path": "/api/ura/audio/add/",
    "pathParams": [],
    "queryParams": [],
    "bodyMode": "form",
    "bodyParams": [
      "protocolo",
      "url"
    ],
    "description": ""
  },
  {
    "id": "sgp_ura_pop_listar",
    "name": "POP – Listar",
    "section": "URA",
    "method": "POST",
    "path": "/api/ura/pops/",
    "pathParams": [],
    "queryParams": [],
    "bodyMode": "form",
    "bodyParams": [],
    "description": "| **Parâmetro** | **Tipo** | **Descrição** | | --- | --- | --- | | app | string | Nome da Aplicação no SGP (obrigatório) | | token | string | Token da Aplicação no SGP (obrigatório) |"
  },
  {
    "id": "sgp_ura_empresa_listar",
    "name": "Empresa – Listar",
    "section": "URA",
    "method": "POST",
    "path": "/api/ura/empresas/",
    "pathParams": [],
    "queryParams": [],
    "bodyMode": "form",
    "bodyParams": [
      "cnpj"
    ],
    "description": "| **Parâmetro** | **Tipo** | **Descrição** | | --- | --- | --- | | app | string | Nome da Aplicação no SGP (obrigatório) | | token | string | Token da Aplicação no SGP (obrigatório) | | cnpj | string | CNPJ da Empresa |"
  },
  {
    "id": "sgp_ura_fornecedor_listar",
    "name": "Fornecedor – Listar",
    "section": "URA",
    "method": "POST",
    "path": "/api/ura/fornecedores/",
    "pathParams": [],
    "queryParams": [],
    "bodyMode": "form",
    "bodyParams": [
      "cpfcnpj"
    ],
    "description": "| **Parâmetro** | **Tipo** | **Descrição** | | --- | --- | --- | | app | string | Nome da Aplicação no SGP (obrigatório) | | token | string | Token da Aplicação no SGP (obrigatório) | | cpfcnpj | string | CPF / CNPJ do Fornecedor |"
  },
  {
    "id": "sgp_ura_tipo_de_documento_conta_listar",
    "name": "Tipo de Documento (Conta) – Listar",
    "section": "URA",
    "method": "POST",
    "path": "/api/ura/contas/tiposdocumentos/",
    "pathParams": [],
    "queryParams": [],
    "bodyMode": "form",
    "bodyParams": [],
    "description": "| **Parâmetro** | **Tipo** | **Descrição** | | --- | --- | --- | | app | string | Nome da Aplicação no SGP (obrigatório) | | token | string | Token da Aplicação no SGP (obrigatório) |"
  },
  {
    "id": "sgp_ura_conta_a_pagar_receber_listar",
    "name": "Conta à Pagar/Receber – Listar",
    "section": "URA",
    "method": "POST",
    "path": "/api/ura/contas/{tipo}/",
    "pathParams": [
      "tipo"
    ],
    "queryParams": [],
    "bodyMode": "form",
    "bodyParams": [
      "offset",
      "limit",
      "descricao",
      "nota_fiscal",
      "status",
      "tipo_documento",
      "plano_contas",
      "empresa",
      "pop",
      "fornecedor",
      "usuario",
      "data_cadastro_inicio",
      "data_cadastro_fim",
      "data_vencimento_inicio",
      "data_vencimento_fim",
      "data_pagamento_inicio",
      "data_pagamento_fim"
    ],
    "description": "| **Parâmetro** | **Tipo** | **Descrição** | | --- | --- | --- | | app | string | Nome da Aplicação no SGP (obrigatório) | | token | string | Token da Aplicação no SGP (obrigatório) | | offset | integer | Offset da Consulta | | limit | integer | Limit da Consulta | | descricao | string | Descrição d"
  },
  {
    "id": "sgp_ura_plano_de_contas_listar",
    "name": "Plano de Contas – Listar",
    "section": "URA",
    "method": "POST",
    "path": "/api/ura/planoscontas/",
    "pathParams": [],
    "queryParams": [],
    "bodyMode": "form",
    "bodyParams": [],
    "description": "| **Parâmetro** | **Tipo** | **Descrição** | | --- | --- | --- | | app | string | Nome da Aplicação no SGP (obrigatório) | | token | string | Token da Aplicação no SGP (obrigatório) |"
  },
  {
    "id": "sgp_ura_ponto_de_recebimento_listar",
    "name": "Ponto de Recebimento – Listar",
    "section": "URA",
    "method": "POST",
    "path": "/api/ura/pontosrecebimentos/",
    "pathParams": [],
    "queryParams": [],
    "bodyMode": "form",
    "bodyParams": [],
    "description": "| **Parâmetro** | **Tipo** | **Descrição** | | --- | --- | --- | | app | string | Nome da Aplicação no SGP (obrigatório) | | token | string | Token da Aplicação no SGP (obrigatório) |"
  },
  {
    "id": "sgp_ura_fatura_listar",
    "name": "Fatura – Listar",
    "section": "URA",
    "method": "POST",
    "path": "/api/ura/titulos/",
    "pathParams": [],
    "queryParams": [],
    "bodyMode": "form",
    "bodyParams": [
      "offset",
      "limit",
      "titulo_id",
      "cliente_id",
      "cpfcnpj",
      "contrato",
      "status",
      "portador",
      "ordenar",
      "ordenar_ordem",
      "empresa_cnpj",
      "tipo_pessoa",
      "data_vencimento_inicio",
      "data_vencimento_fim",
      "data_pagamento_inicio",
      "data_pagamento_fim",
      "data_cancelamento_inicio",
      "data_cancelamento_fim",
      "data_acordo_inicio",
      "data_acordo_fim"
    ],
    "description": "| **Parâmetro** | **Tipo** | **Descrição** | | --- | --- | --- | | app | string | Nome da Aplicação no SGP (obrigatório) | | token | string | Token da Aplicação no SGP (obrigatório) | | offset | integer | Offset da Consulta | | limit | integer | Limit da Consulta | | titulo_id | integer | ID do Títu"
  },
  {
    "id": "sgp_ura_fatura_segunda_via",
    "name": "Fatura – Segunda via",
    "section": "URA",
    "method": "POST",
    "path": "/api/ura/fatura2via/",
    "pathParams": [],
    "queryParams": [],
    "bodyMode": "form",
    "bodyParams": [
      "cpfcnpj",
      "contrato",
      "telefone",
      "notafiscal",
      "faturas_abertas_todas",
      "numero_documento",
      "ocorrencia_conteudo",
      "nao_gerar_os",
      "tipo_ordenacao",
      "modo_ordenacao",
      "link_pdf"
    ],
    "description": "| **Parâmetro** | **Tipo** | **Descrição** | | --- | --- | --- | | app | string | Nome da Aplicação no SGP (obrigatório) | | token | string | Token da Aplicação no SGP (obrigatório) | | contrato | integer | ID do Contrato | | tipo_ordenacao | string | Tipo da Ordenação, padrão: \"data_documento\" | | "
  },
  {
    "id": "sgp_ura_fatura_gerar_pix",
    "name": "Fatura – Gerar PIX",
    "section": "URA",
    "method": "POST",
    "path": "/api/ura/pagamento/pix/{fatura}",
    "pathParams": [
      "fatura"
    ],
    "queryParams": [],
    "bodyMode": "form",
    "bodyParams": [
      "contrato"
    ],
    "description": "| **Parâmetro** | **Tipo** | **Descrição** | | --- | --- | --- | | app | string | Nome da Aplicação no SGP (obrigatório) | | token | string | Token da Aplicação no SGP (obrigatório) | | contrato | integer | ID do contrato vinculado ao título que será gerado/retornado o PIX | | {fatura} | integer | I"
  },
  {
    "id": "sgp_ura_fatura_enviar",
    "name": "Fatura – Enviar",
    "section": "URA",
    "method": "POST",
    "path": "/api/ura/enviafatura/",
    "pathParams": [],
    "queryParams": [],
    "bodyMode": "form",
    "bodyParams": [
      "contrato",
      "tipo",
      "email",
      "celular",
      "numero_documento",
      "mensagem",
      "conteudo",
      "link_pdf"
    ],
    "description": "| **Parâmetro** | **Tipo** | **Descrição** | | --- | --- | --- | | app | string | Nome da Aplicação no SGP (obrigatório) | | token | string | Token da Aplicação no SGP (obrigatório) | | contrato | integer | ID do Contrato | | mensagem | string | Mensagem customizada do envio |"
  },
  {
    "id": "sgp_ura_fatura_liquidar",
    "name": "Fatura – Liquidar",
    "section": "URA",
    "method": "POST",
    "path": "/api/banco/titulo/{fatura_id}/baixar/",
    "pathParams": [
      "fatura_id"
    ],
    "queryParams": [],
    "bodyMode": "form",
    "bodyParams": [
      "data_pagamento",
      "valor_pago",
      "ponto_recebimento",
      "forma_pagamento",
      "tarifas",
      "liquidacao_parcial",
      "desconto",
      "motivodesconto",
      "observacao"
    ],
    "description": "| **Parâmetro** | **Tipo** | **Descrição** | | --- | --- | --- | | app | string | Nome da Aplicação no SGP (obrigatório) | | token | string | Token da Aplicação no SGP (obrigatório) | | data_pagamento | string | Data de Pagamento, formato: \"AAAA-MM-DD\" (obrigatório) | | valor_pago | float | Valor Pa"
  },
  {
    "id": "sgp_ura_fatura_estornar",
    "name": "Fatura – Estornar",
    "section": "URA",
    "method": "POST",
    "path": "/api/banco/titulo/{fatura_id}/estornar/",
    "pathParams": [
      "fatura_id"
    ],
    "queryParams": [],
    "bodyMode": "json",
    "bodyParams": [
      "pontoRecebimento",
      "caixalancamento_id",
      "estorno_parcial"
    ],
    "description": "| **Parâmetro** | **Tipo** | **Descrição** | | --- | --- | --- | | app | string | Nome da Aplicação no SGP (obrigatório) | | token | string | Token da Aplicação no SGP (obrigatório) | | pontoRecebimento | integer | ID do Ponto de Recebimento (obrigatório) | | estorno_parcial | integer | Informa se s"
  },
  {
    "id": "sgp_ura_fatura_listar_lancamentos_de_caixa_liquidacao_parcial",
    "name": "Fatura – Listar lançamentos de caixa (Liquidação parcial)",
    "section": "URA",
    "method": "POST",
    "path": "/api/banco/titulo/{fatura_id}/pagamento/list",
    "pathParams": [
      "fatura_id"
    ],
    "queryParams": [],
    "bodyMode": "form",
    "bodyParams": [],
    "description": "| **Parâmetro** | **Tipo** | **Descrição** | | --- | --- | --- | | app | string | Nome da Aplicação no SGP (obrigatório) | | token | string | Token da Aplicação no SGP (obrigatório) | #### Requisição **fatura_id:** ID da Fatura #### OBS Atualmente retornam resultados exclusivamente para liquidações "
  },
  {
    "id": "sgp_ura_fatura_cancelar",
    "name": "Fatura – Cancelar",
    "section": "URA",
    "method": "POST",
    "path": "/api/banco/titulo/{fatura_id}/cancelar/",
    "pathParams": [
      "fatura_id"
    ],
    "queryParams": [],
    "bodyMode": "form",
    "bodyParams": [
      "motivo",
      "naolibera",
      "cancelar_nf",
      "taxa_baixa_lanc"
    ],
    "description": "| Parâmetro | Tipo | **Descrição** | | --- | --- | --- | | app | string | Nome da Aplicação no SGP (obrigatório) | | token | string | Token da Aplicação no SGP (obrigatório) | | motivo | string | Motivo (obrigatório) | | naolibera | integer | Não Libera, se informado | | cancelar_nf | integer | Canc"
  },
  {
    "id": "sgp_ura_fatura_descancelar",
    "name": "Fatura – Descancelar",
    "section": "URA",
    "method": "POST",
    "path": "/api/banco/titulo/{fatura_id}/descancelar/",
    "pathParams": [
      "fatura_id"
    ],
    "queryParams": [],
    "bodyMode": "form",
    "bodyParams": [],
    "description": "| Parâmetro | Tipo | **Descrição** | | --- | --- | --- | | app | string | Nome da Aplicação no SGP (obrigatório) | | token | string | Token da Aplicação no SGP (obrigatório) | #### Requisição **fatura_id:** ID da Fatura - Para permitir descancelar, é necessário que o portador tenha a checkbox \"Permi"
  },
  {
    "id": "sgp_ura_fatura_gerar_mensalidade",
    "name": "Fatura – Gerar Mensalidade",
    "section": "URA",
    "method": "POST",
    "path": "/api/ura/cliente/mensalidade/avulsa/add/",
    "pathParams": [],
    "queryParams": [],
    "bodyMode": "form",
    "bodyParams": [
      "contrato",
      "ano",
      "mes",
      "ignorar_titulos_cancelados",
      "gerar_proporcional",
      "gerar_pix"
    ],
    "description": "| **Parâmetro** | **Tipo** | **Descrição** | | --- | --- | --- | | app | string | Nome da Aplicação no SGP (obrigatório) | | token | string | Token da Aplicação no SGP (obrigatório) | | contrato | integer | ID do Contrato | | ano | integer | Ano | | mes | integer | Mês | | ignorar_titulos_cancelados"
  },
  {
    "id": "sgp_ura_fatura_gerar_titulo",
    "name": "Fatura - Gerar Título",
    "section": "URA",
    "method": "POST",
    "path": "/api/ura/cliente/titulo/avulso/add/",
    "pathParams": [],
    "queryParams": [],
    "bodyMode": "none",
    "bodyParams": [],
    "description": "| **Parâmetro** | **Tipo** | **Descrição** | | --- | --- | --- | | app | string | Nome da Aplicação no SGP (obrigatório) | | token | string | Token da Aplicação no SGP (obrigatório) | | contrato | int | ID do Contrato (obrigatório) | | portador | int | ID do Portador (obrigatório) | | parcelas | int"
  },
  {
    "id": "sgp_ura_fatura_gerar_acordo_de_pagamento",
    "name": "Fatura – Gerar Acordo de Pagamento",
    "section": "URA",
    "method": "POST",
    "path": "/api/ura/acordopagamento",
    "pathParams": [],
    "queryParams": [],
    "bodyMode": "json",
    "bodyParams": [
      "cliente",
      "titulos",
      "contrato",
      "centrodecusto",
      "portador",
      "parcelas",
      "valor",
      "data_vencimento",
      "desconto_venc",
      "tolerancia_dias",
      "titulo_sync"
    ],
    "description": "| **Parâmetros obrigatórios** | **Tipo** | **Descrição** | | --- | --- | --- | | token | string | Token da Aplicação no SGP (obrigatório token+app ou username+password) | | app | string | Nome da Aplicação no SGP (obrigatório token+app ou username+password) | | titulo_sync | array | Servirá em breve"
  },
  {
    "id": "sgp_ura_nfe_listar",
    "name": "NFe - Listar",
    "section": "URA",
    "method": "POST",
    "path": "/api/ura/nfe/list/",
    "pathParams": [],
    "queryParams": [],
    "bodyMode": "form",
    "bodyParams": [
      "chave",
      "data_emissao_inicio",
      "data_emissao_fim"
    ],
    "description": "| **Parâmetro** | **Tipo** | **Descrição** | | --- | --- | --- | | app | string | Nome da Aplicação no SGP (obrigatório) | | token | string | Token da Aplicação no SGP (obrigatório) | | chave | string | Chave | | data_emissao_inicio | string | Data de Emissão Início, formato: \"AAAA-MM-DD\" | | data_e"
  },
  {
    "id": "sgp_ura_nfe_importar",
    "name": "NFe - Importar",
    "section": "URA",
    "method": "POST",
    "path": "/api/ura/nfe/importar/",
    "pathParams": [],
    "queryParams": [],
    "bodyMode": "form",
    "bodyParams": [
      "xml"
    ],
    "description": "| **Parâmetro** | **Tipo** | **Descrição** | | --- | --- | --- | | app | string | Nome da Aplicação no SGP (obrigatório) | | token | string | Token da Aplicação no SGP (obrigatório) | | xml | file | Arquivo XML |"
  },
  {
    "id": "sgp_ura_nfe_enviar",
    "name": "NFe - Enviar",
    "section": "URA",
    "method": "POST",
    "path": "/api/ura/nfe/enviar/{{id_nota}}",
    "pathParams": [
      "id_nota"
    ],
    "queryParams": [],
    "bodyMode": "form",
    "bodyParams": [
      "contrato",
      "email"
    ],
    "description": "## Enviar NFe por E-mail Envia uma Nota Fiscal Eletrônica (NFe) por e-mail para o destinatário informado, identificada pelo ID da nota fiscal na URL. --- ### Método e URL ``` POST {{url}}/api/ura/nfe/enviar/{{id_nota}} ``` --- ### Variável de Caminho (Path Variable) | Variável | Descrição | | --- | "
  },
  {
    "id": "sgp_ura_nas_listar",
    "name": "NAS - Listar",
    "section": "URA",
    "method": "POST",
    "path": "/api/ura/nas/list/",
    "pathParams": [],
    "queryParams": [],
    "bodyMode": "json",
    "bodyParams": [],
    "description": "| **Parâmetro** | **Tipo** | **Descrição** | | --- | --- | --- | | app | string | Nome da Aplicação no SGP (obrigatório) | | token | string | Token da Aplicação no SGP (obrigatório) | | | | |"
  },
  {
    "id": "sgp_ura_sms_gateways",
    "name": "SMS - Gateways",
    "section": "URA",
    "method": "GET",
    "path": "/api/sms/gateway/list/",
    "pathParams": [],
    "queryParams": [],
    "bodyMode": "none",
    "bodyParams": [],
    "description": ""
  },
  {
    "id": "sgp_ura_sms_enviar",
    "name": "SMS - Enviar",
    "section": "URA",
    "method": "GET",
    "path": "/api/sms/send/",
    "pathParams": [],
    "queryParams": [],
    "bodyMode": "none",
    "bodyParams": [],
    "description": "| **Parâmetro** | **Tipo** | **Descrição** | | --- | --- | --- | | phone | string | Telefones, separados por vírgula (obrigatório) | | msg | string | Mensagem (obrigatório) | | gateway | int | ID da Gateway (obrigatório) | | idcliente | int | ID do Cliente, funcionalidade a depender da Gateway | | i"
  },
  {
    "id": "sgp_ura_manutencao_listar",
    "name": "Manutenção - Listar",
    "section": "URA",
    "method": "GET",
    "path": "/api/ura/manutencao/list/",
    "pathParams": [],
    "queryParams": [],
    "bodyMode": "none",
    "bodyParams": [],
    "description": ""
  },
  {
    "id": "sgp_ura_manutencao_cadastrar",
    "name": "Manutenção - Cadastrar",
    "section": "URA",
    "method": "POST",
    "path": "/api/ura/manutencao/add/",
    "pathParams": [],
    "queryParams": [],
    "bodyMode": "none",
    "bodyParams": [],
    "description": "| **Parâmetro** | **Tipo** | **Descrição** | | --- | --- | --- | | descricao | string | Descrição da Manutenção (Obrigatório) | | data_inicial | string | Data Inicial da Manutenção, formato: \"AAAA-MM-DD HH:MM:SS\" (Obrigatório) | | data_final | string | Data Final da Manutenção, formato: \"AAAA-MM-DD "
  },
  {
    "id": "sgp_ura_manutencao_alterar",
    "name": "Manutenção - Alterar",
    "section": "URA",
    "method": "POST",
    "path": "/api/ura/manutencao/edit/",
    "pathParams": [],
    "queryParams": [],
    "bodyMode": "none",
    "bodyParams": [],
    "description": "| **Parâmetro** | **Tipo** | **Descrição** | | --- | --- | --- | | manutencao | int | ID da Manutenção | | descricao | string | Descrição da Manutenção | | data_inicial | string | Data Inicial da Manutenção, formato: \"AAAA-MM-DD HH:MM:SS\" | | data_final | string | Data Final da Manutenção, formato: "
  },
  {
    "id": "sgp_ura_manutencao_deletar",
    "name": "Manutenção - Deletar",
    "section": "URA",
    "method": "POST",
    "path": "/api/ura/manutencao/delete/",
    "pathParams": [],
    "queryParams": [],
    "bodyMode": "none",
    "bodyParams": [],
    "description": "| **Parâmetro** | **Tipo** | **Descrição** | | --- | --- | --- | | manutencao | int | ID da Manutenção |"
  },
  {
    "id": "sgp_ura_ap_listar",
    "name": "AP - Listar",
    "section": "URA",
    "method": "GET",
    "path": "/api/ura/ap/list/",
    "pathParams": [],
    "queryParams": [],
    "bodyMode": "none",
    "bodyParams": [],
    "description": ""
  },
  {
    "id": "sgp_ura_fonte_listar",
    "name": "Fonte - Listar",
    "section": "URA",
    "method": "GET",
    "path": "/api/ura/fonte/list/",
    "pathParams": [],
    "queryParams": [],
    "bodyMode": "none",
    "bodyParams": [],
    "description": ""
  },
  {
    "id": "sgp_ura_switch_listar",
    "name": "Switch - Listar",
    "section": "URA",
    "method": "GET",
    "path": "/api/ura/switch/list/",
    "pathParams": [],
    "queryParams": [],
    "bodyMode": "none",
    "bodyParams": [],
    "description": ""
  },
  {
    "id": "sgp_ura_protecao_de_credito_consulta_documento",
    "name": "Proteção de Crédito - Consulta Documento",
    "section": "URA",
    "method": "GET",
    "path": "/api/ura/documento/consulta/gateway/{id_gateway}/",
    "pathParams": [
      "id_gateway"
    ],
    "queryParams": [
      "documento",
      "uf",
      "adicionais"
    ],
    "bodyMode": "none",
    "bodyParams": [],
    "description": ""
  },
  {
    "id": "sgp_ura_protecao_de_credito_adicionais",
    "name": "Proteção de Crédito - Adicionais",
    "section": "URA",
    "method": "GET",
    "path": "/api/ura/consulta/adicionais/gateway/{id_gateway}/",
    "pathParams": [
      "id_gateway"
    ],
    "queryParams": [
      "tipo_pessoa"
    ],
    "bodyMode": "none",
    "bodyParams": [],
    "description": ""
  },
  {
    "id": "sgp_ura_protecao_de_credito_listar_gateways",
    "name": "Proteção de Crédito - Listar Gateways",
    "section": "URA",
    "method": "GET",
    "path": "/api/ura/gatewaysserasa/list",
    "pathParams": [],
    "queryParams": [],
    "bodyMode": "none",
    "bodyParams": [],
    "description": "| **Parâmetro** | **Tipo** | **Descrição** | | --- | --- | --- | | token | string | Token da Aplicação no SGP (obrigatório) | | app | string | Nome da Aplicação no SGP (obrigatório) |"
  },
  {
    "id": "sgp_ura_anotacoes_adicionar",
    "name": "Anotações - Adicionar",
    "section": "URA",
    "method": "POST",
    "path": "/api/ura/cliente/anotacao/add",
    "pathParams": [],
    "queryParams": [],
    "bodyMode": "form",
    "bodyParams": [
      "cliente_id",
      "anotacao",
      "contrato_id",
      "tipo_id",
      "alerta_modo"
    ],
    "description": "| **Parâmetro** | **Tipo** | **Descrição** | | --- | --- | --- | | token | string | Token da Aplicação no SGP (obrigatório) | | app | string | Nome da Aplicação no SGP (obrigatório) | | cliente_id | integer | ID do Cliente (obrigatório) | | anotacao | string | Conteúdo da anotação (obrigatório) | | "
  },
  {
    "id": "sgp_ura_anotacoes_listar_consultar",
    "name": "Anotações - Listar/Consultar",
    "section": "URA",
    "method": "GET",
    "path": "/api/ura/cliente/anotacao/list",
    "pathParams": [],
    "queryParams": [],
    "bodyMode": "none",
    "bodyParams": [],
    "description": "| **Parâmetro** | **Tipo** | **Descrição** | | --- | --- | --- | | token | string | Token da Aplicação no SGP (obrigatório) | | app | string | Nome da Aplicação no SGP (obrigatório) | | id | integer | ID da anotação | | cliente_id | integer | ID do cliente | | contrato_id | integer | ID do Contrato "
  },
  {
    "id": "sgp_ura_anotacoes_atualizar",
    "name": "Anotações - Atualizar",
    "section": "URA",
    "method": "POST",
    "path": "/api/ura/cliente/anotacao/{id}/edit",
    "pathParams": [
      "id"
    ],
    "queryParams": [],
    "bodyMode": "form",
    "bodyParams": [
      "anotacao",
      "tipo_id",
      "alerta_modo"
    ],
    "description": "| **Parâmetro** | **Tipo** | **Descrição** | | --- | --- | --- | | token | string | Token da Aplicação no SGP (obrigatório) | | app | string | Nome da Aplicação no SGP (obrigatório) | | anotacao | string | Novo conteúdo da anotação | | tipo_id | integer | ID do novo tipo de anotação | | alerta_modo "
  },
  {
    "id": "sgp_ura_anotacao_remover",
    "name": "Anotação - Remover",
    "section": "URA",
    "method": "POST",
    "path": "/api/ura/cliente/anotacao/{id}/remove/",
    "pathParams": [
      "id"
    ],
    "queryParams": [],
    "bodyMode": "form",
    "bodyParams": [],
    "description": "| **Parâmetro** | **Tipo** | **Descrição** | | --- | --- | --- | | token | string | Token da Aplicação no SGP (obrigatório) | | app | string | Nome da Aplicação no SGP (obrigatório) |"
  },
  {
    "id": "sgp_ura_mapa_ftth_listar_gateways",
    "name": "Mapa FTTH - Listar Gateways",
    "section": "URA",
    "method": "GET",
    "path": "/api/ura/listgatewaymapa",
    "pathParams": [],
    "queryParams": [],
    "bodyMode": "none",
    "bodyParams": [],
    "description": "| **Parâmetro** | **Tipo** | **Descrição** | | --- | --- | --- | | token | string | Token da Aplicação no SGP (obrigatório) | | app | string | Nome da Aplicação no SGP (obrigatório) |"
  },
  {
    "id": "sgp_crm_consulta_cliente_cliente_id",
    "name": "Consulta Cliente - Cliente ID",
    "section": "CRM",
    "method": "GET",
    "path": "/api/crm/cliente/{{cliente_id}}/",
    "pathParams": [
      "cliente_id"
    ],
    "queryParams": [],
    "bodyMode": "none",
    "bodyParams": [],
    "description": ""
  },
  {
    "id": "sgp_crm_consulta_cliente_cpfcnpj",
    "name": "Consulta Cliente - CPFCNPJ",
    "section": "CRM",
    "method": "GET",
    "path": "/api/crm/cliente/",
    "pathParams": [],
    "queryParams": [
      "cpfcnpj"
    ],
    "bodyMode": "none",
    "bodyParams": [],
    "description": ""
  },
  {
    "id": "sgp_crm_consulta_contratos_por_cliente_id",
    "name": "Consulta Contratos - Por Cliente ID",
    "section": "CRM",
    "method": "GET",
    "path": "/api/crm/cliente/{{cliente_id}}/contratos/",
    "pathParams": [
      "cliente_id"
    ],
    "queryParams": [],
    "bodyMode": "none",
    "bodyParams": [],
    "description": ""
  },
  {
    "id": "sgp_crm_consulta_contratos_por_cpfcnpj_do_cliente",
    "name": "Consulta Contratos - Por CPFCNPJ do Cliente",
    "section": "CRM",
    "method": "GET",
    "path": "/api/crm/cliente/contratos/",
    "pathParams": [],
    "queryParams": [
      "cpfcnpj"
    ],
    "bodyMode": "none",
    "bodyParams": [],
    "description": ""
  },
  {
    "id": "sgp_crm_cliente_cadastrar_pessoa_fisica",
    "name": "Cliente - Cadastrar Pessoa Física",
    "section": "CRM",
    "method": "POST",
    "path": "/api/crm/cliente/F",
    "pathParams": [],
    "queryParams": [],
    "bodyMode": "json",
    "bodyParams": [
      "nome",
      "cpfcnpj",
      "email",
      "celular",
      "datanasc",
      "endereco",
      "observacao",
      "rg",
      "rg_emissor",
      "sexo",
      "estadocivil",
      "nomemae",
      "nomepai",
      "profissao",
      "nacionalidade",
      "naturalidade"
    ],
    "description": "| **Parâmetro** | **Tipo** | **Descrição** | | --- | --- | --- | | app | String | \\[Obrigatório\\] - Nome da aplicação no SGP | | token | String | \\[Obrigatório\\] - Token no SGP | | nome | String | \\[Obrigatório\\] - Nome do cliente | | cpfcnpj | String | \\[Obrigatório\\] - CPF do cliente. Formato: NNN"
  },
  {
    "id": "sgp_crm_cliente_cadastrar_pessoa_juridica",
    "name": "Cliente - Cadastrar Pessoa Jurídica",
    "section": "CRM",
    "method": "POST",
    "path": "/api/crm/cliente/J",
    "pathParams": [],
    "queryParams": [],
    "bodyMode": "json",
    "bodyParams": [
      "nome",
      "nomefantasia",
      "cpfcnpj",
      "respempresa",
      "respcpf",
      "insc_estadual",
      "insc_municipal",
      "email",
      "celular",
      "datanasc",
      "endereco",
      "observacao"
    ],
    "description": "| **Parâmetro** | **Tipo** | **Descrição** | | --- | --- | --- | | app | String | \\[Obrigatório\\] - Nome da aplicação no SGP | | token | String | \\[Obrigatório\\] - Token no SGP | | nome | String | \\[Obrigatório\\] - Nome da empresa | | nomefantasia | String | Nome fantasia da empresa | | cpfcnpj | St"
  },
  {
    "id": "sgp_crm_cliente_cadastrar_pessoa_estrangeira",
    "name": "Cliente - Cadastrar Pessoa Estrangeira",
    "section": "CRM",
    "method": "POST",
    "path": "/api/crm/cliente/E",
    "pathParams": [],
    "queryParams": [],
    "bodyMode": "json",
    "bodyParams": [
      "nome",
      "tipodoc",
      "cpfcnpj",
      "datanasc",
      "sexo",
      "estadocivil",
      "nomemae",
      "nomepai",
      "profissao",
      "nacionalidade",
      "naturalidade",
      "email",
      "celular",
      "endereco",
      "observacao"
    ],
    "description": "| **Parâmetro** | **Tipo** | **Descrição** | | --- | --- | --- | | app | String | \\[Obrigatório\\] - Nome da aplicação no SGP | | token | String | \\[Obrigatório\\] - Token no SGP | | nome | String | \\[Obrigatório\\] - Nome do cliente | | tipodoc | String | Tipo de documento do cliente. Exemplo: \"PASSAP"
  },
  {
    "id": "sgp_crm_cliente_cadastrar_pessoa_juridica_estrangeira",
    "name": "Cliente - Cadastrar Pessoa Jurídica Estrangeira",
    "section": "CRM",
    "method": "POST",
    "path": "/api/crm/cliente/EJ",
    "pathParams": [],
    "queryParams": [],
    "bodyMode": "json",
    "bodyParams": [
      "nome",
      "tipodoc",
      "cpfcnpj",
      "datafundacao",
      "celular",
      "email",
      "endereco",
      "observacao"
    ],
    "description": "| **Parâmetro** | **Tipo** | **Descrição** | | --- | --- | --- | | app | String | \\[Obrigatório\\] - Nome da aplicação no SGP | | token | String | \\[Obrigatório\\] - Token no SGP | | nome | String | \\[Obrigatório\\] - Nome da empresa | | tipodoc | String | Tipo de documento do cliente. Exemplo: \"PASSAP"
  },
  {
    "id": "sgp_crm_contrato_cadastro_por_cliente_id",
    "name": "Contrato - Cadastro por Cliente ID",
    "section": "CRM",
    "method": "POST",
    "path": "/api/crm/cliente/{{cliente_id}}/contratos",
    "pathParams": [
      "cliente_id"
    ],
    "queryParams": [],
    "bodyMode": "json",
    "bodyParams": [
      "contrato_id",
      "pop_id",
      "plano_id",
      "vencimento_dia",
      "forma_cobranca_codigo",
      "isento",
      "autocobranca",
      "observacao",
      "vendedor_id",
      "comissao_tipo",
      "comissao",
      "login",
      "senha",
      "email",
      "portador_id",
      "fidelidade_id",
      "nas",
      "central_login",
      "central_senha",
      "ip",
      "ippool_id",
      "mac_dhcp",
      "logins_simult",
      "mac",
      "servicodesc",
      "modoaquisicao",
      "tipo_equipamento_id",
      "midia_id",
      "tecnico_id",
      "os_instalacao",
      "conteudo",
      "instalacao_quantidade_parcelas",
      "instalacao_preco",
      "instalacao_desconto",
      "instalacao_entrada",
      "instalacao_entrada_forma",
      "instalacao_parcela_forma",
      "instalacao_portador",
      "endereco_cobranca",
      "endereco_instalacao",
      "splitter_id",
      "splitter_port",
      "tipo_equipamento"
    ],
    "description": "| **Parâmetro** | **Tipo** | **Descrição** | | --- | --- | --- | | app | String | \\[Obrigatório\\] - Nome da aplicação no SGP | | token | String | \\[Obrigatório\\] - Token no SGP | | vendedor_id | Integer | ID do vendedor responsável | | comissao_tipo | Integer | Tipo de valor informado para comissão."
  },
  {
    "id": "sgp_crm_contrato_cadastro_por_cpfcnpj_cliente",
    "name": "Contrato - Cadastro por CPFCNPJ Cliente",
    "section": "CRM",
    "method": "POST",
    "path": "/api/crm/cliente/contratos/",
    "pathParams": [],
    "queryParams": [
      "cpfcnpj"
    ],
    "bodyMode": "json",
    "bodyParams": [
      "contrato_id",
      "pop_id",
      "plano_id",
      "vencimento_dia",
      "forma_cobranca_codigo",
      "isento",
      "autocobranca",
      "observacao",
      "vendedor_id",
      "comissao_tipo",
      "comissao",
      "login",
      "senha",
      "email",
      "portador_id",
      "fidelidade_id",
      "nas",
      "central_login",
      "central_senha",
      "ip",
      "ippool_id",
      "mac_dhcp",
      "logins_simult",
      "mac",
      "servicodesc",
      "modoaquisicao",
      "tipo_equipamento_id",
      "midia_id",
      "tecnico_id",
      "os_instalacao",
      "conteudo",
      "instalacao_quantidade_parcelas",
      "instalacao_preco",
      "instalacao_desconto",
      "instalacao_entrada",
      "instalacao_entrada_forma",
      "instalacao_parcela_forma",
      "instalacao_portador",
      "endereco_cobranca",
      "endereco_instalacao",
      "splitter_id",
      "splitter_port",
      "tipo_equipamento"
    ],
    "description": "| **Parâmetro** | **Tipo** | **Descrição** | | --- | --- | --- | | app | String | \\[Obrigatório\\] - Nome da aplicação no SGP | | token | String | \\[Obrigatório\\] - Token no SGP | | vendedor_id | Integer | ID do vendedor responsável | | comissao_tipo | Integer | Tipo de valor informado para comissão."
  },
  {
    "id": "sgp_crm_status_crm_alterar_por_cliente_id",
    "name": "Status CRM - Alterar por Cliente ID",
    "section": "CRM",
    "method": "POST",
    "path": "/api/crm/cliente/{{cliente_id}}/status/",
    "pathParams": [
      "cliente_id"
    ],
    "queryParams": [],
    "bodyMode": "form",
    "bodyParams": [
      "status_id",
      "motivo"
    ],
    "description": "| **Parâmetro** | **Tipo** | **Descrição** | | --- | --- | --- | | app | String | \\[Obrigatório\\] - Appname no SGP | | token | String | \\[Obrigatório\\] - Token no SGP | | status_id | Integer | \\[Obrigatório\\] - Status a definir. Valores: <br>1 - Em análise <br>2 - Aprovado <br>3 - Reprovado <br>4 - "
  },
  {
    "id": "sgp_crm_status_crm_alterar_por_cliente_cpfcnpj",
    "name": "Status CRM - Alterar por Cliente CPFCNPJ",
    "section": "CRM",
    "method": "POST",
    "path": "/api/crm/cliente/status/",
    "pathParams": [],
    "queryParams": [
      "cpfcnpj"
    ],
    "bodyMode": "form",
    "bodyParams": [
      "status_id",
      "motivo"
    ],
    "description": "| **Parâmetro** | **Tipo** | **Descrição** | | --- | --- | --- | | app | String | \\[Obrigatório\\] - Appname no SGP | | token | String | \\[Obrigatório\\] - Token no SGP | | cpfcnpj | String | \\[Obrigatório\\] - CPF do cliente. Formato: NNN.NNN.NNN-NN ou NNNNNNNNNNN | | status_id | Integer | \\[Obrigatór"
  },
  {
    "id": "sgp_precadastro_plano_listar",
    "name": "Plano – Listar",
    "section": "Pré-Cadastro",
    "method": "POST",
    "path": "/api/precadastro/plano/list",
    "pathParams": [],
    "queryParams": [],
    "bodyMode": "form",
    "bodyParams": [],
    "description": "| **Parâmetro** | **Tipo** | **Descrição** | | --- | --- | --- | | app | string | Nome da Aplicação no SGP (obrigatório) | | token | string | Token da Aplicação no SGP (obrigatório) |"
  },
  {
    "id": "sgp_precadastro_vencimento_listar",
    "name": "Vencimento – Listar",
    "section": "Pré-Cadastro",
    "method": "POST",
    "path": "/api/precadastro/vencimento/list",
    "pathParams": [],
    "queryParams": [],
    "bodyMode": "form",
    "bodyParams": [],
    "description": "| **Parâmetro** | **Tipo** | **Descrição** | | --- | --- | --- | | app | string | Nome da Aplicação no SGP (obrigatório) | | token | string | Token da Aplicação no SGP (obrigatório) |"
  },
  {
    "id": "sgp_precadastro_vendedor_listar",
    "name": "Vendedor – Listar",
    "section": "Pré-Cadastro",
    "method": "POST",
    "path": "/api/precadastro/vendedor/list",
    "pathParams": [],
    "queryParams": [],
    "bodyMode": "form",
    "bodyParams": [],
    "description": ""
  },
  {
    "id": "sgp_precadastro_pre_cadastro_cadastrar_pf",
    "name": "Pré-Cadastro – Cadastrar PF",
    "section": "Pré-Cadastro",
    "method": "POST",
    "path": "/api/precadastro/F",
    "pathParams": [],
    "queryParams": [],
    "bodyMode": "form",
    "bodyParams": [
      "nome",
      "logradouro",
      "numero",
      "bairro",
      "cidade",
      "uf",
      "cep",
      "complemento",
      "pontoreferencia",
      "condominio",
      "map_ll",
      "pais",
      "datanasc",
      "cpfcnpj",
      "rg",
      "rg_emissor",
      "nomepai",
      "nomemae",
      "nacionalidade",
      "naturalidade",
      "estadocivil",
      "sexo",
      "profissao",
      "observacao",
      "email",
      "celular",
      "portador_id",
      "pop_id",
      "nas_id",
      "plano_id",
      "planointernet_id",
      "planobase_id",
      "vencimento_id",
      "login",
      "senha",
      "central_senha",
      "modoaquisicao",
      "fidelidade_id",
      "contrato_id",
      "ip",
      "mac",
      "splitter_id",
      "splitter_port",
      "servicodesc",
      "tipo_equipamento_id",
      "midia_id",
      "vendedor_id",
      "tecnico_id",
      "os_instalacao",
      "instalacao_quantidade_parcelas",
      "instalacao_preco",
      "instalacao_desconto",
      "instalacao_entrada",
      "instalacao_entrada_forma",
      "instalacao_parcela_forma",
      "ippool_id",
      "mac_dhcp",
      "comissao_tipo",
      "comissao_valor",
      "comissao_qtd_parcelas",
      "usuariocad_id",
      "formacobranca_id",
      "precadastro_ativar"
    ],
    "description": "| **Parâmetro** | **Tipo** | **Descrição** | | --- | --- | --- | | app | string | Nome da Aplicação no SGP (obrigatório) | | token | string | Token da Aplicação no SGP (obrigatório) | | nome | string | Nome do Cliente | | cpfcnpj | string | CPF do Cliente | | rg | string | RG do Cliente | | rg_emiss"
  },
  {
    "id": "sgp_precadastro_pre_cadastro_cadastrar_pj",
    "name": "Pré-Cadastro – Cadastrar PJ",
    "section": "Pré-Cadastro",
    "method": "POST",
    "path": "/api/precadastro/J",
    "pathParams": [],
    "queryParams": [],
    "bodyMode": "form",
    "bodyParams": [
      "nome",
      "logradouro",
      "numero",
      "bairro",
      "cidade",
      "uf",
      "сер",
      "complemento",
      "pontoreferencia",
      "condominio",
      "map_ll",
      "pais",
      "datanasc",
      "cpfcnpj",
      "nomefantasia",
      "respempresa",
      "respcpf",
      "observacao",
      "email",
      "celular",
      "portador_id",
      "pop_id",
      "nas_id",
      "plano_id",
      "planointernet_id",
      "planobase_id",
      "vencimento_id",
      "login",
      "senha",
      "central_senha",
      "modoaquisicao",
      "fidelidade_id",
      "contrato_id",
      "ip",
      "mac",
      "splitter_id",
      "splitter_port",
      "servicodesc",
      "tipo_equipamento_id",
      "midia_id",
      "vendedor_id",
      "tecnico_id",
      "os_instalacao",
      "instalacao_quantidade_parcelas",
      "instalacao_preco",
      "instalacao_desconto",
      "instalacao_entrada",
      "instalacao_entrada_forma",
      "instalacao_parcela_forma",
      "ippool_id",
      "mac_dhop",
      "comissao_tipo",
      "comissao_valor",
      "comissao_qtd_parcelas",
      "usuariocad_id",
      "formacobranca_id",
      "precadastro_ativar"
    ],
    "description": "| **Parâmetro** | **Tipo** | **Descrição** | | --- | --- | --- | | app | string | Nome da Aplicação no SGP (obrigatório) | | token | string | Token da Aplicação no SGP (obrigatório) | | nome | string | Nome do Cliente | | cpfcnpj | string | CNPJ do Cliente | | nomefantasia | string | Nome Fantasia d"
  },
  {
    "id": "sgp_radius_login_pppoe_listar",
    "name": "Login PPPoE – Listar",
    "section": "RADIUS",
    "method": "POST",
    "path": "/ws/radius/radacct/list/all/",
    "pathParams": [],
    "queryParams": [],
    "bodyMode": "form",
    "bodyParams": [
      "offset",
      "limit",
      "username",
      "online",
      "host",
      "framedipaddress",
      "callingstationid",
      "nasportid",
      "last_session",
      "cep",
      "logradouro",
      "bairro",
      "cidade",
      "uf",
      "tipopessoa",
      "cpfcnpj",
      "notafiscal",
      "data_inicial",
      "data_final",
      "plano",
      "pop",
      "grupo",
      "nas",
      "ipfixo",
      "tipoconexao",
      "olt",
      "oltslot",
      "pon",
      "calledstationid"
    ],
    "description": "| **Parâmetro** | **Tipo** | **Descrição** | | --- | --- | --- | | app | string | Nome da Aplicação no SGP (obrigatório) | | token | string | Token da Aplicação no SGP (obrigatório) | | offset | integer | Offset da Consulta | | limit | integer | Limit da Consulta (Verifique restrições mais abaixo) |"
  },
  {
    "id": "sgp_radius_login_pppoe_detalhar_status",
    "name": "Login PPPoE – Detalhar Status",
    "section": "RADIUS",
    "method": "POST",
    "path": "/ws/radius/service/status/",
    "pathParams": [],
    "queryParams": [],
    "bodyMode": "form",
    "bodyParams": [
      "incluir_suspensos"
    ],
    "description": ""
  },
  {
    "id": "sgp_radius_login_pppoe_desconectar",
    "name": "Login PPPoE – Desconectar",
    "section": "RADIUS",
    "method": "POST",
    "path": "/ws/radius/disconnect/",
    "pathParams": [],
    "queryParams": [],
    "bodyMode": "form",
    "bodyParams": [
      "login"
    ],
    "description": ""
  },
  {
    "id": "sgp_radius_radius_check_replies",
    "name": "Radius – Check Replies",
    "section": "RADIUS",
    "method": "POST",
    "path": "/ws/radius/{param}/list/",
    "pathParams": [
      "param"
    ],
    "queryParams": [],
    "bodyMode": "form",
    "bodyParams": [],
    "description": "**param**: - radcheck - radreply - radgroupreply - radusergroup"
  },
  {
    "id": "sgp_radius_radius_log",
    "name": "Radius – Log",
    "section": "RADIUS",
    "method": "GET",
    "path": "/ws/radius/log/",
    "pathParams": [],
    "queryParams": [],
    "bodyMode": "none",
    "bodyParams": [],
    "description": ""
  },
  {
    "id": "sgp_os_ordens_de_servico",
    "name": "Ordens de Serviço",
    "section": "Ordem de Serviço",
    "method": "POST",
    "path": "/api/os/list/",
    "pathParams": [],
    "queryParams": [],
    "bodyMode": "form",
    "bodyParams": [
      "filtro_data",
      "agendamento_inicial",
      "agendamento_final",
      "pop_id",
      "contrato_id",
      "cliente_id",
      "status_encerrada",
      "data_finalizacao",
      "orderby"
    ],
    "description": "| **Parâmetro** | **Tipo** | **Descrição** | | --- | --- | --- | | pop_id | integer | ID do POP | | contrato_id | integer | ID do Contrato | | cliente_id | integer | ID do Cliente | | agendamento_inicial | string | Data de Agendamento Inicial, formato: \"AAAA-MM-DD HH:mm:ss\" | | agendamento_final | s"
  },
  {
    "id": "sgp_os_ordem_de_servico_por_id",
    "name": "Ordem de Serviço por ID",
    "section": "Ordem de Serviço",
    "method": "POST",
    "path": "/api/os/list/id/{os_id}",
    "pathParams": [
      "os_id"
    ],
    "queryParams": [],
    "bodyMode": "form",
    "bodyParams": [],
    "description": ""
  },
  {
    "id": "sgp_os_ordens_de_servico_total",
    "name": "Ordens de Serviço Total",
    "section": "Ordem de Serviço",
    "method": "POST",
    "path": "/api/os/list/total/",
    "pathParams": [],
    "queryParams": [],
    "bodyMode": "form",
    "bodyParams": [
      "filtro_data",
      "agendamento_inicial",
      "agendamento_final",
      "pop_id",
      "contrato_id",
      "cliente_id",
      "status_encerrada",
      "data_finalizacao",
      "orderby"
    ],
    "description": "| **Parâmetro** | **Tipo** | **Descrição** | | --- | --- | --- | | pop_id | integer | ID do POP | | contrato_id | integer | ID do Contrato | | cliente_id | integer | ID do Cliente | | agendamento_inicial | string | Data de Agendamento Inicial, formato: \"AAAA-MM-DD\" | | agendamento_final | string | D"
  },
  {
    "id": "sgp_os_alterar_ordem_de_servico",
    "name": "Alterar Ordem de Serviço",
    "section": "Ordem de Serviço",
    "method": "POST",
    "path": "/api/os/update/id/{os_id}/",
    "pathParams": [
      "os_id"
    ],
    "queryParams": [],
    "bodyMode": "form",
    "bodyParams": [
      "os_servicoprestado",
      "os_observacao",
      "os_data_alteracao",
      "os_data_finalizacao",
      "checkin_data",
      "assinatura_cliente",
      "assinatura_tecnico",
      "assinatura_contrato",
      "os_status",
      "checkin_latitude",
      "checkin_longitude",
      "classificacao_adicionar",
      "classificacao_remover"
    ],
    "description": "| **Parâmetro** | **Tipo** | **Descrição** | | --- | --- | --- | | os_servicoprestado | string | Serviço Prestado | | os_observacao | string | Observação | | os_data_alteracao | string | Data de Alteração, formato \"AAAA-MM-DD HH:MM:SS: | | os_data_finalizacao | string | Data de Finalização, formato:"
  },
  {
    "id": "sgp_os_ordem_de_servico_a_caminho",
    "name": "Ordem de Serviço - A caminho",
    "section": "Ordem de Serviço",
    "method": "POST",
    "path": "/api/os/acaminho/id/{os_id}/",
    "pathParams": [
      "os_id"
    ],
    "queryParams": [],
    "bodyMode": "form",
    "bodyParams": [],
    "description": ""
  },
  {
    "id": "sgp_os_imprimir_ordem_de_servico",
    "name": "Imprimir Ordem de Serviço",
    "section": "Ordem de Serviço",
    "method": "GET",
    "path": "/api/os/print/id/{os_id}/",
    "pathParams": [
      "os_id"
    ],
    "queryParams": [],
    "bodyMode": "none",
    "bodyParams": [],
    "description": ""
  },
  {
    "id": "sgp_os_ordem_de_servico_anexar_imagem",
    "name": "Ordem de Serviço - Anexar Imagem",
    "section": "Ordem de Serviço",
    "method": "PUT",
    "path": "/api/os/imagem/id/{os_id}/add/",
    "pathParams": [
      "os_id"
    ],
    "queryParams": [],
    "bodyMode": "form",
    "bodyParams": [
      "file",
      "image_base64",
      "descricao"
    ],
    "description": "| **Parâmetro** | **Tipo** | **Descrição** | | --- | --- | --- | | image_b64 | string | base64 | | file | file | Arquivo | | descricao | string | Descrição da Imagem | Deve ser informado \"image_b64\" ou \"file\"."
  },
  {
    "id": "sgp_os_ordem_de_servico_alterar_descricao_da_imagem",
    "name": "Ordem de Serviço - Alterar descrição da imagem",
    "section": "Ordem de Serviço",
    "method": "POST",
    "path": "/api/os/{os_id}/imagem/edit/",
    "pathParams": [
      "os_id"
    ],
    "queryParams": [],
    "bodyMode": "form",
    "bodyParams": [
      "arquivo",
      "descricao"
    ],
    "description": "| **Parâmetro** | **Tipo** | **Descrição** | | --- | --- | --- | | arquivo | string | Nome do Arquivo | | descricao | string | Descrição da Imagem |"
  },
  {
    "id": "sgp_os_ordem_de_servico_imagem",
    "name": "Ordem de Serviço - Imagem",
    "section": "Ordem de Serviço",
    "method": "POST",
    "path": "/api/os/{os_id}/imagem/detail/",
    "pathParams": [
      "os_id"
    ],
    "queryParams": [],
    "bodyMode": "form",
    "bodyParams": [
      "arquivo"
    ],
    "description": "| **Parâmetro** | **Tipo** | **Descrição** | | --- | --- | --- | | arquivo | string | Nome do Arquivo |"
  },
  {
    "id": "sgp_os_ordem_de_servico_imagens",
    "name": "Ordem de Serviço - Imagens",
    "section": "Ordem de Serviço",
    "method": "GET",
    "path": "/api/os/imagem/id/{os_id}/list/",
    "pathParams": [
      "os_id"
    ],
    "queryParams": [],
    "bodyMode": "none",
    "bodyParams": [],
    "description": ""
  },
  {
    "id": "sgp_os_ordem_de_servico_visualizar_anexo_por_id",
    "name": "Ordem de Serviço - Visualizar Anexo por ID",
    "section": "Ordem de Serviço",
    "method": "GET",
    "path": "/api/os/imagem/{anexo_id}",
    "pathParams": [
      "anexo_id"
    ],
    "queryParams": [],
    "bodyMode": "none",
    "bodyParams": [],
    "description": ""
  },
  {
    "id": "sgp_os_ordem_de_servico_remover_imagem",
    "name": "Ordem de Serviço - Remover Imagem",
    "section": "Ordem de Serviço",
    "method": "GET",
    "path": "/api/os/imagem/{imagem_id}/delete/",
    "pathParams": [
      "imagem_id"
    ],
    "queryParams": [],
    "bodyMode": "none",
    "bodyParams": [],
    "description": ""
  },
  {
    "id": "sgp_os_ordem_de_servico_alterar_servico",
    "name": "Ordem de Serviço - Alterar Serviço",
    "section": "Ordem de Serviço",
    "method": "POST",
    "path": "/api/os/servico/update/id/{os_id}/",
    "pathParams": [
      "os_id"
    ],
    "queryParams": [],
    "bodyMode": "form",
    "bodyParams": [
      "set_mac",
      "del_mac",
      "conexao_senha"
    ],
    "description": "| **Parâmetro** | **Tipo** | **Descrição** | | --- | --- | --- | | set_mac | string | MAC | | del_mac | integer | Remover MAC? | | conexao_senha | string | Senha |"
  },
  {
    "id": "sgp_os_ordem_de_servico_anotacoes",
    "name": "Ordem de Serviço - Anotações",
    "section": "Ordem de Serviço",
    "method": "POST",
    "path": "/api/os/anotacoes/list/id/{os_id}/",
    "pathParams": [
      "os_id"
    ],
    "queryParams": [],
    "bodyMode": "form",
    "bodyParams": [],
    "description": ""
  },
  {
    "id": "sgp_os_ordem_de_servico_cadastrar_anotacao",
    "name": "Ordem de Serviço - Cadastrar Anotação",
    "section": "Ordem de Serviço",
    "method": "POST",
    "path": "/api/os/anotacoes/add/id/{os_id}/",
    "pathParams": [
      "os_id"
    ],
    "queryParams": [],
    "bodyMode": "form",
    "bodyParams": [
      "anotacao"
    ],
    "description": "| **Parâmetro** | **Tipo** | **Descrição** | | --- | --- | --- | | anotacao | string | Anotação |"
  },
  {
    "id": "sgp_os_ordem_de_servico_comentarios_ocorrencia",
    "name": "Ordem de Serviço - Comentários (Ocorrência)",
    "section": "Ordem de Serviço",
    "method": "POST",
    "path": "/api/os/ocorrencia/comentario/list/id/{os_id}/",
    "pathParams": [
      "os_id"
    ],
    "queryParams": [],
    "bodyMode": "form",
    "bodyParams": [],
    "description": ""
  },
  {
    "id": "sgp_os_ordem_de_servico_cadastrar_comentario_ocorrencia",
    "name": "Ordem de Serviço - Cadastrar Comentário (Ocorrência)",
    "section": "Ordem de Serviço",
    "method": "POST",
    "path": "/api/os/ocorrencia/comentario/add/id/{os_id}/",
    "pathParams": [
      "os_id"
    ],
    "queryParams": [],
    "bodyMode": "form",
    "bodyParams": [
      "anotacao"
    ],
    "description": "| **Parâmetro** | **Tipo** | **Descrição** | | --- | --- | --- | | anotacao | string | Comentário |"
  },
  {
    "id": "sgp_os_ordem_de_servico_checklist",
    "name": "Ordem de Serviço - Checklist",
    "section": "Ordem de Serviço",
    "method": "GET",
    "path": "/api/os/{os_id}/checklist/list/",
    "pathParams": [
      "os_id"
    ],
    "queryParams": [],
    "bodyMode": "none",
    "bodyParams": [],
    "description": ""
  },
  {
    "id": "sgp_os_ordem_de_servico_marcar_desmarcar_checklist",
    "name": "Ordem de Serviço - Marcar/Desmarcar Checklist",
    "section": "Ordem de Serviço",
    "method": "POST",
    "path": "/api/os/checklist/{checklist_id}/toggle/",
    "pathParams": [
      "checklist_id"
    ],
    "queryParams": [],
    "bodyMode": "none",
    "bodyParams": [],
    "description": "| **Parâmetro** | **Tipo** | **Descrição** | | --- | --- | --- | | is_checked | string/int | Está marcado? | | comentario | string | Comentário do checklist | **is_checked**: - \"0\" - False; - \"1\" - True."
  },
  {
    "id": "sgp_os_ordem_de_servico_comentarios",
    "name": "Ordem de Serviço - Comentários",
    "section": "Ordem de Serviço",
    "method": "GET",
    "path": "/api/os/{os_id}/comentario/list/",
    "pathParams": [
      "os_id"
    ],
    "queryParams": [],
    "bodyMode": "none",
    "bodyParams": [],
    "description": ""
  },
  {
    "id": "sgp_os_ordem_de_servico_cadastrar_comentario",
    "name": "Ordem de Serviço - Cadastrar Comentário",
    "section": "Ordem de Serviço",
    "method": "POST",
    "path": "/api/os/{os_id}/comentario/add/",
    "pathParams": [
      "os_id"
    ],
    "queryParams": [],
    "bodyMode": "none",
    "bodyParams": [],
    "description": "| **Parâmetro** | **Tipo** | **Descrição** | | --- | --- | --- | | comentario | string | Comentário | | checklist_id | int | ID do Checklist |"
  },
  {
    "id": "sgp_os_ordem_de_servico_excluir_comentario",
    "name": "Ordem de Serviço - Excluir Comentário",
    "section": "Ordem de Serviço",
    "method": "POST",
    "path": "/ws/os/{os_id}/comentario/delete/",
    "pathParams": [
      "os_id"
    ],
    "queryParams": [],
    "bodyMode": "none",
    "bodyParams": [],
    "description": "| **Parâmetro** | **Tipo** | **Descrição** | | --- | --- | --- | | comentario_id | integer | Id do comentário \\[Obrigatário\\] |"
  },
  {
    "id": "sgp_os_motivos",
    "name": "Motivos",
    "section": "Ordem de Serviço",
    "method": "GET",
    "path": "/api/os/ocorrencia/motivo/list/",
    "pathParams": [],
    "queryParams": [],
    "bodyMode": "none",
    "bodyParams": [],
    "description": ""
  },
  {
    "id": "sgp_os_metodos",
    "name": "Métodos",
    "section": "Ordem de Serviço",
    "method": "GET",
    "path": "/api/os/ocorrencia/metodo/list/",
    "pathParams": [],
    "queryParams": [],
    "bodyMode": "none",
    "bodyParams": [],
    "description": ""
  },
  {
    "id": "sgp_os_tipos",
    "name": "Tipos",
    "section": "Ordem de Serviço",
    "method": "GET",
    "path": "/api/os/ocorrencia/tipo/list/",
    "pathParams": [],
    "queryParams": [],
    "bodyMode": "none",
    "bodyParams": [],
    "description": ""
  },
  {
    "id": "sgp_os_setores",
    "name": "Setores",
    "section": "Ordem de Serviço",
    "method": "GET",
    "path": "/api/os/ocorrencia/setor/list/",
    "pathParams": [],
    "queryParams": [],
    "bodyMode": "none",
    "bodyParams": [],
    "description": ""
  },
  {
    "id": "sgp_suporte_servico_alterar",
    "name": "Serviço - Alterar",
    "section": "Suporte",
    "method": "POST",
    "path": "/api/suporte/service/update/{servico_id}/",
    "pathParams": [
      "servico_id"
    ],
    "queryParams": [],
    "bodyMode": "form",
    "bodyParams": [
      "servico_tipo",
      "action",
      "mac",
      "login",
      "login_password",
      "map_ll",
      "serial",
      "cpemanager",
      "plano_id"
    ],
    "description": "| **Parâmetro** | **Tipo** | **Descrição** | | --- | --- | --- | | servico_tipo | integer | Tipo do Serviço | | action | string | Ação | | mac | string | MAC | | login_password | string | Password | | login | string | Login | | map_ll | string | Latitude e Longitude do endereço de instalação | | ser"
  },
  {
    "id": "sgp_suporte_servico_generico_criar",
    "name": "Serviço Genérico - Criar",
    "section": "Suporte",
    "method": "POST",
    "path": "/api/servico/generico",
    "pathParams": [],
    "queryParams": [],
    "bodyMode": "form",
    "bodyParams": [
      "clientecontrato_id",
      "planobase_id",
      "descricao",
      "identificador_gateway",
      "identificador_gateway_extra",
      "login",
      "senha"
    ],
    "description": "| **Parâmetro** | **Tipo** | **Descrição** | | --- | --- | --- | | token | string | Token de autenticação (Obrigatório) | | app | string | Appname de autenticação (Obrigatório) | | clientecontrato_id | integer | ID do contrato de serviço (Obrigatório) | | planobase_id | integer | ID do plano do serv"
  },
  {
    "id": "sgp_suporte_servico_generico_deletar",
    "name": "Serviço Genérico - Deletar",
    "section": "Suporte",
    "method": "DELETE",
    "path": "/api/servico/generico/{id}",
    "pathParams": [
      "id"
    ],
    "queryParams": [],
    "bodyMode": "form",
    "bodyParams": [
      "clientecontrato_id"
    ],
    "description": "| **Parâmetro** | **Tipo** | **Descrição** | | --- | --- | --- | | token | string | Token de autenticação | | app | string | Appname de autenticação | | clientecontrato_id | integer | ID do contrato de serviço vinculado ao serviço | **Observação**: Não é possível remover serviços de contratos que te"
  },
  {
    "id": "sgp_suporte_contratos",
    "name": "Contratos",
    "section": "Suporte",
    "method": "POST",
    "path": "/api/suporte/contrato/list/",
    "pathParams": [],
    "queryParams": [],
    "bodyMode": "form",
    "bodyParams": [
      "cliente_nome",
      "cliente_id",
      "contrato_id",
      "servico_login",
      "cliente_cpfcnpj"
    ],
    "description": ""
  },
  {
    "id": "sgp_suporte_cadastrar_cliente_documento",
    "name": "Cadastrar Cliente Documento",
    "section": "Suporte",
    "method": "PUT",
    "path": "/api/suporte/cliente/{cliente_id}/documento/add/",
    "pathParams": [
      "cliente_id"
    ],
    "queryParams": [],
    "bodyMode": "form",
    "bodyParams": [
      "file",
      "descricao"
    ],
    "description": "| **Parâmetro** | **Tipo** | **Descrição** | | --- | --- | --- | | file | file | Arquivo | | descricao | string | Descrição do Documento |"
  },
  {
    "id": "sgp_suporte_alterar_cliente_documento",
    "name": "Alterar Cliente Documento",
    "section": "Suporte",
    "method": "POST",
    "path": "/api/suporte/cliente/{cliente_id}/documento/edit/",
    "pathParams": [
      "cliente_id"
    ],
    "queryParams": [],
    "bodyMode": "form",
    "bodyParams": [
      "arquivo",
      "descricao"
    ],
    "description": "| **Parâmetro** | **Tipo** | **Descrição** | | --- | --- | --- | | arquivo | string | Nome do Arquivo | | descricao | string | Descrição do Documento |"
  },
  {
    "id": "sgp_suporte_cliente_documento",
    "name": "Cliente Documento",
    "section": "Suporte",
    "method": "POST",
    "path": "/api/suporte/cliente/{cliente_id}/documento/detail/",
    "pathParams": [
      "cliente_id"
    ],
    "queryParams": [],
    "bodyMode": "form",
    "bodyParams": [
      "arquivo"
    ],
    "description": "| **Parâmetro** | **Tipo** | **Descrição** | | --- | --- | --- | | arquivo | string | Nome do Arquivo |"
  },
  {
    "id": "sgp_suporte_cliente_documentos",
    "name": "Cliente Documentos",
    "section": "Suporte",
    "method": "GET",
    "path": "/api/suporte/cliente/{cliente_id}/documento/list/",
    "pathParams": [
      "cliente_id"
    ],
    "queryParams": [],
    "bodyMode": "none",
    "bodyParams": [],
    "description": ""
  },
  {
    "id": "sgp_suporte_remover_cliente_documento",
    "name": "Remover Cliente Documento",
    "section": "Suporte",
    "method": "GET",
    "path": "/api/suporte/cliente/{documento_id}/documento/delete/",
    "pathParams": [
      "documento_id"
    ],
    "queryParams": [],
    "bodyMode": "none",
    "bodyParams": [],
    "description": ""
  },
  {
    "id": "sgp_outros_informacoes_do_usuario",
    "name": "Informações do usuário",
    "section": "Outros",
    "method": "GET",
    "path": "/api/auth/info/",
    "pathParams": [],
    "queryParams": [],
    "bodyMode": "none",
    "bodyParams": [],
    "description": ""
  },
  {
    "id": "sgp_cpe_cpe_detalhes",
    "name": "CPE - Detalhes",
    "section": "Gerenciador CPE",
    "method": "GET",
    "path": "/api/cpemanager/servico/{id_servico}/infodetail",
    "pathParams": [
      "id_servico"
    ],
    "queryParams": [],
    "bodyMode": "none",
    "bodyParams": [],
    "description": "**Modo de uso**: Necessário alterar {id_serviço} pelo ID do serviço de Internet. Realizar autenticação via Basic (usuário e senha)."
  },
  {
    "id": "sgp_cpe_cpe_sincronizar_wan",
    "name": "CPE - Sincronizar WAN",
    "section": "Gerenciador CPE",
    "method": "POST",
    "path": "/api/cpemanager/servico/{id_servico}/sync/",
    "pathParams": [
      "id_servico"
    ],
    "queryParams": [],
    "bodyMode": "none",
    "bodyParams": [],
    "description": "**Modo de uso**: Necessário alterar {id_serviço} pelo ID do serviço de Internet. Realizar autenticação via Basic (usuário e senha)."
  },
  {
    "id": "sgp_cpe_cpe_importar_wifi",
    "name": "CPE - Importar Wifi",
    "section": "Gerenciador CPE",
    "method": "POST",
    "path": "/api/cpemanager/servico/{id_servico}/wifi/import/",
    "pathParams": [
      "id_servico"
    ],
    "queryParams": [],
    "bodyMode": "none",
    "bodyParams": [],
    "description": "**Modo de uso**: Necessário alterar {id_serviço} pelo ID do serviço de Internet. Realizar autenticação via Basic (usuário e senha)."
  },
  {
    "id": "sgp_cpe_cpe_definir_wifi",
    "name": "CPE - Definir Wifi",
    "section": "Gerenciador CPE",
    "method": "POST",
    "path": "/api/cpemanager/servico/{id_servico}/wifi/set/",
    "pathParams": [
      "id_servico"
    ],
    "queryParams": [],
    "bodyMode": "none",
    "bodyParams": [],
    "description": "**Modo de uso**: Necessário alterar {id_serviço} pelo ID do serviço de Internet. Realizar autenticação via Basic (usuário e senha)."
  },
  {
    "id": "sgp_cpe_cpe_configurar_wan",
    "name": "CPE - Configurar Wan",
    "section": "Gerenciador CPE",
    "method": "POST",
    "path": "/api/cpemanager/servico/{id_servico}/pppoe/",
    "pathParams": [
      "id_servico"
    ],
    "queryParams": [],
    "bodyMode": "none",
    "bodyParams": [],
    "description": "**Modo de uso**: Necessário alterar {id_serviço} pelo ID do serviço de Internet. Realizar autenticação via Basic (usuário e senha)."
  },
  {
    "id": "sgp_cpe_cpe_ping",
    "name": "CPE - Ping",
    "section": "Gerenciador CPE",
    "method": "POST",
    "path": "/api/cpemanager/servico/{id_servico}/command/ping/",
    "pathParams": [
      "id_servico"
    ],
    "queryParams": [],
    "bodyMode": "none",
    "bodyParams": [],
    "description": "**Modo de uso**: Necessário alterar {id_serviço} pelo ID do serviço de Internet. Realizar autenticação via Basic (usuário e senha)."
  },
  {
    "id": "sgp_cpe_cpe_speedtest",
    "name": "CPE - SpeedTest",
    "section": "Gerenciador CPE",
    "method": "POST",
    "path": "/api/cpemanager/servico/{id_servico}/command/speedtest/",
    "pathParams": [
      "id_servico"
    ],
    "queryParams": [],
    "bodyMode": "none",
    "bodyParams": [],
    "description": "**Modo de uso**: Necessário alterar {id_serviço} pelo ID do serviço de Internet. Realizar autenticação via Basic (usuário e senha)."
  },
  {
    "id": "sgp_cpe_cpe_remover_dados_do_sgp",
    "name": "CPE - Remover Dados do SGP",
    "section": "Gerenciador CPE",
    "method": "POST",
    "path": "/api/cpemanager/servico/{id_servico}/command/clear/",
    "pathParams": [
      "id_servico"
    ],
    "queryParams": [],
    "bodyMode": "none",
    "bodyParams": [],
    "description": "**Modo de uso**: Necessário alterar {id_serviço} pelo ID do serviço de Internet. Realizar autenticação via Basic (usuário e senha)."
  },
  {
    "id": "sgp_cpe_cpe_reboot",
    "name": "CPE - Reboot",
    "section": "Gerenciador CPE",
    "method": "POST",
    "path": "/api/cpemanager/servico/{id_servico}/command/boot/",
    "pathParams": [
      "id_servico"
    ],
    "queryParams": [],
    "bodyMode": "none",
    "bodyParams": [],
    "description": "**Modo de uso**: Necessário alterar {id_serviço} pelo ID do serviço de Internet. Realizar autenticação via Basic (usuário e senha)."
  },
  {
    "id": "sgp_cpe_cpe_wifi_list",
    "name": "CPE - Wifi List",
    "section": "Gerenciador CPE",
    "method": "GET",
    "path": "/api/cpemanager/servico/{id_servico}/wifi/list/",
    "pathParams": [
      "id_servico"
    ],
    "queryParams": [],
    "bodyMode": "none",
    "bodyParams": [],
    "description": "**Modo de uso**: Necessário alterar {id_serviço} pelo ID do serviço de Internet. Realizar autenticação via Basic (usuário e senha)."
  },
  {
    "id": "sgp_cpe_cpe_atualizar_dados_wifi",
    "name": "CPE - Atualizar dados Wifi",
    "section": "Gerenciador CPE",
    "method": "POST",
    "path": "/api/cpemanager/servico/{id_servico}/wifi/update/",
    "pathParams": [
      "id_servico"
    ],
    "queryParams": [],
    "bodyMode": "json",
    "bodyParams": [
      "1-1_ssid",
      "1-1_frequency",
      "1-1_password",
      "1-1_enabled"
    ],
    "description": "| **Sufixo** | **Tipo** | **Descrição** | | --- | --- | --- | | ssid | string | Nome da rede (Wifi SSID) | | frequency | int | Canal da rede (Wifi Channel) | | password | string | Senha da rede (Wifi Password) | | enabled | string | Ativo (Valores aceitos: \"on\" ou \"off\") | **Modo de uso**: Necessári"
  },
  {
    "id": "sgp_cpe_cpe_atualizar_campo",
    "name": "CPE - Atualizar Campo",
    "section": "Gerenciador CPE",
    "method": "POST",
    "path": "/api/cpemanager/servico/{id_servico}/update/field/",
    "pathParams": [
      "id_servico"
    ],
    "queryParams": [
      "param",
      "value"
    ],
    "bodyMode": "form",
    "bodyParams": [],
    "description": "**Modo de uso**: Necessário alterar {id_serviço} pelo ID do serviço de Internet. Realizar autenticação via Basic (usuário e senha). **Parâmetros:** \"param\" : Parâmetro a ser alterado \"value\" : Valor a ser passado"
  }
];
