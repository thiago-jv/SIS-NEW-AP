import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApartamentoFormComponent } from './apartamento-form/apartamento-form.component';
import { ApartamentoListComponent } from './apartamento-list/apartamento-list.component';

const routes: Routes = [
  { path: 'new', component: ApartamentoFormComponent },
  { path: 'list', component: ApartamentoListComponent },
  { path: ':id', component: ApartamentoFormComponent }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class ApartamentoRoutingModule { }
