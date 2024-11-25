package com.example.diamondstore.api;

import com.example.diamondstore.dto.DiamondDTO;
import com.example.diamondstore.dto.InventoryDTO;
import com.example.diamondstore.dto.ProductPromotionIdsDTO;
import com.example.diamondstore.entities.Diamond;
import com.example.diamondstore.entities.Inventory;
import com.example.diamondstore.response.ApiResponse;
import com.example.diamondstore.services.interfaces.InventoryService;
import com.example.diamondstore.services.interfaces.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/inventory")
@RequiredArgsConstructor
public class InventoryController {
    @Autowired
    private InventoryService inventoryService;
    @Autowired
    private ProductService productService;

    @GetMapping("/all")
    @PreAuthorize("hasRole('ROLE_Manager')")
    public ResponseEntity<ApiResponse> getAllInventory() throws Exception {
        List<Inventory> list = inventoryService.InventoryList();
        if(list.isEmpty()){
            return ResponseEntity.ok(ApiResponse.builder()
                    .success(false)
                    .message("Inventory is empty!")
                    .build());
        }else{
            return ResponseEntity.ok(ApiResponse.builder()
                    .success(true)
                    .message("Get All Inventory")
                    .data(list)
                    .build());
        }
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ROLE_Manager')")
    public ResponseEntity<ApiResponse> getInventoryId(@PathVariable int id) throws Exception {
        Inventory inventory = inventoryService.getInventoryById(id);
        if(inventory != null){
            return ResponseEntity.ok(ApiResponse.builder()
                    .success(true)
                    .message("Get Inventory By ID Success")
                    .data(inventory)
                    .build());
        }else{
            return ResponseEntity.ok(ApiResponse.builder()
                    .success(false)
                    .message("Get Inventory By ID Fail")
                    .build());
        }
    }

    @PostMapping("/create")
    @PreAuthorize("hasRole('ROLE_Manager')")
    public ResponseEntity<ApiResponse> createInventory(@RequestBody InventoryDTO inventoryDTO) throws Exception {
        try{
            if(productService.getProductById(inventoryDTO.getProductId()) == null){
                return ResponseEntity.ok(ApiResponse.builder()
                        .success(false)
                        .message("Product Not Found!")
                        .build());
            }
            else if(inventoryDTO.getQuantity() == 0 && inventoryDTO.isAvailable()){
                return ResponseEntity.ok(ApiResponse.builder()
                        .success(false)
                        .message("Product can not be set to Available if Quantity is 0!")
                        .build());
            }
            else if(inventoryDTO.getQuantity() < 0){
                return ResponseEntity.ok(ApiResponse.builder()
                        .success(false)
                        .message("Invalid Quantity")
                        .build());
            }
            else {
                Inventory inventory = inventoryService.createInventory(inventoryDTO);
                return ResponseEntity.ok(ApiResponse.builder()
                        .success(true)
                        .message("Create inventory success!")
                        .data(inventory)
                        .build());
            }
        }catch (Exception e){
            return ResponseEntity.ok(ApiResponse.builder()
                    .success(false)
                    .message("Create inventory fail! Error: " + e.getMessage())
                    .build());
        }
    }

    @PutMapping("/update/{id}")
    @PreAuthorize("hasRole('ROLE_Manager')")
    public ResponseEntity<ApiResponse> updateInventory(@RequestBody InventoryDTO inventoryDTO, @PathVariable int id) throws Exception {
        try{
            if(inventoryService.getInventoryById(id) == null){
                return ResponseEntity.ok(ApiResponse.builder()
                        .success(false)
                        .message("Inventory Not Found!")
                        .build());
            }
            else if(inventoryDTO.getQuantity() < 0){
                return ResponseEntity.ok(ApiResponse.builder()
                        .success(false)
                        .message("Invalid Quantity")
                        .build());
            }
            else {
                Inventory inventory = inventoryService.updateInventory(inventoryDTO, id);
                return ResponseEntity.ok(ApiResponse.builder()
                        .success(true)
                        .message("Update inventory success!")
                        .data(inventory)
                        .build());
            }
        }catch (Exception e){
            return ResponseEntity.ok(ApiResponse.builder()
                    .success(false)
                    .message("Update inventory fail! Error: " + e.getMessage())
                    .build());
        }
    }

    @DeleteMapping("/delete/{id}")
    @PreAuthorize("hasRole('ROLE_Manager')")
    public ResponseEntity<ApiResponse> deleteInventory(@PathVariable int id) {
        Inventory inventory = inventoryService.getInventoryById(id);
        try{
            if(inventory.isAvailable() || inventory.getQuantity() != 0){
                return ResponseEntity.ok(ApiResponse.builder()
                        .success(false)
                        .message("Inventory does not satisfy the condition to delete!")
                        .build());
            }
            boolean p = inventoryService.deleteInventory(id);
            if (p){
                return ResponseEntity.ok(ApiResponse.builder()
                        .success(true)
                        .message("Delete Inventory Success!")
                        .build());
            }
            else{
                return ResponseEntity.ok(ApiResponse.builder()
                        .success(false)
                        .message("Delete Inventory fail!")
                        .build());
            }
        }catch (Exception e){
            return ResponseEntity.ok(ApiResponse.builder()
                    .success(false)
                    .message("Delete Inventory fail! Error: " + e.getMessage())
                    .build());
        }
    }
}
