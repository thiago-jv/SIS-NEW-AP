package apartamento.com.common.http.dto.diario;

import java.time.LocalDate;

public record DiarioPost(String descricao, LocalDate dataRegistro) { }
