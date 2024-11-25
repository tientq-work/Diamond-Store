package com.example.diamondstore.services.interfaces;

import com.example.diamondstore.dto.ImageListDTO;
import com.example.diamondstore.entities.Image;
import com.example.diamondstore.entities.Product;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface ImageService {
    List<Image> getImagesByProductId(int productId);
    List<Image> saveListImagesByProductId(ImageListDTO imageListDTO);
}
