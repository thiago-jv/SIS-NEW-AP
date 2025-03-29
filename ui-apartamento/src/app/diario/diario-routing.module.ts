import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DiarioFormComponent } from './diario-form/diario-form.component';
import { DiarioListComponent } from './diario-list/diario-list.component';

const routes: Routes = [
  { path: 'new', component: DiarioFormComponent },
  { path: 'list', component: DiarioListComponent },
  { path: ':id', component: DiarioFormComponent }
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

export class DiarioRoutingModule { }
