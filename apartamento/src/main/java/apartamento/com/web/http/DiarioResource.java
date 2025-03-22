package apartamento.com.web.http;

import apartamento.com.common.http.dto.diario.DiarioFilter;
import apartamento.com.common.http.dto.diario.DiarioPost;
import apartamento.com.common.http.dto.diario.DiarioPut;
import apartamento.com.common.http.dto.diario.DiarioResponse;
import apartamento.com.core.service.impl.DiarioService;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@Tag(name = "Diario")
@RestController
@RequestMapping(value = "diarios", produces = MediaType.APPLICATION_JSON_VALUE)
public class DiarioResource {

    private final DiarioService diarioService;

    public DiarioResource(DiarioService diarioService) {
        this.diarioService = diarioService;
    }

    @PostMapping
    public ResponseEntity<DiarioResponse> create(@RequestBody DiarioPost diarioPost) {
        return ResponseEntity.status(HttpStatus.CREATED).body(diarioService.create(diarioPost));
    }

    @GetMapping
    public ResponseEntity<List<DiarioResponse>> listAll() {
        return ResponseEntity.status(HttpStatus.OK).body(diarioService.findAll());
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void remove(@PathVariable Long id){
       diarioService.remove(id);
    }

    @GetMapping("/{id}")
    public ResponseEntity<DiarioResponse> findById(@PathVariable Long id) throws Exception {
        return ResponseEntity.status(HttpStatus.OK).body(diarioService.findById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<DiarioResponse> update(@PathVariable Long id, @RequestBody DiarioPut diarioPut){
        DiarioResponse diarioAtualizado = diarioService.update(diarioPut, id);
        return ResponseEntity.status(HttpStatus.OK).body(diarioAtualizado);
    }

    @GetMapping("/filter")
    public ResponseEntity<Page<DiarioResponse>> filter(DiarioFilter diarioFilter, Pageable pageable) {
        Page<DiarioResponse> diarioPage = diarioService.filter(diarioFilter, pageable);
        return ResponseEntity.status(HttpStatus.OK).body(diarioPage);
    }

}
