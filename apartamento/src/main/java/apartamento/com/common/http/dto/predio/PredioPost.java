package apartamento.com.common.http.dto.predio;

public record PredioPost(String descricao, String cep, String logradouro,
                         String complemento, String bairro, String uf, String localidade,
                         String numero) { }