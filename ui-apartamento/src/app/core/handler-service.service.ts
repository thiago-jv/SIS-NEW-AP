import { Injectable } from '@angular/core';
// Importa a biblioteca de notificações visuais Notiflix
import Notiflix from 'notiflix';

@Injectable({
  providedIn: 'root' // Torna o serviço disponível para toda a aplicação
})
export class HandlerServiceService {

  constructor() {}

  /**
   * Método responsável por lidar com erros HTTP ou genéricos.
   * Exibe uma notificação amigável ao usuário.
   *
   * @param errorResponse - O erro capturado (pode ser string, objeto de erro HTTP ou erro de rede)
   */
  handle(errorResponse: any): void {
    let msg = 'Erro inesperado ao processar a solicitação.'; // Mensagem padrão
    // Caso o erro seja uma string simples
    if (typeof errorResponse === 'string') {
      msg = errorResponse;
    }
    // Para outros tipos de erro genérico (500+, rede, etc)
    else {
      console.error('Erro inesperado:', errorResponse);
    }
    // Exibe a notificação (casos síncronos)
    Notiflix.Notify.failure(msg);
  }
}
