import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ValorFormComponent } from './valor-form/valor-form.component';
import { ValorListComponent } from './valor-list/valor-list.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { ValorRoutingModule } from './valor-routing.module';
import { NgxCurrencyModule } from 'ngx-currency';



@NgModule({
  declarations: [ValorFormComponent, ValorListComponent],
  imports: [
    FormsModule,
    CommonModule,
    ValorRoutingModule,
    SharedModule,
    NgxCurrencyModule

  ],
  exports: [ValorFormComponent, ValorListComponent]
})
export class ValorModule { }
