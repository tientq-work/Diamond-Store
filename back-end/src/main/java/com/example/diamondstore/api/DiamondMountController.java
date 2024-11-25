package com.example.diamondstore.api;

import com.example.diamondstore.dto.CreateUser;
import com.example.diamondstore.dto.MountDTO;
import com.example.diamondstore.entities.DiamondMount;
import com.example.diamondstore.entities.User;
import com.example.diamondstore.response.ApiResponse;
import com.example.diamondstore.services.interfaces.DiamondMountService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/mount")
@RequiredArgsConstructor
public class DiamondMountController {
    @Autowired
    private DiamondMountService diamondMountService;

    @GetMapping("/all")
    @PreAuthorize("hasAnyRole('ROLE_Manager', 'ROLE_Sales Staff')")
    public ResponseEntity<ApiResponse> getAllMount() throws Exception {
        List<DiamondMount> mountList = diamondMountService.MountList();
        if(mountList.isEmpty()){
            return ResponseEntity.ok(ApiResponse.builder()
                    .success(false)
                    .message("List mount is empty!")
                    .build());
        }else{
            return ResponseEntity.ok(ApiResponse.builder()
                    .success(true)
                    .message("Get All Diamond Mount")
                    .data(mountList)
                    .build());
        }
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('ROLE_Manager', 'ROLE_Sales Staff')")
    public ResponseEntity<ApiResponse> getMountId(@PathVariable int id) throws Exception {
        DiamondMount mount = diamondMountService.getMountById(id);
        if(mount != null){
            return ResponseEntity.ok(ApiResponse.builder()
                    .success(true)
                    .message("Get Diamond Mount By ID Success")
                    .data(mount)
                    .build());
        }else{
            return ResponseEntity.ok(ApiResponse.builder()
                    .success(false)
                    .message("Get Diamond Mount By ID Fail")
                    .build());
        }
    }

    @PostMapping("/create")
    @PreAuthorize("hasRole('ROLE_Manager')")
    public ResponseEntity<ApiResponse> createMount(@RequestBody MountDTO mountDTO) throws Exception {
        try{
            DiamondMount mount = diamondMountService.createDiamondMount(mountDTO.getMountName(), mountDTO.getSize(), mountDTO.getType(), mountDTO.getMaterial(), mountDTO.getBasePrice());
            return ResponseEntity.ok(ApiResponse.builder()
                    .success(true)
                    .message("Create diamond mount success!")
                    .data(mount)
                    .build());

        }catch (Exception e){
            return ResponseEntity.ok(ApiResponse.builder()
                    .success(false)
                    .message("Create diamond mount fail! Error: " + e.getMessage())
                    .build());
        }
    }

    @PutMapping("/update/{id}")
    @PreAuthorize("hasRole('ROLE_Manager')")
    public ResponseEntity<ApiResponse> updateMount(@RequestBody MountDTO mountDTO, @PathVariable int id) throws Exception {
        try{
            if(diamondMountService.getMountById(id) == null){
                return ResponseEntity.ok(ApiResponse.builder()
                        .success(false)
                        .message("Diamond Mount Not Found!")
                        .build());
            } else {
                DiamondMount mount = diamondMountService.updateDiamondMount(mountDTO, id);
                return ResponseEntity.ok(ApiResponse.builder()
                        .success(true)
                        .message("Update diamond mount success!")
                        .data(mount)
                        .build());
            }
        }catch (Exception e){
            return ResponseEntity.ok(ApiResponse.builder()
                    .success(false)
                    .message("Update diamond mount fail! Error: " + e.getMessage())
                    .build());
        }
    }

    @GetMapping("/list/{type}")
    @PreAuthorize("hasRole('ROLE_Manager')")
    public ResponseEntity<ApiResponse> getDiamondMountsByType(@PathVariable String type) throws Exception {
        List<DiamondMount> list = diamondMountService.getDiamondMountsByType(type);
        if(list.isEmpty()){
            return ResponseEntity.ok(ApiResponse.builder()
                    .success(false)
                    .message("List Empty")
                    .build());
        }else {
            return ResponseEntity.ok(ApiResponse.builder()
                    .success(true)
                    .message("Get List Diamond Mount By Type Success")
                    .data(list)
                    .build());
        }
    }

    @GetMapping("/type")
    @PreAuthorize("hasRole('ROLE_Manager')")
    public ResponseEntity<ApiResponse> getListMountType() throws Exception {
        List<String> type = diamondMountService.getListMountType();
        if(type.isEmpty()){
            return ResponseEntity.ok(ApiResponse.builder()
                    .success(false)
                    .message("List Empty")
                    .build());
        }else {
            return ResponseEntity.ok(ApiResponse.builder()
                    .success(true)
                    .message("Get Diamond Mount By ID Success")
                    .data(type)
                    .build());
        }
    }
}
