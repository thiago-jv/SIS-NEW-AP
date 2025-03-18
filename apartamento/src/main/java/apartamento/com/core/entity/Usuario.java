package apartamento.com.core.entity;

import jakarta.persistence.*;
import java.util.List;

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

    @Column(name = "EMAIL", nullable = false, length = 90)
    private String email;

    @Column(name = "SENHA", nullable = false, length = 255)
    private String senha;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "usuario_permissao", joinColumns = @JoinColumn(name = "codigo_usuario")
            , inverseJoinColumns = @JoinColumn(name = "codigo_permissao"))
    private List<Permissao> permissoes;

    public Usuario() {
    }
}
