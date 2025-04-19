import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Diario, DiarioFilter } from '../core/model';

@Injectable({
  providedIn: 'root'
})
export class DiarioService {

  diarioUrl: string = `http://localhost:8089/diarios`;

  constructor(private http: HttpClient) { }

  create(diario: Diario): Promise<Diario> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<Diario>(this.diarioUrl, diario).toPromise();
  }

  update(diario: Diario): Promise<Diario> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put<Diario>(`${this.diarioUrl}/${diario.id}`, diario).toPromise();
  }

  async findAll(): Promise<Diario[]> {
    const response = await this.http.get<Diario[]>(`${this.diarioUrl}`, { responseType: 'json' }).toPromise();
    return response ?? [];
  }

  delete(id: number): Promise<void> {
    return this.http.delete(`${this.diarioUrl}/${id}`).toPromise()
      .then(response => {})
      .catch(error => {
        console.log("Erro ao processar sua requisição");
      });
  }

  findById(id: number): Promise<Diario> {
    return this.http.get<Diario>(`${this.diarioUrl}/${id}`).toPromise();
  }

  async filter(filter: DiarioFilter): Promise<{ diarios: Diario[], total: number }> {
    let params = new HttpParams()
      .set('page', filter.pagina.toString())
      .set('size', filter.intensPorPagina.toString());

    if (filter.id) {
      params = params.set('id', filter.id);
    }

    const response: any = await this.http
      .get(`${this.diarioUrl}/filter`, { params })
      .toPromise();

    return {
      diarios: response.content,
      total: response.totalElements
    };
  }
}
