package com.example.diamondstore.repositories;

import com.example.diamondstore.entities.VoucherType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VoucherTypeRepository extends JpaRepository<VoucherType, Integer> {
    VoucherType findByVoucherTypeId(int id);
}
