package com.example.diamondstore.dto;

import com.example.diamondstore.entities.ProductPrice;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class ProductPriceIdsDTO {
    private List<Integer> productPriceIds;
}
