package apartamento.com.common.mapper;

import apartamento.com.common.http.dto.predio.PredioPost;
import apartamento.com.common.http.dto.predio.PredioPut;
import apartamento.com.common.http.dto.predio.PredioResponse;
import apartamento.com.core.entity.Predio;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class PredioMapper {

    public PredioResponse toPredioResponse(Predio predio) {
        return new PredioResponse(predio.getId(), predio.getDescricao(), predio.getCep()
                , predio.getLogradouro(), predio.getComplemento(), predio.getBairro(),
                predio.getUf(), predio.getLocalidade(), predio.getNumero());
    }

    public Predio toPredio(PredioPost predioPost) {
        Predio predio = new Predio();
        predio.setDescricao(predioPost.descricao());
        predio.setCep(predioPost.cep());
        predio.setLogradouro(predioPost.logradouro());
        predio.setComplemento(predioPost.complemento());
        predio.setBairro(predioPost.bairro());
        predio.setUf(predioPost.uf());
        predio.setLocalidade(predioPost.localidade());
        predio.setNumero(predioPost.numero());
        return predio;
    }

    public List<PredioResponse> toListPredioResponse(List<Predio> predios) {
        return predios.stream()
                .map(diario -> new PredioResponse(diario.getId(),
                        diario.getDescricao(), diario.getCep(), diario.getLogradouro(),
                        diario.getComplemento(), diario.getBairro(), diario.getUf(),
                        diario.getLocalidade(), diario.getNumero()))
                .collect(Collectors.toList());
    }

    public Predio toPredio(Predio diarioSave, PredioPut diarioPut) {
        diarioSave.setDescricao(diarioPut.descricao());
        diarioSave.setCep(diarioPut.cep());
        diarioSave.setLogradouro(diarioPut.logradouro());
        diarioSave.setComplemento(diarioPut.complemento());
        diarioSave.setBairro(diarioPut.bairro());
        diarioSave.setUf(diarioPut.uf());
        diarioSave.setLocalidade(diarioPut.localidade());
        diarioSave.setNumero(diarioPut.numero());
        return diarioSave;
    }

    public Page<PredioResponse> toPagePredioResponse(Page<Predio> predioPage) {
        List<PredioResponse> content = predioPage.getContent().stream()
                .map(this::toPredioResponse)
                .collect(Collectors.toList());
        return new PageImpl<>(content, predioPage.getPageable(), predioPage.getTotalElements());
    }

}
