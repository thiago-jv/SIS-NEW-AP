package apartamento.com.web.http;

import apartamento.com.common.http.dto.diario.DiarioPost;
import apartamento.com.common.http.dto.diario.DiarioResponse;
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

    @PostMapping
    public ResponseEntity<DiarioResponse> create(@RequestBody DiarioPost diarioPost){
        return ResponseEntity.status(HttpStatus.CREATED).body(new DiarioResponse(diarioPost.descricao(), diarioPost.dataRegistro()));
    }
}
