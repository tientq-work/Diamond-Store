package com.example.diamondstore.services;

import com.example.diamondstore.dto.ImageListDTO;
import com.example.diamondstore.entities.Image;
import com.example.diamondstore.entities.Product;
import com.example.diamondstore.repositories.ImageRepository;
import com.example.diamondstore.repositories.ProductRepository;
import com.example.diamondstore.services.interfaces.ImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class ImageServiceImpl implements ImageService {
    @Autowired
    private ImageRepository imageRepository;
    @Autowired
    private ProductRepository productRepository;

    @Override
    public List<Image> getImagesByProductId(int productId) {
        return imageRepository.getImagesByProductId(productRepository.findProductByProductId(productId));
    }

    @Override
    public List<Image> saveListImagesByProductId(ImageListDTO imageListDTO) {
        Product product = productRepository.findProductByProductId(imageListDTO.getProductId());
        List<String> listUrl = imageListDTO.getUrl();
        List<Image> imageList = new ArrayList<>();
        for(String url : listUrl){
            Image saveImage = imageRepository.save(Image.builder()
                    .productId(product)
                    .url(url)
                    .build());
            imageList.add(saveImage);
        }
        return imageList;
    }
}
