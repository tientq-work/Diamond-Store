package com.example.diamondstore.repositories;

import com.example.diamondstore.entities.Certificate;
import com.example.diamondstore.entities.Diamond;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CertificateRepository extends JpaRepository<Certificate, Integer> {
    Certificate findByDiamondId(Diamond diamondId);
}
