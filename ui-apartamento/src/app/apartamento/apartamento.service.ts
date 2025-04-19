import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Apartamento, ApartamentoFilter } from '../core/model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApartamentoService {

  private apartamentoUrl: string = `${environment.apiUrl}/apartamentos`;

  constructor(private http: HttpClient) {}

  create(apartamento: Apartamento): Promise<Apartamento> {
    return this.http.post<Apartamento>(this.apartamentoUrl, apartamento).toPromise();
  }

  update(apartamento: Apartamento): Promise<Apartamento> {
    return this.http.put<Apartamento>(`${this.apartamentoUrl}/${apartamento.id}`, apartamento).toPromise();
  }

  async findAll(): Promise<Apartamento[]> {
    const response = await this.http.get<Apartamento[]>(this.apartamentoUrl).toPromise();
    return response ?? [];
  }

  delete(id: number): Promise<void> {
    return this.http.delete<void>(`${this.apartamentoUrl}/${id}`).toPromise()
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
      params = params.set('id', filter.id.toString());
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
