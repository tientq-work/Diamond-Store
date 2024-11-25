package com.example.diamondstore.repositories;

import com.example.diamondstore.entities.Collection;
import com.example.diamondstore.entities.CollectionProducts;
import com.example.diamondstore.entities.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Collections;
import java.util.List;


@Repository
public interface CollectionProductRepository extends JpaRepository<CollectionProducts, Integer> {
    List<CollectionProducts> findProductByCollectionId(Collection collectionId);
    List<CollectionProducts> findCollectionByProductId(Product productId);

    void deleteByCollectionIdAndProductId(Collection collectionId, Product productId);

    boolean existsByCollectionIdAndProductId(Collection collectionId, Product productId);
}
