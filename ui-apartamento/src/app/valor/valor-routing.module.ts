import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ValorFormComponent } from './valor-form/valor-form.component';
import { ValorListComponent } from './valor-list/valor-list.component';

const routes: Routes = [
  { path: 'new', component: ValorFormComponent },
  { path: 'list', component: ValorListComponent },
  { path: ':id', component: ValorFormComponent }
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
export class ValorRoutingModule { }
