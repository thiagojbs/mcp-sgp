# Mapa de Endpoints da API SGP (fonte da verdade)

Gerado a partir da collection oficial do Postman. Total: **237 endpoints** em 13 seções.

Autenticação: `token` + `app` (método Token) ou HTTP Basic. Em **GET** os parâmetros (incl. token/app no modo Token) vão na **query string**; em **POST/PUT/PATCH/DELETE** vão no **corpo** (form-urlencoded ou JSON). `token`/`app` são injetados pela configuração da conexão.

## Central Assinante (33)

| Tool | Método | Endpoint | Path | Query | Body |
|---|---|---|---|---|---|
| `sgp_central_contrato_listar` | POST | `/api/central/contratos` | — | — | form: cpfcnpj, senha |
| `sgp_central_servico_internet_verificar_disponibilidade` | POST | `/api/central/verificaacesso/` | — | — | form: cpfcnpj, senha, contrato |
| `sgp_central_servico_internet_extrato_de_trafego` | POST | `/api/central/extratouso/` | — | — | form: cpfcnpj, senha, contrato, ano, mes |
| `sgp_central_contrato_liberacao_por_confianca` | POST | `/api/central/promessapagamento/` | — | — | form: cpfcnpj, senha, contrato |
| `sgp_central_chamado_listar` | POST | `/api/central/chamado/list/` | — | — | form: cpfcnpj, senha, contrato, cliente, os, status, oc_status, pop, data_cadastro_inicio, data_cadastro_fim, data_agendamento_inicio, data_agendamento_fim, data_finalizacao_inicio, data_finalizacao_fim |
| `sgp_central_tipos_de_ocorrencia_listar` | POST | `/api/central/tipoocorrencia/list/` | — | — | form: cpfcnpj, senha |
| `sgp_central_chamado_criar` | POST | `/api/central/chamado/` | — | — | form: cpfcnpj, senha, contrato, conteudo, contato, contato_numero, ocorrenciatipo, setor, responsaveloc, motivoos, sem_os, os_tecnico_responsavel, os_servico_prestado, os_prioridade, data_hora_agendamento |
| `sgp_central_chamado_atualizar` | POST | `/api/central/chamado/update/{os_id}/` | os_id | — | form: cpfcnpj, senha, ocorrencia_conteudo, ocorrencia_encerrar, os_servico_prestado, os_observacao, os_anotacao, os_data_agendamento, os_status, os_tecnico_responsavel, os_setor, os_motivo, os_prioridade, notificar_cliente |
| `sgp_central_chamado_adicionar_anexo` | POST | `/api/central/chamado/{os_id}/anexo/add/` | os_id | — | form: cpfcnpj, senha, file, file_b64, descricao, filename |
| `sgp_central_ordem_de_servico_adicionar_anotacao` | POST | `/api/central/chamado/{os_id}/anotacao` | os_id | — | form: cpfcnpj, senha, anotacao |
| `sgp_central_nota_fiscal_listar` | POST | `/api/central/notafiscal/list/` | — | — | form: cpfcnpj, senha, contrato |
| `sgp_central_nfcom_listar` | POST | `/api/central/nfcom/list` | — | — | form: usuario, senha, contrato, emitente, status, ambiente, data_emissao_fim, data_emissao_inicio |
| `sgp_central_nfcom_baixar` | POST | `/api/central/nfcom/print/{{numero_nota}}` | numero_nota | — | form: contrato, formato |
| `sgp_central_nfcom_enviar` | POST | `/api/central/nfcom/enviar/{{id_nota}}` | id_nota | — | form: contrato, email |
| `sgp_central_nfse_listar` | POST | `/api/central/nfse/list/` | — | — | form: cpfcnpj, senha, contrato |
| `sgp_central_nfse_enviar` | POST | `/api/central/nfse/enviar/{{id_nota}}` | id_nota | — | form: contrato, email |
| `sgp_central_fatura_listar` | POST | `/api/central/titulos/` | — | — | form: cpfcnpj, senha, contrato, offset, limit, status, imprimir_nota_fiscal, imprimir_nota_debito |
| `sgp_central_fatura_segunda_via` | POST | `/api/central/fatura2via/` | — | — | form: cpfcnpj, senha, contrato, nao_gerar_os |
| `sgp_central_fatura_gerar_pix` | POST | `/api/central/pagamento/pix/{id_titulo}` | id_titulo | — | form: cpfcnpj, senha, contrato |
| `sgp_central_fatura_enviar` | POST | `/api/central/envia2via/` | — | — | form: cpfcnpj, senha, contrato, tipo, email, celular |
| `sgp_central_fatura_pagar_via_cartao_de_credito` | POST | `/api/central/pagamento/cartao/{titulo_id}` | titulo_id | — | form: cpfcnpj, senha, contrato, nome, numero, expira, cvv, cartao_id |
| `sgp_central_fatura_pagar_via_cartao_de_debito` | POST | `/api/central/pagamento/cartao/{titulo_id}/debito/` | titulo_id | — | form: cpfcnpj, senha, contrato, nome, numero, expira, cvv, cartao_id |
| `sgp_central_fatura_pagar_via_cartao_checkout` | POST | `/api/central/pagamento/checkout/{titulo_id}/cartao/` | titulo_id | — | form: cpfcnpj, senha, contrato |
| `sgp_central_gateway_cartao_listar` | POST | `/api/centralapp/gatewaycartao/list/` | — | — | — |
| `sgp_central_cartao_de_credito_cadastrar` | POST | `/api/centralapp/cadastrarcartao/` | — | — | — |
| `sgp_central_cartao_de_credito_delete` | DELETE | `/api/centralapp/deletecartao/{id_cartao}/` | id_cartao | — | form: contrato, login, password |
| `sgp_central_cobranca_recorrente_cadastrar` | POST | `/api/centralapp/cartao/{id_cartao}/cobrancarecorrente/add/` | id_cartao | — | — |
| `sgp_central_cobranca_recorrente_delete` | POST | `/api/centralapp/cartao/{id_cartao}/cobrancarecorrente/delete/` | id_cartao | — | — |
| `sgp_central_declaracao_de_quitacao_baixar` | GET | `/api/centralapp/declaracao/quitacao/2026/` | — | — | — |
| `sgp_central_assinatura_detalhe` | POST | `/api/centralapp/assinaturas/{id_assinatura/detail/` | — | — | form: login, password |
| `sgp_central_assinaturas_listar` | POST | `/api/centralapp/assinaturas/list` | — | — | form: login, password |
| `sgp_central_contrato_pdf` | GET | `/api/centralapp/contrato/print/{tipo}/` | tipo | — | — |
| `sgp_central_avisos_listar` | GET | `/api/centralapp/avisos/servico/list/` | — | — | — |

## Remessa / Retorno (2)

| Tool | Método | Endpoint | Path | Query | Body |
|---|---|---|---|---|---|
| `sgp_remessa_download_remessa` | POST | `/api/banco/remessa/download/` | — | — | form: portador, modelo_arquivo, ocorrencias, data_inicial, data_final, data_emissao_inicial, data_emissao_final, status, pop, status_baixa |
| `sgp_remessa_upload_retorno` | POST | `/api/banco/retorno/upload/` | — | — | form: portador, arquivo, previewcheck |

## FTTH (29)

| Tool | Método | Endpoint | Path | Query | Body |
|---|---|---|---|---|---|
| `sgp_ftth_listar_olt` | GET | `/api/fttx/olt/list/` | — | — | — |
| `sgp_ftth_listar_pon` | GET | `/api/fttx/olt/{olt_id}/pon/list/` | olt_id | — | — |
| `sgp_ftth_listar_onu_por_olt` | GET | `/api/fttx/olt/{olt_id}/onu/list/` | olt_id | — | — |
| `sgp_ftth_listar_onu` | GET | `/api/fttx/onu/list/` | — | — | — |
| `sgp_ftth_listar_cto_utilizadas_na_olt` | GET | `/api/fttx/olt/pon/{olt_id}/splitter/list/` | olt_id | — | — |
| `sgp_ftth_listar_onus_vinculadas_a_cto` | GET | `/api/fttx/splitter/{cto_id}/onu/all/` | cto_id | — | — |
| `sgp_ftth_listar_cto` | GET | `/api/fttx/splitter/{id}/` | id | — | — |
| `sgp_ftth_listar_todas_cto` | GET | `/api/fttx/splitter/all/` | — | — | — |
| `sgp_ftth_listar_onus_nao_autorizadas` | GET | `/api/fttx/olt/{olt_id}/unauth/` | olt_id | — | — |
| `sgp_ftth_autorizar_onu` | POST | `/api/fttx/olt/{olt_id}/auth/` | olt_id | — | form: slot, pon, contrato, service, description, onutemplate, onutemplate_plain, splitter, splitter_port, id, onutype, mode, vlan, ident, pppoe_login, pppoe_password, wifi_ssid, wifi_password, wifi_channel, wifi_ssid5, wifi_password5, wifi_channel5, wifi_authmode, wifi_encrypttype, wifi_central, onu_web, onu_web_port, onu_telnet, onu_login, onu_password, no_auth, onuid |
| `sgp_ftth_resetar_onu` | GET | `/api/fttx/onu/{id_onu}/reset/` | id_onu | — | — |
| `sgp_ftth_exportar_onu` | GET | `/api/fttx/olt/{olt_id}/onu/export/` | olt_id | — | — |
| `sgp_ftth_onu_info` | GET | `/api/fttx/onu/{id_onu}/info/` | id_onu | — | — |
| `sgp_ftth_onu_detalhe` | GET | `/api/fttx/onu/{id_onu}/` | id_onu | — | — |
| `sgp_ftth_alterar_onu` | POST | `/api/fttx/onu/{onu_id}/edit/` | onu_id | — | form: onu_update, wifi_ssid, wifi_password, wifi_channel, wifi_ssid5, wifi_password5, wifi_channel5, wifi_central, onu_web, onu_telnet, onu_login, onu_password, service |
| `sgp_ftth_remover_onu` | GET | `/api/fttx/onu/{id_onu}/deauth/` | id_onu | — | — |
| `sgp_ftth_remover_onu_2` | POST | `/api/fttx/onu/{id_onu}/deauth/` | id_onu | — | form: — |
| `sgp_ftth_onu_wifi` | GET | `/api/fttx/onu/{identificador_onu}/wifi/` | identificador_onu | — | — |
| `sgp_ftth_onu_wan` | GET | `/api/fttx/onu/{identificador_onu}/wan/` | identificador_onu | — | — |
| `sgp_ftth_onu_cmd` | GET | `/api/fttx/onu/{identificador_onu}/cmd/{cmd_id}/` | identificador_onu, cmd_id | — | — |
| `sgp_ftth_onu_cmd_2` | POST | `/api/fttx/onu/{identificador_onu}/cmd/{cmd_id}/` | identificador_onu, cmd_id | — | — |
| `sgp_ftth_onu_tl1_cmd` | GET | `/api/fttx/onu/{identificador_onu}/tl1/cmd/` | identificador_onu | — | — |
| `sgp_ftth_onu_historico` | GET | `/api/fttx/onu/history/` | — | — | — |
| `sgp_ftth_cadastrar_cto` | POST | `/api/fttx/splitter/add/` | — | — | — |
| `sgp_ftth_onu_template` | GET | `/api/fttx/onutemplate/list/` | — | — | — |
| `sgp_ftth_onu_tipo` | GET | `/api/fttx/onutype/list/` | — | — | — |
| `sgp_ftth_onu_modo` | GET | `/api/fttx/onumode/list/` | — | — | — |
| `sgp_ftth_servicos` | GET | `/api/fttx/service/list/` | — | — | — |
| `sgp_ftth_adicionar_cto_ao_servico` | POST | `/ws/fttx/splitter/service/add/` | — | — | — |

## Estoque (32)

| Tool | Método | Endpoint | Path | Query | Body |
|---|---|---|---|---|---|
| `sgp_estoque_empresa_listar` | GET | `/api/estoque/empresa/list/` | — | — | — |
| `sgp_estoque_fornecedor_listar` | GET | `/api/estoque/fornecedor/list/` | — | — | — |
| `sgp_estoque_categoria_listar` | GET | `/api/estoque/categoria/list/` | — | nome | — |
| `sgp_estoque_fabricante_listar` | GET | `/api/estoque/fabricante/list/` | — | — | — |
| `sgp_estoque_ncm_listar` | GET | `/api/estoque/ncm/list/` | — | — | — |
| `sgp_estoque_kit_de_instalacao_listar` | GET | `/api/estoque/kitinstalacao/list/` | — | — | — |
| `sgp_estoque_produtos_de_kit_listar` | GET | `/api/estoque/kitinstalacaoproduto/list/` | — | — | — |
| `sgp_estoque_comodato_de_cliente_listar` | GET | `/api/estoque/comodato/list/` | — | — | — |
| `sgp_estoque_itens_da_comodato_listar` | GET | `/api/estoque/comodatoitens/list/` | — | — | — |
| `sgp_estoque_venda_de_cliente_listar` | GET | `/api/estoque/venda/list/` | — | — | — |
| `sgp_estoque_itens_da_venda_listar` | GET | `/api/estoque/vendaitens/list/` | — | — | — |
| `sgp_estoque_lancamento_listar` | GET | `/api/estoque/lancamento/list/` | — | — | — |
| `sgp_estoque_itens_do_lancamento_listar` | GET | `/api/estoque/lancamentoitem/list/` | — | — | — |
| `sgp_estoque_local_de_estoque_listar` | GET | `/api/estoque/estoque/list/` | — | — | — |
| `sgp_estoque_saldo_listar` | GET | `/api/estoque/estoque_agregado_referencias/list/` | — | — | — |
| `sgp_estoque_produto_listar_quantitativos` | GET | `/api/estoque/produto/list/` | — | — | — |
| `sgp_estoque_produto_listar_cadastrados` | GET | `/api/estoque/produto/list/all/` | — | — | — |
| `sgp_estoque_unidades_de_medidas_listar` | GET | `/api/estoque/unidademedida/list/` | — | — | — |
| `sgp_estoque_compras_listar` | GET | `/api/estoque/compra/list/` | — | — | — |
| `sgp_estoque_itens_da_compra_listar` | GET | `/api/estoque/compraitens/list/` | — | — | — |
| `sgp_estoque_transferencias_listar` | GET | `/api/estoque/transferencia/list/` | — | — | — |
| `sgp_estoque_lancamento_criar` | POST | `/api/estoque/lancamentoitem/create/` | — | — | json: os_id, cliente_id, clientecontrato_id, comodato, origem_id, itens |
| `sgp_estoque_estorno_atualizar` | POST | `/api/estoque/lancamentoitem/estorno/` | — | — | form: lancamentoitem_id, local_id, os_id, observacao |
| `sgp_estoque_produto_cadastrar` | POST | `/api/estoque/produto/create/` | — | — | form: codigo, descricao, ativo, codigo_barras, tipo_referencia, informar_referencia_saida, categorias, foto, valor_custo, valor_venda, unidade_medida, detalhes, fabricante, modelo, informacoes_adicionais, ncm |
| `sgp_estoque_produto_alterar` | POST | `/api/estoque/produto/{produto_id}/update/` | produto_id | — | form: codigo, descricao, ativo, codigo_barras, tipo_referencia, informar_referencia_saida, categorias, foto, valor_custo, valor_venda, unidade_medida, detalhes, fabricante, modelo, informacoes_adicionais, ncm |
| `sgp_estoque_compra_cadastrar` | POST | `/api/estoque/compra/create/` | — | — | json: fornecedor, empresa, notafiscal, observacao, itens |
| `sgp_estoque_transferencia_cadastrar` | POST | `/api/estoque/transferencia/create/` | — | — | json: origem, destino, responsavel_envio, observacao, itens |
| `sgp_estoque_vincular_produto_nfe_x_produto_estoque` | POST | `/api/ura/produtonfe_produtoestoque/vincular/` | — | — | form: produto_nfe, produto_estoque |
| `sgp_estoque_vincular_produto_nfe_x_produto_estoque_patch` | PATCH | `/api/ura/produtonfe_produtoestoque/vincular/` | — | — | form: produto_nfe, produto_estoque |
| `sgp_estoque_compra_nfe` | POST | `/api/ura/compra/nfe/` | — | — | json: nfe, estoque, fornecedor, itens |
| `sgp_estoque_fornecedor_cadastrar` | POST | `/api/estoque/fornecedor/create/` | — | — | form: nome, tipo_pessoa, sit_fiscal, nome_fantasia, responsavel_empresa, nome_contato, cpf_cnpj, rg, rg_emissor, insc_estadual, insc_municipal, contrib_icms, endereco_logradouro, endereco_numero, endereco_bairro, endereco_cidade, endereco_uf, endereco_cep, endereco_complemento, endereco_ponto_referencia, endereco_pais, endereco_coordenadas, cpais, cmun, email, telefone, celular, fax, observacao, json, ativo |
| `sgp_estoque_fornecedor_alterar` | POST | `/api/estoque/fornecedor/<fornecedor_id>/update/` | — | — | form: nome, tipo_pessoa, sit_fiscal, nome_fantasia, responsavel_empresa, nome_contato, cpf_cnpj, rg, rg_emissor, insc_estadual, insc_municipal, contrib_icms, endereco_logradouro, endereco_numero, endereco_bairro, endereco_cidade, endereco_uf, endereco_cep, endereco_complemento, endereco_ponto_referencia, endereco_pais, endereco_coordenadas, cpais, cmun, email, telefone, celular, fax, observacao, json, ativo |

## Termo de Aceite (2)

| Tool | Método | Endpoint | Path | Query | Body |
|---|---|---|---|---|---|
| `sgp_termo_termo_exibir` | GET | `/api/contrato/termoaceite/{idcontrato}/` | idcontrato | — | — |
| `sgp_termo_termo_aceitar` | POST | `/api/contrato/termoaceite/{idcontrato}` | idcontrato | — | form: aceite |

## URA (69)

| Tool | Método | Endpoint | Path | Query | Body |
|---|---|---|---|---|---|
| `sgp_ura_cliente_listar` | POST | `/api/ura/clientes/` | — | — | form: offset, limit, cliente_id, cpfcnpj, cliente_nome, plano, login, contrato, status, portador, telefone, pop, contrato_status, omitir_contratos, omitir_titulos, omitir_contatos, tipo_servico, exibir_conexao, exibir_observacao_cliente, exibir_observacao_servicos, data_cadastro_inicio, data_cadastro_fim, data_alteracao_inicio, data_alteracao_fim, data_vencimento_inicio, data_vencimento_fim, data_contrato_status_inicio, data_contrato_status_fim, data_pagamento_inicio, data_pagamento_fim, cto, cto_porta |
| `sgp_ura_cliente_listagem_resumida` | POST | `/api/ura/listacliente/` | — | — | form: pop, status, status_data_inicial, status_data_final, tipo |
| `sgp_ura_cliente_consultar` | POST | `/api/ura/consultacliente/` | — | — | form: cpfcnpj, contrato, nome, mac_controle, mac_dhcp, servico_serial, onu_serial, login, email, senha, telefone, radius, incluir_unificados, tservico, status, atrasado, servicos_dados, plano, titulo_status, exibir_observacao_cliente, exibir_observacao_servicos, pop, assinatura_eletronica, exibir_historico_status |
| `sgp_ura_cliente_sem_fatura` | POST | `/api/ura/clientes/semfatura/` | — | — | form: periodo |
| `sgp_ura_contato_criar` | POST | `/api/ura/contato/add/` | — | — | form: contato, contrato, tipo |
| `sgp_ura_viabilidade_consultar` | POST | `/api/ura/viabilidade/` | — | — | form: logradouro, numero_inicial, numero_final, bairro, cep, cidade |
| `sgp_ura_viabilidade_consultar_via_gateway` | GET | `/api/ura/viabilidadeinstalacao` | — | — | — |
| `sgp_ura_contrato_listar` | POST | `/api/ura/listacontrato/` | — | — | form: contrato, plano, tipo, status, exibir_endereco |
| `sgp_ura_contrato_atualizar` | POST | `/api/ura/contrato/edit/` | — | — | form: contrato, sms_desativado, forma_cobranca, portador, debito_banco, debito_agencia, debito_conta, tag_add, tag_remove |
| `sgp_ura_contrato_imprimir` | GET | `/api/contratos/print/{tipo_contrato}` | tipo_contrato | — | — |
| `sgp_ura_contrato_liberacao_por_confianca` | POST | `/api/ura/liberacaopromessa/` | — | — | form: contrato, data_promessa, uracontato, enviar_sms, uraIP, conteudo |
| `sgp_ura_servico_internet_verificar_disponibilidade` | POST | `/api/ura/verificaacesso/` | — | — | form: contrato, telefone, status_all, status_filter, uracontato, protocolo_ura |
| `sgp_ura_portador_listar` | GET | `/api/ura/portador/` | — | — | — |
| `sgp_ura_motivos_de_status_listar` | POST | `/api/ura/contrato/status/motivos/` | — | — | form: — |
| `sgp_ura_status_do_contrato_atualizar` | POST | `/api/ura/contrato/status/edit/` | — | — | form: contrato, status, motivo |
| `sgp_ura_senha_do_servico_atualizar` | POST | `/api/ura/cliente/servico/senha/edit/` | — | — | form: servico, tipo, senha |
| `sgp_ura_cpe_manage_consultar` | GET | `/api/ura/cpemanage/` | — | — | — |
| `sgp_ura_cpe_manage_atualizar` | POST | `/api/ura/cpemanage/` | — | — | form: contrato, servico, wifi_status, novo_ssid, nova_senha, wifi_status_5g, novo_ssid_5g, nova_senha_5g |
| `sgp_ura_plano_listar` | GET | `/api/ura/consultaplano/` | — | — | — |
| `sgp_ura_feriado_listar` | GET | `/api/model/feriado/` | — | — | — |
| `sgp_ura_classificacao_listar` | GET | `/api/ura/classificacoes/list/` | — | — | — |
| `sgp_ura_configuracoes_variaveis_listar` | POST | `/api/ura/configuracoes/` | — | — | form: configuracao |
| `sgp_ura_notificacao_no_sistema_criar` | POST | `/api/ura/notificacaosistema/` | — | — | form: contrato, cpfcnpj, uracontato, uraagent |
| `sgp_ura_ocorrencia_listar` | POST | `/api/ura/ocorrencia/list/` | — | — | form: offset, limit, ocorrencia, status, pop, tipo, contrato, contrato_status, data_cadastro_inicio, data_cadastro_fim, hora_cadastro_inicio, hora_cadastro_fim, data_agendamento_inicio, data_agendamento_fim, hora_agendamento_inicio, hora_agendamento_fim, data_finalizacao_inicio, data_finalizacao_fim, hora_finalizacao_inicio, hora_finalizacao_fim |
| `sgp_ura_ordem_de_servico_listar` | POST | `/api/ura/ordemservico/list/` | — | — | form: offset, limit, ordem_servico, status, pop, motivo, contrato, contrato_status, data_cadastro_inicio, data_cadastro_fim, hora_cadastro_inicio, hora_cadastro_fim, data_agendamento_inicio, data_agendamento_fim, hora_agendamento_inicio, hora_agendamento_fim, data_finalizacao_inicio, data_finalizacao_fim, hora_finalizacao_inicio, hora_finalizacao_fim |
| `sgp_ura_metodo_de_ocorrencia_listar` | GET | `/api/ura/ocorrencia/metodo/list/` | — | — | — |
| `sgp_ura_tecnico_listar` | POST | `/api/ura/tecnicos/` | — | — | form: — |
| `sgp_ura_chamado_criar` | POST | `/api/ura/chamado/` | — | — | json: contrato, ocorrenciatipo, tipoclassificacoes |
| `sgp_ura_chamado_anexar_audio` | POST | `/api/ura/audio/add/` | — | — | form: protocolo, url |
| `sgp_ura_pop_listar` | POST | `/api/ura/pops/` | — | — | form: — |
| `sgp_ura_empresa_listar` | POST | `/api/ura/empresas/` | — | — | form: cnpj |
| `sgp_ura_fornecedor_listar` | POST | `/api/ura/fornecedores/` | — | — | form: cpfcnpj |
| `sgp_ura_tipo_de_documento_conta_listar` | POST | `/api/ura/contas/tiposdocumentos/` | — | — | form: — |
| `sgp_ura_conta_a_pagar_receber_listar` | POST | `/api/ura/contas/{tipo}/` | tipo | — | form: offset, limit, descricao, nota_fiscal, status, tipo_documento, plano_contas, empresa, pop, fornecedor, usuario, data_cadastro_inicio, data_cadastro_fim, data_vencimento_inicio, data_vencimento_fim, data_pagamento_inicio, data_pagamento_fim |
| `sgp_ura_plano_de_contas_listar` | POST | `/api/ura/planoscontas/` | — | — | form: — |
| `sgp_ura_ponto_de_recebimento_listar` | POST | `/api/ura/pontosrecebimentos/` | — | — | form: — |
| `sgp_ura_fatura_listar` | POST | `/api/ura/titulos/` | — | — | form: offset, limit, titulo_id, cliente_id, cpfcnpj, contrato, status, portador, ordenar, ordenar_ordem, empresa_cnpj, tipo_pessoa, data_vencimento_inicio, data_vencimento_fim, data_pagamento_inicio, data_pagamento_fim, data_cancelamento_inicio, data_cancelamento_fim, data_acordo_inicio, data_acordo_fim |
| `sgp_ura_fatura_segunda_via` | POST | `/api/ura/fatura2via/` | — | — | form: cpfcnpj, contrato, telefone, notafiscal, faturas_abertas_todas, numero_documento, ocorrencia_conteudo, nao_gerar_os, tipo_ordenacao, modo_ordenacao, link_pdf |
| `sgp_ura_fatura_gerar_pix` | POST | `/api/ura/pagamento/pix/{fatura}` | fatura | — | form: contrato |
| `sgp_ura_fatura_enviar` | POST | `/api/ura/enviafatura/` | — | — | form: contrato, tipo, email, celular, numero_documento, mensagem, conteudo, link_pdf |
| `sgp_ura_fatura_liquidar` | POST | `/api/banco/titulo/{fatura_id}/baixar/` | fatura_id | — | form: data_pagamento, valor_pago, ponto_recebimento, forma_pagamento, tarifas, liquidacao_parcial, desconto, motivodesconto, observacao |
| `sgp_ura_fatura_estornar` | POST | `/api/banco/titulo/{fatura_id}/estornar/` | fatura_id | — | json: pontoRecebimento, caixalancamento_id, estorno_parcial |
| `sgp_ura_fatura_listar_lancamentos_de_caixa_liquidacao_parcial` | POST | `/api/banco/titulo/{fatura_id}/pagamento/list` | fatura_id | — | form: — |
| `sgp_ura_fatura_cancelar` | POST | `/api/banco/titulo/{fatura_id}/cancelar/` | fatura_id | — | form: motivo, naolibera, cancelar_nf, taxa_baixa_lanc |
| `sgp_ura_fatura_descancelar` | POST | `/api/banco/titulo/{fatura_id}/descancelar/` | fatura_id | — | form: — |
| `sgp_ura_fatura_gerar_mensalidade` | POST | `/api/ura/cliente/mensalidade/avulsa/add/` | — | — | form: contrato, ano, mes, ignorar_titulos_cancelados, gerar_proporcional, gerar_pix |
| `sgp_ura_fatura_gerar_titulo` | POST | `/api/ura/cliente/titulo/avulso/add/` | — | — | — |
| `sgp_ura_fatura_gerar_acordo_de_pagamento` | POST | `/api/ura/acordopagamento` | — | — | json: cliente, titulos, contrato, centrodecusto, portador, parcelas, valor, data_vencimento, desconto_venc, tolerancia_dias, titulo_sync |
| `sgp_ura_nfe_listar` | POST | `/api/ura/nfe/list/` | — | — | form: chave, data_emissao_inicio, data_emissao_fim |
| `sgp_ura_nfe_importar` | POST | `/api/ura/nfe/importar/` | — | — | form: xml |
| `sgp_ura_nfe_enviar` | POST | `/api/ura/nfe/enviar/{{id_nota}}` | id_nota | — | form: contrato, email |
| `sgp_ura_nas_listar` | POST | `/api/ura/nas/list/` | — | — | json: — |
| `sgp_ura_sms_gateways` | GET | `/api/sms/gateway/list/` | — | — | — |
| `sgp_ura_sms_enviar` | GET | `/api/sms/send/` | — | — | — |
| `sgp_ura_manutencao_listar` | GET | `/api/ura/manutencao/list/` | — | — | — |
| `sgp_ura_manutencao_cadastrar` | POST | `/api/ura/manutencao/add/` | — | — | — |
| `sgp_ura_manutencao_alterar` | POST | `/api/ura/manutencao/edit/` | — | — | — |
| `sgp_ura_manutencao_deletar` | POST | `/api/ura/manutencao/delete/` | — | — | — |
| `sgp_ura_ap_listar` | GET | `/api/ura/ap/list/` | — | — | — |
| `sgp_ura_fonte_listar` | GET | `/api/ura/fonte/list/` | — | — | — |
| `sgp_ura_switch_listar` | GET | `/api/ura/switch/list/` | — | — | — |
| `sgp_ura_protecao_de_credito_consulta_documento` | GET | `/api/ura/documento/consulta/gateway/{id_gateway}/` | id_gateway | documento, uf, adicionais | — |
| `sgp_ura_protecao_de_credito_adicionais` | GET | `/api/ura/consulta/adicionais/gateway/{id_gateway}/` | id_gateway | tipo_pessoa | — |
| `sgp_ura_protecao_de_credito_listar_gateways` | GET | `/api/ura/gatewaysserasa/list` | — | — | — |
| `sgp_ura_anotacoes_adicionar` | POST | `/api/ura/cliente/anotacao/add` | — | — | form: cliente_id, anotacao, contrato_id, tipo_id, alerta_modo |
| `sgp_ura_anotacoes_listar_consultar` | GET | `/api/ura/cliente/anotacao/list` | — | — | — |
| `sgp_ura_anotacoes_atualizar` | POST | `/api/ura/cliente/anotacao/{id}/edit` | id | — | form: anotacao, tipo_id, alerta_modo |
| `sgp_ura_anotacao_remover` | POST | `/api/ura/cliente/anotacao/{id}/remove/` | id | — | form: — |
| `sgp_ura_mapa_ftth_listar_gateways` | GET | `/api/ura/listgatewaymapa` | — | — | — |

## CRM (12)

| Tool | Método | Endpoint | Path | Query | Body |
|---|---|---|---|---|---|
| `sgp_crm_consulta_cliente_cliente_id` | GET | `/api/crm/cliente/{{cliente_id}}/` | cliente_id | — | — |
| `sgp_crm_consulta_cliente_cpfcnpj` | GET | `/api/crm/cliente/` | — | cpfcnpj | — |
| `sgp_crm_consulta_contratos_por_cliente_id` | GET | `/api/crm/cliente/{{cliente_id}}/contratos/` | cliente_id | — | — |
| `sgp_crm_consulta_contratos_por_cpfcnpj_do_cliente` | GET | `/api/crm/cliente/contratos/` | — | cpfcnpj | — |
| `sgp_crm_cliente_cadastrar_pessoa_fisica` | POST | `/api/crm/cliente/F` | — | — | json: nome, cpfcnpj, email, celular, datanasc, endereco, observacao, rg, rg_emissor, sexo, estadocivil, nomemae, nomepai, profissao, nacionalidade, naturalidade |
| `sgp_crm_cliente_cadastrar_pessoa_juridica` | POST | `/api/crm/cliente/J` | — | — | json: nome, nomefantasia, cpfcnpj, respempresa, respcpf, insc_estadual, insc_municipal, email, celular, datanasc, endereco, observacao |
| `sgp_crm_cliente_cadastrar_pessoa_estrangeira` | POST | `/api/crm/cliente/E` | — | — | json: nome, tipodoc, cpfcnpj, datanasc, sexo, estadocivil, nomemae, nomepai, profissao, nacionalidade, naturalidade, email, celular, endereco, observacao |
| `sgp_crm_cliente_cadastrar_pessoa_juridica_estrangeira` | POST | `/api/crm/cliente/EJ` | — | — | json: nome, tipodoc, cpfcnpj, datafundacao, celular, email, endereco, observacao |
| `sgp_crm_contrato_cadastro_por_cliente_id` | POST | `/api/crm/cliente/{{cliente_id}}/contratos` | cliente_id | — | json: contrato_id, pop_id, plano_id, vencimento_dia, forma_cobranca_codigo, isento, autocobranca, observacao, vendedor_id, comissao_tipo, comissao, login, senha, email, portador_id, fidelidade_id, nas, central_login, central_senha, ip, ippool_id, mac_dhcp, logins_simult, mac, servicodesc, modoaquisicao, tipo_equipamento_id, midia_id, tecnico_id, os_instalacao, conteudo, instalacao_quantidade_parcelas, instalacao_preco, instalacao_desconto, instalacao_entrada, instalacao_entrada_forma, instalacao_parcela_forma, instalacao_portador, endereco_cobranca, endereco_instalacao, splitter_id, splitter_port, tipo_equipamento |
| `sgp_crm_contrato_cadastro_por_cpfcnpj_cliente` | POST | `/api/crm/cliente/contratos/` | — | cpfcnpj | json: contrato_id, pop_id, plano_id, vencimento_dia, forma_cobranca_codigo, isento, autocobranca, observacao, vendedor_id, comissao_tipo, comissao, login, senha, email, portador_id, fidelidade_id, nas, central_login, central_senha, ip, ippool_id, mac_dhcp, logins_simult, mac, servicodesc, modoaquisicao, tipo_equipamento_id, midia_id, tecnico_id, os_instalacao, conteudo, instalacao_quantidade_parcelas, instalacao_preco, instalacao_desconto, instalacao_entrada, instalacao_entrada_forma, instalacao_parcela_forma, instalacao_portador, endereco_cobranca, endereco_instalacao, splitter_id, splitter_port, tipo_equipamento |
| `sgp_crm_status_crm_alterar_por_cliente_id` | POST | `/api/crm/cliente/{{cliente_id}}/status/` | cliente_id | — | form: status_id, motivo |
| `sgp_crm_status_crm_alterar_por_cliente_cpfcnpj` | POST | `/api/crm/cliente/status/` | — | cpfcnpj | form: status_id, motivo |

## Pré-Cadastro (5)

| Tool | Método | Endpoint | Path | Query | Body |
|---|---|---|---|---|---|
| `sgp_precadastro_plano_listar` | POST | `/api/precadastro/plano/list` | — | — | form: — |
| `sgp_precadastro_vencimento_listar` | POST | `/api/precadastro/vencimento/list` | — | — | form: — |
| `sgp_precadastro_vendedor_listar` | POST | `/api/precadastro/vendedor/list` | — | — | form: — |
| `sgp_precadastro_pre_cadastro_cadastrar_pf` | POST | `/api/precadastro/F` | — | — | form: nome, logradouro, numero, bairro, cidade, uf, cep, complemento, pontoreferencia, condominio, map_ll, pais, datanasc, cpfcnpj, rg, rg_emissor, nomepai, nomemae, nacionalidade, naturalidade, estadocivil, sexo, profissao, observacao, email, celular, portador_id, pop_id, nas_id, plano_id, planointernet_id, planobase_id, vencimento_id, login, senha, central_senha, modoaquisicao, fidelidade_id, contrato_id, ip, mac, splitter_id, splitter_port, servicodesc, tipo_equipamento_id, midia_id, vendedor_id, tecnico_id, os_instalacao, instalacao_quantidade_parcelas, instalacao_preco, instalacao_desconto, instalacao_entrada, instalacao_entrada_forma, instalacao_parcela_forma, ippool_id, mac_dhcp, comissao_tipo, comissao_valor, comissao_qtd_parcelas, usuariocad_id, formacobranca_id, precadastro_ativar |
| `sgp_precadastro_pre_cadastro_cadastrar_pj` | POST | `/api/precadastro/J` | — | — | form: nome, logradouro, numero, bairro, cidade, uf, сер, complemento, pontoreferencia, condominio, map_ll, pais, datanasc, cpfcnpj, nomefantasia, respempresa, respcpf, observacao, email, celular, portador_id, pop_id, nas_id, plano_id, planointernet_id, planobase_id, vencimento_id, login, senha, central_senha, modoaquisicao, fidelidade_id, contrato_id, ip, mac, splitter_id, splitter_port, servicodesc, tipo_equipamento_id, midia_id, vendedor_id, tecnico_id, os_instalacao, instalacao_quantidade_parcelas, instalacao_preco, instalacao_desconto, instalacao_entrada, instalacao_entrada_forma, instalacao_parcela_forma, ippool_id, mac_dhop, comissao_tipo, comissao_valor, comissao_qtd_parcelas, usuariocad_id, formacobranca_id, precadastro_ativar |

## RADIUS (5)

| Tool | Método | Endpoint | Path | Query | Body |
|---|---|---|---|---|---|
| `sgp_radius_login_pppoe_listar` | POST | `/ws/radius/radacct/list/all/` | — | — | form: offset, limit, username, online, host, framedipaddress, callingstationid, nasportid, last_session, cep, logradouro, bairro, cidade, uf, tipopessoa, cpfcnpj, notafiscal, data_inicial, data_final, plano, pop, grupo, nas, ipfixo, tipoconexao, olt, oltslot, pon, calledstationid |
| `sgp_radius_login_pppoe_detalhar_status` | POST | `/ws/radius/service/status/` | — | — | form: incluir_suspensos |
| `sgp_radius_login_pppoe_desconectar` | POST | `/ws/radius/disconnect/` | — | — | form: login |
| `sgp_radius_radius_check_replies` | POST | `/ws/radius/{param}/list/` | param | — | form: — |
| `sgp_radius_radius_log` | GET | `/ws/radius/log/` | — | — | — |

## Ordem de Serviço (26)

| Tool | Método | Endpoint | Path | Query | Body |
|---|---|---|---|---|---|
| `sgp_os_ordens_de_servico` | POST | `/api/os/list/` | — | — | form: filtro_data, agendamento_inicial, agendamento_final, pop_id, contrato_id, cliente_id, status_encerrada, data_finalizacao, orderby |
| `sgp_os_ordem_de_servico_por_id` | POST | `/api/os/list/id/{os_id}` | os_id | — | form: — |
| `sgp_os_ordens_de_servico_total` | POST | `/api/os/list/total/` | — | — | form: filtro_data, agendamento_inicial, agendamento_final, pop_id, contrato_id, cliente_id, status_encerrada, data_finalizacao, orderby |
| `sgp_os_alterar_ordem_de_servico` | POST | `/api/os/update/id/{os_id}/` | os_id | — | form: os_servicoprestado, os_observacao, os_data_alteracao, os_data_finalizacao, checkin_data, assinatura_cliente, assinatura_tecnico, assinatura_contrato, os_status, checkin_latitude, checkin_longitude, classificacao_adicionar, classificacao_remover |
| `sgp_os_ordem_de_servico_a_caminho` | POST | `/api/os/acaminho/id/{os_id}/` | os_id | — | form: — |
| `sgp_os_imprimir_ordem_de_servico` | GET | `/api/os/print/id/{os_id}/` | os_id | — | — |
| `sgp_os_ordem_de_servico_anexar_imagem` | PUT | `/api/os/imagem/id/{os_id}/add/` | os_id | — | form: file, image_base64, descricao |
| `sgp_os_ordem_de_servico_alterar_descricao_da_imagem` | POST | `/api/os/{os_id}/imagem/edit/` | os_id | — | form: arquivo, descricao |
| `sgp_os_ordem_de_servico_imagem` | POST | `/api/os/{os_id}/imagem/detail/` | os_id | — | form: arquivo |
| `sgp_os_ordem_de_servico_imagens` | GET | `/api/os/imagem/id/{os_id}/list/` | os_id | — | — |
| `sgp_os_ordem_de_servico_visualizar_anexo_por_id` | GET | `/api/os/imagem/{anexo_id}` | anexo_id | — | — |
| `sgp_os_ordem_de_servico_remover_imagem` | GET | `/api/os/imagem/{imagem_id}/delete/` | imagem_id | — | — |
| `sgp_os_ordem_de_servico_alterar_servico` | POST | `/api/os/servico/update/id/{os_id}/` | os_id | — | form: set_mac, del_mac, conexao_senha |
| `sgp_os_ordem_de_servico_anotacoes` | POST | `/api/os/anotacoes/list/id/{os_id}/` | os_id | — | form: — |
| `sgp_os_ordem_de_servico_cadastrar_anotacao` | POST | `/api/os/anotacoes/add/id/{os_id}/` | os_id | — | form: anotacao |
| `sgp_os_ordem_de_servico_comentarios_ocorrencia` | POST | `/api/os/ocorrencia/comentario/list/id/{os_id}/` | os_id | — | form: — |
| `sgp_os_ordem_de_servico_cadastrar_comentario_ocorrencia` | POST | `/api/os/ocorrencia/comentario/add/id/{os_id}/` | os_id | — | form: anotacao |
| `sgp_os_ordem_de_servico_checklist` | GET | `/api/os/{os_id}/checklist/list/` | os_id | — | — |
| `sgp_os_ordem_de_servico_marcar_desmarcar_checklist` | POST | `/api/os/checklist/{checklist_id}/toggle/` | checklist_id | — | — |
| `sgp_os_ordem_de_servico_comentarios` | GET | `/api/os/{os_id}/comentario/list/` | os_id | — | — |
| `sgp_os_ordem_de_servico_cadastrar_comentario` | POST | `/api/os/{os_id}/comentario/add/` | os_id | — | — |
| `sgp_os_ordem_de_servico_excluir_comentario` | POST | `/ws/os/{os_id}/comentario/delete/` | os_id | — | — |
| `sgp_os_motivos` | GET | `/api/os/ocorrencia/motivo/list/` | — | — | — |
| `sgp_os_metodos` | GET | `/api/os/ocorrencia/metodo/list/` | — | — | — |
| `sgp_os_tipos` | GET | `/api/os/ocorrencia/tipo/list/` | — | — | — |
| `sgp_os_setores` | GET | `/api/os/ocorrencia/setor/list/` | — | — | — |

## Suporte (9)

| Tool | Método | Endpoint | Path | Query | Body |
|---|---|---|---|---|---|
| `sgp_suporte_servico_alterar` | POST | `/api/suporte/service/update/{servico_id}/` | servico_id | — | form: servico_tipo, action, mac, login, login_password, map_ll, serial, cpemanager, plano_id |
| `sgp_suporte_servico_generico_criar` | POST | `/api/servico/generico` | — | — | form: clientecontrato_id, planobase_id, descricao, identificador_gateway, identificador_gateway_extra, login, senha |
| `sgp_suporte_servico_generico_deletar` | DELETE | `/api/servico/generico/{id}` | id | — | form: clientecontrato_id |
| `sgp_suporte_contratos` | POST | `/api/suporte/contrato/list/` | — | — | form: cliente_nome, cliente_id, contrato_id, servico_login, cliente_cpfcnpj |
| `sgp_suporte_cadastrar_cliente_documento` | PUT | `/api/suporte/cliente/{cliente_id}/documento/add/` | cliente_id | — | form: file, descricao |
| `sgp_suporte_alterar_cliente_documento` | POST | `/api/suporte/cliente/{cliente_id}/documento/edit/` | cliente_id | — | form: arquivo, descricao |
| `sgp_suporte_cliente_documento` | POST | `/api/suporte/cliente/{cliente_id}/documento/detail/` | cliente_id | — | form: arquivo |
| `sgp_suporte_cliente_documentos` | GET | `/api/suporte/cliente/{cliente_id}/documento/list/` | cliente_id | — | — |
| `sgp_suporte_remover_cliente_documento` | GET | `/api/suporte/cliente/{documento_id}/documento/delete/` | documento_id | — | — |

## Outros (1)

| Tool | Método | Endpoint | Path | Query | Body |
|---|---|---|---|---|---|
| `sgp_outros_informacoes_do_usuario` | GET | `/api/auth/info/` | — | — | — |

## Gerenciador CPE (12)

| Tool | Método | Endpoint | Path | Query | Body |
|---|---|---|---|---|---|
| `sgp_cpe_cpe_detalhes` | GET | `/api/cpemanager/servico/{id_servico}/infodetail` | id_servico | — | — |
| `sgp_cpe_cpe_sincronizar_wan` | POST | `/api/cpemanager/servico/{id_servico}/sync/` | id_servico | — | — |
| `sgp_cpe_cpe_importar_wifi` | POST | `/api/cpemanager/servico/{id_servico}/wifi/import/` | id_servico | — | — |
| `sgp_cpe_cpe_definir_wifi` | POST | `/api/cpemanager/servico/{id_servico}/wifi/set/` | id_servico | — | — |
| `sgp_cpe_cpe_configurar_wan` | POST | `/api/cpemanager/servico/{id_servico}/pppoe/` | id_servico | — | — |
| `sgp_cpe_cpe_ping` | POST | `/api/cpemanager/servico/{id_servico}/command/ping/` | id_servico | — | — |
| `sgp_cpe_cpe_speedtest` | POST | `/api/cpemanager/servico/{id_servico}/command/speedtest/` | id_servico | — | — |
| `sgp_cpe_cpe_remover_dados_do_sgp` | POST | `/api/cpemanager/servico/{id_servico}/command/clear/` | id_servico | — | — |
| `sgp_cpe_cpe_reboot` | POST | `/api/cpemanager/servico/{id_servico}/command/boot/` | id_servico | — | — |
| `sgp_cpe_cpe_wifi_list` | GET | `/api/cpemanager/servico/{id_servico}/wifi/list/` | id_servico | — | — |
| `sgp_cpe_cpe_atualizar_dados_wifi` | POST | `/api/cpemanager/servico/{id_servico}/wifi/update/` | id_servico | — | json: 1-1_ssid, 1-1_frequency, 1-1_password, 1-1_enabled |
| `sgp_cpe_cpe_atualizar_campo` | POST | `/api/cpemanager/servico/{id_servico}/update/field/` | id_servico | param, value | form: — |

