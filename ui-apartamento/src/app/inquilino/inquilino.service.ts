import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Inquilino, InquilinoFilter } from '../core/model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InquilinoService {

  private inquilinoUrl: string = `${environment.apiUrl}/inquilinos`;

  constructor(private http: HttpClient) {}

  create(inquilino: Inquilino): Promise<Inquilino> {
    return this.http.post<Inquilino>(this.inquilinoUrl, inquilino).toPromise();
  }

  update(inquilino: Inquilino): Promise<Inquilino> {
    return this.http.put<Inquilino>(`${this.inquilinoUrl}/${inquilino.id}`, inquilino).toPromise();
  }

  async findAll(): Promise<Inquilino[]> {
    const response = await this.http.get<Inquilino[]>(`${this.inquilinoUrl}`).toPromise();
    return response ?? [];
  }

  delete(id: number): Promise<void> {
    return this.http.delete<void>(`${this.inquilinoUrl}/${id}`).toPromise()
      .catch(error => {
        console.log("Erro ao processar sua requisição:", error);
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
