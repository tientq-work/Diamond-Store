package com.example.diamondstore.services;

import com.example.diamondstore.dto.CollectionDTO;
import com.example.diamondstore.dto.CollectionProductDTO;
import com.example.diamondstore.entities.CollectionProducts;
import com.example.diamondstore.entities.Collection;
import com.example.diamondstore.entities.Product;
import com.example.diamondstore.repositories.CollectionProductRepository;
import com.example.diamondstore.repositories.CollectionRepository;
import com.example.diamondstore.repositories.ProductRepository;
import com.example.diamondstore.services.interfaces.CollectionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
public class CollectionServiceImpl implements CollectionService {

    @Autowired
    private CollectionRepository collectionRepository;

    @Autowired
    private CollectionProductRepository collectionProductRepository;

    @Autowired
    private ProductRepository productRepository;

    @Override
    public Collection createCollection(CollectionDTO collectionDTO) {
        if (collectionRepository.existsByCollectionName(collectionDTO.getName())) {
            throw new IllegalArgumentException("Collection name already exists");
        }
        Collection collection = Collection.builder()
                .collectionName(collectionDTO.getName())
                .description(collectionDTO.getDescription())
                .url(collectionDTO.getUrl())
                .build();
        return collectionRepository.save(collection);
    }

    @Override
    public void deleteCollection(Integer collectionId) {
        collectionRepository.deleteById(collectionId);
    }


    @Override
    public List<Collection> getCollectionByName(String name) throws Exception {
        try {
            return collectionRepository.findCollectionsByCollectionName(name);
        } catch (Exception e) {
            throw new Exception("Could not retrieve collections: " + e.getMessage());
        }
    }

    @Override
    public Collection addProductToCollection(CollectionProductDTO collectionProductDTO) {
        Collection collection = collectionRepository.findById(collectionProductDTO.getCollectionId())
                .orElseThrow(() -> new IllegalArgumentException("Collection not found"));
        List<Integer> p = collectionProductDTO.getProductIds();
        for (Integer product : p) {
            Product pro = productRepository.findById(product)
                    .orElseThrow(() -> new IllegalArgumentException("Product not found"));
            boolean exists = collectionProductRepository.existsByCollectionIdAndProductId(collection, pro);
            if (exists) {
                throw new IllegalArgumentException("Product with ID: " + product + " already exists in the collection");
            }

            CollectionProducts collectionProducts = CollectionProducts.builder()
                    .collectionId(collection)
                    .productId(pro)
                    .build();

            collectionProductRepository.save(collectionProducts);


        }
        return collection;
    }

    @Override
    @Transactional
    public void removeProductFromCollection(CollectionProductDTO collectionProductDTO) {
        Collection collection = collectionRepository.findById(collectionProductDTO.getCollectionId())
                .orElseThrow(() -> new IllegalArgumentException("Collection not found"));

        List<Integer> productIds = collectionProductDTO.getProductIds();
        for (Integer productId : productIds) {
            Product product = productRepository.findById(productId)
                    .orElseThrow(() -> new IllegalArgumentException("Product not found with ID: " + productId));
            boolean exists = collectionProductRepository.existsByCollectionIdAndProductId(collection, product);
            if (!exists) {
                throw new IllegalArgumentException("Product with ID: " + productId + " does not exist in the collection");
            }
            collectionProductRepository.deleteByCollectionIdAndProductId(collection, product);
        }
    }

    @Override
    @Transactional
    public Collection updateCollection(Integer collectionId, CollectionDTO collectionDTO) {
        Collection collection = collectionRepository.findById(collectionId)
                .orElseThrow(() -> new IllegalArgumentException("Collection not found"));
        if (!collection.getCollectionName().equals(collectionDTO.getName()) && collectionRepository.existsByCollectionName(collectionDTO.getName())) {
            throw new IllegalArgumentException("Collection name already exists");
        }
        collection.setCollectionName(collectionDTO.getName());
        collection.setDescription(collectionDTO.getDescription());
        collection.setUrl(collectionDTO.getUrl());

        return collectionRepository.save(collection);
    }


    @Override
    public List<Collection> getAllCollection() {
        return collectionRepository.findAll();
    }


    @Override
    public List<Collection> getCollectionsOfProduct(Integer productId) throws Exception {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new IllegalArgumentException("Product not found"));

        try {
            List<CollectionProducts> collectionProductsList = collectionProductRepository.findCollectionByProductId(product);
            List<Collection> collections = new ArrayList<>();
            for (CollectionProducts cp : collectionProductsList) {
                collections.add(cp.getCollectionId());
            }
            return collections;
        } catch (Exception e) {
            throw new Exception("Could not retrieve collections: " + e.getMessage());
        }
    }

    @Override
    public List<Product> getProductsInCollection(Integer collectionId) throws Exception {
        Collection collection = collectionRepository.findById(collectionId)
                .orElseThrow(() -> new IllegalArgumentException("Collection not found"));

        try {
            List<CollectionProducts> collectionProductsList = collectionProductRepository.findProductByCollectionId(collection);
            List<Product> products = new ArrayList<>();
            for (CollectionProducts cp : collectionProductsList) {
                products.add(cp.getProductId());
            }
            return products;
        } catch (Exception e) {
            throw new Exception("Could not retrieve products: " + e.getMessage());
        }
    }

    @Override
    public boolean existCollection(Integer collectionId) {
        return collectionRepository.existsById(collectionId);
    }

    @Override
    public boolean existProduct(Integer productId) {
        return productRepository.existsById(productId);
    }

}
