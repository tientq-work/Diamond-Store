package com.example.diamondstore.services.interfaces;

import com.example.diamondstore.dto.CollectionDTO;
import com.example.diamondstore.dto.CollectionProductDTO;
import com.example.diamondstore.entities.Collection;
import com.example.diamondstore.entities.Product;
import jakarta.persistence.Id;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface CollectionService {
    Collection createCollection(CollectionDTO collectionDTO);

    //Get all Collection

    // Update Collection


    void deleteCollection(Integer collectionId);

    List<Collection> getCollectionByName(String name) throws Exception;

    Collection addProductToCollection(CollectionProductDTO collectionProductDTO);

    void removeProductFromCollection(CollectionProductDTO collectionProductDTO);

    Collection updateCollection(Integer collectionId, CollectionDTO collectionDTO);

    List<Collection> getAllCollection();


    List<Product> getProductsInCollection(Integer ProductId) throws Exception;

    List<Collection> getCollectionsOfProduct(Integer CollectionId) throws Exception;

    boolean existCollection(Integer collectionId);
    boolean existProduct(Integer productId);


}
