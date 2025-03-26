package apartamento.com.common.mapper;

import apartamento.com.common.http.dto.apartamento.ApartamentoPost;
import apartamento.com.common.http.dto.apartamento.ApartamentoPut;
import apartamento.com.common.http.dto.apartamento.ApartamentoResponse;
import apartamento.com.common.http.dto.predio.PredioResponse;
import apartamento.com.core.entity.Apartamento;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class ApartamentoMapper {

    public ApartamentoResponse toApartamentoResponse(Apartamento apartamento) {
        return new ApartamentoResponse(apartamento.getId(), apartamento.getNumeroApartamento(),
                apartamento.getDescricao(), apartamento.getMedidor(), apartamento.getStatusApartamento(),
                new PredioResponse(apartamento.getPredio().getId(), apartamento.getPredio().getDescricao()));
    }

    public Apartamento toApartamento(ApartamentoPost apartamentoPost) {
        Apartamento apartamento = new Apartamento();
        apartamento.setNumeroApartamento(apartamentoPost.numeroApartamento());
        apartamento.setDescricao(apartamentoPost.descricao());
        apartamento.setMedidor(apartamentoPost.medidor());
        apartamento.setStatusApartamento(apartamentoPost.statusApartamento());
        return apartamento;
    }

    public List<ApartamentoResponse> toListApartamentoResponse(List<Apartamento> apartamentos) {
        return apartamentos.stream()
                .map(apartamento -> new ApartamentoResponse(apartamento.getId(), apartamento.getNumeroApartamento(),
                        apartamento.getDescricao(), apartamento.getMedidor(), apartamento.getStatusApartamento(),
                        new PredioResponse(apartamento.getId(), apartamento.getDescricao())))
                .collect(Collectors.toList());
    }

    public Apartamento toApartamento(Apartamento apartamentoSave, ApartamentoPut apartamentoPut) {
        apartamentoSave.setNumeroApartamento(apartamentoPut.numeroApartamento());
        apartamentoSave.setDescricao(apartamentoPut.descricao());
        apartamentoSave.setMedidor(apartamentoPut.medidor());
        apartamentoSave.setStatusApartamento(apartamentoPut.statusApartamento());
        return apartamentoSave;
    }

    public Page<ApartamentoResponse> toPageApartamentoResponse(Page<Apartamento> apartamentoPage) {
        List<ApartamentoResponse> content = apartamentoPage.getContent().stream()
                .map(this::toApartamentoResponse)
                .collect(Collectors.toList());
        return new PageImpl<>(content, apartamentoPage.getPageable(), apartamentoPage.getTotalElements());
    }

}
