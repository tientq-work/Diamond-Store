package com.example.diamondstore.services.interfaces;

import com.example.diamondstore.dto.ProductPriceDTO;
import com.example.diamondstore.entities.Product;
import com.example.diamondstore.entities.ProductPrice;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface ProductPriceService {
    List<ProductPrice> productPriceList();
    ProductPrice getProductPriceById(int id);
    List<ProductPrice> getProductPriceListByProductId(int productId);
    ProductPrice createProductPrice(ProductPriceDTO productPriceDTO);
    void createProductPriceAuto(int productId);
    boolean deleteProductPrices(List<Integer> productPriceIds);
}
