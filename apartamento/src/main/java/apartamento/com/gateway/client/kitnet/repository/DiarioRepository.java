package apartamento.com.gateway.client.kitnet.repository;

import apartamento.com.core.entity.Diario;
import apartamento.com.gateway.client.kitnet.repository.diario.DiarioRepositoryQuery;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DiarioRepository extends JpaRepository<Diario, Long>, DiarioRepositoryQuery {

}
