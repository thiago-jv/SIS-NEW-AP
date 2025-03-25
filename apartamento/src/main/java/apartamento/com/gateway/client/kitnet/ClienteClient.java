package apartamento.com.gateway.client.kitnet;

import apartamento.com.core.entity.security.Cliente;
import apartamento.com.gateway.client.kitnet.repository.ClienteRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ClienteClient {

    private final ClienteRepository clienteRepository;

    public ClienteClient(ClienteRepository clienteRepository) {
        this.clienteRepository = clienteRepository;
    }

    public Cliente create(Cliente cliente){
        return clienteRepository.save(cliente);
    }

    public Optional<Cliente> findByClientId(String clientId) {
        Optional<Cliente> cliente = clienteRepository.findByClientId(clientId);
        return cliente;
    }
}
