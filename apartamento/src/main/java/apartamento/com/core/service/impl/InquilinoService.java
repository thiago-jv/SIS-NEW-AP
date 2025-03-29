package apartamento.com.core.service.impl;

import apartamento.com.common.http.dto.inquilino.InquilinoFilter;
import apartamento.com.common.http.dto.inquilino.InquilinoPost;
import apartamento.com.common.http.dto.inquilino.InquilinoPut;
import apartamento.com.common.http.dto.inquilino.InquilinoResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface InquilinoService {

    InquilinoResponse create(InquilinoPost inquilinoPost);

    List<InquilinoResponse> findAll();

    void remove(Long id);

    InquilinoResponse findById(Long id) throws Exception;

    InquilinoResponse update(InquilinoPut inquilinoPut, Long id);

    Page<InquilinoResponse> filter(InquilinoFilter inquilinoFilter, Pageable pageable);
}
