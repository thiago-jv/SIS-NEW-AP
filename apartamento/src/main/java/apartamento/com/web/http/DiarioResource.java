package apartamento.com.web.http;

import apartamento.com.common.http.dto.diario.DiarioPost;
import apartamento.com.common.http.dto.diario.DiarioResponse;
import apartamento.com.core.service.impl.DiarioService;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "Diario")
@RestController
@RequestMapping(value = "diarios", produces = MediaType.APPLICATION_JSON_VALUE)
public class DiarioResource {

    private final DiarioService diarioService;

    public DiarioResource(DiarioService diarioService) {
        this.diarioService = diarioService;
    }

    @PostMapping
    public ResponseEntity<DiarioResponse> create(@RequestBody DiarioPost diarioPost){
        return ResponseEntity.status(HttpStatus.CREATED).body(diarioService.create(diarioPost));
    }
}
