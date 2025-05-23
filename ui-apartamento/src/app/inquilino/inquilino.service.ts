import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Inquilino, InquilinoFilter } from '../core/model';

@Injectable({
  providedIn: 'root'
})
export class InquilinoService {

  inquilinoUrl: string = `http://localhost:8089/inquilinos`

  constructor(private http: HttpClient) { }

  create(inquilino: Inquilino): Promise<Inquilino> {
    return this.http.post<Inquilino>(this.inquilinoUrl, inquilino).toPromise();
  }

  update(inquilino: Inquilino): Promise<Inquilino> {
    return this.http.put<Inquilino>(`${this.inquilinoUrl}/${inquilino.id}`, inquilino).toPromise();
  }

  async findAll(): Promise<Inquilino[]> {
    const response = await this.http.get<Inquilino[]>(`${this.inquilinoUrl}`, { responseType: 'json' }).toPromise();
    return response ?? [];
  }

  delete(id: number): Promise<void> {
    return this.http.delete(`${this.inquilinoUrl}/${id}`).toPromise()
      .then(response => {})
      .catch(error => {
        console.log("Erro ao processar sua requisição");
      });
  }

  findById(id: number): Promise<Inquilino> {
    return this.http.get<Inquilino>(`${this.inquilinoUrl}/${id}`).toPromise();
  }

  async filter(filter: InquilinoFilter): Promise<{ inquilinos: Inquilino[], total: number }> {
    let params = new HttpParams()
      .set('page', filter.pagina.toString())
      .set('size', filter.intensPorPagina.toString());

    if (filter.cpf) {
      params = params.set('cpf', filter.cpf);
    }

    const response: any = await this.http
      .get(`${this.inquilinoUrl}/filter`, { params })
      .toPromise();

    return {
      inquilinos: response.content,
      total: response.totalElements
    };
  }

}
