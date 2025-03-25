package apartamento.com.gateway.client.kitnet.repository;

import apartamento.com.core.entity.security.Cliente;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ClienteRepository extends JpaRepository<Cliente, Long> {

    Optional<Cliente> findByClientId(String clientId);
}
