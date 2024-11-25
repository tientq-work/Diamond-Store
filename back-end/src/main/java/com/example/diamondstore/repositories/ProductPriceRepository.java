package com.example.diamondstore.repositories;

import com.example.diamondstore.entities.Product;
import com.example.diamondstore.entities.ProductPrice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductPriceRepository extends JpaRepository<ProductPrice, Integer> {
    ProductPrice findByProductPriceId(int id);
    List<ProductPrice> findByProductId(Product product);
    ProductPrice findTop1ByProductIdOrderByUpdateDateDesc(Product product);
}
