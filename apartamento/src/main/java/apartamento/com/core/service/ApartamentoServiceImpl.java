package apartamento.com.core.service;

import apartamento.com.common.http.dto.apartamento.ApartamentoFilter;
import apartamento.com.common.http.dto.apartamento.ApartamentoPost;
import apartamento.com.common.http.dto.apartamento.ApartamentoPut;
import apartamento.com.common.http.dto.apartamento.ApartamentoResponse;
import apartamento.com.common.mapper.ApartamentoMapper;
import apartamento.com.common.utils.Messages;
import apartamento.com.core.entity.Apartamento;
import apartamento.com.core.entity.Predio;
import apartamento.com.core.service.impl.ApartamentoService;
import apartamento.com.gateway.client.kitnet.ApartamentoClient;
import apartamento.com.gateway.client.kitnet.PredioClient;
import apartamento.com.web.handler.BusinnesException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class ApartamentoServiceImpl implements ApartamentoService {

    private final PredioClient predioClient;

    private final ApartamentoClient apartamentoClient;

    private final ApartamentoMapper apartamentoMapper;

    public ApartamentoServiceImpl(PredioClient predioClient, ApartamentoClient apartamentoClient, ApartamentoMapper apartamentoMapper) {
        this.predioClient = predioClient;
        this.apartamentoClient = apartamentoClient;
        this.apartamentoMapper = apartamentoMapper;
    }

    public ApartamentoResponse create(ApartamentoPost apartamentoPost) {
        Apartamento apartamento = apartamentoMapper.toApartamento(apartamentoPost);
        setPredioToPost(apartamentoPost, apartamento);
        Apartamento apartamentoSalvo = apartamentoClient.create(apartamento);
        ApartamentoResponse apartamentoResponse = apartamentoMapper.toApartamentoResponse(apartamentoSalvo);
        return apartamentoResponse;
    }

    @Override
    public List<ApartamentoResponse> findAll() {
        List<Apartamento> apartamentos = apartamentoClient.findAll();
        List<ApartamentoResponse> apartamentoResponses = apartamentoMapper.toListApartamentoResponse(apartamentos);
        return apartamentoResponses;
    }

    @Override
    public void remove(Long id) {
        apartamentoClient.delete(id);
    }

    @Override
    public ApartamentoResponse findById(Long id) throws BusinnesException {
        Apartamento apartamento = apartamentoClient.findById(id)
                .orElseThrow(() -> new BusinnesException(
                        Messages.MSG_RECURSO_NAO_ENCONTRADO.concat(" id: ").concat(id.toString())));
        return apartamentoMapper.toApartamentoResponse(apartamento);
    }

    @Override
    public ApartamentoResponse update(ApartamentoPut apartamentoPut, Long id) {
        Apartamento apartamentoSave = apartamentoClient.findById(id)
                .orElseThrow(() -> new BusinnesException(
                        Messages.MSG_RECURSO_NAO_ENCONTRADO.concat(" id: ").concat(id.toString())));

        if(Objects.nonNull(apartamentoSave.getPredio()) && Objects.nonNull(apartamentoSave.getPredio().getId())
                && Objects.nonNull(apartamentoPut.predio()) && Objects.nonNull(apartamentoPut.predio().getId())) {

            if(!Objects.equals(apartamentoSave.getPredio().getId(), apartamentoPut.predio().getId())){
                setPredioToPut(apartamentoPut, apartamentoSave);
            }
        }

        Apartamento apartamento = apartamentoMapper.toApartamento(apartamentoSave, apartamentoPut);
        ApartamentoResponse apartamentoResponse = apartamentoMapper.toApartamentoResponse(apartamentoClient.update(apartamento));
        return apartamentoResponse;
    }

    @Override
    public Page<ApartamentoResponse> filter(ApartamentoFilter apartamentoFilter, Pageable pageable) {
        Page<Apartamento> apartamentoPage = apartamentoClient.filter(apartamentoFilter, pageable);
        Page<ApartamentoResponse> apartamentoResponse = apartamentoMapper.toPageApartamentoResponse(apartamentoPage);
        return apartamentoResponse;
    }

    private void setPredioToPost(ApartamentoPost apartamentoPost, Apartamento apartamento) {
        Optional<Predio> predio = predioClient.findById(apartamentoPost.predio().getId());
        apartamento.setPredio(predio.get());
    }

    private void setPredioToPut(ApartamentoPut apartamentoPut, Apartamento apartamento) {
        Optional<Predio> predio = predioClient.findById(apartamentoPut.predio().getId());
        apartamento.setPredio(predio.get());
    }

}
