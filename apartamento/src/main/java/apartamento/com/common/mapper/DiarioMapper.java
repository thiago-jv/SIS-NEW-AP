package apartamento.com.common.mapper;

import apartamento.com.common.http.dto.diario.DiarioPost;
import apartamento.com.common.http.dto.diario.DiarioPut;
import apartamento.com.common.http.dto.diario.DiarioResponse;
import apartamento.com.core.entity.Diario;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class DiarioMapper {

    public DiarioResponse toDiarioResponse(Diario diario) {
        return new DiarioResponse(diario.getId(), diario.getDescricao(), diario.getDataEntrada());
    }

    public Diario toDiario(DiarioPost diarioPost) {
        Diario diario = new Diario();
        diario.setDescricao(diarioPost.descricao());
        diario.setDataEntrada(diarioPost.dataRegistro());
        return diario;
    }

    public List<DiarioResponse> toListDiarioResponse(List<Diario> diarios) {
        return diarios.stream()
                .map(diario -> new DiarioResponse(diario.getId(),
                        diario.getDescricao(), diario.getDataEntrada()))
                .collect(Collectors.toList());
    }

    public Diario toDiario(Diario diarioSave, DiarioPut diarioPut) {
        diarioSave.setDescricao(diarioPut.descricao());
        diarioSave.setDataEntrada(diarioPut.dataRegistro());
        return diarioSave;
    }

    public Page<DiarioResponse> toPageDiarioResponse(Page<Diario> diarioPage) {
        List<DiarioResponse> content = diarioPage.getContent().stream()
                .map(this::toDiarioResponse)
                .collect(Collectors.toList());
        return new PageImpl<>(content, diarioPage.getPageable(), diarioPage.getTotalElements());
    }

}
