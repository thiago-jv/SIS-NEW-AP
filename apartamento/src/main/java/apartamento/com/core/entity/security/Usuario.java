package apartamento.com.core.entity.security;

import jakarta.persistence.*;
import java.util.List;
import java.util.Objects;

@Entity
@Table(name = "USUARIO", schema = "public")
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "usuario_seq")
    @SequenceGenerator(name = "usuario_seq", sequenceName = "usuario_seq", initialValue = 1, allocationSize = 1)
    @Column(name = "ID", nullable = false, unique = true)
    private Long id;

    @Column(name = "NOME", nullable = false, length = 90)
    private String nome;

    @Column(name = "EMAIL", nullable = false, length = 90, unique = true)
    private String email;

    @Column(name = "SENHA", nullable = false, length = 300)
    private String senha;

    @Column(name = "ROLES",  nullable = false)
    private List<String> roles;

    public Usuario() {
    }

    public Usuario(String nome, String email, String senha, List<String> roles) {
        this.nome = nome;
        this.email = email;
        this.senha = senha;
        this.roles = roles;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getSenha() {
        return senha;
    }

    public void setSenha(String senha) {
        this.senha = senha;
    }

    public List<String> getRoles() {
        return roles;
    }

    public void setRoles(List<String> roles) {
        this.roles = roles;
    }

    @Override
    public boolean equals(Object o) {
        if (o == null || getClass() != o.getClass()) return false;
        Usuario usuario = (Usuario) o;
        return Objects.equals(id, usuario.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }
}
