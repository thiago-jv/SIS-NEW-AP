package apartamento.com.core.entity;

import apartamento.com.core.utils.Constantes;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.io.Serializable;

@Entity
@Table(name = "APARTAMENTO", schema = "public")
public class Apartamento implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "apartamento_seq")
	@SequenceGenerator(name = "apartamento_seq", sequenceName = "apartamento_seq", initialValue = 1, allocationSize = 1)
	@Column(name = "ID", nullable = false, unique = true)
	private Long id;

	@NotNull
	@Size(min = 1, max = 10)
	@Column(name = "NUMERO_APARTAMENTO", nullable = false, unique = true)
	private String numeroApartamento;

	@NotNull
	@Size(min = 1, max = 90)
	@Column(name = "DESCRICAO", nullable = false, unique = true)
	private String descricao;

	@Size(min = 1, max = 10)
	@Column(name = "MEDIDOR", unique = true)
	private String medidor;

	@Column(name = "STATUS_APARTAMENTO", length = 20, nullable = false)
	private String statusApartamento = Constantes.DISPONIVEL;

	@ManyToOne
	@JoinColumn(name = "ID_PREDIO", referencedColumnName = "ID", nullable = false)
	private Predio predio;

	public Apartamento() {

	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getNumeroApartamento() {
		return numeroApartamento;
	}

	public void setNumeroApartamento(String numeroApartamento) {
		this.numeroApartamento = numeroApartamento;
	}

	public String getDescricao() {
		return descricao;
	}

	public void setDescricao(String descricao) {
		this.descricao = descricao;
	}

	public String getMedidor() {
		return medidor;
	}

	public void setMedidor(String medidor) {
		this.medidor = medidor;
	}

	public String getStatusApartamento() {
		return statusApartamento;
	}

	public void setStatusApartamento(String statusApartamento) {
		this.statusApartamento = statusApartamento;
	}

	public Predio getPredio() {
		return predio;
	}

	public void setPredio(Predio predio) {
		this.predio = predio;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((id == null) ? 0 : id.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Apartamento other = (Apartamento) obj;
		if (id == null) {
			if (other.id != null)
				return false;
		} else if (!id.equals(other.id))
			return false;
		return true;
	}

}
