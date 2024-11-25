package com.example.diamondstore.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
@Table(name = "ProductDiamond")
public class ProductDiamond {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "product_diamondid")
    private int productDiamondId;

    @ManyToOne
    @JoinColumn(name = "productid", nullable = false)
    private Product productId;

    @ManyToOne
    @JoinColumn(name = "diamondid", nullable = false)
    private Diamond diamondId;

    @Column(name = "type", nullable = false)
    private String type;

    @Column(name = "quantity", nullable = false)
    private int quantity;
}
