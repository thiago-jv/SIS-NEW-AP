package apartamento.com.core.service.security;

import apartamento.com.common.http.dto.security.UsuarioPost;
import apartamento.com.common.http.dto.security.UsuarioResponse;
import apartamento.com.common.mapper.UsuarioMapper;
import apartamento.com.common.utils.Messages;
import apartamento.com.core.entity.security.Usuario;
import apartamento.com.core.service.impl.UsuarioService;
import apartamento.com.gateway.client.kitnet.UsuarioClient;
import apartamento.com.web.handler.BusinnesException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UsuarioServiceImpl implements UsuarioService {

    private final UsuarioClient usuarioClient;
    private final PasswordEncoder encoder;
    private final UsuarioMapper usuarioMapper;

    public UsuarioServiceImpl(UsuarioClient usuarioClient, PasswordEncoder encoder, UsuarioMapper usuarioMapper) {
        this.usuarioClient = usuarioClient;
        this.encoder = encoder;
        this.usuarioMapper = usuarioMapper;
    }

    @Override
    public UsuarioResponse findByEmail(String email) {
        Usuario usuario = usuarioClient.findByEmail(email)
                .orElseThrow(() -> new BusinnesException(
                        Messages.MSG_RECURSO_NAO_ENCONTRADO.concat(" email: ").concat(email)));
        return usuarioMapper.toUsuarioResponse(usuario);
    }

    @Override
    public void create(UsuarioPost usuarioPost) {
        Usuario usuario = usuarioMapper.toUsuario(usuarioPost);
        usuario.setSenha(encoder.encode(usuario.getSenha()));
        usuarioClient.create(usuario);

    }
}
