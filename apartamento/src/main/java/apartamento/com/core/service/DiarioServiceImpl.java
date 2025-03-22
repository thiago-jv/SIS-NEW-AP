package apartamento.com.core.service;

import apartamento.com.common.http.dto.diario.DiarioFilter;
import apartamento.com.common.http.dto.diario.DiarioPost;
import apartamento.com.common.http.dto.diario.DiarioPut;
import apartamento.com.common.http.dto.diario.DiarioResponse;
import apartamento.com.common.mapper.DiarioMapper;
import apartamento.com.common.utils.Messages;
import apartamento.com.core.entity.Diario;
import apartamento.com.core.service.impl.DiarioService;
import apartamento.com.gateway.client.kitnet.DiarioClient;
import apartamento.com.web.handler.BusinnesException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DiarioServiceImpl implements DiarioService {

    private final DiarioClient diarioClient;

    private final DiarioMapper diarioMapper;

    public DiarioServiceImpl(DiarioClient diarioClient, DiarioMapper diarioMapper) {
        this.diarioClient = diarioClient;
        this.diarioMapper = diarioMapper;
    }

    public DiarioResponse create(DiarioPost diarioPost) {
        Diario diario = diarioMapper.toDiario(diarioPost);
        Diario diarioSalvo = diarioClient.create(diario);
        DiarioResponse diarioResponse = diarioMapper.toDiarioResponse(diarioSalvo);
        return diarioResponse;
    }

    @Override
    public List<DiarioResponse> findAll() {
        List<Diario> diarios = diarioClient.findAll();
        List<DiarioResponse> diarioResponse = diarioMapper.toListDiarioResponse(diarios);
        return diarioResponse;
    }

    @Override
    public void remove(Long id) {
        diarioClient.delete(id);
    }

    @Override
    public DiarioResponse findById(Long id) throws BusinnesException {
        Diario diario = diarioClient.findById(id)
                .orElseThrow(() -> new BusinnesException(
                        Messages.MSG_RECURSO_NAO_ENCONTRADO.concat(" id: ").concat(id.toString())));
        return diarioMapper.toDiarioResponse(diario);
    }

    @Override
    public DiarioResponse update(DiarioPut diarioPut, Long id) {
        Diario diarioSave = diarioClient.findById(id)
                .orElseThrow(() -> new BusinnesException(
                        Messages.MSG_RECURSO_NAO_ENCONTRADO.concat(" id: ").concat(id.toString())));

        Diario diario = diarioMapper.toDiario(diarioSave, diarioPut);
        DiarioResponse diarioResponse = diarioMapper.toDiarioResponse(diarioClient.update(diario));
        return diarioResponse;
    }

    @Override
    public Page<DiarioResponse> filter(DiarioFilter diarioFilter, Pageable pageable) {
        Page<Diario> diarioPage = diarioClient.filter(diarioFilter, pageable);
        Page<DiarioResponse> diarioResponsePage = diarioMapper.toPageDiarioResponse(diarioPage);
        return diarioResponsePage;
    }

}
