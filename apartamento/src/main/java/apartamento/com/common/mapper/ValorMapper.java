package apartamento.com.common.mapper;

import apartamento.com.common.http.dto.valor.ValorPost;
import apartamento.com.common.http.dto.valor.ValorPut;
import apartamento.com.common.http.dto.valor.ValorResponse;
import apartamento.com.core.entity.Valor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class ValorMapper {

    public ValorResponse toValorResponse(Valor valor) {
        return new ValorResponse(valor.getId(), valor.getValor());
    }

    public Valor toValor(ValorPost valorPost) {
        Valor valor = new Valor();
        valor.setValor(valorPost.valor());
        return valor;
    }

    public List<ValorResponse> toListValorResponse(List<Valor> valors) {
        return valors.stream()
                .map(valor -> new ValorResponse(valor.getId(), valor.getValor()))
                .collect(Collectors.toList());
    }

    public Valor toValor(Valor valorSave, ValorPut valorPut) {
        valorSave.setValor(valorPut.valor());
        return valorSave;
    }

}
