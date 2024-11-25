package com.example.diamondstore.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class OrderDTO {

    private String cname;
    private String phone;
    private String address;
    private String email;
    private String payment_method;
    private Integer voucherId;
}
