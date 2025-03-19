package apartamento.com.common.utils;

import java.io.Serializable;

public class Messages implements Serializable {

    public static final String MSG_PREDIO_EM_USO = "Predio de código %d não pode ser removida, pois está em uso.";
    public static final String MSG_APARTAMENTO_EM_USO = "Apartamento de código %d não pode ser removida, pois está em uso.";
    public static final String MSG_APARTAMENTO_STATUS_EM_USO = "Apartamento de código %d não pode ser locado, pois está em uso.";
    public static final String MSG_APARTAMENTO_DEBITO = "Apartamento de código %d não pode ser fechado, pois está em débito.";
    public static final String MSG_INQUILINO_EM_USO = "Inquilino de código %d não pode ser removida, pois está em uso.";
    public static final String MSG_VALOR_EM_USO = "Valor de código %d não pode ser removida, pois está em uso.";
    public static final String MSG_CONTROLE_EM_USO = "Controle de código %d não pode ser removida, pois está em uso.";
    public static final String MSG_CONTROLE_VALIDA_DATA_ENTRADA = "A data de pagamento, não pode ser maior ou igual a data de entrada!";
    public static final String MSG_CONTROLE_VALIDA_VALOR_DIAS_APARTAMENTO = "O valor de dias apartamento, não pode ser maior que o valor total";
    public static final String MSG_CONTROLE_INQUILINO_OU_APARTAMENTO_EM_USO = "Inquilino ou Apartamento não pode ser usado, pois está em uso.";
    public static final String MSG_APARTAMENTOS_EM_USO = "Apartamento não pode ser usado, pois está em uso.";

    private Messages() {
    }
}

