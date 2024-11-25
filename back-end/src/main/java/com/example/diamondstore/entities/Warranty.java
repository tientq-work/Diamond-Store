package com.example.diamondstore.entities;


import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDate;
import java.util.Date;

@Builder
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
@Table(name = "[Warranty]")
public class Warranty {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "warrantyid")
    private int warrantyId;

    @ManyToOne
    @JoinColumn(name = "order_detailid", nullable = false)
    private OrderDetail orderDetailId;

    @Column(name = "warranty_length")
    private String warrantyLength;


    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy")
    @Temporal(TemporalType.DATE)
    @Column(name = "start_date")
    private LocalDate startDate;


    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy")
    @Temporal(TemporalType.DATE)
    @Column(name = "end_date")
    private LocalDate endDate;

    @Column(name = "status")
    private String status;
}
