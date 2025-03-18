package apartamento.com.core.utils;

import java.io.Serializable;
import java.math.BigDecimal;

public class Constantes implements Serializable{

	private static final long serialVersionUID = 1L;
	public static final BigDecimal VALOR_ZERO = new BigDecimal(0);
	public static final String BANDEIRA_AMARELA = "0.960143";
	public static final String URI_CEP = "http://viacep.com.br/ws/{cep}/json/";
	
	public static final String DISPONIVEL = "DISPONIVEL";
	public static final String OCUPADO = "OCUPADO";
	public static final String MANUTENCAO = "MANUTENCAO";
	
	public static final String ATIVO = "ATIVO";
	public static final String INATIVO = "INATIVO";
	
	public static final String PAGO = "PAGO";
	public static final String DEBITO = "DEBITO";
	
	public static final String ABERTO = "ABERTO";
	public static final String FECHADO = "FECHADO";
	
	public static final String SIM = "SIM";
	public static final String NAO = "NAO";
	
	public static final String MASCULINO = "MASCULINO";
	public static final String FEMENINO = "FEMENINO";
	public static final String OUTROS = "OUTROS";

	private Constantes(){}

}

