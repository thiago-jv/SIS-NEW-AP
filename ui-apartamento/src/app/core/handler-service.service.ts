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

    // Caso o erro siga o padrão moderno de respostas de erro do Angular (HttpErrorResponse)
    else if (errorResponse.error && errorResponse.error.mensagemUsuario) {
      msg = errorResponse.error.mensagemUsuario;
    }

    // Caso seja uma instância do antigo Response (Angular <4 ou libs customizadas)
    else if (
      errorResponse instanceof Response &&
      errorResponse.status >= 400 &&
      errorResponse.status <= 499
    ) {
      msg = 'Ocorreu um erro ao processar a sua solicitação.';

      // Tenta extrair a mensagem do corpo da resposta (caso seja JSON)
      try {
        errorResponse.json().then((body: any) => {
          if (body && body[0]?.mensagemUsuario) {
            msg = body[0].mensagemUsuario;
          }

          // Exibe a notificação após a extração assíncrona
          Notiflix.Notify.failure(msg);
        }).catch(() => {
          // Se não conseguir fazer o parse do JSON, exibe a mensagem padrão
          Notiflix.Notify.failure(msg);
        });
        return; // já tratou o erro dentro do .then()
      } catch (e) {
        // fallback silencioso
      }

      console.error('Erro HTTP 4xx:', errorResponse);
    }

    // Para outros tipos de erro genérico (500+, rede, etc)
    else {
      console.error('Erro inesperado:', errorResponse);
    }

    // Exibe a notificação (casos síncronos)
    Notiflix.Notify.failure(msg);
  }
}
