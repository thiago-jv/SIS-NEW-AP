package apartamento.com.gateway.client.kitnet;

import apartamento.com.common.http.dto.predio.PredioFilter;
import apartamento.com.core.entity.Predio;
import apartamento.com.gateway.client.kitnet.repository.PredioRepository;
import jakarta.transaction.Transactional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PredioClient {

    private final PredioRepository predioRepository;

    public PredioClient(PredioRepository predioRepository) {
        this.predioRepository = predioRepository;
    }

    public Predio create(Predio predio) {
        Predio predioSalvo = predioRepository.save(predio);
        return predioSalvo;
    }

    public List<Predio> findAll() {
        List<Predio> predios = predioRepository.findAll();
        return predios;
    }

    public void delete(Long id) {
        predioRepository.deleteById(id);
    }

    public Optional<Predio> findById(Long id) {
        Optional<Predio> predio = predioRepository.findById(id);
        return predio;
    }

    @Transactional
    public Predio update(Predio predio) {
        Predio predioAtualizado = predioRepository.save(predio);
        return predioAtualizado;
    }

    public Page<Predio> filter(PredioFilter predioFilter, Pageable pageable) {
        Page<Predio> predioPage = predioRepository.filter(predioFilter, pageable);
        return  predioPage;
    }
}
