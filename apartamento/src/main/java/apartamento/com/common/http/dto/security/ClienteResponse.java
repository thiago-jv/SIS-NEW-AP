package apartamento.com.common.http.dto.security;

public record ClienteResponse(Long id, String clientId, String clientSecret, String redirectURI, String scope) {
}
