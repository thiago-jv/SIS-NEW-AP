package apartamento.com.common.http.dto.security;

public record ClientePost(String clientId, String clientSecret, String redirectURI, String scope) {
}
