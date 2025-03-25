package apartamento.com.core.service.impl;

import apartamento.com.common.http.dto.security.ClientePost;
import apartamento.com.common.http.dto.security.ClienteResponse;

public interface ClienteService {

    ClienteResponse findByClientId(String clientId);

    ClienteResponse create(ClientePost clientePost);
}
