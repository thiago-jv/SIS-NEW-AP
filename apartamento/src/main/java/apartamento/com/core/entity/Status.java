package apartamento.com.core.entity;

import apartamento.com.common.utils.Constantes;
import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;

import java.io.Serializable;

@Embeddable
public class Status implements Serializable {

	@Column(name = "STATUS_ENTREGA_CONTA_LUZ", length = 20, nullable = false)
	private String entragaContaLuz = Constantes.NAO;

	@Column(name = "STATUS_APARTAMENTO_LUZ", length = 20, nullable = false)
	private String statusApartamePagamentoLuz = Constantes.PAGO;

	@Column(name = "STATUS_APARTAMENTO_PAGAMENTO", length = 20, nullable = false)
	private String statusApartamePagamento = Constantes.PAGO;

	@Column(name = "STATUS_PROXIMO_PAGAMENTO", length = 20, nullable = false)
	private String statusProximoPagamento = Constantes.PAGO;

	@Column(name = "STATUS_CONTROLE", nullable = false)
	private boolean statusControle = true;

}
