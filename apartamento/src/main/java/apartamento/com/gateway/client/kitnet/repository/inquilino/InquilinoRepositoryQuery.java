package apartamento.com.gateway.client.kitnet.repository.inquilino;

import apartamento.com.common.http.dto.inquilino.InquilinoFilter;
import apartamento.com.core.entity.Inquilino;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface InquilinoRepositoryQuery {
	
	Page<Inquilino> filter(InquilinoFilter inquilinoFilter, Pageable pageable);

}
