package com.example.diamondstore.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class UpdateOrderDTO {
    private String cname;
    private String address;
    private String email;
    private String phone;
    private String payment_method;
}
