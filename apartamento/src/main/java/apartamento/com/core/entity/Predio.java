package apartamento.com.core.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import java.io.Serializable;

@Entity
@Table(name = "PREDIO", schema = "public")
public class Predio implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "predio_seq")
	@SequenceGenerator(name = "predio_seq", sequenceName = "predio_seq", initialValue = 1, allocationSize = 1)
	@Column(name = "ID", nullable = false, unique = true)
	private Long id;

	@NotNull
	@Size(min = 3, max = 90)
	@Column(name = "DESCRICAO", nullable = false, unique = true)
	private String descricao;

	@Column(name = "CEP", length = 8, nullable = false)
	private String cep;

	@Column(name = "LOGRADOURO", length = 90)
	private String logradouro;

	@Column(name = "COMPLEMENTO", length = 60)
	private String complemento;

	@Column(name = "BAIRRO", length = 90)
	private String bairro;

	@Column(name = "UF", length = 2)
	private String uf;

	@Column(name = "LOCALIDADE", length = 90)
	private String localidade;

	@Column(name = "NUMERO", length = 10)
	private String numero;

	public Predio() {
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getDescricao() {
		return descricao;
	}

	public void setDescricao(String descricao) {
		this.descricao = descricao;
	}

	public String getCep() {
		return cep;
	}

	public void setCep(String cep) {
		this.cep = cep;
	}

	public String getLogradouro() {
		return logradouro;
	}

	public void setLogradouro(String logradouro) {
		this.logradouro = logradouro;
	}

	public String getComplemento() {
		return complemento;
	}

	public void setComplemento(String complemento) {
		this.complemento = complemento;
	}

	public String getBairro() {
		return bairro;
	}

	public void setBairro(String bairro) {
		this.bairro = bairro;
	}

	public String getUf() {
		return uf;
	}

	public void setUf(String uf) {
		this.uf = uf;
	}

	public String getLocalidade() {
		return localidade;
	}

	public void setLocalidade(String localidade) {
		this.localidade = localidade;
	}

	public String getNumero() {
		return numero;
	}

	public void setNumero(String numero) {
		this.numero = numero;
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
		Predio other = (Predio) obj;
		if (id == null) {
			if (other.id != null)
				return false;
		} else if (!id.equals(other.id))
			return false;
		return true;
	}

}
