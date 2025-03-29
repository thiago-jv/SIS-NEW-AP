package apartamento.com.common.mapper;

import apartamento.com.common.http.dto.inquilino.InquilinoPost;
import apartamento.com.common.http.dto.inquilino.InquilinoPut;
import apartamento.com.common.http.dto.inquilino.InquilinoResponse;
import apartamento.com.core.entity.Inquilino;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class InquilinoMapper {

    public InquilinoResponse toInquilinoResponse(Inquilino inquilino) {
        return new InquilinoResponse(inquilino.getId(), inquilino.getNome(), inquilino.getNomeAbreviado(),
                inquilino.getEmail(), inquilino.getContato(), inquilino.getStatus(), inquilino.getGenero(),
                inquilino.getCpf());
    }

    public Inquilino toInquilino(InquilinoPost inquilinoPost) {
        Inquilino inquilino = new Inquilino();
        inquilino.setNome(inquilinoPost.nome());
        inquilino.setNomeAbreviado(inquilinoPost.nomeAbreviado());
        inquilino.setEmail(inquilinoPost.email());
        inquilino.setContato(inquilinoPost.contato());
        inquilino.setStatus(inquilinoPost.status());
        inquilino.setGenero(inquilinoPost.genero());
        inquilino.setCpf(inquilinoPost.cpf());
        return inquilino;
    }

    public List<InquilinoResponse> toListInquilinoResponse(List<Inquilino> inquilinos) {
        return inquilinos.stream()
                .map(inquilino -> new InquilinoResponse(inquilino.getId(), inquilino.getNome(),
                        inquilino.getNomeAbreviado(), inquilino.getEmail(),
                        inquilino.getContato(), inquilino.getStatus(),
                        inquilino.getGenero(), inquilino.getCpf()))
                .collect(Collectors.toList());
    }

    public Inquilino toInquilino(Inquilino inquilinoSave, InquilinoPut inquilinoPut) {
        inquilinoSave.setNome(inquilinoPut.nome());
        inquilinoSave.setNomeAbreviado(inquilinoPut.nomeAbreviado());
        inquilinoSave.setEmail(inquilinoPut.email());
        inquilinoSave.setContato(inquilinoPut.contato());
        inquilinoSave.setStatus(inquilinoPut.status());
        inquilinoSave.setGenero(inquilinoPut.genero());
        inquilinoSave.setCpf(inquilinoPut.cpf());
        return inquilinoSave;
    }

    public Page<InquilinoResponse> toPageInquilinoResponse(Page<Inquilino> inquilinoPage) {
        List<InquilinoResponse> content = inquilinoPage.getContent().stream()
                .map(this::toInquilinoResponse)
                .collect(Collectors.toList());
        return new PageImpl<>(content, inquilinoPage.getPageable(), inquilinoPage.getTotalElements());
    }

}
