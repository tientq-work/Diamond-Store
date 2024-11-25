package com.example.diamondstore.entities;


import com.fasterxml.jackson.annotation.JsonIgnore;
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
@Table(name = "[Collection]")
public class Collection {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "collectionid")
    private int collectionId;

    @Column(name = "collection_name")
    private String collectionName;

    @Column(name = "description")
    private String description;

    @Column(name = "img_url")
    private String url;

    @JsonIgnore
    @OneToMany(mappedBy = "collectionId", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private java.util.Collection<CollectionProducts> collectionProducts;
}
