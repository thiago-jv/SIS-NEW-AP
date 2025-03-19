package apartamento.com.common.http.dto.diario;

import java.time.LocalDate;

public record DiarioResponse(String descricao, LocalDate dataRegistro) { }
