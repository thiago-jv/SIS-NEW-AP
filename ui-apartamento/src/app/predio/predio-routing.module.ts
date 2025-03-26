import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PredioFormComponent } from './predio-form/predio-form.component';
import { PredioListComponent } from './predio-list/predio-list.component';

const routes: Routes = [
  { path: 'new', component: PredioFormComponent },
  { path: 'list', component: PredioListComponent },
  { path: ':id', component: PredioFormComponent }
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
export class PredioRoutingModule { }
