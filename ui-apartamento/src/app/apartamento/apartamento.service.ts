import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Apartamento, ApartamentoFilter } from '../core/model';

@Injectable({
  providedIn: 'root'
})
export class ApartamentoService {

  apartamentoUrl: string = `http://localhost:8089/apartamentos`;

  constructor(private http: HttpClient) { }


  create(apartamento: Apartamento): Promise<Apartamento> {
    return this.http.post<Apartamento>(this.apartamentoUrl, apartamento).toPromise();
  }

  update(apartamento: Apartamento): Promise<Apartamento> {
    return this.http.put<Apartamento>(`${this.apartamentoUrl}/${apartamento.id}`, apartamento).toPromise();
  }

  async findAll(): Promise<Apartamento[]> {
    const response = await this.http.get<Apartamento[]>(`${this.apartamentoUrl}`, {
      responseType: 'json'
    }).toPromise();

    return response ?? [];
  }

  delete(id: number): Promise<void> {
    return this.http.delete(`${this.apartamentoUrl}/${id}`).toPromise()
      .then(() => {})
      .catch(() => {
        console.log("Erro ao processar sua requisição");
      });
  }

  findById(id: number): Promise<Apartamento> {
    return this.http.get<Apartamento>(`${this.apartamentoUrl}/${id}`).toPromise();
  }

  async filter(filter: ApartamentoFilter): Promise<{ apartamentos: Apartamento[], total: number }> {
    let params = new HttpParams()
      .set('page', filter.pagina.toString())
      .set('size', filter.intensPorPagina.toString());

    if (filter.id) {
      params = params.set('id', filter.id);
    }

    const response: any = await this.http
      .get(`${this.apartamentoUrl}/filter`, { params })
      .toPromise();

    return {
      apartamentos: response.content,
      total: response.totalElements
    };
  }

}
