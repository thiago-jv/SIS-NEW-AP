package apartamento.com.core.service.security;

import apartamento.com.core.service.impl.ClienteService;
import org.springframework.security.oauth2.core.AuthorizationGrantType;
import org.springframework.security.oauth2.core.ClientAuthenticationMethod;
import org.springframework.security.oauth2.server.authorization.client.RegisteredClient;
import org.springframework.security.oauth2.server.authorization.client.RegisteredClientRepository;
import org.springframework.security.oauth2.server.authorization.settings.ClientSettings;
import org.springframework.security.oauth2.server.authorization.settings.TokenSettings;
import org.springframework.stereotype.Component;

@Component
public class CustomRegisteredClientRepository implements RegisteredClientRepository {

    private final ClienteService clientService;
    private final TokenSettings tokenSettings;
    private final ClientSettings clientSettings;

    public CustomRegisteredClientRepository(ClienteService clientService, TokenSettings tokenSettings, ClientSettings clientSettings) {
        this.clientService = clientService;
        this.tokenSettings = tokenSettings;
        this.clientSettings = clientSettings;
    }

    @Override
    public void save(RegisteredClient registeredClient) {}

    @Override
    public RegisteredClient findById(String id) {
        return null;
    }

    @Override
    public RegisteredClient findByClientId(String clientId) {
        var client = clientService.findByClientId(clientId);

        if(client == null){
            return null;
        }

        return RegisteredClient
                .withId(client.id().toString())
                .clientId(client.clientId())
                .clientSecret(client.clientSecret())
                .redirectUri(client. redirectURI())
                .scope(client.scope())
                .clientAuthenticationMethod(ClientAuthenticationMethod.CLIENT_SECRET_BASIC)
                .authorizationGrantType(AuthorizationGrantType.AUTHORIZATION_CODE)
                .authorizationGrantType(AuthorizationGrantType.CLIENT_CREDENTIALS)
                .authorizationGrantType(AuthorizationGrantType.REFRESH_TOKEN)
                .tokenSettings(tokenSettings)
                .clientSettings(clientSettings)
                .build();
    }
}
