package apartamento.com.web.http;

import apartamento.com.common.http.dto.predio.PredioFilter;
import apartamento.com.common.http.dto.predio.PredioPost;
import apartamento.com.common.http.dto.predio.PredioPut;
import apartamento.com.common.http.dto.predio.PredioResponse;
import apartamento.com.core.service.impl.PredioService;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@Tag(name = "Predio")
@RestController
@RequestMapping(value = "predios", produces = MediaType.APPLICATION_JSON_VALUE)
public class PredioResource {

    private final PredioService predioService;

    public PredioResource(PredioService predioService) {
        this.predioService = predioService;
    }


    @PostMapping
    public ResponseEntity<PredioResponse> create(@RequestBody PredioPost predioPost) {
        return ResponseEntity.status(HttpStatus.CREATED).body(predioService.create(predioPost));
    }

    @GetMapping
    public ResponseEntity<List<PredioResponse>> listAll() {
        return ResponseEntity.status(HttpStatus.OK).body(predioService.findAll());
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void remove(@PathVariable Long id) {
        predioService.remove(id);
    }

    @GetMapping("/{id}")
    public ResponseEntity<PredioResponse> findById(@PathVariable Long id) throws Exception {
        return ResponseEntity.status(HttpStatus.OK).body(predioService.findById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<PredioResponse> update(@PathVariable Long id, @RequestBody PredioPut predioPut) {
        PredioResponse predioAtualizado = predioService.update(predioPut, id);
        return ResponseEntity.status(HttpStatus.OK).body(predioAtualizado);
    }

    @GetMapping("/filter")
    public ResponseEntity<Page<PredioResponse>> filter(PredioFilter predioFilter, Pageable pageable) {
        Page<PredioResponse> predioPage = predioService.filter(predioFilter, pageable);
        return ResponseEntity.status(HttpStatus.OK).body(predioPage);
    }

}
