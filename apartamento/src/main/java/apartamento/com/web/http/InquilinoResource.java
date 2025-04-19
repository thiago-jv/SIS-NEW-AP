package apartamento.com.web.http;

import apartamento.com.common.http.dto.inquilino.InquilinoFilter;
import apartamento.com.common.http.dto.inquilino.InquilinoPost;
import apartamento.com.common.http.dto.inquilino.InquilinoPut;
import apartamento.com.common.http.dto.inquilino.InquilinoResponse;
import apartamento.com.core.service.impl.InquilinoService;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@Tag(name = "Inquilino")
@RestController
@RequestMapping(value = "inquilinos", produces = MediaType.APPLICATION_JSON_VALUE)
public class InquilinoResource {

    private final InquilinoService inquilinoService;

    public InquilinoResource(InquilinoService inquilinoService) {
        this.inquilinoService = inquilinoService;
    }

    @PostMapping
    public ResponseEntity<InquilinoResponse> create(@RequestBody InquilinoPost inquilinoPost) {
        return ResponseEntity.status(HttpStatus.CREATED).body(inquilinoService.create(inquilinoPost));
    }

    @GetMapping
    public ResponseEntity<List<InquilinoResponse>> listAll() {
        return ResponseEntity.status(HttpStatus.OK).body(inquilinoService.findAll());
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void remove(@PathVariable Long id){
       inquilinoService.remove(id);
    }

    @GetMapping("/{id}")
    public ResponseEntity<InquilinoResponse> findById(@PathVariable Long id) throws Exception {
        return ResponseEntity.status(HttpStatus.OK).body(inquilinoService.findById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<InquilinoResponse> update(@PathVariable Long id, @RequestBody InquilinoPut inquilinoPut){
        InquilinoResponse inquilinoAtualizado = inquilinoService.update(inquilinoPut, id);
        return ResponseEntity.status(HttpStatus.OK).body(inquilinoAtualizado);
    }

    @GetMapping("/filter")
    public ResponseEntity<Page<InquilinoResponse>> filter(InquilinoFilter inquilinoFilter, Pageable pageable) {
        Page<InquilinoResponse> inquilinoPage = inquilinoService.filter(inquilinoFilter, pageable);
        return ResponseEntity.status(HttpStatus.OK).body(inquilinoPage);
    }

}
