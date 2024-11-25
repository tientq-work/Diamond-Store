package com.example.diamondstore.api;


import com.example.diamondstore.dto.DiamondDTO;
import com.example.diamondstore.dto.VoucherTypeDTO;
import com.example.diamondstore.entities.Diamond;
import com.example.diamondstore.entities.VoucherType;
import com.example.diamondstore.response.ApiResponse;
import com.example.diamondstore.services.interfaces.VoucherTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/vouchertype")
public class VoucherTypeController {
    @Autowired
    private VoucherTypeService voucherTypeService;

    @GetMapping("/all")
    public ResponseEntity<ApiResponse> getAllVoucherType() throws Exception {
        List<VoucherType> list = voucherTypeService.voucherTypeList();
        if(list.isEmpty()){
            return ResponseEntity.ok(ApiResponse.builder()
                    .success(false)
                    .message("List VoucherTypes is empty!")
                    .build());
        }else{
            return ResponseEntity.ok(ApiResponse.builder()
                    .success(true)
                    .message("Get All VoucherTypes")
                    .data(list)
                    .build());
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse> getVoucherTypeId(@PathVariable int id) throws Exception {
        VoucherType voucherType = voucherTypeService.getVoucherTypeById(id);
        if(voucherType != null){
            return ResponseEntity.ok(ApiResponse.builder()
                    .success(true)
                    .message("Get VoucherType By ID Success")
                    .data(voucherType)
                    .build());
        }else{
            return ResponseEntity.ok(ApiResponse.builder()
                    .success(false)
                    .message("Get VoucherType By ID Fail")
                    .build());
        }
    }

    @PostMapping("/create")
    @PreAuthorize("hasRole('ROLE_Manager')")
    public ResponseEntity<ApiResponse> createVoucherType(@RequestBody VoucherTypeDTO voucherTypeDTO) throws Exception {
        try{
            VoucherType voucherType = voucherTypeService.createVoucherType(voucherTypeDTO);
            return ResponseEntity.ok(ApiResponse.builder()
                    .success(true)
                    .message("Create voucherType success!")
                    .data(voucherType)
                    .build());

        }catch (Exception e){
            return ResponseEntity.ok(ApiResponse.builder()
                    .success(false)
                    .message("Create voucherType fail! Error: " + e.getMessage())
                    .build());
        }
    }

    @PutMapping("/update/{id}")
    @PreAuthorize("hasRole('ROLE_Manager')")
    public ResponseEntity<ApiResponse> updateVoucherType(@RequestBody VoucherTypeDTO voucherTypeDTO, @PathVariable int id) throws Exception {
        try{
            if(voucherTypeService.getVoucherTypeById(id) == null){
                return ResponseEntity.ok(ApiResponse.builder()
                        .success(false)
                        .message("VoucherType Not Found!")
                        .build());
            } else {
                VoucherType voucherType = voucherTypeService.updateVoucherType(voucherTypeDTO, id);
                return ResponseEntity.ok(ApiResponse.builder()
                        .success(true)
                        .message("Update voucherType success!")
                        .data(voucherType)
                        .build());
            }
        }catch (Exception e){
            return ResponseEntity.ok(ApiResponse.builder()
                    .success(false)
                    .message("Update voucherType fail! Error: " + e.getMessage())
                    .build());
        }
    }
}
