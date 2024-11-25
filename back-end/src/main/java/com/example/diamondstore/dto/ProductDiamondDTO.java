package com.example.diamondstore.dto;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class ProductDiamondDTO {
    private int productId;
    private int diamondId;
    private String type;
    private int quantity;
}
