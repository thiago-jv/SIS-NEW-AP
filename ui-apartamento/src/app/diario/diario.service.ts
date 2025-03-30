import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Diario, DiarioFilter } from '../core/model';
import { AUTH_CONFIG } from '../core/auth.config';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DiarioService {

  diarioUrl: string = `${environment.apiUrl}/diarios`;

  constructor(private http: HttpClient) { }

  private getAuthHeaders(): HttpHeaders {
    const auth = btoa(`${AUTH_CONFIG.username}:${AUTH_CONFIG.password}`);

    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Basic ${auth}`
    });
  }

  create(diario: Diario): Promise<Diario> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<Diario>(this.diarioUrl, diario, { headers: this.getAuthHeaders() }).toPromise();
  }

  update(diario: Diario): Promise<Diario> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put<Diario>(`${this.diarioUrl}/${diario.id}`, diario, { headers: this.getAuthHeaders() }).toPromise();
  }

  async findAll(): Promise<Diario[]> {
    const response = await this.http.get<Diario[]>(`${this.diarioUrl}`, { headers: this.getAuthHeaders(), responseType: 'json' }).toPromise();
    return response ?? [];
  }

  delete(id: number): Promise<void> {
    return this.http.delete(`${this.diarioUrl}/${id}`, { headers: this.getAuthHeaders() }).toPromise()
      .then(response => {})
      .catch(error => {
        console.log("Erro ao processar sua requisição");
      });
  }

  findById(id: number): Promise<Diario> {
    return this.http.get<Diario>(`${this.diarioUrl}/${id}`, { headers: this.getAuthHeaders() }).toPromise();
  }

  async filter(filter: DiarioFilter): Promise<{ diarios: Diario[], total: number }> {
    let params = new HttpParams()
      .set('page', filter.pagina.toString())
      .set('size', filter.intensPorPagina.toString());

    if (filter.id) {
      params = params.set('id', filter.id);
    }

    const response: any = await this.http
      .get(`${this.diarioUrl}/filter`, { headers: this.getAuthHeaders(), params })
      .toPromise();

    return {
      diarios: response.content,
      total: response.totalElements
    };
  }
}
