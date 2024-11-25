package com.example.diamondstore.entities;


import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
@Table(name = "Image")
public class Image {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "imageid")
    private int imageId;

    @NotBlank
    @Column(name = "image_url")
    private String url;

    @ManyToOne
    @JoinColumn(name = "productid")
    private Product productId;
}
