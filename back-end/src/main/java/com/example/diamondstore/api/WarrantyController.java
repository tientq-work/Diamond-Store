package com.example.diamondstore.api;

import com.example.diamondstore.dto.WarrantyDTO;
import com.example.diamondstore.entities.Warranty;
import com.example.diamondstore.exceptions.DataNotFoundException;
import com.example.diamondstore.response.ApiResponse;
import com.example.diamondstore.services.interfaces.WarrantyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/warranty")
public class WarrantyController {

    @Autowired
    private WarrantyService warrantyService;

    @PostMapping("/create")
    @PreAuthorize("hasAnyRole('ROLE_Manager', 'ROLE_Sales Staff')")
    public ResponseEntity<ApiResponse> addWarranty(@RequestBody WarrantyDTO warrantyDTO) {
        try {
            if (warrantyDTO.getStartDate().isAfter(warrantyDTO.getEndDate())) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ApiResponse.builder()
                        .success(false)
                        .message("StartDate must be before EndDate.")
                        .build());
            }

            Warranty savedWarranty = warrantyService.addWarranty(warrantyDTO);
            return ResponseEntity.status(HttpStatus.CREATED).body(ApiResponse.builder()
                    .success(true)
                    .message("Warranty Created Successfully.")
                    .data(savedWarranty)
                    .build());
        } catch (DataNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ApiResponse.builder()
                    .success(false)
                    .message("Error: " + e.getMessage())
                    .build());
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ApiResponse.builder()
                    .success(false)
                    .message("Error: " + e.getMessage())
                    .build());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(ApiResponse.builder()
                    .success(false)
                    .message("Internal Server Error: " + e.getMessage())
                    .build());
        }
    }

    @PutMapping("update/{warrantyId}")
    @PreAuthorize("hasAnyRole('ROLE_Manager', 'ROLE_Sales Staff')")
    public ResponseEntity<ApiResponse> updateWarranty(@PathVariable Integer warrantyId, @RequestBody WarrantyDTO warrantyDTO) {
        try {
            if (warrantyDTO.getStartDate().isAfter(warrantyDTO.getEndDate())) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ApiResponse.builder()
                        .success(false)
                        .message("StartDate must be before EndDate ~~")
                        .build());
            } else {
                Warranty updatedWarranty = warrantyService.updateWarranty(warrantyId, warrantyDTO);
                return ResponseEntity.ok(ApiResponse.builder()
                        .success(true)
                        .message("Warranty Updated Successfully")
                        .data(updatedWarranty)
                        .build());
            }
        } catch (DataNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ApiResponse.builder()
                    .success(false)
                    .message("Error: " + e.getMessage())
                    .build());
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ApiResponse.builder()
                    .success(false)
                    .message("Error: " + e.getMessage())
                    .build());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(ApiResponse.builder()
                    .success(false)
                    .message("Internal Server Error: " + e.getMessage())
                    .build());
        }
    }

    @DeleteMapping("/delete/{warrantyId}")
    @PreAuthorize("hasRole('ROLE_Manager')")
    public ResponseEntity<ApiResponse> deleteWarranty(@PathVariable Integer warrantyId) {
        try {
            warrantyService.deleteWarranty(warrantyId);
            return ResponseEntity.ok(ApiResponse.builder()
                    .success(true)
                    .message("Warranty Deleted Successfully")
                    .build());
        } catch (DataNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ApiResponse.builder()
                    .success(false)
                    .message("Error: " + e.getMessage())
                    .build());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(ApiResponse.builder()
                    .success(false)
                    .message("Internal Server Error: " + e.getMessage())
                    .build());
        }
    }

    @GetMapping("/all")
    @PreAuthorize("hasAnyRole('ROLE_Manager', 'ROLE_Sales Staff')")
    public ResponseEntity<ApiResponse> viewAllWarranty() {
        try {
            List<Warranty> warranties = warrantyService.viewAllWarranty();
            return ResponseEntity.ok(ApiResponse.builder()
                    .success(true)
                    .message("List of All Warranties")
                    .data(warranties)
                    .build());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(ApiResponse.builder()
                    .success(false)
                    .message("Internal Server Error: " + e.getMessage())
                    .build());
        }
    }

    @GetMapping("/{warrantyId}")
    public ResponseEntity<ApiResponse> getWarrantyById(@PathVariable Integer warrantyId) {
        try {
            Warranty warranty = warrantyService.getWarrantyById(warrantyId);
            return ResponseEntity.ok(ApiResponse.builder()
                    .success(true)
                    .message("Warranty Retrieved Successfully")
                    .data(warranty)
                    .build());
        } catch (DataNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ApiResponse.builder()
                    .success(false)
                    .message("Error: " + e.getMessage())
                    .build());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(ApiResponse.builder()
                    .success(false)
                    .message("Internal Server Error: " + e.getMessage())
                    .build());
        }
    }

    @GetMapping("/orderDetail/{orderDetailId}")
    //@PreAuthorize("hasAnyRole('ROLE_Manager', 'ROLE_Sales Staff')")
    public ResponseEntity<ApiResponse> getWarrantyByOrderDetailId(@PathVariable Integer orderDetailId) {
        try {
            List<Warranty> warranties = warrantyService.getWarrantyByOrderDetailId(orderDetailId);
            return ResponseEntity.ok(ApiResponse.builder()
                    .success(true)
                    .message("List of Warranties for OrderDetail ID: " + orderDetailId)
                    .data(warranties)
                    .build());
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(ApiResponse.builder()
                    .success(false)
                    .message("Invalid OrderDetail ID: " + e.getMessage())
                    .build());
        } catch (Exception e) {
            return ResponseEntity.status(500).body(ApiResponse.builder()
                    .success(false)
                    .message("Failed to retrieve warranties: " + e.getMessage())
                    .build());
        }
    }
}
