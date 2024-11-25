package com.example.diamondstore.services.interfaces;

import com.example.diamondstore.dto.CertificateDTO;
import com.example.diamondstore.entities.Certificate;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface CertificateService {
    Certificate createCertificate(CertificateDTO certificateDTO);
    List<Certificate> getAllCertificate();
    void deleteCertificate(Integer certificateId);
    Certificate updateCertificate(CertificateDTO certificateDTO, int id);
    Certificate getCertificateId(Integer certificateId);
    Certificate getCertificateByDiamondId(Integer diamondId);
    List<Certificate> getCertificateByProductId(Integer productId);
}
