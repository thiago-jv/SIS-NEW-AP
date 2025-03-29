import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PredioFormComponent } from './predio-form/predio-form.component';
import { PredioListComponent } from './predio-list/predio-list.component';
import { FormsModule } from '@angular/forms';
import { PredioRoutingModule } from './predio-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    PredioFormComponent,
    PredioListComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    PredioRoutingModule,
    SharedModule
  ],
  exports: [
    PredioFormComponent,
    PredioListComponent
  ]
})
export class PredioModule { }
