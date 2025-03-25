package apartamento.com.web.http;

import apartamento.com.common.http.dto.security.ClientePost;
import apartamento.com.common.http.dto.security.ClienteResponse;
import apartamento.com.core.service.impl.ClienteService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("clientes")
public class ClienteResource {

    private final ClienteService clienteService;

    public ClienteResource(ClienteService clienteService) {
        this.clienteService = clienteService;
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ClienteResponse> create(@RequestBody ClientePost clientePost) {
        return ResponseEntity.status(HttpStatus.CREATED).body(clienteService.create(clientePost));

    }
}
