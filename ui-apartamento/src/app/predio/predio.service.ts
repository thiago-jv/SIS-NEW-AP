import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Predio, PredioFilter } from '../core/model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PredioService {

  private predioUrl: string = `${environment.apiUrl}/predios`;

  constructor(private http: HttpClient) {}

  create(predio: Predio): Promise<Predio> {
    return this.http.post<Predio>(this.predioUrl, predio).toPromise();
  }

  update(predio: Predio): Promise<Predio> {
    return this.http.put<Predio>(`${this.predioUrl}/${predio.id}`, predio).toPromise();
  }

  async findAll(): Promise<Predio[]> {
    const response = await this.http.get<Predio[]>(`${this.predioUrl}`).toPromise();
    return response ?? [];
  }

  delete(id: number): Promise<void> {
    return this.http.delete<void>(`${this.predioUrl}/${id}`).toPromise()
      .catch(error => {
        console.log("Erro ao processar sua requisição:", error);
      });
  }

  findById(id: number): Promise<Predio> {
    return this.http.get<Predio>(`${this.predioUrl}/${id}`).toPromise();
  }

  async filter(filter: PredioFilter): Promise<{ predios: Predio[], total: number }> {
    let params = new HttpParams()
      .set('page', filter.pagina.toString())
      .set('size', filter.intensPorPagina.toString());

    if (filter.id) {
      params = params.set('id', filter.id.toString());
    }

    const response: any = await this.http
      .get(`${this.predioUrl}/filter`, { params })
      .toPromise();

    return {
      predios: response.content,
      total: response.totalElements
    };
  }

}
