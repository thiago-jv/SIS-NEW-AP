package apartamento.com.web.handler;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class ExepectionHandler {

    @ExceptionHandler(Exception.class)
    public ResponseEntity<String> handlerAllExeception(Exception exception) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body("Erro ao processar sua solicitação. Por favor, tente em alguns instantes");
    }

}
