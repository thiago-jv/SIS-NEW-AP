import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Diario } from '../core/model';


@Injectable({
  providedIn: 'root'
})
export class DiarioService {

  diarioUrl: string = `http://localhost:8089/diarios`

  constructor(private http: HttpClient) { }

  create(diario: Diario): Promise<Diario> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<Diario>(this.diarioUrl, diario, { headers }).toPromise();
  }

  update(diario: Diario): Promise<Diario> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put<Diario>(`${this.diarioUrl}/${diario.id}`, diario, { headers }).toPromise();
  }

  async findAll(): Promise<Diario[]>{
    const response = await this.http.get<Diario[]>(`${this.diarioUrl}`, {
      responseType: 'json'
    }).toPromise();
    return response ?? [];
  }

  delete(id: number): Promise<void> {
    return this.http.delete(`${this.diarioUrl}/${id}`).toPromise()
    .then(response => {})
    .catch(error => {
      console.log("Erro ao processar sua requisição")
    });
  }

  findById(id: number): Promise<Diario> {
    return this.http.get<Diario>(`${this.diarioUrl}/${id}`).toPromise();
  }


}
