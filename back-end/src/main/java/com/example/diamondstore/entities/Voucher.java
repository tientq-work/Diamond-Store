package com.example.diamondstore.entities;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.aspectj.weaver.ast.Or;

import java.time.LocalDate;
import java.util.Collection;

@Builder
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
@Table(name = "Voucher")
public class Voucher {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "voucherid")
    private Integer voucherId;

    @ManyToOne
    @JoinColumn(name = "memberid")
    private User memberId;

    @Column(name = "description")
    private String description;

    @Column(name = "discount", nullable = false)
    private float discount;

    @Column(name = "discount_length", nullable = false)
    private int discountLength;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy")
    @Temporal(TemporalType.DATE)
    @Column(name = "start_date")
    private LocalDate startDate;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy")
    @Temporal(TemporalType.DATE)
    @Column(name = "end_date")
    private LocalDate endDate;

    @ManyToOne
    @JoinColumn(name = "voucher_typeid")
    private VoucherType voucherTypeId;

    @Column(name = "status")
    private String status;

    @JsonIgnore
    @OneToMany(mappedBy = "voucherId", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Collection<Order> orders;
}
