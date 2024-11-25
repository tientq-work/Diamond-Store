package com.example.diamondstore.api;

import com.example.diamondstore.dto.ProductDTO;
import com.example.diamondstore.dto.ProductDiamondDTO;
import com.example.diamondstore.dto.UpdateProductDiamondDTO;
import com.example.diamondstore.entities.Product;
import com.example.diamondstore.entities.ProductDiamond;
import com.example.diamondstore.response.ApiResponse;
import com.example.diamondstore.services.interfaces.DiamondService;
import com.example.diamondstore.services.interfaces.ProductDiamondService;
import com.example.diamondstore.services.interfaces.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/productdiamond")
@RequiredArgsConstructor
public class ProductDiamondController {
    @Autowired
    private ProductDiamondService productDiamondService;

    @Autowired
    private ProductService productService;

    @Autowired
    private DiamondService diamondService;

    @GetMapping("/all")
    @PreAuthorize("hasRole('ROLE_Manager')")
    public ResponseEntity<ApiResponse> getAllProductDiamond() throws Exception {
        List<ProductDiamond> productDiamondList = productDiamondService.productDiamondList();
        if(productDiamondList.isEmpty()){
            return ResponseEntity.ok(ApiResponse.builder()
                    .success(false)
                    .message("List productDiamonds is empty!")
                    .build());
        }else{
            return ResponseEntity.ok(ApiResponse.builder()
                    .success(true)
                    .message("Get All productDiamonds")
                    .data(productDiamondList)
                    .build());
        }
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ROLE_Manager')")
    public ResponseEntity<ApiResponse> getProductDiamondId(@PathVariable int id) throws Exception {
        ProductDiamond productDiamond = productDiamondService.getProductDiamondById(id);
        if(productDiamond != null){
            return ResponseEntity.ok(ApiResponse.builder()
                    .success(true)
                    .message("Get ProductDiamond By ID Success")
                    .data(productDiamond)
                    .build());
        }else{
            return ResponseEntity.ok(ApiResponse.builder()
                    .success(false)
                    .message("Get ProductDiamond By ID Fail")
                    .build());
        }
    }

    @PostMapping("/create")
    @PreAuthorize("hasRole('ROLE_Manager')")
    public ResponseEntity<ApiResponse> createProductDiamond(@RequestBody ProductDiamondDTO productDiamondDTO) throws Exception {
        try{
            if(productService.getProductById(productDiamondDTO.getProductId()) == null){
                return ResponseEntity.ok(ApiResponse.builder()
                        .success(false)
                        .message("Product ID not found")
                        .build());
            }
            else if(diamondService.getDiamondById(productDiamondDTO.getDiamondId()) == null){
                return ResponseEntity.ok(ApiResponse.builder()
                        .success(false)
                        .message("Diamond ID not found")
                        .build());
            }
            else if(productDiamondService.getProductDiamondByProductIdAndDiamondId(productDiamondDTO.getProductId(), productDiamondDTO.getDiamondId()) != null){
                return ResponseEntity.ok(ApiResponse.builder()
                        .success(false)
                        .message("Product-diamond existed")
                        .build());
            }
            else if(productDiamondDTO.getQuantity() <= 0){
                return ResponseEntity.ok(ApiResponse.builder()
                        .success(false)
                        .message("Quantity should be > 0")
                        .build());
            }
            else {
                ProductDiamond productDiamond = productDiamondService.createProductDiamond(productDiamondDTO);
                return ResponseEntity.ok(ApiResponse.builder()
                        .success(true)
                        .message("Create product-diamond success!")
                        .data(productDiamond)
                        .build());
            }
        }catch (Exception e){
            return ResponseEntity.ok(ApiResponse.builder()
                    .success(false)
                    .message("Create product-diamond fail! Error: " + e.getMessage())
                    .build());
        }
    }

    @PutMapping("/update/{id}")
    @PreAuthorize("hasRole('ROLE_Manager')")
    public ResponseEntity<ApiResponse> updateProductDiamond(@RequestBody UpdateProductDiamondDTO updateProductDiamondDTO, @PathVariable int id) throws Exception {
        try{
            if(productDiamondService.getProductDiamondById(id) == null){
                return ResponseEntity.ok(ApiResponse.builder()
                        .success(false)
                        .message("Product-diamond Not Found!")
                        .build());
            }
            else if(updateProductDiamondDTO.getQuantity() <= 0){
                return ResponseEntity.ok(ApiResponse.builder()
                        .success(false)
                        .message("Quantity should be > 0")
                        .build());
            }else {
                ProductDiamond productDiamond = productDiamondService.updateProductDiamond(updateProductDiamondDTO, id);
                return ResponseEntity.ok(ApiResponse.builder()
                        .success(true)
                        .message("Update Product-diamond success!")
                        .data(productDiamond)
                        .build());
            }
        }catch (Exception e){
            return ResponseEntity.ok(ApiResponse.builder()
                    .success(false)
                    .message("Update Product-diamond fail! Error: " + e.getMessage())
                    .build());
        }
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ROLE_Manager')")
    public ResponseEntity<ApiResponse> deleteProductDiamond(@PathVariable int id) throws Exception {
        try{
            if(productDiamondService.getProductDiamondById(id) == null){
                return ResponseEntity.ok(ApiResponse.builder()
                        .success(false)
                        .message("Product-diamond Not Found!")
                        .build());
            }
            else {
                return ResponseEntity.ok(ApiResponse.builder()
                        .success(true)
                        .message("Delete Product-diamond success!")
                        .data(productDiamondService.deleteProductDiamond(id))
                        .build());
            }
        }catch (Exception e){
            return ResponseEntity.ok(ApiResponse.builder()
                    .success(false)
                    .message("Delete Product-diamond fail! Error: " + e.getMessage())
                    .build());
        }
    }
}
