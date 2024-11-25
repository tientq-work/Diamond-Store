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
@Table(name = "CollectionProducts")
public class CollectionProducts {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "collection_productid")
    private int collectionProductId;

    @ManyToOne
    @JoinColumn(name = "collectionId", referencedColumnName = "collectionid")
    private Collection collectionId;

    @ManyToOne
    @JoinColumn(name = "productId", referencedColumnName = "productid")
    private Product productId;

}
