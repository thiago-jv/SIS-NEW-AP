package apartamento.com.gateway.client.kitnet.repository.diario;

import apartamento.com.common.http.dto.diario.DiarioFilter;
import apartamento.com.core.entity.Diario;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface DiarioRepositoryQuery {
	
	Page<Diario> filter(DiarioFilter diarioFilter, Pageable pageable);

}
