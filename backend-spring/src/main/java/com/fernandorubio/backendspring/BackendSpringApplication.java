package com.fernandorubio.backendspring;

import com.fernandorubio.backendspring.models.responses.UserRest;
import com.fernandorubio.backendspring.security.AppProperties;
import com.fernandorubio.backendspring.shared.dto.UserDto;

import org.modelmapper.ModelMapper;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@SpringBootApplication
@EnableJpaAuditing
public class BackendSpringApplication {

	public static void main(String[] args) {
		SpringApplication.run(BackendSpringApplication.class, args);
		System.out.println("Funcionando");
	}

	@Bean
	public BCryptPasswordEncoder bCryptPasswordEncoder(){
		return new BCryptPasswordEncoder();
	}
	@Bean
	public SpringApplicationContext springApplicationContext(){
		return new SpringApplicationContext();
	}
	@Bean(name = "AppProperties")
	public AppProperties getAppProperties(){
		return new AppProperties();
	}
	@Bean
	public ModelMapper modelMapper(){
		ModelMapper mapper = new ModelMapper();
		mapper.typeMap(UserDto.class, UserRest.class).addMappings(m -> m.skip(UserRest::setPosts));
		return mapper;
	}

}
