package apartamento.com.common.mapper;

import apartamento.com.common.http.dto.diario.DiarioPost;
import apartamento.com.common.http.dto.diario.DiarioResponse;
import apartamento.com.core.entity.Diario;
import org.springframework.stereotype.Component;

@Component
public class DiarioMapper {

    public DiarioResponse toDiarioResponse(Diario diario){
        return new DiarioResponse(diario.getDescricao(), diario.getDataEntrada());
    }

    public Diario toDiario(DiarioPost diarioPost){
        return new Diario(diarioPost.descricao(), diarioPost.dataRegistro());
    }
}
