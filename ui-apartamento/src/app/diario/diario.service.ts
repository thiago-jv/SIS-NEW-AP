// Importa o decorator @Injectable para declarar um serviço
import { Injectable } from '@angular/core';

// Importa as classes do Angular para requisições HTTP
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

// Importa as interfaces ou classes de modelo para Diário e Filtro
import { Diario, DiarioFilter } from '../core/model';

@Injectable({
  providedIn: 'root' // Torna o serviço disponível em toda a aplicação
})
export class DiarioService {

  // URL base da API de diários
  diarioUrl: string = `http://localhost:8089/diarios`

  // Injeta o HttpClient para fazer chamadas HTTP
  constructor(private http: HttpClient) { }

  // Método para criar um novo diário (POST)
  create(diario: Diario): Promise<Diario> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' }); // Define o tipo do conteúdo
    return this.http.post<Diario>(this.diarioUrl, diario, { headers }).toPromise(); // Retorna uma Promise
  }

  // Método para atualizar um diário existente (PUT)
  update(diario: Diario): Promise<Diario> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' }); // Define os headers
    return this.http.put<Diario>(`${this.diarioUrl}/${diario.id}`, diario, { headers }).toPromise(); // Requisição PUT
  }

  // Método para buscar todos os diários (GET)
  async findAll(): Promise<Diario[]> {
    const response = await this.http.get<Diario[]>(`${this.diarioUrl}`, {
      responseType: 'json' // Define o tipo de resposta
    }).toPromise();

    return response ?? []; // Retorna a lista ou array vazio se for null
  }

  // Método para deletar um diário por ID (DELETE)
  delete(id: number): Promise<void> {
    return this.http.delete(`${this.diarioUrl}/${id}`).toPromise()
      .then(response => {}) // Não retorna nada
      .catch(error => {
        console.log("Erro ao processar sua requisição");
      });
  }

  // Método para buscar um diário por ID (GET)
  findById(id: number): Promise<Diario> {
    return this.http.get<Diario>(`${this.diarioUrl}/${id}`).toPromise(); // Retorna o objeto Diário
  }

  // Método para filtrar os diários com paginação (GET + query params)
  async filter(filter: DiarioFilter): Promise<{ diarios: Diario[], total: number }> {
    // Cria os parâmetros de consulta (query string)
    let params = new HttpParams()
      .set('page', filter.pagina.toString()) // Número da página
      .set('size', filter.intensPorPagina.toString()); // Itens por página

    // Se o filtro tiver um ID, adiciona como parâmetro
    if (filter.id) {
      params = params.set('id', filter.id);
    }

    // Faz a requisição GET com os parâmetros
    const response: any = await this.http
      .get(`${this.diarioUrl}/filter`, { params })
      .toPromise();

    // Retorna a lista de diários e o total de registros
    return {
      diarios: response.content,
      total: response.totalElements
    };
  }

}
