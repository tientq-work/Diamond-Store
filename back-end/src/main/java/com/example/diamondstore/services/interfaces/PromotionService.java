package com.example.diamondstore.services.interfaces;

import com.example.diamondstore.dto.ProductDTO;
import com.example.diamondstore.dto.PromotionDTO;
import com.example.diamondstore.entities.Product;
import com.example.diamondstore.entities.Promotion;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface PromotionService {
    List<Promotion> promotionList();
    Promotion getPromotionById(int id);
    Promotion createPromotion(PromotionDTO promotionDTO);
    Promotion updatePromotion(PromotionDTO promotionDTO, int id);
    Promotion updatePromotionStatus(int id);
    Promotion getActivePromotion();
}
