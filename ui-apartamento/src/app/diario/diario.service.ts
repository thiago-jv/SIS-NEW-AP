import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Diario, DiarioFilter } from '../core/model';

@Injectable({
  providedIn: 'root'
})
export class DiarioService {

  private diarioUrl: string = `${environment.apiUrl}/diarios`;

  constructor(private http: HttpClient) {}

  create(diario: Diario): Promise<Diario> {
    return this.http.post<Diario>(this.diarioUrl, diario).toPromise();
  }

  update(diario: Diario): Promise<Diario> {
    return this.http.put<Diario>(`${this.diarioUrl}/${diario.id}`, diario).toPromise();
  }

  findAll(): Promise<Diario[]> {
    return this.http.get<Diario[]>(this.diarioUrl).toPromise();
  }

  delete(id: number): Promise<void> {
    return this.http.delete<void>(`${this.diarioUrl}/${id}`).toPromise()
      .catch(error => {
        console.log("Erro ao processar sua requisição:", error);
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
      params = params.set('id', filter.id.toString());
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
