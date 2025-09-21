package com.smartcity.traveler;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class SmartCityTravelerApplication {

    public static void main(String[] args) {
        SpringApplication.run(SmartCityTravelerApplication.class, args);
    }
}
