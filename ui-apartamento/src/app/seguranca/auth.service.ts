import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  oauthTokenUrl = `${environment.apiUrl}/api/v1/auth`;
  refreshTokenUrl = `${environment.apiUrl}/api/v1/refresh-token`;
  jwtPayload: any;

  constructor(
    private http: HttpClient,
    private jwtHelper: JwtHelperService
  ) {
    this.carregarToken();
  }

  login(usuario: string, senha: string): Promise<void> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    const body = {
      username: usuario,
      password: senha
    };

    return this.http.post<any>(this.oauthTokenUrl, body, { headers })
      .toPromise()
      .then(response => {
        const token = response.accessToken;
        this.armazenarToken(token);
      })
      .catch(response => {
        if (response.status === 400 && response.error?.error === 'invalid_grant') {
          return Promise.reject('Usuário ou senha inválida!');
        }

        return Promise.reject(response);
      });
  }

  obterNovoAccessToken(): Promise<void> {
    return this.http.post<any>(`${environment.apiUrl}/api/v1/refresh-token`, 'grant_type=refresh_token', {
      withCredentials: true
    })
    .toPromise()
    .then(response => {
      const novoToken = response?.accessToken;
      if (novoToken) {
        this.armazenarToken(novoToken);
        console.log('Novo access token criado e armazenado com sucesso.');
      } else {
        console.warn('Nenhum token recebido no refresh.');
      }
      return Promise.resolve();
    })
    .catch(error => {
      console.error('Erro ao renovar token:', error);
      return Promise.resolve();
    });
  }


  private armazenarToken(token: string) {
    this.jwtPayload = this.jwtHelper.decodeToken(token);
    localStorage.setItem('token', token);
  }

  private carregarToken() {
    const token = localStorage.getItem('token');
    if (token) {
      this.armazenarToken(token);
    }
  }

  isAccessTokenInvalido(): boolean {
    const token = localStorage.getItem('token');
    return !token || this.jwtHelper.isTokenExpired(token);
  }

  logout() {
    this.jwtPayload = null;
    localStorage.removeItem('token');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  temPermissao(permissao: string): boolean {
    return this.jwtPayload && this.jwtPayload.roles.includes(permissao);
  }
}
