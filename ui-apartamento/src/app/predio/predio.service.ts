import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Predio, PredioFilter } from '../core/model';

@Injectable({
  providedIn: 'root'
})
export class PredioService {

  predioUrl: string = `http://localhost:8089/predios`

  constructor(private http: HttpClient) { }

  create(predio: Predio): Promise<Predio> {
    return this.http.post<Predio>(this.predioUrl, predio).toPromise();
  }

  update(predio: Predio): Promise<Predio> {
    return this.http.put<Predio>(`${this.predioUrl}/${predio.id}`, predio).toPromise();
  }

  async findAll(): Promise<Predio[]> {
    const response = await this.http.get<Predio[]>(`${this.predioUrl}`, { responseType: 'json' }).toPromise();
    return response ?? [];
  }

  delete(id: number): Promise<void> {
    return this.http.delete(`${this.predioUrl}/${id}`).toPromise()
      .then(response => {})
      .catch(error => {
        console.log("Erro ao processar sua requisição");
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
      params = params.set('id', filter.id);
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
