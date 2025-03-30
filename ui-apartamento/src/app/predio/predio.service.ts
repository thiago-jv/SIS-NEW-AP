import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Predio, PredioFilter } from '../core/model';
import { AUTH_CONFIG } from '../core/auth.config';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PredioService {

  predioUrl: string = `${environment.apiUrl}/predios`;

  constructor(private http: HttpClient) { }

  private getAuthHeaders(): HttpHeaders {
    const auth = btoa(`${AUTH_CONFIG.username}:${AUTH_CONFIG.password}`);

    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Basic ${auth}`
    });
  }

  create(predio: Predio): Promise<Predio> {
    return this.http.post<Predio>(this.predioUrl, predio, { headers: this.getAuthHeaders() }).toPromise();
  }

  update(predio: Predio): Promise<Predio> {
    return this.http.put<Predio>(`${this.predioUrl}/${predio.id}`, predio, { headers: this.getAuthHeaders() }).toPromise();
  }

  async findAll(): Promise<Predio[]> {
    const response = await this.http.get<Predio[]>(`${this.predioUrl}`, { headers: this.getAuthHeaders(), responseType: 'json' }).toPromise();
    return response ?? [];
  }

  delete(id: number): Promise<void> {
    return this.http.delete(`${this.predioUrl}/${id}`, { headers: this.getAuthHeaders() }).toPromise()
      .then(response => {})
      .catch(error => {
        console.log("Erro ao processar sua requisição");
      });
  }

  findById(id: number): Promise<Predio> {
    return this.http.get<Predio>(`${this.predioUrl}/${id}`, { headers: this.getAuthHeaders() }).toPromise();
  }

  async filter(filter: PredioFilter): Promise<{ predios: Predio[], total: number }> {
    let params = new HttpParams()
      .set('page', filter.pagina.toString())
      .set('size', filter.intensPorPagina.toString());

    if (filter.id) {
      params = params.set('id', filter.id);
    }

    const response: any = await this.http
      .get(`${this.predioUrl}/filter`, { headers: this.getAuthHeaders(), params })
      .toPromise();

    return {
      predios: response.content,
      total: response.totalElements
    };
  }

}
