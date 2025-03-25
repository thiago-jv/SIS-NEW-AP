package apartamento.com.gateway.client.kitnet;

import apartamento.com.core.entity.Diario;
import apartamento.com.core.entity.security.Usuario;
import apartamento.com.gateway.client.kitnet.repository.UsuarioRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UsuarioClient {

    private final UsuarioRepository usuarioRepository;

    public UsuarioClient(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }

    public void create(Usuario usuario) {
        usuarioRepository.save(usuario);
    }

    public Optional<Usuario> findByEmail(String email) {
        Optional<Usuario> usuario = usuarioRepository.findByEmail(email);
        return usuario;
    }

}
