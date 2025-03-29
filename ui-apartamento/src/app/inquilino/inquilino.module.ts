import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InquilinoFormComponent } from './inquilino-form/inquilino-form.component';
import { InquilinoListComponent } from './inquilino-list/inquilino-list.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { InquilinoRoutingModule } from './inquilino-routing.module';
import { NgxMaskModule } from 'ngx-mask';


@NgModule({
  declarations: [InquilinoFormComponent, InquilinoListComponent],
  imports: [
    FormsModule,
    CommonModule,
    InquilinoRoutingModule,
    SharedModule,
    NgxMaskModule.forRoot()
  ],
  exports: [InquilinoFormComponent, InquilinoListComponent]
})
export class InquilinoModule { }
