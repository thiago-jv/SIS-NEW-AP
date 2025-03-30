package apartamento.com.core.service.security;

import apartamento.com.common.http.dto.security.UsuarioResponse;
import apartamento.com.core.service.impl.UsuarioService;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

public class CustomUserDetailsService implements UserDetailsService {

    private final UsuarioService usuarioService;

    public CustomUserDetailsService(UsuarioService usuarioService) {
        this.usuarioService = usuarioService;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        UsuarioResponse usuario = usuarioService.findByEmail(email);

        if(usuario == null){
            throw new UsernameNotFoundException("Usuario não encontrado");
        }
        return User.builder()
                .username(usuario.email())
                .password(usuario.senha())
                .roles(usuario.roles().toArray(new String[usuario.roles().size()]))
                .build();
    }
}
