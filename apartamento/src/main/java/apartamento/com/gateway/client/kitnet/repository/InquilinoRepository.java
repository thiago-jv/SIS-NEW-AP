package apartamento.com.gateway.client.kitnet.repository;

import apartamento.com.core.entity.Inquilino;
import apartamento.com.gateway.client.kitnet.repository.inquilino.InquilinoRepositoryQuery;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface InquilinoRepository extends JpaRepository<Inquilino, Long>, InquilinoRepositoryQuery {
}
