package com.example.diamondstore.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class ProductDescriptionDTO {
    private Integer mainQuantity;
    private Integer sideQuantity;
    private String mainName;
    private float caratWeight;
    private String shape;
    private float mountSize;
}
