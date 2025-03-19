package apartamento.com.core.service;

import apartamento.com.common.http.dto.diario.DiarioPost;
import apartamento.com.common.http.dto.diario.DiarioResponse;
import apartamento.com.common.mapper.DiarioMapper;
import apartamento.com.core.entity.Diario;
import apartamento.com.core.service.impl.DiarioService;
import apartamento.com.gateway.client.kitnet.DiarioClient;
import org.springframework.stereotype.Service;

@Service
public class DiarioServiceImpl implements DiarioService {

    private final DiarioClient diarioClient;

    private final DiarioMapper diarioMapper;

    public DiarioServiceImpl(DiarioClient diarioClient, DiarioMapper diarioMapper) {
        this.diarioClient = diarioClient;
        this.diarioMapper = diarioMapper;
    }

    public DiarioResponse create(DiarioPost diarioPost){
        Diario diario = diarioMapper.toDiario(diarioPost);
        return diarioClient.create(diario);
    }


}
