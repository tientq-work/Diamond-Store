package com.example.diamondstore.services;

import com.example.diamondstore.dto.CertificateDTO;
import com.example.diamondstore.entities.Certificate;
import com.example.diamondstore.entities.Diamond;
import com.example.diamondstore.entities.Product;
import com.example.diamondstore.entities.ProductDiamond;
import com.example.diamondstore.repositories.CertificateRepository;
import com.example.diamondstore.repositories.DiamondRepository;
import com.example.diamondstore.repositories.ProductDiamondRepository;
import com.example.diamondstore.repositories.ProductRepository;
import com.example.diamondstore.services.interfaces.CertificateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class CertificateServiceImpl implements CertificateService {
    @Autowired
    private CertificateRepository certificateRepository;
    @Autowired
    private DiamondRepository diamondRepository;
    @Autowired
    private ProductDiamondRepository productDiamondRepository;
    @Autowired
    private ProductRepository productRepository;

    @Override
    public Certificate createCertificate(CertificateDTO certificateDTO) {
        Diamond diamond = diamondRepository.findDiamondByDiamondId(certificateDTO.getDiamondId());

        Certificate certificate = certificateRepository.save(Certificate.builder()
                .diamondId(diamond)
                .number(certificateDTO.getNumber())
                .description(certificateDTO.getDescription())
                .shapeCut(certificateDTO.getShapeCut())
                .measure(certificateDTO.getMeasure())
                .polish(certificateDTO.getPolish())
                .symmetry(certificateDTO.getSymmetry())
                .issuer(certificateDTO.getIssuer())
                .issued_date(certificateDTO.getIssued_date())
                .build());

        return certificate;
    }

    @Override
    public List<Certificate> getAllCertificate() {
        return certificateRepository.findAll();
    }

    @Override
    public void deleteCertificate(Integer certificateId) {
        certificateRepository.deleteById(certificateId);
    }

    @Override
    public Certificate updateCertificate(CertificateDTO certificateDTO, int id) {
        Certificate certificate = certificateRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Certificate not found"));

        certificate.setDescription(certificateDTO.getDescription());
        certificate.setShapeCut(certificateDTO.getShapeCut());
        certificate.setMeasure(certificateDTO.getMeasure());
        certificate.setPolish(certificateDTO.getPolish());
        certificate.setSymmetry(certificateDTO.getSymmetry());
        certificate.setIssuer(certificateDTO.getIssuer());
        certificate.setIssued_date(certificateDTO.getIssued_date());

        return certificateRepository.save(certificate);
    }

    @Override
    public Certificate getCertificateId(Integer certificateId) {
        return certificateRepository.findById(certificateId)
                .orElseThrow(() -> new IllegalArgumentException("Certificate not found"));
    }

    @Override
    public Certificate getCertificateByDiamondId(Integer diamondId) {
        Diamond diamond = diamondRepository.findById(diamondId)
                .orElseThrow(() -> new IllegalArgumentException("Diamond not found"));
        return certificateRepository.findByDiamondId(diamond);
    }

    @Override
    public List<Certificate> getCertificateByProductId(Integer productId) {

        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new IllegalArgumentException("Product not found"));
        List<ProductDiamond> productDiamonds = productDiamondRepository.findByProductIdAndType(product, "Main");
        if (productDiamonds.isEmpty()) {
            throw new IllegalArgumentException("No ProductDiamond found for the given productId and type 'Main'");
        }
        List<Certificate> certificates = new ArrayList<>();
        for (ProductDiamond productDiamond : productDiamonds) {
            if (productDiamond != null && productDiamond.getDiamondId() != null) {
                Certificate certificate = certificateRepository.findByDiamondId(productDiamond.getDiamondId());
                if (certificate != null) {
                    certificates.add(certificate);
                }
            }
        }

        if (certificates.isEmpty()) {
            throw new IllegalArgumentException("No certificates found for the given productId");
        }
        return certificates;
    }
}
