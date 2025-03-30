import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Apartamento, ApartamentoFilter } from '../core/model';
import { AUTH_CONFIG } from '../core/auth.config';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApartamentoService {

  apartamentoUrl: string = `${environment.apiUrl}/apartamentos`;

  constructor(private http: HttpClient) { }

  private getAuthHeaders(): HttpHeaders {
    const auth = btoa(`${AUTH_CONFIG.username}:${AUTH_CONFIG.password}`);
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Basic ${auth}`
    });
  }

  create(apartamento: Apartamento): Promise<Apartamento> {
    return this.http.post<Apartamento>(this.apartamentoUrl, apartamento, { headers: this.getAuthHeaders() }).toPromise();
  }

  update(apartamento: Apartamento): Promise<Apartamento> {
    return this.http.put<Apartamento>(`${this.apartamentoUrl}/${apartamento.id}`, apartamento, { headers: this.getAuthHeaders() }).toPromise();
  }

  async findAll(): Promise<Apartamento[]> {
    const response = await this.http.get<Apartamento[]>(`${this.apartamentoUrl}`, {
      headers: this.getAuthHeaders(),
      responseType: 'json'
    }).toPromise();

    return response ?? [];
  }

  delete(id: number): Promise<void> {
    return this.http.delete(`${this.apartamentoUrl}/${id}`, { headers: this.getAuthHeaders() }).toPromise()
      .then(() => {})
      .catch(() => {
        console.log("Erro ao processar sua requisição");
      });
  }

  findById(id: number): Promise<Apartamento> {
    return this.http.get<Apartamento>(`${this.apartamentoUrl}/${id}`, { headers: this.getAuthHeaders() }).toPromise();
  }

  async filter(filter: ApartamentoFilter): Promise<{ apartamentos: Apartamento[], total: number }> {
    let params = new HttpParams()
      .set('page', filter.pagina.toString())
      .set('size', filter.intensPorPagina.toString());

    if (filter.id) {
      params = params.set('id', filter.id);
    }

    const response: any = await this.http
      .get(`${this.apartamentoUrl}/filter`, { headers: this.getAuthHeaders(), params })
      .toPromise();

    return {
      apartamentos: response.content,
      total: response.totalElements
    };
  }

}
