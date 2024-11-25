package com.example.diamondstore.services.interfaces;

import com.example.diamondstore.dto.DiamondDTO;
import com.example.diamondstore.dto.InventoryDTO;
import com.example.diamondstore.entities.Diamond;
import com.example.diamondstore.entities.Inventory;
import com.example.diamondstore.entities.Product;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface InventoryService {
    List<Inventory> InventoryList();
    Inventory getInventoryById(int id);
    Inventory createInventory(InventoryDTO inventoryDTO);
    Inventory updateInventory(InventoryDTO inventoryDTO, int id);
    boolean deleteInventory(int id);
    List<Inventory> getListByProductAndAvailable(Product product, boolean available);
}
