package apartamento.com.gateway.client.kitnet;

import apartamento.com.common.http.dto.inquilino.InquilinoFilter;
import apartamento.com.core.entity.Inquilino;
import apartamento.com.gateway.client.kitnet.repository.InquilinoRepository;
import jakarta.transaction.Transactional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class InquilinoClient {

    private final InquilinoRepository inquilinoRepository;

    public InquilinoClient(InquilinoRepository inquilinoRepository) {
        this.inquilinoRepository = inquilinoRepository;
    }

    public Inquilino create(Inquilino inquilino) {
        Inquilino inquilinoSalvo = inquilinoRepository.save(inquilino);
        return inquilinoSalvo;
    }

    public List<Inquilino> findAll() {
        List<Inquilino> inquilinos = inquilinoRepository.findAll();
        return inquilinos;
    }

    public void delete(Long id) {
        inquilinoRepository.deleteById(id);
    }

    public Optional<Inquilino> findById(Long id) {
        Optional<Inquilino> inquilino = inquilinoRepository.findById(id);
        return inquilino;
    }

    @Transactional
    public Inquilino update(Inquilino inquilino) {
        Inquilino inquilinoAtualizado = inquilinoRepository.save(inquilino);
        return inquilinoAtualizado;
    }

    public Page<Inquilino> filter(InquilinoFilter inquilinoFilter, Pageable pageable) {
        Page<Inquilino> inquilinoPage = inquilinoRepository.filter(inquilinoFilter, pageable);
        return  inquilinoPage;
    }
}
