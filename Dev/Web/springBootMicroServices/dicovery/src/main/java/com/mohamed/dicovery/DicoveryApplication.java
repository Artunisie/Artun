package com.mohamed.dicovery;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.server.EnableEurekaServer;

@EnableEurekaServer
@SpringBootApplication
public class DicoveryApplication {

	public static void main(String[] args) {
		SpringApplication.run(DicoveryApplication.class, args);
	}

}
