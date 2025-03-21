import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DiarioFormComponent } from './diario-form/diario-form.component';
import { DiarioRoutingModule } from './diario-routing.module';
import { FormsModule } from '@angular/forms';
import { DiarioListComponent } from './diario-list/diario-list.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    DiarioFormComponent,
    DiarioListComponent,
  ],
  imports: [
    FormsModule,
    CommonModule,
    DiarioRoutingModule,
    SharedModule

  ],
  exports: [
    DiarioFormComponent
  ]
})
export class DiarioModule { }
