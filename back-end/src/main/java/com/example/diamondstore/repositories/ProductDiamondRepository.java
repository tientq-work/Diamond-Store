package com.example.diamondstore.repositories;

import com.example.diamondstore.entities.Diamond;
import com.example.diamondstore.entities.Product;
import com.example.diamondstore.entities.ProductDiamond;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductDiamondRepository extends JpaRepository<ProductDiamond, Integer> {
    ProductDiamond findProductDiamondByProductDiamondId(int id);
    ProductDiamond findProductDiamondByProductIdAndDiamondId(Product productId, Diamond diamondId);
    List<ProductDiamond> findByProductId(Product productId);
    List<ProductDiamond> findByProductIdAndType(Product productId, String type);
    List<ProductDiamond> findProductDiamondsByProductIdAndType(Product productId, String type);
}

