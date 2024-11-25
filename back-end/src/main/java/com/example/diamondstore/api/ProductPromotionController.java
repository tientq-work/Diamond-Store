package com.example.diamondstore.api;

import com.example.diamondstore.dto.ProductPromotionDTO;
import com.example.diamondstore.dto.ProductPromotionDTO2;
import com.example.diamondstore.dto.ProductPromotionIdsDTO;
import com.example.diamondstore.entities.Product;
import com.example.diamondstore.entities.ProductPromotion;
import com.example.diamondstore.entities.Promotion;
import com.example.diamondstore.response.ApiResponse;
import com.example.diamondstore.services.interfaces.ProductPromotionService;
import com.example.diamondstore.services.interfaces.ProductService;
import com.example.diamondstore.services.interfaces.PromotionService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/productpromotion")
@RequiredArgsConstructor
public class ProductPromotionController {
    @Autowired
    private ProductPromotionService productPromotionService;
    @Autowired
    private ProductService productService;
    @Autowired
    private PromotionService promotionService;

    @GetMapping("/all")
    @PreAuthorize("hasRole('ROLE_Manager')")
    public ResponseEntity<ApiResponse> getAllProductPromotion() throws Exception {
        List<ProductPromotion> list = productPromotionService.productPromotionList();
        if(list.isEmpty()){
            return ResponseEntity.ok(ApiResponse.builder()
                    .success(false)
                    .message("List product-promotions is empty!")
                    .build());
        }else{
            return ResponseEntity.ok(ApiResponse.builder()
                    .success(true)
                    .message("Get All Product-Promotions")
                    .data(list)
                    .build());
        }
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ROLE_Manager')")
    public ResponseEntity<ApiResponse> getProductPromotionId(@PathVariable int id) throws Exception {
        ProductPromotion productPromotion = productPromotionService.getProductPromotionById(id);
        if(productPromotion != null){
            return ResponseEntity.ok(ApiResponse.builder()
                    .success(true)
                    .message("Get Product-Promotion By ID Success")
                    .data(productPromotion)
                    .build());
        }else{
            return ResponseEntity.ok(ApiResponse.builder()
                    .success(false)
                    .message("Get Product-Promotion By ID Fail")
                    .build());
        }
    }

    @GetMapping("/product/{id}")
    @PreAuthorize("hasRole('ROLE_Manager')")
    public ResponseEntity<ApiResponse> getListByProductId(@PathVariable int id) throws Exception {
        List<ProductPromotion> list = productPromotionService.getListByProductId(id);
        if(list.isEmpty()){
            return ResponseEntity.ok(ApiResponse.builder()
                    .success(false)
                    .message("List product-promotions is empty!")
                    .build());
        }else{
            return ResponseEntity.ok(ApiResponse.builder()
                    .success(true)
                    .message("Get Product-Promotions By Product ID")
                    .data(list)
                    .build());
        }
    }

    @GetMapping("/promotion/{id}")
    @PreAuthorize("hasRole('ROLE_Manager')")
    public ResponseEntity<ApiResponse> getListByPromotionId(@PathVariable int id) throws Exception {
        List<ProductPromotion> list = productPromotionService.getListByPromotionId(id);
        if(list.isEmpty()){
            return ResponseEntity.ok(ApiResponse.builder()
                    .success(false)
                    .message("List product-promotions is empty!")
                    .build());
        }else{
            return ResponseEntity.ok(ApiResponse.builder()
                    .success(true)
                    .message("Get Product-Promotions By Product ID")
                    .data(list)
                    .build());
        }
    }

    @PostMapping("/create")
    @PreAuthorize("hasRole('ROLE_Manager')")
    public ResponseEntity<ApiResponse> createProductPromotion(@RequestBody ProductPromotionDTO2 productPromotionDTO) throws Exception {
        try{
            Promotion promotion = promotionService.getPromotionById(productPromotionDTO.getPromotionId());
            Product product = productService.getProductById(productPromotionDTO.getProductId());
            ProductPromotion productPromotion = productPromotionService.getProductPromotionByPromotionIdAndProductId(promotion, product);
            if(promotion == null){
                return ResponseEntity.ok(ApiResponse.builder()
                        .success(false)
                        .message("Promotion ID not found")
                        .build());
            }
            else if(product == null){
                return ResponseEntity.ok(ApiResponse.builder()
                        .success(false)
                        .message("Product ID not found")
                        .build());
            }else if(productPromotion != null){
                return ResponseEntity.ok(ApiResponse.builder()
                        .success(false)
                        .message("ProductPromotion Already Exists")
                        .build());
            }
            else if(productPromotionDTO.getDiscount() <= 0 || productPromotionDTO.getDiscount() >= 1){
                return ResponseEntity.ok(ApiResponse.builder()
                        .success(false)
                        .message("Discount must be between 0 and 1")
                        .build());
            }
            else if(promotion.getStartDate().isAfter(productPromotionDTO.getStartDate())){
                return ResponseEntity.ok(ApiResponse.builder()
                        .success(false)
                        .message("StartDate invalid")
                        .build());
            }
            else if(promotion.getEndDate().isBefore(productPromotionDTO.getEndDate())){
                return ResponseEntity.ok(ApiResponse.builder()
                        .success(false)
                        .message("EndDate invalid")
                        .build());
            }
            else if(productPromotionDTO.getStartDate().isAfter(productPromotionDTO.getEndDate())){
                return ResponseEntity.ok(ApiResponse.builder()
                        .success(false)
                        .message("End Date must be larger than Start Date")
                        .build());
            }
            else {
                ProductPromotion pp = productPromotionService.createProductPromotion2(productPromotionDTO);
                return ResponseEntity.ok(ApiResponse.builder()
                        .success(true)
                        .message("Create product-promotion success!")
                        .data(pp)
                        .build());
            }
        }catch (Exception e){
            return ResponseEntity.ok(ApiResponse.builder()
                    .success(false)
                    .message("Create product-promotion fail! Error: " + e.getMessage())
                    .build());
        }
    }

    @DeleteMapping("/delete/{id}")
    @PreAuthorize("hasRole('ROLE_Manager')")
    public ResponseEntity<ApiResponse> deleteProductPromotion(@PathVariable int id) {
        //List<Integer> productPromotionIds = productPromotionIdsDTO.getProductPriceIds();
        try{
            boolean p = productPromotionService.deleteProductPromotion2(id);
            if (p){
                return ResponseEntity.ok(ApiResponse.builder()
                        .success(true)
                        .message("Delete product-promotion Success!")
                        .build());
            }
            else{
                return ResponseEntity.ok(ApiResponse.builder()
                        .success(false)
                        .message("Delete product-promotion fail!")
                        .build());
            }
        }catch (Exception e){
            return ResponseEntity.ok(ApiResponse.builder()
                    .success(false)
                    .message("Delete product-promotion fail! Error: " + e.getMessage())
                    .build());
        }
    }

    @PutMapping("/update")
    @PreAuthorize("hasRole('ROLE_Manager')")
    public ResponseEntity<ApiResponse> updateProductPromotion(@RequestBody ProductPromotionDTO2 productPromotionDTO) throws Exception {
        try{
            Promotion promotion = promotionService.getPromotionById(productPromotionDTO.getPromotionId());
            Product product = productService.getProductById(productPromotionDTO.getProductId());
            if(promotion == null){
                return ResponseEntity.ok(ApiResponse.builder()
                        .success(false)
                        .message("Promotion ID not found")
                        .build());
            }
            else if(product == null){
                return ResponseEntity.ok(ApiResponse.builder()
                        .success(false)
                        .message("Product ID not found")
                        .build());
            }
            else if(productPromotionDTO.getDiscount() <= 0 || productPromotionDTO.getDiscount() >= 1){
                return ResponseEntity.ok(ApiResponse.builder()
                        .success(false)
                        .message("Discount must be between 0 and 1")
                        .build());
            }
            else if(promotion.getStartDate().isAfter(productPromotionDTO.getStartDate())){
                return ResponseEntity.ok(ApiResponse.builder()
                        .success(false)
                        .message("StartDate invalid")
                        .build());
            }
            else if(promotion.getEndDate().isBefore(productPromotionDTO.getEndDate())){
                return ResponseEntity.ok(ApiResponse.builder()
                        .success(false)
                        .message("EndDate invalid")
                        .build());
            }
            else if(productPromotionDTO.getStartDate().isAfter(productPromotionDTO.getEndDate())){
                return ResponseEntity.ok(ApiResponse.builder()
                        .success(false)
                        .message("End Date must be larger than Start Date")
                        .build());
            }
            else {
                ProductPromotion pp = productPromotionService.updateProductPromotion2(productPromotionDTO);
                return ResponseEntity.ok(ApiResponse.builder()
                        .success(true)
                        .message("Update product-promotion success!")
                        .data(pp)
                        .build());
            }
        }catch (Exception e){
            return ResponseEntity.ok(ApiResponse.builder()
                    .success(false)
                    .message("Update product-promotion fail! Error: " + e.getMessage())
                    .build());
        }
    }

    @PutMapping("/status")
    @PreAuthorize("hasRole('ROLE_Manager')")
    public ResponseEntity<ApiResponse> changeProductPromotionStatus(@RequestBody ProductPromotionDTO2 productPromotionDTO) throws Exception {
        try{
            Promotion promotion = promotionService.getPromotionById(productPromotionDTO.getPromotionId());
            Product product = productService.getProductById(productPromotionDTO.getProductId());
            if(promotion == null){
                return ResponseEntity.ok(ApiResponse.builder()
                        .success(false)
                        .message("Promotion ID not found")
                        .build());
            }
            else if(product == null){
                return ResponseEntity.ok(ApiResponse.builder()
                        .success(false)
                        .message("Product ID not found")
                        .build());
            }
            else if(!promotion.isActive()){
                return ResponseEntity.ok(ApiResponse.builder()
                        .success(false)
                        .message("Promotion is not active")
                        .build());
            }
            else {
                ProductPromotion pp = productPromotionService.changeStatus2(productPromotionDTO);
                return ResponseEntity.ok(ApiResponse.builder()
                        .success(true)
                        .message("Change product-promotion status success!")
                        .data(pp)
                        .build());
            }
        }catch (Exception e){
            return ResponseEntity.ok(ApiResponse.builder()
                    .success(false)
                    .message("Change product-promotion status fail! Error: " + e.getMessage())
                    .build());
        }
    }
}
