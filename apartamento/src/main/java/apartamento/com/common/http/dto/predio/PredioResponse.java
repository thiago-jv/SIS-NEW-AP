package apartamento.com.common.http.dto.predio;

import com.fasterxml.jackson.annotation.JsonInclude;

@JsonInclude(JsonInclude.Include.NON_NULL)
public class PredioResponse{

    private Long id;
    private String descricao;
    private String cep;
    private String logradouro;
    private String complemento;
    private String bairro;
    private String uf;
    private String localidade;
    private String numero;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public String getCep() {
        return cep;
    }

    public void setCep(String cep) {
        this.cep = cep;
    }

    public String getLogradouro() {
        return logradouro;
    }

    public void setLogradouro(String logradouro) {
        this.logradouro = logradouro;
    }

    public String getComplemento() {
        return complemento;
    }

    public void setComplemento(String complemento) {
        this.complemento = complemento;
    }

    public String getBairro() {
        return bairro;
    }

    public void setBairro(String bairro) {
        this.bairro = bairro;
    }

    public String getUf() {
        return uf;
    }

    public void setUf(String uf) {
        this.uf = uf;
    }

    public String getLocalidade() {
        return localidade;
    }

    public void setLocalidade(String localidade) {
        this.localidade = localidade;
    }

    public String getNumero() {
        return numero;
    }

    public void setNumero(String numero) {
        this.numero = numero;
    }

    public PredioResponse() {
    }

    public PredioResponse(Long id, String descricao, String cep, String logradouro, String complemento, String bairro, String uf, String localidade, String numero) {
        this.id = id;
        this.descricao = descricao;
        this.cep = cep;
        this.logradouro = logradouro;
        this.complemento = complemento;
        this.bairro = bairro;
        this.uf = uf;
        this.localidade = localidade;
        this.numero = numero;
    }

    public PredioResponse(Long id, String descricao) {
        this.id = id;
        this.descricao = descricao;
    }
}
