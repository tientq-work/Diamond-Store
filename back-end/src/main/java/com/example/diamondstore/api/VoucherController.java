package com.example.diamondstore.api;

import com.example.diamondstore.dto.VoucherDTO;
import com.example.diamondstore.dto.VoucherTypeDTO;
import com.example.diamondstore.entities.User;
import com.example.diamondstore.entities.Voucher;
import com.example.diamondstore.entities.VoucherType;
import com.example.diamondstore.response.ApiResponse;
import com.example.diamondstore.services.interfaces.UserService;
import com.example.diamondstore.services.interfaces.VoucherService;
import com.example.diamondstore.services.interfaces.VoucherTypeService;
import com.example.diamondstore.util.JwtUtil;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/voucher")
public class VoucherController {
    @Autowired
    private VoucherService voucherService;
    @Autowired
    private UserService userService;
    @Autowired
    private VoucherTypeService voucherTypeService;
    @Autowired
    private JwtUtil jwtUtil;

    @GetMapping("/all")
    @PreAuthorize("hasRole('ROLE_Manager')")
    public ResponseEntity<ApiResponse> getAllVoucher() throws Exception {
        List<Voucher> list = voucherService.voucherList();
        if(list.isEmpty()){
            return ResponseEntity.ok(ApiResponse.builder()
                    .success(false)
                    .message("List Vouchers is empty!")
                    .build());
        }else{
            return ResponseEntity.ok(ApiResponse.builder()
                    .success(true)
                    .message("Get All Vouchers")
                    .data(list)
                    .build());
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse> getVoucherById(@PathVariable int id) throws Exception {
        Voucher voucher = voucherService.getVoucherById(id);
        if(voucher != null){
            return ResponseEntity.ok(ApiResponse.builder()
                    .success(true)
                    .message("Get Voucher By ID Success")
                    .data(voucher)
                    .build());
        }else{
            return ResponseEntity.ok(ApiResponse.builder()
                    .success(false)
                    .message("Get Voucher By ID Fail")
                    .build());
        }
    }

    @GetMapping("/member/{id}")
    @PreAuthorize("hasAnyRole('ROLE_Manager', 'ROLE_Member')")
    public ResponseEntity<ApiResponse> getListVoucherByMemberId(@PathVariable int id, HttpServletRequest request) throws Exception {
        String authorizationHeader = request.getHeader("Authorization");
        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            String token = authorizationHeader.substring(7);
            int userId = jwtUtil.extractUserId(token);
            User user = userService.getUserById(userId);
            if((userId != id && user.getRoleid().getRoleid() == 5) || user.getRoleid().getRoleid() == 2){
                return ResponseEntity.ok(ApiResponse.builder()
                        .success(false)
                        .message("Does not have permission to view this user!")
                        .build());
            }
        }
        if(userService.getUserById(id) == null){
            return ResponseEntity.ok(ApiResponse.builder()
                    .success(false)
                    .message("Member Not Found")
                    .build());
        }
        List<Voucher> vouchers = voucherService.getListVouchersByMemberId(id);
        if(vouchers != null){
            return ResponseEntity.ok(ApiResponse.builder()
                    .success(true)
                    .message("Get Vouchers By Member ID Success")
                    .data(vouchers)
                    .build());
        }else{
            return ResponseEntity.ok(ApiResponse.builder()
                    .success(false)
                    .message("List Vouchers Empty")
                    .build());
        }
    }

    @PostMapping("/create/{memberId}")
    @PreAuthorize("hasRole('ROLE_Member')")
    public ResponseEntity<ApiResponse> redeemVoucher(@RequestBody VoucherDTO voucherDTO, @PathVariable int memberId) throws Exception {
        try{
            User member = userService.getUserById(memberId);
            VoucherType voucherType = voucherTypeService.getVoucherTypeById(voucherDTO.getVoucherTypeId());
            if(member == null){
                return ResponseEntity.ok(ApiResponse.builder()
                        .success(false)
                        .message("Member Not Found")
                        .build());
            } else if(voucherType == null || !voucherType.isActive()){
                return ResponseEntity.ok(ApiResponse.builder()
                        .success(false)
                        .message("VoucherType Not Found")
                        .build());
            } else if(voucherType.getPointNeeded() > member.getPoint()){
                return ResponseEntity.ok(ApiResponse.builder()
                        .success(false)
                        .message("Point Not Enough To Redeem")
                        .build());
            }
            else {
                Voucher voucher = voucherService.redeemVoucher(memberId, voucherDTO);
                return ResponseEntity.ok(ApiResponse.builder()
                        .success(true)
                        .message("Redeem voucher success!")
                        .data(voucher)
                        .build());
            }
        }catch (Exception e){
            return ResponseEntity.ok(ApiResponse.builder()
                    .success(false)
                    .message("Redeem voucher fail! Error: " + e.getMessage())
                    .build());
        }
    }
}
