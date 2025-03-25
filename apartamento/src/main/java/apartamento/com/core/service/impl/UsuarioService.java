package apartamento.com.core.service.impl;

import apartamento.com.common.http.dto.security.UsuarioPost;
import apartamento.com.common.http.dto.security.UsuarioResponse;

public interface UsuarioService {

    UsuarioResponse findByEmail(String email);

    void create(UsuarioPost usuarioPost);

}
