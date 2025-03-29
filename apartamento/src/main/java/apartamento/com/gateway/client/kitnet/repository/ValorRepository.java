package apartamento.com.gateway.client.kitnet.repository;

import apartamento.com.core.entity.Valor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ValorRepository extends JpaRepository<Valor, Long> {
}
