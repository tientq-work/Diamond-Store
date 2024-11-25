package com.example.diamondstore.entities;


import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;

import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;
import java.util.Date;


@Builder
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
@Table(name = "[Certificate]")

public class Certificate {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "certificateid")
    private int cerId;

    @OneToOne
    @JoinColumn(name = "diamondid")
    @ToString.Exclude
    private Diamond diamondId;

    @Column(name = "number")
    private Integer number;

    @Column(name = "description")
    private String description;

    @Column(name = "shape_cut")
    private String shapeCut;

    @Column(name = "measurements")
    private String measure;

    @Column(name = "polish")
    private String polish;

    @Column(name = "symmetry")
    private String symmetry;

    @Column(name = "issuer")
    private String issuer;

    @Temporal(TemporalType.DATE)
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy")
    @Column(name = "issued_date")
    private LocalDate issued_date;
}
