import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApartamentoFormComponent } from './apartamento-form/apartamento-form.component';
import { ApartamentoListComponent } from './apartamento-list/apartamento-list.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { ApartamentoRoutingModule } from './apartamento-routing.module';



@NgModule({
  declarations: [
    ApartamentoFormComponent,
    ApartamentoListComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    SharedModule,
    ApartamentoRoutingModule
  ],
  exports: [
    ApartamentoFormComponent,
    ApartamentoListComponent
  ]
})
export class ApartamentoModule { }
