package apartamento.com.common.http.dto.diario;

import java.time.LocalDate;

public record DiarioResponse(Long id, String descricao, LocalDate dataRegistro) { }
