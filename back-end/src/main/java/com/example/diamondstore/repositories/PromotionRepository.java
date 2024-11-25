package com.example.diamondstore.repositories;

import com.example.diamondstore.entities.Promotion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PromotionRepository extends JpaRepository<Promotion, Integer> {
    Promotion findPromotionByPromotionId(int promotionId);
    Promotion findPromotionByIsActive(boolean active);
}
