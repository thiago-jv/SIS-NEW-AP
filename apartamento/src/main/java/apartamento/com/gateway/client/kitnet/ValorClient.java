package apartamento.com.gateway.client.kitnet;

import apartamento.com.core.entity.Valor;
import apartamento.com.gateway.client.kitnet.repository.ValorRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class ValorClient {

    private final ValorRepository valorRepository;

    public ValorClient(ValorRepository valorRepository) {
        this.valorRepository = valorRepository;
    }

    public Valor create(Valor valor) {
        Valor valorSalvo = valorRepository.save(valor);
        return valorSalvo;
    }

    public List<Valor> findAll() {
        List<Valor> valors = valorRepository.findAll();
        return valors;
    }

    public void delete(Long id) {
        valorRepository.deleteById(id);
    }

    public Optional<Valor> findById(Long id) {
        Optional<Valor> valor = valorRepository.findById(id);
        return valor;
    }

    @Transactional
    public Valor update(Valor valor) {
        Valor valorAtualizado = valorRepository.save(valor);
        return valorAtualizado;
    }

}