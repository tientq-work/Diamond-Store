package com.example.diamondstore.repositories;

import com.example.diamondstore.entities.Inventory;
import com.example.diamondstore.entities.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface InventoryRepository extends JpaRepository<Inventory, Integer> {
    Inventory findInventoryByLocationId(int id);
    List<Inventory> findByProductIdAndAvailable(Product product, boolean available);
    Inventory findTop1ByProductId(Product product);
    List<Inventory> findInventoriesByProductId(Product product);
}
