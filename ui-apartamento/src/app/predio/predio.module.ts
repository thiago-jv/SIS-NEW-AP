import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PredioFormComponent } from './predio-form/predio-form.component';
import { PredioListComponent } from './predio-list/predio-list.component';
import { FormsModule } from '@angular/forms';
import { PredioRoutingModule } from './predio-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    PredioFormComponent, 
    PredioListComponent
  ],
  imports: [
    FormsModule,             // Permite o uso de formulários reativos com [(ngModel)], validações, etc.
    CommonModule,            // Importa recursos comuns do Angular como *ngIf, *ngFor, etc.
    PredioRoutingModule,     // Importa as rotas definidas para este módulo
    SharedModule             // Importa componentes reutilizáveis como modal de confirmação
  ],
  exports: [
    PredioFormComponent, 
    PredioListComponent
  ]
})
export class PredioModule { }
