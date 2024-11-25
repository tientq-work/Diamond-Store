package com.example.diamondstore.services;

import com.example.diamondstore.dto.VoucherTypeDTO;
import com.example.diamondstore.entities.VoucherType;
import com.example.diamondstore.repositories.VoucherTypeRepository;
import com.example.diamondstore.services.interfaces.VoucherTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class VoucherTypeServiceImpl implements VoucherTypeService {
    @Autowired
    private VoucherTypeRepository voucherTypeRepository;

    @Override
    public List<VoucherType> voucherTypeList() {
        return voucherTypeRepository.findAll();
    }

    @Override
    public VoucherType getVoucherTypeById(int id) {
        return voucherTypeRepository.findByVoucherTypeId(id);
    }

    @Override
    public VoucherType createVoucherType(VoucherTypeDTO voucherTypeDTO) {
        VoucherType saveVoucherType = voucherTypeRepository.save(VoucherType.builder()
                .description(voucherTypeDTO.getDescription())
                .discount(voucherTypeDTO.getDiscount())
                .discountLength(voucherTypeDTO.getDiscountLength())
                .pointNeeded(voucherTypeDTO.getPointNeeded())
                .isActive(voucherTypeDTO.isActive())
                .build());

        return saveVoucherType;
    }

    @Override
    public VoucherType updateVoucherType(VoucherTypeDTO voucherTypeDTO, int id) {
        VoucherType saveVoucherType = voucherTypeRepository.findByVoucherTypeId(id);
        saveVoucherType.setDescription(voucherTypeDTO.getDescription());
        saveVoucherType.setDiscount(voucherTypeDTO.getDiscount());
        saveVoucherType.setDiscountLength(voucherTypeDTO.getDiscountLength());
        saveVoucherType.setPointNeeded(voucherTypeDTO.getPointNeeded());
        saveVoucherType.setActive(voucherTypeDTO.isActive());

        return voucherTypeRepository.save(saveVoucherType);
    }
}
