package apartamento.com.web.http;

import apartamento.com.common.http.dto.apartamento.ApartamentoFilter;
import apartamento.com.common.http.dto.apartamento.ApartamentoPost;
import apartamento.com.common.http.dto.apartamento.ApartamentoPut;
import apartamento.com.common.http.dto.apartamento.ApartamentoResponse;
import apartamento.com.core.service.impl.ApartamentoService;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@Tag(name = "Apartamento")
@RestController
@RequestMapping(value = "apartamentos", produces = MediaType.APPLICATION_JSON_VALUE)
public class ApartamentoResource {

    private final ApartamentoService apartamentoService;

    public ApartamentoResource(ApartamentoService apartamentoService) {
        this.apartamentoService = apartamentoService;
    }

    @PostMapping
    public ResponseEntity<ApartamentoResponse> create(@RequestBody ApartamentoPost apartamentoPost) {
        return ResponseEntity.status(HttpStatus.CREATED).body(apartamentoService.create(apartamentoPost));
    }

    @GetMapping
    public ResponseEntity<List<ApartamentoResponse>> listAll() {
        return ResponseEntity.status(HttpStatus.OK).body(apartamentoService.findAll());
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void remove(@PathVariable Long id) {
        apartamentoService.remove(id);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApartamentoResponse> findById(@PathVariable Long id) throws Exception {
        return ResponseEntity.status(HttpStatus.OK).body(apartamentoService.findById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApartamentoResponse> update(@PathVariable Long id, @RequestBody ApartamentoPut apartamentoPut) {
        ApartamentoResponse apartamentoAtualizado = apartamentoService.update(apartamentoPut, id);
        return ResponseEntity.status(HttpStatus.OK).body(apartamentoAtualizado);
    }

    @GetMapping("/filter")
    public ResponseEntity<Page<ApartamentoResponse>> filter(ApartamentoFilter apartamentoFilter, Pageable pageable) {
        Page<ApartamentoResponse> apartamentoPage = apartamentoService.filter(apartamentoFilter, pageable);
        return ResponseEntity.status(HttpStatus.OK).body(apartamentoPage);
    }

}
