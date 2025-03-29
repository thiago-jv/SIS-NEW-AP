package apartamento.com.core.service;

import apartamento.com.common.http.dto.inquilino.InquilinoFilter;
import apartamento.com.common.http.dto.inquilino.InquilinoPost;
import apartamento.com.common.http.dto.inquilino.InquilinoPut;
import apartamento.com.common.http.dto.inquilino.InquilinoResponse;
import apartamento.com.common.mapper.InquilinoMapper;
import apartamento.com.common.utils.Messages;
import apartamento.com.core.entity.Inquilino;
import apartamento.com.core.service.impl.InquilinoService;
import apartamento.com.gateway.client.kitnet.InquilinoClient;
import apartamento.com.web.handler.BusinnesException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class InquilinoServiceImpl implements InquilinoService {

    private final InquilinoClient InquilinoClient;

    private final InquilinoMapper InquilinoMapper;

    public InquilinoServiceImpl(InquilinoClient inquilinoClient, InquilinoMapper inquilinoMapper) {
        InquilinoClient = inquilinoClient;
        InquilinoMapper = inquilinoMapper;
    }


    public InquilinoResponse create(InquilinoPost inquilinoPost) {
        Inquilino inquilino = InquilinoMapper.toInquilino(inquilinoPost);
        Inquilino inquilinoSalvo = InquilinoClient.create(inquilino);
        InquilinoResponse inquilinoResponse = InquilinoMapper.toInquilinoResponse(inquilinoSalvo);
        return inquilinoResponse;
    }

    @Override
    public List<InquilinoResponse> findAll() {
        List<Inquilino> inquilinos = InquilinoClient.findAll();
        List<InquilinoResponse> inquilinoResponse = InquilinoMapper.toListInquilinoResponse(inquilinos);
        return inquilinoResponse;
    }

    @Override
    public void remove(Long id) {
        InquilinoClient.delete(id);
    }

    @Override
    public InquilinoResponse findById(Long id) throws BusinnesException {
        Inquilino inquilino = InquilinoClient.findById(id)
                .orElseThrow(() -> new BusinnesException(
                        Messages.MSG_RECURSO_NAO_ENCONTRADO.concat(" id: ").concat(id.toString())));
        return InquilinoMapper.toInquilinoResponse(inquilino);
    }

    @Override
    public InquilinoResponse update(InquilinoPut inquilinoPut, Long id) {
        Inquilino inquilinoSave = InquilinoClient.findById(id)
                .orElseThrow(() -> new BusinnesException(
                        Messages.MSG_RECURSO_NAO_ENCONTRADO.concat(" id: ").concat(id.toString())));

        Inquilino inquilino = InquilinoMapper.toInquilino(inquilinoSave, inquilinoPut);
        InquilinoResponse inquilinoResponse = InquilinoMapper.toInquilinoResponse(InquilinoClient.update(inquilino));
        return inquilinoResponse;
    }

    @Override
    public Page<InquilinoResponse> filter(InquilinoFilter InquilinoFilter, Pageable pageable) {
        Page<Inquilino> inquilinoPage = InquilinoClient.filter(InquilinoFilter, pageable);
        Page<InquilinoResponse> inquilinoResponse = InquilinoMapper.toPageInquilinoResponse(inquilinoPage);
        return inquilinoResponse;
    }
}
