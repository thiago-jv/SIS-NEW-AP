package apartamento.com.common.http.dto.apartamento;

import apartamento.com.common.http.dto.predio.PredioResponse;

public record ApartamentoResponse(Long id, String numeroApartamento, String descricao, String medidor,
                                  String statusApartamento, PredioResponse predio) { }
