import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from 'src/app/seguranca/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  emailUsuario: string | null = null;

  constructor(private jwtHelper: JwtHelperService,
    public auth: AuthService
  ) { }

  ngOnInit(): void {
    const token = localStorage.getItem('token');

    if (token && !this.jwtHelper.isTokenExpired(token)) {
      const decodedToken = this.jwtHelper.decodeToken(token);
      this.emailUsuario = decodedToken?.email || decodedToken?.sub || null;
    }
  }
}
