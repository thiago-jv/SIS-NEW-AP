export class Diario {
    id?: number;
    descricao?: string;
    dataRegistro?: Date
}

export class DiarioFilter {
    id?: string;
    pagina = 0;
    intensPorPagina = 5;
  }