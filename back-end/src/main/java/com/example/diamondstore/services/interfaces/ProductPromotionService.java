package com.example.diamondstore.services.interfaces;

import com.example.diamondstore.dto.ProductPromotionDTO;
import com.example.diamondstore.dto.ProductPromotionDTO2;
import com.example.diamondstore.entities.Product;
import com.example.diamondstore.entities.ProductPromotion;
import com.example.diamondstore.entities.Promotion;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface ProductPromotionService {
    List<ProductPromotion> productPromotionList();
    ProductPromotion getProductPromotionById(int id);
    List<ProductPromotion> getListByProductId(int id);
    List<ProductPromotion> getListByPromotionId(int id);

    void createProductPromotion(ProductPromotionDTO productPromotionDTO);
    boolean deleteProductPromotions(List<Integer> productPromotionIds);
    void updateProductPromotion(ProductPromotionDTO productPromotionDTO);
    void changeStatus(ProductPromotionDTO productPromotionDTO);

    ProductPromotion createProductPromotion2(ProductPromotionDTO2 productPromotionDTO2);
    boolean deleteProductPromotion2(int productPromotionId);
    ProductPromotion updateProductPromotion2(ProductPromotionDTO2 productPromotionDTO2);
    ProductPromotion changeStatus2(ProductPromotionDTO2 productPromotionDTO2);

    ProductPromotion getProductPromotionByPromotionIdAndProductId(Promotion promotion, Product product);
}