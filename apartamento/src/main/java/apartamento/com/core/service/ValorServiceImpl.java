package apartamento.com.core.service;

import apartamento.com.common.http.dto.valor.ValorPost;
import apartamento.com.common.http.dto.valor.ValorPut;
import apartamento.com.common.http.dto.valor.ValorResponse;
import apartamento.com.common.mapper.ValorMapper;
import apartamento.com.common.utils.Messages;
import apartamento.com.core.entity.Valor;
import apartamento.com.core.service.impl.ValorService;
import apartamento.com.gateway.client.kitnet.ValorClient;
import apartamento.com.web.handler.BusinnesException;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ValorServiceImpl implements ValorService {

    private final ValorClient valorClient;

    private final ValorMapper valorMapper;

    public ValorServiceImpl(ValorClient valorClient, ValorMapper valorMapper) {
        this.valorClient = valorClient;
        this.valorMapper = valorMapper;
    }

    public ValorResponse create(ValorPost valorPost) {
        Valor valor = valorMapper.toValor(valorPost);
        Valor valorSalvo = valorClient.create(valor);
        ValorResponse valorResponse = valorMapper.toValorResponse(valorSalvo);
        return valorResponse;
    }

    @Override
    public List<ValorResponse> findAll() {
        List<Valor> valors = valorClient.findAll();
        List<ValorResponse> valorResponse = valorMapper.toListValorResponse(valors);
        return valorResponse;
    }

    @Override
    public void remove(Long id) {
        valorClient.delete(id);
    }

    @Override
    public ValorResponse findById(Long id) throws BusinnesException {
        Valor valor = valorClient.findById(id)
                .orElseThrow(() -> new BusinnesException(
                        Messages.MSG_RECURSO_NAO_ENCONTRADO.concat(" id: ").concat(id.toString())));
        return valorMapper.toValorResponse(valor);
    }

    @Override
    public ValorResponse update(ValorPut valorPut, Long id) {
        Valor valorSave = valorClient.findById(id)
                .orElseThrow(() -> new BusinnesException(
                        Messages.MSG_RECURSO_NAO_ENCONTRADO.concat(" id: ").concat(id.toString())));

        Valor Valor = valorMapper.toValor(valorSave, valorPut);
        ValorResponse ValorResponse = valorMapper.toValorResponse(valorClient.update(Valor));
        return ValorResponse;
    }

}
