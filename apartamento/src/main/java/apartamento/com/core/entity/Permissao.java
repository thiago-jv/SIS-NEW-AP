package apartamento.com.core.entity;

import jakarta.persistence.*;

import java.util.Objects;

@Entity
@Table(name = "PERMISSAO", schema = "public")
public class Permissao {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "permissao_seq")
    @SequenceGenerator(name = "permissao_seq", sequenceName = "permissao_seq", initialValue = 1, allocationSize = 1)
    @Column( nullable = false, unique = true)
    private Long id;

    @Column(nullable = false)
    private String descricao;

    public Permissao() {
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

    @Override
    public boolean equals(Object o) {
        if (o == null || getClass() != o.getClass()) return false;
        Permissao permissao = (Permissao) o;
        return Objects.equals(id, permissao.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }
}
