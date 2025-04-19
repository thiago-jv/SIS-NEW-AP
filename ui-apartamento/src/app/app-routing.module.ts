import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
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
  },
  {
    path: 'valor',
    loadChildren: () => import('./valor/valor.module').then(m => m.ValorModule)
  },
  {
    path: 'inquilino',
    loadChildren: () => import('./inquilino/inquilino.module').then(m => m.InquilinoModule)
  },
  { path: 'login',
     loadChildren: () => import('./seguranca/seguranca.module').then(m => m.SegurancaModule)

  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
