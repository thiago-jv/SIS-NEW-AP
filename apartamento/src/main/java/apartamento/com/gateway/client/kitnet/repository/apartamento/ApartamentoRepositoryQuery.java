package apartamento.com.gateway.client.kitnet.repository.apartamento;

import apartamento.com.common.http.dto.apartamento.ApartamentoFilter;
import apartamento.com.core.entity.Apartamento;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface ApartamentoRepositoryQuery {
	
	Page<Apartamento> filter(ApartamentoFilter apartamentoFilter, Pageable pageable);

}
