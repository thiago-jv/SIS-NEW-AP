import { Component, EventEmitter, Output, Input, ViewChild, ElementRef } from '@angular/core';

declare var bootstrap: any;
@Component({
  selector: 'app-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.css']
})
export class ConfirmationModalComponent {

  // @Input  -> permite receber valores dinamicos no componente como title
  @Input() title: string = 'Confirmação';

  // @Input -> permite receber valores dinamicos no componente como title
  @Input() message: string = 'Tem certeza que deseja continuar?';

  // ID dinâmico do modal
  @Input() modalId!: string;

  @ViewChild('modalElement') modalElementRef!: ElementRef;
 
  // @Output -> permite marcar uma propriedade que pode emitir eventos para fora do componente
  @Output() confirmed = new EventEmitter<void>(); // Evento de confirmação

  private modalInstance: any;

  
  openModal(): void {
    if (this.modalElementRef) {
      this.modalInstance = new bootstrap.Modal(this.modalElementRef.nativeElement);
      this.modalInstance.show();
    }
  }

  closeModal(): void {
    if (this.modalInstance) {
      this.modalInstance.hide();
    }
  }

  confirm(): void {
    this.confirmed.emit(); // Emite um evento para o componente pai
    this.closeModal();
  }

}
