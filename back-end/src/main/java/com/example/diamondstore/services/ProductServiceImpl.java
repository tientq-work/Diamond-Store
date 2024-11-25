package com.example.diamondstore.services;

import com.example.diamondstore.dto.ProductDTO;
import com.example.diamondstore.dto.ProductDescriptionDTO;
import com.example.diamondstore.entities.*;
import com.example.diamondstore.repositories.*;
import com.example.diamondstore.services.interfaces.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Component
public class ProductServiceImpl implements ProductService {
    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private DiamondMountRepository diamondMountRepository;
    @Autowired
    private ProductDiamondRepository productDiamondRepository;
    @Autowired
    private DiamondRepository diamondRepository;
    @Autowired
    private InventoryRepository inventoryRepository;

    @Override
    public List<Product> productList() {
        List<Product> products = productRepository.findAll();
        for (Product p : products){
            p.setComponentsPrice(calculateComponentsPrice(p.getProductId()));
            p.setStatus("OutOfStock");

            List<Inventory> inventories = inventoryRepository.findInventoriesByProductId(p);
            if (inventories.isEmpty()){
                p.setStatus("OutOfStock");
            }
            else{
                for(Inventory i : inventories){
                    if(i.isAvailable() && i.getQuantity() > 0){
                        p.setStatus("InStock");
                    }
                }
            }
            productRepository.save(p);
        }

        return products;
    }

    @Override
    public Product getProductById(int id) {
        Product product = productRepository.findProductByProductId(id);
        product.setComponentsPrice(calculateComponentsPrice(id));
        return product;
    }

    @Override
    public Product createProduct(ProductDTO productDTO) {
        if (productRepository.existsByProductName(productDTO.getProductName())) {
            throw new IllegalArgumentException("Product name already exists");
        }
        Product saveProduct = productRepository.save(Product.builder()
                .productName(productDTO.getProductName())
                .description(productDTO.getDescription())
                .mountId(diamondMountRepository.findDiamondMountByMountId(productDTO.getMountId()))
                .laborFee(productDTO.getLaborFee())
                .componentsPrice(BigDecimal.valueOf(0))
                .price(BigDecimal.valueOf(0))
                .status(productDTO.getStatus())
                .url(productDTO.getUrl())
                .build());
        return saveProduct;
    }

    @Override
    public Product updateProduct(ProductDTO productDTO, int id) {
        Product saveProduct = productRepository.findProductByProductId(id);

        if (!saveProduct.getProductName().equals(productDTO.getProductName()) &&
                productRepository.existsByProductName(productDTO.getProductName())) {
            throw new IllegalArgumentException("Product name already exists");
        }

        saveProduct.setProductName(productDTO.getProductName());
        saveProduct.setDescription(productDTO.getDescription());
        saveProduct.setLaborFee(productDTO.getLaborFee());
//        saveProduct.setStatus(productDTO.getStatus());
//        saveProduct.setMountId(diamondMountRepository.findDiamondMountByMountId(productDTO.getMountId()));
        saveProduct.setUrl(productDTO.getUrl());

        return productRepository.save(saveProduct);
    }

    @Override
    public List<Product> findProductByProductName(String name) {
        return productRepository.findProductByProductName(name);
    }

    @Override
    public BigDecimal calculateComponentsPrice(int productId) {
        BigDecimal componentsPrice = BigDecimal.valueOf(0);

        // Get all ProductDiamond relations for the given productId
        List<ProductDiamond> productDiamonds = productDiamondRepository.
                findByProductId(productRepository.findProductByProductId(productId));

        // Calculate the price from diamonds
        for (ProductDiamond pd : productDiamonds) {
            Diamond diamond = diamondRepository.findById(pd.getDiamondId().getDiamondId()).orElse(null);
            if (diamond != null) {
                componentsPrice = componentsPrice.add(diamond.getBasePrice().multiply(BigDecimal.valueOf(pd.getQuantity())));
            }
        }

        // Get the associated DiamondMount
        Product product = productRepository.findById(productId).orElse(null);
        if (product != null && product.getMountId() != null) {
            DiamondMount mount = diamondMountRepository.findById(
                    product.getMountId().getMountId()).orElse(null);
            if (mount != null) {
                componentsPrice = componentsPrice.add(mount.getBasePrice());
            }
        }

        // Update the componentsPrice in the Product entity
        if (product != null) {
            product.setComponentsPrice(componentsPrice);
            productRepository.save(product);
        }

        return componentsPrice;
    }

    @Override
    public List<Product> getProductsByMountType(String type) {
        return productRepository.findByMountType(type);
    }

    @Override
    public ProductDescriptionDTO getProductDescription(int productId) {
        ProductDescriptionDTO dto = new ProductDescriptionDTO();
        Product product = productRepository.findProductByProductId(productId);
        dto.setMountSize(diamondMountRepository.findDiamondMountByMountId(product.getMountId().getMountId()).getSize());

        List<ProductDiamond> mainList = productDiamondRepository.findProductDiamondsByProductIdAndType(product, "Main");
        List<ProductDiamond> sideList = productDiamondRepository.findProductDiamondsByProductIdAndType(product, "Side");

        if (mainList.isEmpty()){
            dto.setMainQuantity(0);
            dto.setCaratWeight(0);
            dto.setMainName("");
            dto.setShape("");
        }
        else {
            int mainQuantity = 0;
            for (ProductDiamond pd : mainList){
                mainQuantity += pd.getQuantity();
            }
            dto.setMainQuantity(mainQuantity);
            dto.setMainName(diamondRepository.findDiamondByDiamondId(mainList.get(0).getDiamondId().getDiamondId()).getDiamondName());
            dto.setCaratWeight(diamondRepository.findDiamondByDiamondId(mainList.get(0).getDiamondId().getDiamondId()).getCaratWeight());
            dto.setShape(diamondRepository.findDiamondByDiamondId(mainList.get(0).getDiamondId().getDiamondId()).getShape());
        }

        if (sideList.isEmpty()){
            dto.setSideQuantity(0);
        }
        else {
            int sideQuantity = 0;
            for (ProductDiamond pd : sideList){
                sideQuantity += pd.getQuantity();
            }
            dto.setSideQuantity(sideQuantity);
        }

        return dto;
    }
}
