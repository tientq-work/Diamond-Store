package com.example.diamondstore.services.interfaces;

import com.example.diamondstore.dto.ProductDTO;
import com.example.diamondstore.dto.VoucherTypeDTO;
import com.example.diamondstore.entities.VoucherType;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface VoucherTypeService {
    List<VoucherType> voucherTypeList();
    VoucherType getVoucherTypeById(int id);
    VoucherType createVoucherType(VoucherTypeDTO voucherTypeDTO);
    VoucherType updateVoucherType(VoucherTypeDTO voucherTypeDTO, int id);
}
