package com.example.diamondstore.services;

import com.example.diamondstore.dto.ProductDTO;
import com.example.diamondstore.dto.PromotionDTO;
import com.example.diamondstore.entities.ProductPromotion;
import com.example.diamondstore.entities.Promotion;
import com.example.diamondstore.repositories.ProductPromotionRepository;
import com.example.diamondstore.repositories.PromotionRepository;
import com.example.diamondstore.services.interfaces.PromotionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class PromotionServiceImpl implements PromotionService {
    @Autowired
    private PromotionRepository promotionRepository;
    @Autowired
    private ProductPromotionRepository productPromotionRepository;

    @Override
    public List<Promotion> promotionList() {
        return promotionRepository.findAll();
    }

    @Override
    public Promotion getPromotionById(int id) {
        return promotionRepository.findPromotionByPromotionId(id);
    }

    @Override
    public Promotion createPromotion(PromotionDTO promotionDTO) {
        Promotion savePromotion = promotionRepository.save(Promotion.builder()
                .promotionName(promotionDTO.getPromotionName())
                .description(promotionDTO.getDescription())
                .startDate(promotionDTO.getStartDate())
                .endDate(promotionDTO.getEndDate())
                .isActive(false)
                .build());
        return savePromotion;
    }

    @Override
    public Promotion updatePromotion(PromotionDTO promotionDTO, int id) {
        Promotion savePromotion = promotionRepository.findPromotionByPromotionId(id);
        savePromotion.setPromotionName(promotionDTO.getPromotionName());
        savePromotion.setDescription(promotionDTO.getDescription());
        savePromotion.setStartDate(promotionDTO.getStartDate());
        savePromotion.setEndDate(promotionDTO.getEndDate());

        return promotionRepository.save(savePromotion);
    }

    @Override
    public Promotion updatePromotionStatus(int id) {
        List<Promotion> list = promotionRepository.findAll();
        Promotion promotion = promotionRepository.findPromotionByPromotionId(id);

        for(Promotion p : list){
            if(p.getPromotionId() != promotion.getPromotionId()) {
                p.setActive(false);
                promotionRepository.save(p);
            }
        }

        promotion.setActive(!promotion.isActive());
        Promotion pro = promotionRepository.save(promotion);

        for(Promotion p : list){
            List<ProductPromotion> ppList = productPromotionRepository.findByPromotionId(p);
            if(!p.isActive()){
                for(ProductPromotion pp : ppList){
                    pp.setActive(false);
                    productPromotionRepository.save(pp);
                }
            }
        }
        return pro;
    }

    @Override
    public Promotion getActivePromotion() {
        return promotionRepository.findPromotionByIsActive(true);
    }
}
