package apartamento.com.common.mapper;

import apartamento.com.common.http.dto.security.UsuarioPost;
import apartamento.com.common.http.dto.security.UsuarioResponse;
import apartamento.com.core.entity.security.Usuario;
import org.springframework.stereotype.Component;

@Component
public class UsuarioMapper {

    public Usuario toUsuario(UsuarioPost usuarioPost) {
        return new Usuario(usuarioPost.nome(), usuarioPost.email(), usuarioPost.senha(), usuarioPost.roles());
    }

    public UsuarioResponse toUsuarioResponse(Usuario usuario) {
        return new UsuarioResponse(usuario.getId(), usuario.getNome(), usuario.getEmail(),
                usuario.getSenha(), usuario.getRoles());
    }

}
