package apartamento.com.core.service.security;

import apartamento.com.common.http.dto.security.ClientePost;
import apartamento.com.common.http.dto.security.ClienteResponse;
import apartamento.com.common.mapper.ClienteMapper;
import apartamento.com.common.utils.Messages;
import apartamento.com.core.entity.security.Cliente;
import apartamento.com.core.service.impl.ClienteService;
import apartamento.com.gateway.client.kitnet.ClienteClient;
import apartamento.com.web.handler.BusinnesException;
import org.springframework.stereotype.Service;

@Service
public class ClienteServiceImpl implements ClienteService {

    private final ClienteClient clienteClient;

    private final ClienteMapper clienteMapper;

    public ClienteServiceImpl(ClienteClient clienteClient, ClienteMapper clienteMapper) {
        this.clienteClient = clienteClient;
        this.clienteMapper = clienteMapper;
    }

    @Override
    public ClienteResponse findByClientId(String clientId) {
        Cliente cliente = clienteClient.findByClientId(clientId)
                .orElseThrow(() -> new BusinnesException(
                        Messages.MSG_RECURSO_NAO_ENCONTRADO
                                .concat(" clientId: ").concat(clientId)));
        return clienteMapper.toClienteResponse(cliente);
    }

    @Override
    public ClienteResponse create(ClientePost clientePost) {
        Cliente cliente = clienteMapper.toCliente(clientePost);
        Cliente clienteSalvo = clienteClient.create(cliente);
        ClienteResponse clienteResponse = clienteMapper.toClienteResponse(clienteSalvo);
        return clienteResponse;
    }

}
