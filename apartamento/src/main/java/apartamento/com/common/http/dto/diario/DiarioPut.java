package apartamento.com.common.http.dto.diario;

import java.time.LocalDate;

public record DiarioPut(Long id, String descricao, LocalDate dataRegistro) { }
