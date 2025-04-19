import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Valor } from '../core/model';

@Injectable({
  providedIn: 'root'
})
export class ValorService {

  valorUrl: string = `http://localhost:8089/valors`

  constructor(private http: HttpClient) { }

  create(valor: Valor): Promise<Valor> {
    return this.http.post<Valor>(this.valorUrl, valor, ).toPromise();
  }

  update(valor: Valor): Promise<Valor> {
    return this.http.put<Valor>(`${this.valorUrl}/${valor.id}`, valor).toPromise();
  }

  async findAll(): Promise<Valor[]> {
    const response = await this.http.get<Valor[]>(`${this.valorUrl}`, { responseType: 'json' }).toPromise();
    return response ?? [];
  }

  delete(id: number): Promise<void> {
    return this.http.delete(`${this.valorUrl}/${id}`, ).toPromise()
      .then(response => {})
      .catch(error => {
        console.log("Erro ao processar sua requisição");
      });
  }

  findById(id: number): Promise<Valor> {
    return this.http.get<Valor>(`${this.valorUrl}/${id}`,).toPromise();
  }

}
