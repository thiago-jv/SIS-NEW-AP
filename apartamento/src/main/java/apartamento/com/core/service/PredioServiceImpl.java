package apartamento.com.core.service;

import apartamento.com.common.http.dto.predio.PredioFilter;
import apartamento.com.common.http.dto.predio.PredioPost;
import apartamento.com.common.http.dto.predio.PredioPut;
import apartamento.com.common.http.dto.predio.PredioResponse;
import apartamento.com.common.mapper.PredioMapper;
import apartamento.com.common.utils.Messages;
import apartamento.com.core.entity.Predio;
import apartamento.com.core.service.impl.PredioService;
import apartamento.com.gateway.client.kitnet.PredioClient;
import apartamento.com.web.handler.BusinnesException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PredioServiceImpl implements PredioService {

    private final PredioClient predioClient;

    private final PredioMapper predioMapper;

    public PredioServiceImpl(PredioClient predioClient, PredioMapper predioMapper) {
        this.predioClient = predioClient;
        this.predioMapper = predioMapper;
    }

    public PredioResponse create(PredioPost predioPost) {
        Predio predio = predioMapper.toPredio(predioPost);
        Predio predioSalvo = predioClient.create(predio);
        PredioResponse predioResponse = predioMapper.toPredioResponse(predioSalvo);
        return predioResponse;
    }

    @Override
    public List<PredioResponse> findAll() {
        List<Predio> diarios = predioClient.findAll();
        List<PredioResponse> predioResponse = predioMapper.toListPredioResponse(diarios);
        return predioResponse;
    }

    @Override
    public void remove(Long id) {
        predioClient.delete(id);
    }

    @Override
    public PredioResponse findById(Long id) throws BusinnesException {
        Predio predio = predioClient.findById(id)
                .orElseThrow(() -> new BusinnesException(
                        Messages.MSG_RECURSO_NAO_ENCONTRADO.concat(" id: ").concat(id.toString())));
        return predioMapper.toPredioResponse(predio);
    }

    @Override
    public PredioResponse update(PredioPut predioPut, Long id) {
        Predio predioSave = predioClient.findById(id)
                .orElseThrow(() -> new BusinnesException(
                        Messages.MSG_RECURSO_NAO_ENCONTRADO.concat(" id: ").concat(id.toString())));

        Predio predio = predioMapper.toPredio(predioSave, predioPut);
        PredioResponse predioResponse = predioMapper.toPredioResponse(predioClient.update(predio));
        return predioResponse;
    }

    @Override
    public Page<PredioResponse> filter(PredioFilter predioFilter, Pageable pageable) {
        Page<Predio> predioPage = predioClient.filter(predioFilter, pageable);
        Page<PredioResponse> predioResponse = predioMapper.toPagePredioResponse(predioPage);
        return predioResponse;
    }
}
