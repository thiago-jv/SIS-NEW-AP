import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cep } from './model';

@Injectable({
  providedIn: 'root'
})
export class ViaCepService {

  apiUrl: string = "https://viacep.com.br/ws/";

  constructor(
    private http: HttpClient){
  }
 
  getByCep(cep: string): Promise<Cep> {
    return this.http.get<Cep>(`${this.apiUrl}${cep}/json`).toPromise();
  }

}
