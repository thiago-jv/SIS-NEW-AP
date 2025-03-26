package apartamento.com.core.service.impl;

import apartamento.com.common.http.dto.diario.DiarioFilter;
import apartamento.com.common.http.dto.diario.DiarioPost;
import apartamento.com.common.http.dto.diario.DiarioPut;
import apartamento.com.common.http.dto.diario.DiarioResponse;
import apartamento.com.common.http.dto.predio.PredioFilter;
import apartamento.com.common.http.dto.predio.PredioPost;
import apartamento.com.common.http.dto.predio.PredioPut;
import apartamento.com.common.http.dto.predio.PredioResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface PredioService {

    PredioResponse create(PredioPost predioPost);

    List<PredioResponse> findAll();

    void remove(Long id);

    PredioResponse findById(Long id) throws Exception;

    PredioResponse update(PredioPut predioPut, Long id);

    Page<PredioResponse> filter(PredioFilter predioFilter, Pageable pageable);
}
