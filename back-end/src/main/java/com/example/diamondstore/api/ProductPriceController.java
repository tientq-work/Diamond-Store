package com.example.diamondstore.api;

import com.example.diamondstore.dto.ProductDTO;
import com.example.diamondstore.dto.ProductPriceDTO;
import com.example.diamondstore.dto.ProductPriceIdsDTO;
import com.example.diamondstore.entities.Product;
import com.example.diamondstore.entities.ProductPrice;
import com.example.diamondstore.response.ApiResponse;
import com.example.diamondstore.services.interfaces.ProductPriceService;
import com.example.diamondstore.services.interfaces.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/productprice")
@RequiredArgsConstructor
public class ProductPriceController {
    @Autowired
    private ProductPriceService productPriceService;
    @Autowired
    private ProductService productService;

    @GetMapping("/all")
    @PreAuthorize("hasRole('ROLE_Manager')")
    public ResponseEntity<ApiResponse> getAllProductPrice() throws Exception {
        List<ProductPrice> list = productPriceService.productPriceList();
        if(list.isEmpty()){
            return ResponseEntity.ok(ApiResponse.builder()
                    .success(false)
                    .message("List product-prices is empty!")
                    .build());
        }else{
            return ResponseEntity.ok(ApiResponse.builder()
                    .success(true)
                    .message("Get All Product-Prices")
                    .data(list)
                    .build());
        }
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ROLE_Manager')")
    public ResponseEntity<ApiResponse> getProductPriceId(@PathVariable int id) throws Exception {
        ProductPrice productPrice = productPriceService.getProductPriceById(id);
        if(productPrice != null){
            return ResponseEntity.ok(ApiResponse.builder()
                    .success(true)
                    .message("Get Product-Price By ID Success")
                    .data(productPrice)
                    .build());
        }else{
            return ResponseEntity.ok(ApiResponse.builder()
                    .success(false)
                    .message("Get Product-Price By ID Fail")
                    .build());
        }
    }

    @GetMapping("/product/{id}")
    @PreAuthorize("hasRole('ROLE_Manager')")
    public ResponseEntity<ApiResponse> getListByProductId(@PathVariable int id) throws Exception {
        List<ProductPrice> list = productPriceService.getProductPriceListByProductId(id);
        if(list.isEmpty()){
            return ResponseEntity.ok(ApiResponse.builder()
                    .success(false)
                    .message("List product-prices is empty!")
                    .build());
        }else{
            return ResponseEntity.ok(ApiResponse.builder()
                    .success(true)
                    .message("Get Product-Prices By Product ID")
                    .data(list)
                    .build());
        }
    }

    @PostMapping("/create")
    @PreAuthorize("hasRole('ROLE_Manager')")
    public ResponseEntity<ApiResponse> createProductPrice(@RequestBody ProductPriceDTO productPriceDTO) throws Exception {
        try{
            if(productService.getProductById(productPriceDTO.getProductId()) == null){
                return ResponseEntity.ok(ApiResponse.builder()
                        .success(false)
                        .message("Product ID not found")
                        .build());
            }
            else {
                ProductPrice productPrice = productPriceService.createProductPrice(productPriceDTO);
                return ResponseEntity.ok(ApiResponse.builder()
                        .success(true)
                        .message("Create product-price success!")
                        .data(productPrice)
                        .build());
            }

        }catch (Exception e){
            return ResponseEntity.ok(ApiResponse.builder()
                    .success(false)
                    .message("Create product-price fail! Error: " + e.getMessage())
                    .build());
        }
    }

    @DeleteMapping("/delete")
    @PreAuthorize("hasRole('ROLE_Manager')")
    public ResponseEntity<ApiResponse> deleteProductPrices(@RequestBody ProductPriceIdsDTO productPriceIdsDTO) {
        List<Integer> productPriceIds = productPriceIdsDTO.getProductPriceIds();
        try{
            boolean p = productPriceService.deleteProductPrices(productPriceIds);
            if (p){
                return ResponseEntity.ok(ApiResponse.builder()
                        .success(true)
                        .message("Delete List Success!")
                        .build());
            }
            else{
                return ResponseEntity.ok(ApiResponse.builder()
                        .success(false)
                        .message("Delete List fail!")
                        .build());
            }
        }catch (Exception e){
            return ResponseEntity.ok(ApiResponse.builder()
                    .success(false)
                    .message("Delete List fail! Error: " + e.getMessage())
                    .build());
        }
    }
}
