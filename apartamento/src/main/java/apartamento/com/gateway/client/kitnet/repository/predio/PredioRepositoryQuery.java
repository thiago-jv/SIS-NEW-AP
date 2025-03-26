package apartamento.com.gateway.client.kitnet.repository.predio;

import apartamento.com.common.http.dto.predio.PredioFilter;
import apartamento.com.core.entity.Predio;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface PredioRepositoryQuery {
	
	Page<Predio> filter(PredioFilter predioFilter, Pageable pageable);

}
