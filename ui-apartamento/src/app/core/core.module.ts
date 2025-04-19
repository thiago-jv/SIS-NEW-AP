import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { HandlerService } from './handler.service';
import { Title } from '@angular/platform-browser';
import { AuthService } from '../seguranca/auth.service';

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
    AuthService,
    Title
  ]
})
export class CoreModule { }
