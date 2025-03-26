package apartamento.com.core.service.impl;

import apartamento.com.common.http.dto.apartamento.ApartamentoFilter;
import apartamento.com.common.http.dto.apartamento.ApartamentoPost;
import apartamento.com.common.http.dto.apartamento.ApartamentoPut;
import apartamento.com.common.http.dto.apartamento.ApartamentoResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import java.util.List;

public interface ApartamentoService {

    ApartamentoResponse create(ApartamentoPost apartamentoPost);

    List<ApartamentoResponse> findAll();

    void remove(Long id);

    ApartamentoResponse findById(Long id);

    ApartamentoResponse update(ApartamentoPut apartamentoPut, Long id);

    Page<ApartamentoResponse> filter(ApartamentoFilter apartamentoFilter, Pageable pageable);

}
