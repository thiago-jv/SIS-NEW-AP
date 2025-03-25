package apartamento.com.common.http.dto.security;

import java.util.List;

public record UsuarioResponse(Long id, String nome, String email, String senha, List<String> roles) {}