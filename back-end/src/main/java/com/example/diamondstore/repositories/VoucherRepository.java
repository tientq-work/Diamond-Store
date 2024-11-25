package com.example.diamondstore.repositories;

import com.example.diamondstore.entities.User;
import com.example.diamondstore.entities.Voucher;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface VoucherRepository extends JpaRepository<Voucher, Integer> {
    Voucher findByVoucherId(int id);
    List<Voucher> findByMemberId(User member);
}
