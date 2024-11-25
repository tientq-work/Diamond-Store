package com.example.diamondstore.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Collection;

@Builder
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
@Table(name = "VoucherType")
public class VoucherType {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "voucher_typeid")
    private int voucherTypeId;

    @Column(name = "description")
    private String description;

    @Column(name = "discount", nullable = false)
    private float discount;

    @Column(name = "discount_length", nullable = false)
    private int discountLength;

    @Column(name = "point_needed", nullable = false)
    private int pointNeeded;

    @Column(name = "is_active", nullable = false)
    private boolean isActive;

    @JsonIgnore
    @OneToMany(mappedBy = "voucherTypeId", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Collection<Voucher> vouchers;
}
