package com.example.diamondstore.repositories;

import com.example.diamondstore.entities.Collection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface CollectionRepository extends JpaRepository<Collection, Integer> {
    @Query(value = "select c.* from [Collection] c where c.[collection_name] like %?1%", nativeQuery = true)
    List<Collection> findCollectionsByCollectionName(String name);


    @Query("SELECT CASE WHEN COUNT(c) > 0 THEN true ELSE false END FROM Collection c WHERE c.collectionName = ?1")
    boolean existsByCollectionName(String collectionName);

}
