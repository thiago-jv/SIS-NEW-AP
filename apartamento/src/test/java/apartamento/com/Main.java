package apartamento.com;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class Main {

    public static void main(String[] args) {
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        String hashedClientSecret = passwordEncoder.encode("client-secret");
        System.out.println(hashedClientSecret);
    }
}
