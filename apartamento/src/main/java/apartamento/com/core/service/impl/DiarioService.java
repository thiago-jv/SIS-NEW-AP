package apartamento.com.core.service.impl;

import apartamento.com.common.http.dto.diario.DiarioPost;
import apartamento.com.common.http.dto.diario.DiarioPut;
import apartamento.com.common.http.dto.diario.DiarioResponse;
import apartamento.com.common.mapper.DiarioMapper;
import apartamento.com.core.entity.Diario;
import apartamento.com.gateway.client.kitnet.DiarioClient;
import org.springframework.stereotype.Service;

import java.util.List;

public interface DiarioService {

    DiarioResponse create(DiarioPost diarioPost);

    List<DiarioResponse> findAll();

    void remove(Long id);

    DiarioResponse findById(Long id) throws Exception;

    DiarioResponse update(DiarioPut diarioPut, Long id);

}
