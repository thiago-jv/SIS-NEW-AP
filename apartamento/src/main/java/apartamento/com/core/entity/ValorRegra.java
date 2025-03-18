package apartamento.com.core.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import java.io.Serializable;
import java.math.BigDecimal;

@Embeddable
public class ValorRegra implements Serializable {

	@Column(name = "VALOR_TOTAL_DIARIA", nullable = false)
	private BigDecimal valorTotalDiaria = BigDecimal.ZERO;

	@Column(name = "VALOR_DIARIA", nullable = false)
	private BigDecimal valorDiaria = BigDecimal.ZERO;

	@Column(name = "VALOR_PAGO_APARTAMENTO", nullable = false)
	private BigDecimal valorPagoApartamento = BigDecimal.ZERO;

	@Column(name = "VALOR_APARTAMENTO", nullable = false)
	private BigDecimal valorApartamento = BigDecimal.ZERO;

	@Column(name = "VALOR_DEBITO_APARTAMENTO")
	private BigDecimal valorDebitoApartamento = BigDecimal.ZERO;

	@Column(name = "DIA", nullable = false)
	private Long dia;

}
