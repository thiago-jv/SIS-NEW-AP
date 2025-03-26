package apartamento.com.common.http.dto.predio;

public record PredioPut(Long id, String descricao, String cep, String logradouro,
                        String complemento, String bairro, String uf, String localidade,
                        String numero) { }
