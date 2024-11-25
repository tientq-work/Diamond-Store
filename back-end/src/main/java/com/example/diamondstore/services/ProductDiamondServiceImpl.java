package com.example.diamondstore.services;

import com.example.diamondstore.dto.ProductDiamondDTO;
import com.example.diamondstore.dto.UpdateProductDiamondDTO;
import com.example.diamondstore.entities.ProductDiamond;
import com.example.diamondstore.repositories.DiamondRepository;
import com.example.diamondstore.repositories.ProductDiamondRepository;
import com.example.diamondstore.repositories.ProductRepository;
import com.example.diamondstore.services.interfaces.ProductDiamondService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class ProductDiamondServiceImpl implements ProductDiamondService {
    @Autowired
    private ProductDiamondRepository productDiamondRepository;
    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private DiamondRepository diamondRepository;

    @Override
    public List<ProductDiamond> productDiamondList() {
        return productDiamondRepository.findAll();
    }

    @Override
    public ProductDiamond getProductDiamondById(int id) {
        return productDiamondRepository.findProductDiamondByProductDiamondId(id);
    }

    @Override
    public ProductDiamond createProductDiamond(ProductDiamondDTO productDiamondDTO) {
        ProductDiamond saveProductDiamond = productDiamondRepository.save(ProductDiamond.builder()
                .productId(productRepository.findProductByProductId(productDiamondDTO.getProductId()))
                .diamondId(diamondRepository.findDiamondByDiamondId(productDiamondDTO.getDiamondId()))
                .type(productDiamondDTO.getType())
                .quantity(productDiamondDTO.getQuantity())
                .build());
        return saveProductDiamond;
    }

    @Override
    public ProductDiamond updateProductDiamond(UpdateProductDiamondDTO updateProductDiamondDTO, int id) {
        ProductDiamond saveProductDiamond = productDiamondRepository.findProductDiamondByProductDiamondId(id);
        saveProductDiamond.setType(updateProductDiamondDTO.getType());
        saveProductDiamond.setQuantity(updateProductDiamondDTO.getQuantity());

        return productDiamondRepository.save(saveProductDiamond);
    }

    @Override
    public ProductDiamond getProductDiamondByProductIdAndDiamondId(int productId, int diamondId) {
        return productDiamondRepository.findProductDiamondByProductIdAndDiamondId(
                productRepository.findProductByProductId(productId),
                diamondRepository.findDiamondByDiamondId(diamondId));
    }

    @Override
    public boolean deleteProductDiamond(int id) {
        try{
            productDiamondRepository.deleteById(id);
            return true;
        }
        catch (Exception e) {
            return false;
        }
    }
}
