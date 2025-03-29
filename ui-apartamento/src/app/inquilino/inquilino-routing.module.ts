import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InquilinoFormComponent } from './inquilino-form/inquilino-form.component';
import { InquilinoListComponent } from './inquilino-list/inquilino-list.component';

const routes: Routes = [
  { path: 'new', component: InquilinoFormComponent },
  { path: 'list', component: InquilinoListComponent },
  { path: ':id', component: InquilinoFormComponent }
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
export class InquilinoRoutingModule { }
