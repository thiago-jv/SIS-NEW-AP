package apartamento.com.web.http;

import apartamento.com.common.http.dto.valor.ValorPost;
import apartamento.com.common.http.dto.valor.ValorPut;
import apartamento.com.common.http.dto.valor.ValorResponse;
import apartamento.com.core.service.impl.ValorService;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@Tag(name = "Valor")
@RestController
@RequestMapping(value = "valors", produces = MediaType.APPLICATION_JSON_VALUE)
public class ValorResource {

    private final ValorService valorService;

    public ValorResource(ValorService valorService) {
        this.valorService = valorService;
    }

    @PostMapping
    @PreAuthorize("hasAnyRole('ADMIN')")
    public ResponseEntity<ValorResponse> create(@RequestBody ValorPost valorPost) {
        return ResponseEntity.status(HttpStatus.CREATED).body(valorService.create(valorPost));
    }

    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN')")
    public ResponseEntity<List<ValorResponse>> listAll() {
        return ResponseEntity.status(HttpStatus.OK).body(valorService.findAll());
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @PreAuthorize("hasAnyRole('ADMIN')")
    public void remove(@PathVariable Long id){
        valorService.remove(id);
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN')")
    public ResponseEntity<ValorResponse> findById(@PathVariable Long id) throws Exception {
        return ResponseEntity.status(HttpStatus.OK).body(valorService.findById(id));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN')")
    public ResponseEntity<ValorResponse> update(@PathVariable Long id, @RequestBody ValorPut valorPut){
        ValorResponse valorAtualizado = valorService.update(valorPut, id);
        return ResponseEntity.status(HttpStatus.OK).body(valorAtualizado);
    }

}
