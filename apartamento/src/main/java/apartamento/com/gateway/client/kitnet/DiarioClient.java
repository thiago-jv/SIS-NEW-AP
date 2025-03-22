package apartamento.com.gateway.client.kitnet;

import apartamento.com.common.http.dto.diario.DiarioFilter;
import apartamento.com.core.entity.Diario;
import apartamento.com.gateway.client.kitnet.repository.DiarioRepository;
import jakarta.transaction.Transactional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DiarioClient {

    private final DiarioRepository diarioRepository;

    public DiarioClient(DiarioRepository diarioRepository) {
        this.diarioRepository = diarioRepository;
    }

    public Diario create(Diario diario) {
        Diario diarioSalvo = diarioRepository.save(diario);
        return diarioSalvo;
    }

    public List<Diario> findAll() {
        List<Diario> diarios = diarioRepository.findAll();
        return diarios;
    }

    public void delete(Long id) {
        diarioRepository.deleteById(id);
    }

    public Optional<Diario> findById(Long id) {
        Optional<Diario> diario = diarioRepository.findById(id);
        return diario;
    }

    @Transactional
    public Diario update(Diario diario) {
        Diario diarioAtualizado = diarioRepository.save(diario);
        return diarioAtualizado;
    }

    public Page<Diario> filter(DiarioFilter diarioFilter, Pageable pageable) {
        Page<Diario> diarioPage = diarioRepository.filter(diarioFilter, pageable);
        return  diarioPage;
    }
}
