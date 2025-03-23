// Importa o decorator @NgModule para definir um módulo Angular
import { NgModule } from '@angular/core';

// Importa funcionalidades comuns (como diretivas *ngIf, *ngFor, pipes, etc.)
import { CommonModule } from '@angular/common';

// Importa o componente de formulário de diário
import { DiarioFormComponent } from './diario-form/diario-form.component';

// Importa o módulo de rotas específicas do diário (feature routing module)
import { DiarioRoutingModule } from './diario-routing.module';

// Importa o módulo de formulários do Angular (necessário para usar ngModel, validações, etc.)
import { FormsModule } from '@angular/forms';

// Importa o componente de listagem de diários
import { DiarioListComponent } from './diario-list/diario-list.component';

// Importa o módulo compartilhado, que contém componentes, pipes e modais reutilizáveis (ex: modal de confirmação)
import { SharedModule } from '../shared/shared.module';

@NgModule({
  // Declara os componentes que pertencem a este módulo
  declarations: [
    DiarioFormComponent,     // Componente de criação/edição de diário
    DiarioListComponent      // Componente de listagem e filtro de diários
  ],

  // Importa outros módulos necessários para este módulo funcionar
  imports: [
    FormsModule,             // Permite o uso de formulários reativos com [(ngModel)], validações, etc.
    CommonModule,            // Importa recursos comuns do Angular como *ngIf, *ngFor, etc.
    DiarioRoutingModule,     // Importa as rotas definidas para este módulo
    SharedModule             // Importa componentes reutilizáveis como modal de confirmação
  ],

  // Exporta o componente DiarioFormComponent caso seja necessário em outros módulos
  exports: [
    DiarioFormComponent
  ]
})

// Define e exporta o módulo do Diário
export class DiarioModule { }



/* 

@NgModule	            Define um módulo no Angular.
declarations	        Declara os componentes que pertencem a este módulo.
imports	              Importa módulos necessários para que os componentes funcionem corretamente.
FormsModule	          Permite o uso de [(ngModel)], #ref="ngModel", validações etc.
CommonModule	        Oferece diretivas estruturais como *ngIf, *ngFor.
DiarioRoutingModule	  Importa as rotas definidas para este módulo.
SharedModule	Contém  componentes reutilizáveis compartilhados entre módulos.
exports	              Permite que componentes declarados neste módulo sejam usados fora dele.

*/