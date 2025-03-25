package apartamento.com.web.http;

import apartamento.com.common.http.dto.security.UsuarioPost;
import apartamento.com.core.service.impl.UsuarioService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("usuarios")
public class UsuarioResource {

    private final UsuarioService usuarioService;

    public UsuarioResource(UsuarioService usuarioService) {
        this.usuarioService = usuarioService;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public void create(@RequestBody UsuarioPost usuarioPost) {
        usuarioService.create(usuarioPost);
    }
}
