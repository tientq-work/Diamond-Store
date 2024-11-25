package com.example.diamondstore.services.interfaces;

import com.example.diamondstore.dto.ProductDiamondDTO;
import com.example.diamondstore.dto.UpdateProductDiamondDTO;
import com.example.diamondstore.entities.ProductDiamond;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface ProductDiamondService {
    List<ProductDiamond> productDiamondList();
    ProductDiamond getProductDiamondById(int id);

    ProductDiamond createProductDiamond(ProductDiamondDTO productDiamondDTO);
    ProductDiamond updateProductDiamond(UpdateProductDiamondDTO updateProductDiamondDTO, int id);
    ProductDiamond getProductDiamondByProductIdAndDiamondId(int productId, int diamondId);
    boolean deleteProductDiamond(int id);
}
