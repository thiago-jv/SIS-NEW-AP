// Importa o decorator NgModule para definir um módulo Angular
import { ErrorHandler, NgModule } from '@angular/core';

// Importa funcionalidades comuns como *ngIf, *ngFor, etc.
import { CommonModule } from '@angular/common';

// Importa o componente da navbar que será declarado neste módulo
import { NavbarComponent } from './navbar/navbar.component';

// Importa o RouterModule para permitir uso de diretivas de roteamento como routerLink
import { RouterModule } from '@angular/router';
import { HandlerServiceService } from './handler-service.service';
import { Title } from '@angular/platform-browser';

@NgModule({
  // declarations: Aqui declaramos os componentes, diretivas e pipes que pertencem a este módulo
  declarations: [
    NavbarComponent // Declaramos o componente da barra de navegação para que o Angular reconheça
  ],

  // imports: Aqui importamos outros módulos necessários para este módulo funcionar
  imports: [
    CommonModule,   // Importa recursos básicos do Angular (ngIf, ngFor, etc.)
    RouterModule    // Importa o módulo de rotas para poder usar routerLink no HTML
  ],

  // exports: Tudo que for exportado aqui poderá ser usado por outros módulos que importarem o CoreModule
  exports: [
    NavbarComponent // Exporta a navbar para que fique disponível em outros módulos (ex: AppComponent)
  ],
  providers: [
    HandlerServiceService,
    Title
  ]
})

// Definimos a classe CoreModule, que é um módulo compartilhado para funcionalidades centrais da aplicação.
export class CoreModule { }



/* 

@NgModule	    Decorator que define um módulo Angular.
declarations	Lista de componentes, pipes e diretivas pertencentes ao módulo.
imports	      Outros módulos que esse módulo precisa (ex: CommonModule).
exports	      Componentes/diretivas/pipes que ficarão disponíveis fora desse módulo.
CommonModule	Traz diretivas como *ngIf, *ngFor, etc.
RouterModule	Permite usar diretivas de navegação ([routerLink], router-outlet, etc).

*/