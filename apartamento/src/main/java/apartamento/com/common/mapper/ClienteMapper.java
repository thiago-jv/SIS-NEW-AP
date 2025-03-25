package apartamento.com.common.mapper;

import apartamento.com.common.http.dto.security.ClientePost;
import apartamento.com.common.http.dto.security.ClienteResponse;
import apartamento.com.core.entity.security.Cliente;
import org.springframework.stereotype.Component;

@Component
public class ClienteMapper {

    public ClienteResponse toClienteResponse(Cliente cliente) {
        return new ClienteResponse(cliente.getId(), cliente.getClientId(), cliente.getClientSecret()
        , cliente.getRedirectURI(), cliente.getScope());
    }

    public Cliente toCliente(ClientePost clientePost) {
        return new Cliente(clientePost.clientId(), clientePost.clientSecret()
                , clientePost.redirectURI(), clientePost.scope());
    }

}
