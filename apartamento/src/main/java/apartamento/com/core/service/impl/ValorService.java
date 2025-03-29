package apartamento.com.core.service.impl;

import apartamento.com.common.http.dto.valor.ValorPost;
import apartamento.com.common.http.dto.valor.ValorPut;
import apartamento.com.common.http.dto.valor.ValorResponse;

import java.util.List;

public interface ValorService {

    ValorResponse create(ValorPost valorPost);

    List<ValorResponse> findAll();

    void remove(Long id);

    ValorResponse findById(Long id) throws Exception;

    ValorResponse update(ValorPut valorPut, Long id);

}
