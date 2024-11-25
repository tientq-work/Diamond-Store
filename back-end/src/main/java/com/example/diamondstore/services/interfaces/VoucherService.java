package com.example.diamondstore.services.interfaces;

import com.example.diamondstore.dto.VoucherDTO;
import com.example.diamondstore.entities.Voucher;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface VoucherService {
    List<Voucher> voucherList();
    Voucher getVoucherById(int id);
    List<Voucher> getListVouchersByMemberId(int id);
    Voucher redeemVoucher(int memberId, VoucherDTO voucherDTO);
}
