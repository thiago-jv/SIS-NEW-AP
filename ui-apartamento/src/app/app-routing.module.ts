// Importa o módulo principal de rotas do Angular
import { NgModule } from '@angular/core';

// Importa as ferramentas para configuração de rotas
import { RouterModule, Routes } from '@angular/router';

// Define o array de rotas da aplicação
const routes: Routes = [

  // Rota para o módulo de Diário utilizando carregamento preguiçoso (lazy loading)
  // Isso melhora o desempenho, pois o módulo só será carregado quando o caminho "diario" for acessado
    {
      path: 'diario',
      loadChildren: () => import('./diario/diario.module').then(m => m.DiarioModule)
    },
    {
      path: 'predio',
      loadChildren: () => import('./predio/predio.module').then(m => m.PredioModule)
    },
    {
      path: 'apartamento',
      loadChildren: () => import('./apartamento/apartamento.module').then(m => m.ApartamentoModule)
    }
  ];

// Decorador que define o módulo de roteamento principal da aplicação
@NgModule({
  imports: [
    // Inicializa o roteamento principal com as rotas declaradas acima
    RouterModule.forRoot(routes)
  ],
  exports: [
    // Exporta RouterModule para que fique disponível em toda a aplicação
    RouterModule
  ]
})
export class AppRoutingModule { }


/* 

RouterModule	Módulo do Angular responsável pelo roteamento entre componentes.
Routes	      Interface que define as rotas da aplicação.
forRoot()	    Método usado para configurar rotas principais da aplicação.
loadChildren	Habilita o Lazy Loading, carregando módulos apenas quando necessários.
NgModule	    Define um módulo Angular, onde são importados e exportados outros módulos.

*/