package com.example.diamondstore.api;

import com.example.diamondstore.dto.CertificateDTO;
import com.example.diamondstore.entities.Certificate;
import com.example.diamondstore.response.ApiResponse;
import com.example.diamondstore.services.interfaces.CertificateService;
import com.example.diamondstore.services.interfaces.DiamondService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/certificate")
public class CertificateController {

    @Autowired
    private CertificateService certificateService;
    @Autowired
    private DiamondService diamondService;

    @PostMapping("/create")
    @PreAuthorize("hasRole('ROLE_Manager')")
    public ResponseEntity<ApiResponse> createCertificate(@RequestBody CertificateDTO certificateDTO) {
        try {
            if(diamondService.getDiamondById(certificateDTO.getDiamondId()) == null){
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(
                        ApiResponse.builder()
                                .success(false)
                                .message("Diamond ID not found")
                                .build());
            }
            else {
                Certificate createdCertificate = certificateService.createCertificate(certificateDTO);
                return ResponseEntity.status(HttpStatus.CREATED).body(
                        ApiResponse.builder()
                                .success(true)
                                .message("Certificate Created Successfully")
                                .data(createdCertificate)
                                .build());
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(
                    ApiResponse.builder()
                            .success(false)
                            .message("Error: " + e.getMessage())
                            .build());
        }
    }

    @GetMapping("/all")
    @PreAuthorize("hasRole('ROLE_Manager')")
    public ResponseEntity<ApiResponse> getAllCertificates() {
        try {
            List<Certificate> certificates = certificateService.getAllCertificate();
            return ResponseEntity.ok(
                    ApiResponse.builder()
                            .success(true)
                            .message("List of All Certificates")
                            .data(certificates)
                            .build());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(
                    ApiResponse.builder()
                            .success(false)
                            .message("Internal Server Error: " + e.getMessage())
                            .build());
        }
    }

    @DeleteMapping("/delete/{certificateId}")
    @PreAuthorize("hasRole('ROLE_Manager')")
    public ResponseEntity<ApiResponse> deleteCertificate(@PathVariable Integer certificateId) {
        try {
            certificateService.deleteCertificate(certificateId);
            return ResponseEntity.ok(
                    ApiResponse.builder()
                            .success(true)
                            .message("Certificate Deleted Successfully")
                            .build());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(
                    ApiResponse.builder()
                            .success(false)
                            .message("Error: " + e.getMessage())
                            .build());
        }
    }

    @PutMapping("/update/{id}")
    @PreAuthorize("hasRole('ROLE_Manager')")
    public ResponseEntity<ApiResponse> updateCertificate(@RequestBody CertificateDTO certificateDTO, @PathVariable int id) {
        try {
            Certificate updatedCertificate = certificateService.updateCertificate(certificateDTO, id);
            return ResponseEntity.ok(
                    ApiResponse.builder()
                            .success(true)
                            .message("Certificate Updated Successfully")
                            .data(updatedCertificate)
                            .build());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(
                    ApiResponse.builder()
                            .success(false)
                            .message("Error: " + e.getMessage())
                            .build());
        }
    }

    @GetMapping("/{certificateId}")
    public ResponseEntity<ApiResponse> getCertificateById(@PathVariable Integer certificateId) {
        try {
            Certificate certificate = certificateService.getCertificateId(certificateId);
            return ResponseEntity.ok(
                    ApiResponse.builder()
                            .success(true)
                            .message("Certificate Retrieved Successfully")
                            .data(certificate)
                            .build());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(
                    ApiResponse.builder()
                            .success(false)
                            .message("Error: " + e.getMessage())
                            .build());
        }
    }

    @GetMapping("/diamond/{diamondId}")
    public ResponseEntity<ApiResponse> getCertificateByDiamondId(@PathVariable Integer diamondId) {
        try {
            Certificate certificates = certificateService.getCertificateByDiamondId(diamondId);
            return ResponseEntity.ok(
                    ApiResponse.builder()
                            .success(true)
                            .message("Certificate for Diamond ID: " + diamondId)
                            .data(certificates)
                            .build());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(
                    ApiResponse.builder()
                            .success(false)
                            .message("Error: " + e.getMessage())
                            .build());
        }
    }

    @GetMapping("/product/{productId}")
    public ResponseEntity<ApiResponse> getCertificatesByProductId(@PathVariable Integer productId) {
        try {
            List<Certificate> certificates = certificateService.getCertificateByProductId(productId);
            return ResponseEntity.ok(ApiResponse.builder()
                    .success(true)
                    .message("Certificates retrieved successfully")
                    .data(certificates)
                    .build());
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(ApiResponse.builder()
                    .success(false)
                    .message(e.getMessage())
                    .build());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(ApiResponse.builder()
                    .success(false)
                    .message("An unexpected error occurred: " + e.getMessage())
                    .build());
        }
    }
}
