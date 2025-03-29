package apartamento.com.common.http.dto.inquilino;

public record InquilinoPut(Long id, String nome, String nomeAbreviado,
                           String email, String contato, String status,
                           String genero, String cpf) { }
