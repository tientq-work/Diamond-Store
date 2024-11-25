package com.example.diamondstore.api;

import com.example.diamondstore.dto.DiamondDTO;
import com.example.diamondstore.dto.ProductDTO;
import com.example.diamondstore.dto.ProductDescriptionDTO;
import com.example.diamondstore.entities.Diamond;
import com.example.diamondstore.entities.DiamondMount;
import com.example.diamondstore.entities.Product;
import com.example.diamondstore.entities.ProductPromotion;
import com.example.diamondstore.response.ApiResponse;
import com.example.diamondstore.services.interfaces.DiamondMountService;
import com.example.diamondstore.services.interfaces.ProductPriceService;
import com.example.diamondstore.services.interfaces.ProductPromotionService;
import com.example.diamondstore.services.interfaces.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/product")
@RequiredArgsConstructor
public class ProductController {
    @Autowired
    private ProductService productService;
    @Autowired
    private DiamondMountService diamondMountService;
    @Autowired
    private ProductPriceService productPriceService;
    @Autowired
    private ProductPromotionService productPromotionService;

    @GetMapping("/all")
    public ResponseEntity<ApiResponse> getAllProduct() {
        List<Product> productList = productService.productList();
        if(productList.isEmpty()){
            return ResponseEntity.ok(ApiResponse.builder()
                    .success(false)
                    .message("List products is empty!")
                    .build());
        }else{
            for(Product p : productList){
                boolean pro = false;
                List<ProductPromotion> pp = productPromotionService.getListByProductId(p.getProductId());
                for (ProductPromotion prop : pp){
                    if(prop.isActive()) pro = true;
                }
                if (!pro)
                    productPriceService.createProductPriceAuto(p.getProductId());
            }
            return ResponseEntity.ok(ApiResponse.builder()
                    .success(true)
                    .message("Get All Products: ")
                    .data(productList)
                    .build());
        }
    }

    @GetMapping("/showProduct/{id}")
    public ResponseEntity<ApiResponse> getProductId(@PathVariable int id) throws Exception {
        Product product = productService.getProductById(id);
        if(product != null){
            return ResponseEntity.ok(ApiResponse.builder()
                    .success(true)
                    .message("Get Product By ID Success")
                    .data(product)
                    .build());
        }else{
            return ResponseEntity.ok(ApiResponse.builder()
                    .success(false)
                    .message("Get Product By ID Fail")
                    .build());
        }
    }

    @PostMapping("/create")
    @PreAuthorize("hasRole('ROLE_Manager')")
    public ResponseEntity<ApiResponse> createProduct(@RequestBody ProductDTO productDTO) {
        try{
            if(diamondMountService.getMountById(productDTO.getMountId()) == null){
                return ResponseEntity.ok(ApiResponse.builder()
                        .success(false)
                        .message("Mount ID not found")
                        .build());
            }
            else {
                Product product = productService.createProduct(productDTO);
                return ResponseEntity.ok(ApiResponse.builder()
                        .success(true)
                        .message("Create product success!")
                        .data(product)
                        .build());
            }

        }catch (Exception e){
            return ResponseEntity.ok(ApiResponse.builder()
                    .success(false)
                    .message("Create product fail! Error: " + e.getMessage())
                    .build());
        }
    }

    @PutMapping("/update/{id}")
    @PreAuthorize("hasRole('ROLE_Manager')")
    public ResponseEntity<ApiResponse> updateProduct(@RequestBody ProductDTO productDTO, @PathVariable int id) throws Exception {
        try{
            if(productService.getProductById(id) == null){
                return ResponseEntity.ok(ApiResponse.builder()
                        .success(false)
                        .message("Product Not Found!")
                        .build());
            } else {
                Product product = productService.updateProduct(productDTO, id);
                return ResponseEntity.ok(ApiResponse.builder()
                        .success(true)
                        .message("Update Product success!")
                        .data(product)
                        .build());
            }
        }catch (Exception e){
            return ResponseEntity.ok(ApiResponse.builder()
                    .success(false)
                    .message("Update Product fail! Error: " + e.getMessage())
                    .build());
        }
    }

    @GetMapping("/search/{name}")
    public ResponseEntity<ApiResponse> findProductByProductName(@PathVariable String name) throws Exception {
        try{
            List<Product> productList = productService.findProductByProductName(name);
            if(productList.isEmpty()){
                return ResponseEntity.ok(ApiResponse.builder()
                        .success(false)
                        .message("Product List Not Found")
                        .build());
            }else{
                return ResponseEntity.ok(ApiResponse.builder()
                        .success(true)
                        .data(productList)
                        .message("Get Product List Success")
                        .build());
            }
        }catch (Exception e){
            return ResponseEntity.ok(ApiResponse.builder()
                    .success(false)
                    .message("Get Product List Fail! Error: " + e.getMessage())
                    .build());
        }
    }

    @GetMapping("/list/{type}")
    public ResponseEntity<ApiResponse> getProductsByMountType(@PathVariable String type) throws Exception {
        try {
            List<Product> list = productService.getProductsByMountType(type);
            if (list.isEmpty()) {
                return ResponseEntity.ok(ApiResponse.builder()
                        .success(false)
                        .message("List Empty")
                        .build());
            } else {
                return ResponseEntity.ok(ApiResponse.builder()
                        .success(true)
                        .message("Get List Product By Mount Type Success")
                        .data(list)
                        .build());
            }
        }
        catch (Exception e){
            return ResponseEntity.ok(ApiResponse.builder()
                    .success(false)
                    .message("Get Product List Fail! Error: " + e.getMessage())
                    .build());
        }
    }

    @GetMapping("/description/{id}")
    public ResponseEntity<ApiResponse> getProductDescription(@PathVariable int id) {
        ProductDescriptionDTO dto = productService.getProductDescription(id);
        if(dto != null){
            return ResponseEntity.ok(ApiResponse.builder()
                    .success(true)
                    .message("Get Product Description By ID Success")
                    .data(dto)
                    .build());
        }else{
            return ResponseEntity.ok(ApiResponse.builder()
                    .success(false)
                    .message("Get Product DescriptionBy ID Fail")
                    .build());
        }
    }
}
