import { Component, OnInit, ViewChild } from '@angular/core';
import { Diario } from 'src/app/core/model';
import { DiarioService } from '../diario.service';
import Notiflix from 'notiflix';
import { ConfirmationModalComponent } from 'src/app/shared/confirmation-modal/confirmation-modal.component';
import { NavigationEnd, Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-diario-list',
  templateUrl: './diario-list.component.html',
  styleUrls: ['./diario-list.component.css']
})
export class DiarioListComponent implements OnInit {

  diarios: Diario[] = [];
  diario: Diario = new Diario;
  @ViewChild('confirmModal') confirmModal!: ConfirmationModalComponent;
  @ViewChild('confirmEditModal') confirmEditModal!: ConfirmationModalComponent;
  diarioSelecionado!: Diario; // Armazena o diário a ser excluído

  constructor(
    private diarioService: DiarioService,
    private router: Router) { }

  ngOnInit(): void {
    this.listAll();
    // para recarregar a pagina apos editar um registro no componente form
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.listAll();
      }
    });
  }

  listAll() {
    this.diarioService.findAll().then(result => {
      this.diarios = result;
    }).catch(error => {
      console.log("Erro ao processa" + error)
    })
  }

  delete(diario: any) {
    this.diarioService.delete(diario.id)
      .then(() => {
        Notiflix.Notify.success('Diário deletado com sucesso!');
        this.listAll();
      }).catch(error => console.log(error));
  }

  // Método chamado após a confirmação do modal
  editarDiario() {
    this.router.navigate(['/diario', this.diarioSelecionado.id]); // Faz a navegação para a edição
  }

  // Atualizamos para armazenar o diário antes de abrir o modal
  openDeleteModal(diario: Diario) {
    this.diarioSelecionado = diario; // Guarda o diário a ser excluído
    this.confirmModal.openModal();
  }

  // Método para abrir o modal e armazenar o diário selecionado
  openEditModal(diario: Diario) {
    this.diarioSelecionado = diario; // Guarda o diário que será editado
    this.confirmEditModal.openModal(); // Abre o modal de confirmação
  }

}
