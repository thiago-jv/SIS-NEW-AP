import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Valor } from '../core/model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ValorService {

  private valorUrl: string = `${environment.apiUrl}/valors`;

  constructor(private http: HttpClient) {}

  create(valor: Valor): Promise<Valor> {
    return this.http.post<Valor>(this.valorUrl, valor).toPromise();
  }

  update(valor: Valor): Promise<Valor> {
    return this.http.put<Valor>(`${this.valorUrl}/${valor.id}`, valor).toPromise();
  }

  async findAll(): Promise<Valor[]> {
    const response = await this.http.get<Valor[]>(`${this.valorUrl}`).toPromise();
    return response ?? [];
  }

  delete(id: number): Promise<void> {
    return this.http.delete<void>(`${this.valorUrl}/${id}`).toPromise()
      .catch(error => {
        console.log("Erro ao processar sua requisição:", error);
      });
  }

  findById(id: number): Promise<Valor> {
    return this.http.get<Valor>(`${this.valorUrl}/${id}`).toPromise();
  }

}
