package com.example.diamondstore.repositories;

import com.example.diamondstore.entities.Image;
import com.example.diamondstore.entities.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ImageRepository extends JpaRepository<Image, Integer> {
    List<Image> getImagesByProductId(Product product);
}
