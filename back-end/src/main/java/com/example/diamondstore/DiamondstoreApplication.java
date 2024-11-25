package com.example.diamondstore;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.transaction.annotation.EnableTransactionManagement;

@EnableTransactionManagement
//@SpringBootApplication(exclude = { SecurityAutoConfiguration.class })
@SpringBootApplication
public class DiamondstoreApplication {

    public static void main(String[] args) {
        SpringApplication.run(DiamondstoreApplication.class, args);
    }
}
