package apartamento.com.gateway.client.kitnet;

import apartamento.com.common.http.dto.apartamento.ApartamentoFilter;
import apartamento.com.core.entity.Apartamento;
import apartamento.com.gateway.client.kitnet.repository.ApartamentoRepository;
import jakarta.transaction.Transactional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ApartamentoClient {

    private final ApartamentoRepository apartamentoRepository;

    public ApartamentoClient(ApartamentoRepository apartamentoRepository) {
        this.apartamentoRepository = apartamentoRepository;
    }

    public Apartamento create(Apartamento apartamento) {
        Apartamento apartamentoSalvo = apartamentoRepository.save(apartamento);
        return apartamentoSalvo;
    }

    public List<Apartamento> findAll() {
        List<Apartamento> predios = apartamentoRepository.findAll();
        return predios;
    }

    public void delete(Long id) {
        apartamentoRepository.deleteById(id);
    }

    public Optional<Apartamento> findById(Long id) {
        Optional<Apartamento> apartamento = apartamentoRepository.findById(id);
        return apartamento;
    }

    @Transactional
    public Apartamento update(Apartamento apartamento) {
        Apartamento apartamentoAtualizado = apartamentoRepository.save(apartamento);
        return apartamentoAtualizado;
    }

    public Page<Apartamento> filter(ApartamentoFilter apartamentoFilter, Pageable pageable) {
        Page<Apartamento> apartamentoPage = apartamentoRepository.filter(apartamentoFilter, pageable);
        return apartamentoPage;
    }

}