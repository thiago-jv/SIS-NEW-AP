import { Component, EventEmitter, Output, Input, ViewChild, ElementRef } from '@angular/core';

declare var bootstrap: any;

@Component({
  selector: 'app-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.css']
})
export class ConfirmationModalComponent {

  /**
   * @Input() é um decorator do Angular que permite receber valores do componente pai.
   * Aqui usamos para receber o título do modal dinamicamente.
   * Exemplo: <app-confirmation-modal [title]="'Excluir Item'">
   */
  @Input() title: string = 'Confirmação';

  /**
   * Também um @Input() para a mensagem que será exibida no corpo do modal.
   * Permite flexibilidade e reuso do componente.
   */
  @Input() message: string = 'Tem certeza que deseja continuar?';

  /**
   * Este @Input define o ID HTML do modal. É usado para diferenciar instâncias
   * quando há mais de um modal na aplicação.
   */
  @Input() modalId!: string;

  /**
   * @ViewChild é uma diretiva Angular que permite acessar um elemento do DOM ou
   * um componente filho diretamente no TypeScript.
   * Aqui usamos a template reference #modalElement do HTML para acessar o DOM do modal.
   */
  @ViewChild('modalElement') modalElementRef!: ElementRef;

  /**
   * @Output é um decorator do Angular que permite emitir eventos para o componente pai.
   * Esse EventEmitter será chamado quando o usuário clicar no botão "Confirmar".
   * Exemplo de uso no pai: (confirmed)="executarAcao()"
   */
  @Output() confirmed = new EventEmitter<void>();

  // Guarda a instância do modal do Bootstrap
  private modalInstance: any;

  /**
   * Método público para abrir o modal.
   * Ele usa a API do Bootstrap para criar e exibir o modal dinamicamente.
   */
  openModal(): void {
    if (this.modalElementRef) {
      this.modalInstance = new bootstrap.Modal(this.modalElementRef.nativeElement);
      this.modalInstance.show();
    }
  }

  /**
   * Método para fechar o modal.
   * Também usa a API JavaScript do Bootstrap.
   */
  closeModal(): void {
    if (this.modalInstance) {
      this.modalInstance.hide();
    }
  }

  /**
   * Método chamado ao clicar no botão "Confirmar".
   * Emite o evento para o pai (confirmado) e fecha o modal.
   */
  confirm(): void {
    this.confirmed.emit(); // Dispara o evento para o pai
    this.closeModal();     // Fecha o modal após confirmar
  }

}