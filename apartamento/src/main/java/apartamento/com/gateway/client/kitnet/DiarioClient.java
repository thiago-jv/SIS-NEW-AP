package apartamento.com.gateway.client.kitnet;

import apartamento.com.common.http.dto.diario.DiarioResponse;
import apartamento.com.common.mapper.DiarioMapper;
import apartamento.com.core.entity.Diario;
import apartamento.com.gateway.client.kitnet.repository.DiarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DiarioClient {

    private final DiarioRepository diarioRepository;

    private final DiarioMapper diarioMapper;

    public DiarioClient(DiarioRepository diarioRepository, DiarioMapper diarioMapper) {
        this.diarioRepository = diarioRepository;
        this.diarioMapper = diarioMapper;
    }

    public DiarioResponse create(Diario diario) {
        Diario diarioSalvo = diarioRepository.save(diario);
        DiarioResponse diarioResponse = diarioMapper.toDiarioResponse(diarioSalvo);
        return diarioResponse;


    }
}
