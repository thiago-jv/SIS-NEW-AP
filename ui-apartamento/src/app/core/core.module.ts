import { ErrorHandler, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { HandlerService } from './handler.service';
import { Title } from '@angular/platform-browser';

@NgModule({
  declarations: [
    NavbarComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    NavbarComponent
  ],
  providers: [
    HandlerService,
    Title
  ]
})
export class CoreModule { }
