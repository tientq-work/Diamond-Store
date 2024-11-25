package com.example.diamondstore.repositories;

import com.example.diamondstore.entities.DiamondMount;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DiamondMountRepository extends JpaRepository<DiamondMount, Integer> {
    DiamondMount findDiamondMountByMountId(int id);
    List<DiamondMount> findDiamondMountsByType(String type);
    @Query("SELECT DISTINCT d.type FROM DiamondMount d")
    List<String> findDistinctTypes();
}
