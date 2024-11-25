package com.example.diamondstore.dto;

import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class VoucherTypeDTO {
    private String description;
    private float discount;
    private int discountLength;
    private int pointNeeded;
    private boolean isActive;
}
