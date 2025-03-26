package apartamento.com.gateway.client.kitnet.repository;

import apartamento.com.core.entity.Apartamento;
import apartamento.com.gateway.client.kitnet.repository.apartamento.ApartamentoRepositoryQuery;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ApartamentoRepository extends JpaRepository<Apartamento, Long>, ApartamentoRepositoryQuery {
}
