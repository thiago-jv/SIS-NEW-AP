// Importa os módulos principais do Angular
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

// Importa o modelo de dados do Diário
import { Diario } from 'src/app/core/model';

// Serviço que faz a comunicação com o backend
import { DiarioService } from '../diario.service';

// Utilitários para trabalhar com rotas e navegação
import { ActivatedRoute, Router } from '@angular/router';

// Biblioteca para exibir notificações visuais
import Notiflix from 'notiflix';

// Define os metadados do componente
@Component({
  selector: 'app-diario-form', // Seletor usado no HTML para representar este componente
  templateUrl: './diario-form.component.html', // Caminho do arquivo HTML deste componente
  styleUrls: ['./diario-form.component.css'] // Caminho do CSS aplicado ao componente
})
export class DiarioFormComponent implements OnInit {

  // Instância do modelo que será usado no formulário
  diario = new Diario();

  // Injeta os serviços necessários no construtor
  constructor(
    private diarioService: DiarioService, // Serviço que lida com as chamadas HTTP
    private route: ActivatedRoute,         // Rota atual (usada para obter parâmetros da URL)
    private router: Router                 // Serviço de navegação
  ) { }

  // === Ciclo de vida do componente (executado ao inicializar) ===
  ngOnInit(): void {
    // Recupera o parâmetro 'id' da URL, se existir
    const idDiario = this.route.snapshot.params['id'];

    // Se existir um ID, significa que estamos em modo de edição
    if (idDiario) {
      this.findById(idDiario);
    }
  }

  // === Cria um novo diário no backend ===
  create(form: NgForm) {
    this.diarioService.create(this.diario)
      .then((response) => {
        Notiflix.Notify.success('Diário salvo com sucesso!'); // Mensagem de sucesso
        form.resetForm(); // Limpa o formulário
        this.diario = new Diario(); // Reseta a instância
      }).catch((error => {
        Notiflix.Notify.failure('Erro ao salvar o diário.'); // Mensagem de erro
      }));
  }

  // === Busca diário por ID para edição ===
  findById(id: number) {
    this.diarioService.findById(id)
      .then(diario => {
        this.diario = diario; // Preenche o formulário com os dados carregados
      })
      .catch(error => {
        Notiflix.Notify.failure('Erro ao carregar o diário.'); // Notifica erro se falhar
      });
  }

  // === Atualiza um diário existente ===
  update(form: NgForm) {
    this.diarioService.update(this.diario)
      .then(response => {
        Notiflix.Notify.success('Diário atualizado com sucesso!'); // Sucesso
        this.diario = this.diario; // Mantém o diário atual
      })
      .catch(error => console.log(error)); // Loga o erro no console
  }

  // === Verifica se estamos editando ou criando ===
  get editando() {
    return Boolean(this.diario.id); // Se existir um ID, é edição
  }

  // === Salva (decide se cria ou atualiza) ===
  save(form: NgForm) {
    if (this.editando) {
      this.update(form); // Atualiza se for edição
      this.router.navigate(['/diario/list']); // Redireciona para a lista
    } else {
      this.create(form); // Cria um novo
    }
  }

  // === Limpa o formulário e navega para a criação de novo diário ===
  new(form: NgForm) {
    form.reset(); // Limpa o formulário
    this.router.navigate(['/diario/new']); // Navega para o modo novo
  }

}
