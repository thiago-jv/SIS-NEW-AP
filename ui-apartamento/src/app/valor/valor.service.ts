import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Valor } from '../core/model';
import { AUTH_CONFIG } from '../core/auth.config';

@Injectable({
  providedIn: 'root'
})
export class ValorService {

  valorUrl: string = `http://localhost:8089/valors`

  constructor(private http: HttpClient) { }

  private getAuthHeaders(): HttpHeaders {
    const auth = btoa(`${AUTH_CONFIG.username}:${AUTH_CONFIG.password}`);
  
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Basic ${auth}`
    });
  }

  create(valor: Valor): Promise<Valor> {
    return this.http.post<Valor>(this.valorUrl, valor, { headers: this.getAuthHeaders() }).toPromise();
  }

  update(valor: Valor): Promise<Valor> {
    return this.http.put<Valor>(`${this.valorUrl}/${valor.id}`, valor, { headers: this.getAuthHeaders() }).toPromise();
  }

  async findAll(): Promise<Valor[]> {
    const response = await this.http.get<Valor[]>(`${this.valorUrl}`, { headers: this.getAuthHeaders(), responseType: 'json' }).toPromise();
    return response ?? [];
  }

  delete(id: number): Promise<void> {
    return this.http.delete(`${this.valorUrl}/${id}`, { headers: this.getAuthHeaders() }).toPromise()
      .then(response => {})
      .catch(error => {
        console.log("Erro ao processar sua requisição");
      });
  }

  findById(id: number): Promise<Valor> {
    return this.http.get<Valor>(`${this.valorUrl}/${id}`, { headers: this.getAuthHeaders() }).toPromise();
  }

}
