package apartamento.com.infra.conf;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenAPIDocs {

    @Bean
    public OpenAPI docs() {
        return new OpenAPI()
                .info(new Info()
                        .title("KITNET")
                        .description("")).components(new Components());

    }
}
