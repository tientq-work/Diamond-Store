package com.example.diamondstore.api;

import com.example.diamondstore.dto.CollectionDTO;
import com.example.diamondstore.dto.CollectionProductDTO;
import com.example.diamondstore.entities.Collection;
import com.example.diamondstore.entities.Product;
import com.example.diamondstore.entities.Warranty;
import com.example.diamondstore.response.ApiResponse;
import com.example.diamondstore.services.interfaces.CollectionService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/collection")
public class CollectionController {

    @Autowired
    private CollectionService collectionService;

    @PostMapping("/create")
    @PreAuthorize("hasRole('ROLE_Manager')")
    public ResponseEntity<ApiResponse> createCollection(@Valid @RequestBody CollectionDTO collectionDTO) {
        try {
            Collection newCollection = collectionService.createCollection(collectionDTO);
            return ResponseEntity.ok(
                    ApiResponse.builder()
                            .success(true)
                            .message("Collection Created Successfully")
                            .data(newCollection)
                            .build());
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(
                    ApiResponse.builder()
                            .success(false)
                            .message(e.getMessage())
                            .build());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(
                    ApiResponse.builder()
                            .success(false)
                            .message("Error: " + e.getMessage())
                            .build());
        }
    }

    @PutMapping("/update/{collectionId}")
    @PreAuthorize("hasRole('ROLE_Manager')")
    public ResponseEntity<ApiResponse> updateCollection(@PathVariable Integer collectionId, @Valid @RequestBody CollectionDTO collectionDTO) {
        try {
            Collection updatedCollection = collectionService.updateCollection(collectionId, collectionDTO);
            return ResponseEntity.ok(
                    ApiResponse.builder()
                            .success(true)
                            .message("Collection Updated Successfully")
                            .data(updatedCollection)
                            .build());
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(
                    ApiResponse.builder()
                            .success(false)
                            .message(e.getMessage())
                            .build());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(
                    ApiResponse.builder()
                            .success(false)
                            .message("Error: " + e.getMessage())
                            .build());
        }
    }

    @DeleteMapping("/deleteCollection/{id}")
    @PreAuthorize("hasRole('ROLE_Manager')")
    public ResponseEntity<ApiResponse> deleteCollection(@PathVariable Integer id) {
        try {
            if(!collectionService.existCollection(id)){
                return ResponseEntity.ok(
                        ApiResponse.builder()
                                .success(false)
                                .message("Collection not Found!")
                                .build());
            }
            collectionService.deleteCollection(id);
            return ResponseEntity.ok(
                    ApiResponse.builder()
                            .success(true)
                            .message("Collection Deleted Successfully")
                            .build());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(
                    ApiResponse.builder()
                            .success(false)
                            .message("Error: " + e.getMessage())
                            .build());
        }
    }

    @GetMapping("/collectionName/{name}")
    public ResponseEntity<ApiResponse> getCollectionsByName(@PathVariable String name) {
        try {
            List<Collection> collections = collectionService.getCollectionByName(name);
            if (collections.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                        ApiResponse.builder()
                                .success(false)
                                .message("No collections found with the name: " + name)
                                .build());
            }
            return ResponseEntity.ok(
                    ApiResponse.builder()
                            .success(true)
                            .message("Collections retrieved successfully")
                            .data(collections)
                            .build());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(
                    ApiResponse.builder()
                            .success(false)
                            .message("Error: " + e.getMessage())
                            .build());
        }
    }


    @PostMapping("/addCollection")
    @PreAuthorize("hasRole('ROLE_Manager')")
    public ResponseEntity<ApiResponse> addProductToCollection(@RequestBody CollectionProductDTO collectionProductDTO) {
        try {
            Collection collection = collectionService.addProductToCollection(collectionProductDTO);

            return ResponseEntity.ok(
                    ApiResponse.builder()
                            .success(true)
                            .message("Product Added to Collection Successfully")
                            .data(collection)
                            .build());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(
                    ApiResponse.builder()
                            .success(false)
                            .message("Error: " + e.getMessage())
                            .build());
        }
    }

    @GetMapping("/all")
    public ResponseEntity<ApiResponse> getAllCollection() {
        try {
            List<Collection> collection = collectionService.getAllCollection();
            return ResponseEntity.ok(ApiResponse.builder()
                    .success(true)
                    .message("List of All Collection")
                    .data(collection)
                    .build());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(ApiResponse.builder()
                    .success(false)
                    .message("Internal Server Error: " + e.getMessage())
                    .build());
        }
    }

    @DeleteMapping("/deleteProduct")
    @PreAuthorize("hasRole('ROLE_Manager')")
    public ResponseEntity<ApiResponse> removeProductFromCollection(@RequestBody CollectionProductDTO collectionProductDTO) {
        try {
            collectionService.removeProductFromCollection(collectionProductDTO);
            return ResponseEntity.ok(
                    ApiResponse.builder()
                            .success(true)
                            .message("Product(s) Removed from Collection Successfully")
                            .build());
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                    ApiResponse.builder()
                            .success(false)
                            .message("Error: " + e.getMessage())
                            .build());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(
                    ApiResponse.builder()
                            .success(false)
                            .message("Error: " + e.getMessage())
                            .build());
        }
    }

    @GetMapping("/product/collection/{productId}")
    public ResponseEntity<ApiResponse> getCollectionsOfProduct(@PathVariable Integer productId) {
        try {
            List<Collection> collections = collectionService.getCollectionsOfProduct(productId);
            if (collections.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                        ApiResponse.builder()
                                .success(false)
                                .message("No collections found for product ID: " + productId)
                                .build());
            }
            return ResponseEntity.ok(
                    ApiResponse.builder()
                            .success(true)
                            .message("Collections retrieved successfully")
                            .data(collections)
                            .build());
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                    ApiResponse.builder()
                            .success(false)
                            .message("Error: " + e.getMessage())
                            .build());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(
                    ApiResponse.builder()
                            .success(false)
                            .message("Error: Could not retrieve collections")
                            .build());
        }
    }

    @GetMapping("/product/{collectionId}")
    public ResponseEntity<ApiResponse> getProductsInCollection(@PathVariable Integer collectionId) {
        try {
            List<Product> products = collectionService.getProductsInCollection(collectionId);
            if (products.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                        ApiResponse.builder()
                                .success(false)
                                .message("No products found in collection ID: " + collectionId)
                                .build());
            }
            return ResponseEntity.ok(
                    ApiResponse.builder()
                            .success(true)
                            .message("Products retrieved successfully")
                            .data(products)
                            .build());
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                    ApiResponse.builder()
                            .success(false)
                            .message("Error: " + e.getMessage())
                            .build());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(
                    ApiResponse.builder()
                            .success(false)
                            .message("Error: Could not retrieve products")
                            .build());
        }
    }

}
