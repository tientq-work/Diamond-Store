package com.example.diamondstore.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class CreateOrderRequestDTO {
    private OrderDTO order;
    private List<OrderDetailDTO> orderDetails;
}
