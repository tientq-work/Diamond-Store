package com.example.diamondstore.entities;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Date;

@Builder
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
@Table(name = "ProductPrice")
public class ProductPrice {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "product_priceid")
    private int productPriceId;

    @ManyToOne
    @JoinColumn(name = "productid", nullable = false)
    private Product productId;

    @Column(name = "cost_price")
    private BigDecimal costPrice;

    @Column(name = "markup_rate")
    private float markupRate;

    @Column(name = "selling_price")
    private BigDecimal sellingPrice;

    @Temporal(TemporalType.DATE)
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy")
    @Column(name = "update_date")
    private LocalDate updateDate;
}
