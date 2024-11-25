package com.example.diamondstore.core.config.mail;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class EmailRequestDTO {
    private String toEmail;
    private String subject;
    private String body;
}
