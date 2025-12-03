package com.donaccion;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import java.util.TimeZone;

@SpringBootApplication
public class DonaccionApplication {

	public static void main(String[] args) {
		TimeZone.setDefault(TimeZone.getTimeZone("America/El_Salvador"));
		SpringApplication.run(DonaccionApplication.class, args);
	}

	@Bean
	public WebMvcConfigurer corsConfigurer(@Value("${cors.allowed-origins}") String[] allowedOrigins) {
		
		return new WebMvcConfigurer() {
			@Override
			public void addCorsMappings(CorsRegistry registry) {
				registry.addMapping("/api/**")
						.allowedOrigins(allowedOrigins)
						.allowedMethods("GET", "POST", "PUT", "DELETE")
						.allowedHeaders("*")
          				.allowCredentials(true);
			}
		};
	}
}
