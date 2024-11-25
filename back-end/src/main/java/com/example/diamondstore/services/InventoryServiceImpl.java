package com.example.diamondstore.services;

import com.example.diamondstore.dto.InventoryDTO;
import com.example.diamondstore.entities.Inventory;
import com.example.diamondstore.entities.Product;
import com.example.diamondstore.repositories.InventoryRepository;
import com.example.diamondstore.repositories.ProductRepository;
import com.example.diamondstore.services.interfaces.InventoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.time.Instant;
import java.time.LocalDate;
import java.util.Date;
import java.util.List;

@Component
public class InventoryServiceImpl implements InventoryService {
    @Autowired
    private InventoryRepository inventoryRepository;
    @Autowired
    private ProductRepository productRepository;

    @Override
    public List<Inventory> InventoryList() {
        return inventoryRepository.findAll();
    }

    @Override
    public Inventory getInventoryById(int id) {
        return inventoryRepository.findInventoryByLocationId(id);
    }

    @Override
    public Inventory createInventory(InventoryDTO inventoryDTO) {
        Inventory saveInventory = inventoryRepository.save(Inventory.builder()
                .productId(productRepository.findProductByProductId(inventoryDTO.getProductId()))
                .purchaseDate(inventoryDTO.getPurchaseDate())
                .condition(inventoryDTO.getCondition())
                .quantity(inventoryDTO.getQuantity())
                .available(inventoryDTO.isAvailable())
                .build());
        return saveInventory;
    }

    @Override
    public Inventory updateInventory(InventoryDTO inventoryDTO, int id) {
        Inventory saveInventory = inventoryRepository.findInventoryByLocationId(id);
        saveInventory.setCondition(inventoryDTO.getCondition());
        saveInventory.setQuantity(inventoryDTO.getQuantity());
        saveInventory.setPurchaseDate(inventoryDTO.getPurchaseDate());
        saveInventory.setUpdateDate(LocalDate.now());

        if (inventoryDTO.getQuantity() == 0)
            saveInventory.setAvailable(false);
        else
            saveInventory.setAvailable(inventoryDTO.isAvailable());

        return inventoryRepository.save(saveInventory);
    }

    @Override
    public boolean deleteInventory(int id) {
        try{
            inventoryRepository.delete(inventoryRepository.findInventoryByLocationId(id));
            return true;
        }
        catch (Exception e) {
            return false;
        }
    }

    @Override
    public List<Inventory> getListByProductAndAvailable(Product product, boolean available) {
        return inventoryRepository.findByProductIdAndAvailable(product, true);
    }
}
