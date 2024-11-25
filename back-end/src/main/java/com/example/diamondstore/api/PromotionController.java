package com.example.diamondstore.api;

import com.example.diamondstore.dto.ProductDTO;
import com.example.diamondstore.dto.PromotionDTO;
import com.example.diamondstore.entities.Product;
import com.example.diamondstore.entities.Promotion;
import com.example.diamondstore.response.ApiResponse;
import com.example.diamondstore.services.interfaces.PromotionService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/promotion")
@RequiredArgsConstructor
public class PromotionController {
    @Autowired
    private PromotionService promotionService;

    @GetMapping("/all")
    @PreAuthorize("hasRole('ROLE_Manager')")
    public ResponseEntity<ApiResponse> getAllPromotion() throws Exception {
        List<Promotion> list = promotionService.promotionList();
        if(list.isEmpty()){
            return ResponseEntity.ok(ApiResponse.builder()
                    .success(false)
                    .message("List promotions is empty!")
                    .build());
        }else{
            return ResponseEntity.ok(ApiResponse.builder()
                    .success(true)
                    .message("Get All Promotions")
                    .data(list)
                    .build());
        }
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ROLE_Manager')")
    public ResponseEntity<ApiResponse> getPromotionId(@PathVariable int id) throws Exception {
        Promotion promotion = promotionService.getPromotionById(id);
        if(promotion != null){
            return ResponseEntity.ok(ApiResponse.builder()
                    .success(true)
                    .message("Get Promotion By ID Success")
                    .data(promotion)
                    .build());
        }else{
            return ResponseEntity.ok(ApiResponse.builder()
                    .success(false)
                    .message("Get Promotion By ID Fail")
                    .build());
        }
    }

    @PostMapping("/create")
    @PreAuthorize("hasRole('ROLE_Manager')")
    public ResponseEntity<ApiResponse> createPromotion(@RequestBody PromotionDTO promotionDTO) throws Exception {
        try{
            if(promotionDTO.getStartDate().compareTo(promotionDTO.getEndDate()) >= 0){
                return ResponseEntity.ok(ApiResponse.builder()
                        .success(false)
                        .message("End Date must be larger than Start Date")
                        .build());
            }
            else {
                Promotion promotion = promotionService.createPromotion(promotionDTO);
                return ResponseEntity.ok(ApiResponse.builder()
                        .success(true)
                        .message("Create promotion success!")
                        .data(promotion)
                        .build());
            }
        }catch (Exception e){
            return ResponseEntity.ok(ApiResponse.builder()
                    .success(false)
                    .message("Create promotion fail! Error: " + e.getMessage())
                    .build());
        }
    }

    @PutMapping("/update/{id}")
    @PreAuthorize("hasRole('ROLE_Manager')")
    public ResponseEntity<ApiResponse> updatePromotion(@RequestBody PromotionDTO promotionDTO, @PathVariable int id) throws Exception {
        try{
            if(promotionService.getPromotionById(id) == null){
                return ResponseEntity.ok(ApiResponse.builder()
                        .success(false)
                        .message("Promotion Not Found")
                        .build());
            }
            else if(promotionDTO.getStartDate().compareTo(promotionDTO.getEndDate()) > 0){
                return ResponseEntity.ok(ApiResponse.builder()
                        .success(false)
                        .message("End Date must be larger than Start Date")
                        .build());
            } else {
                Promotion promotion = promotionService.updatePromotion(promotionDTO, id);
                return ResponseEntity.ok(ApiResponse.builder()
                        .success(true)
                        .message("Update Promotion success!")
                        .data(promotion)
                        .build());
            }
        }catch (Exception e){
            return ResponseEntity.ok(ApiResponse.builder()
                    .success(false)
                    .message("Update Promotion fail! Error: " + e.getMessage())
                    .build());
        }
    }

    @PutMapping("/status/{id}")
    @PreAuthorize("hasRole('ROLE_Manager')")
    public ResponseEntity<ApiResponse> updatePromotionStatus(@PathVariable int id) throws Exception {
        try{
            if(promotionService.getPromotionById(id) == null){
                return ResponseEntity.ok(ApiResponse.builder()
                        .success(false)
                        .message("Promotion Not Found")
                        .build());
            } else {
                Promotion p = promotionService.updatePromotionStatus(id);
                return ResponseEntity.ok(ApiResponse.builder()
                        .success(true)
                        .message("Update Promotion Status success!")
                        .data(p)
                        .build());
            }
        }catch (Exception e){
            return ResponseEntity.ok(ApiResponse.builder()
                    .success(false)
                    .message("Update Promotion Status fail! Error: " + e.getMessage())
                    .build());
        }
    }

    @GetMapping("/active")
    public ResponseEntity<ApiResponse> getActivePromotion() throws Exception {
        Promotion promotion = promotionService.getActivePromotion();
        if(promotion == null){
            return ResponseEntity.ok(ApiResponse.builder()
                    .success(false)
                    .message("No Promotion Is Active!")
                    .build());
        }else{
            return ResponseEntity.ok(ApiResponse.builder()
                    .success(true)
                    .message("Get Active Promotion")
                    .data(promotion)
                    .build());
        }
    }
}
