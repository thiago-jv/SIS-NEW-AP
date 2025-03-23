// Importa o decorator @NgModule que define um módulo Angular
import { NgModule } from '@angular/core';

// Importa funcionalidades comuns como diretivas *ngIf, *ngFor, etc. (não está sendo usado diretamente aqui, mas geralmente é incluído)
import { CommonModule } from '@angular/common';

// Importa os módulos e tipos necessários para configurar rotas no Angular
import { RouterModule, Routes } from '@angular/router';

// Importa os componentes que serão usados nas rotas
import { DiarioFormComponent } from './diario-form/diario-form.component';
import { DiarioListComponent } from './diario-list/diario-list.component';

// Define as rotas específicas para o módulo de Diário
const routes: Routes = [
  // Rota para criar novo diário: /diario/new
  { path: 'new', component: DiarioFormComponent },

  // Rota para listar os diários: /diario/list
  { path: 'list', component: DiarioListComponent },

  // Rota para editar um diário com ID específico: /diario/123
  { path: ':id', component: DiarioFormComponent }
];

// Define um módulo Angular que configura rotas para os componentes de diário
@NgModule({
  // Não declara componentes aqui pois este módulo é somente de rotas
  declarations: [],

  // Importa RouterModule com as rotas definidas para serem adicionadas ao sistema de rotas da aplicação
  imports: [
    RouterModule.forChild(routes) // forChild é usado em módulos de funcionalidade (feature modules)
  ],

  // Exporta RouterModule para que as rotas fiquem disponíveis para outros módulos que importarem este módulo
  exports: [
    RouterModule
  ]
})

// Define e exporta a classe DiarioRoutingModule que será responsável pelas rotas do módulo Diário
export class DiarioRoutingModule { }



/* 

@NgModule                    	Decorador que define um módulo Angular.
RouterModule.forChild(routes)	Registra rotas no contexto de um módulo de funcionalidade (feature module).
path: 'new' / 'list' / ':id'	Define as URLs acessíveis pelo usuário.
component	                    Define qual componente será renderizado naquela rota.
exports: [RouterModule]	      Permite que outros módulos usem essas rotas.

*/