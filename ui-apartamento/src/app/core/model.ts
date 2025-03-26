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

export class Apartamento {
    id?: number;
    numeroApartamento?: string;
    descricao?: string;
    statusApartamento?: string;
    medidor?: string;
    predio: Predio = new Predio();
}

export class Predio {
    id?: number;
    descricao?: string;
    cep?: string;
    logradouro?: string;
    complemento?: string;
    bairro?: string;
    uf?: string;
    localidade?: string;
    numero?: string;
}

export class PredioFilter {
    id?: string;
    pagina = 0;
    intensPorPagina = 5;
}

export class ApartamentoFilter {
    id?: string;
    pagina = 0;
    intensPorPagina = 5;
}

