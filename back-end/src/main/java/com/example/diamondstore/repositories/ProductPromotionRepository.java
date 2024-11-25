package com.example.diamondstore.repositories;

import com.example.diamondstore.entities.Product;
import com.example.diamondstore.entities.ProductPromotion;
import com.example.diamondstore.entities.Promotion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductPromotionRepository extends JpaRepository<ProductPromotion, Integer> {
    ProductPromotion findByProductPromotionId(int id);
    List<ProductPromotion> findByProductId(Product product);
    List<ProductPromotion> findByPromotionId(Promotion promotion);
    ProductPromotion findProductPromotionByPromotionIdAndProductId(Promotion promotionId, Product productId);
}
