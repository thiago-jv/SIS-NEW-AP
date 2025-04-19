import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { HandlerService } from 'src/app/core/handler.service';
import Notiflix from 'notiflix';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent {

  constructor(
    private authService: AuthService,
    private router: Router,
    private handler: HandlerService
  ) { }

  login(usuario: string, senha: string) {
    this.authService.login(usuario, senha)
      .then(() => {
        Notiflix.Notify.success('Login realizado com sucesso!');
        this.router.navigate(['predio/new']);
      })
      .catch(error => {
        Notiflix.Notify.failure('Login ou senha invalidos');
        this.handler.handle(error);
      });
  }

}
