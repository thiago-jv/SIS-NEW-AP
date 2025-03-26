import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApartamentoFormComponent } from './apartamento-form/apartamento-form.component';
import { ApartamentoListComponent } from './apartamento-list/apartamento-list.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { ApartamentoRoutingModule } from './apartamento-routing.module';



@NgModule({
  declarations: [
    ApartamentoFormComponent, 
    ApartamentoListComponent
  ],
  imports: [
    FormsModule,             // Permite o uso de formulários reativos com [(ngModel)], validações, etc.
    CommonModule,            // Importa recursos comuns do Angular como *ngIf, *ngFor, etc.
    ApartamentoRoutingModule,// Importa as rotas definidas para este módulo
    SharedModule             // Importa componentes reutilizáveis como modal de confirmação
  ],
  exports: [
    ApartamentoFormComponent, 
    ApartamentoListComponent
  ]
})
export class ApartamentoModule { }
