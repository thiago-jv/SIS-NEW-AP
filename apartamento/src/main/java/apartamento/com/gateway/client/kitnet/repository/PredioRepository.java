package apartamento.com.gateway.client.kitnet.repository;

import apartamento.com.core.entity.Predio;
import apartamento.com.gateway.client.kitnet.repository.predio.PredioRepositoryQuery;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PredioRepository extends JpaRepository<Predio, Long>, PredioRepositoryQuery {
}
