package com.example.diamondstore.services;

import com.example.diamondstore.dto.VoucherDTO;
import com.example.diamondstore.entities.User;
import com.example.diamondstore.entities.Voucher;
import com.example.diamondstore.entities.VoucherType;
import com.example.diamondstore.entities.Warranty;
import com.example.diamondstore.repositories.UserRepository;
import com.example.diamondstore.repositories.VoucherRepository;
import com.example.diamondstore.repositories.VoucherTypeRepository;
import com.example.diamondstore.services.interfaces.VoucherService;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.time.LocalDate;
import java.util.Date;
import java.util.List;

@Component
public class VoucherServiceImpl implements VoucherService {
    @Autowired
    private VoucherRepository voucherRepository;
    @Autowired
    private VoucherTypeRepository voucherTypeRepository;
    @Autowired
    private UserRepository userRepository;

    @Override
    public List<Voucher> voucherList() {
        List<Voucher> list = voucherRepository.findAll();
        for(Voucher voucher : list){
            if(voucher.getStatus().equals("Active") && voucher.getEndDate().isBefore(LocalDate.now())){
                voucher.setStatus("Expired");
                voucherRepository.save(voucher);
            }
        }
        return list;
    }

    @Override
    public Voucher getVoucherById(int id) {
        return voucherRepository.findByVoucherId(id);
    }

    @Override
    public List<Voucher> getListVouchersByMemberId(int id) {
        return voucherRepository.findByMemberId(userRepository.findUserByUserId(id));
    }

    @Override
    public Voucher redeemVoucher(int memberId, VoucherDTO voucherDTO) {
        VoucherType voucherType = voucherTypeRepository.findByVoucherTypeId(voucherDTO.getVoucherTypeId());
        User user = userRepository.findUserByUserId(memberId);
        Voucher voucher = voucherRepository.save(Voucher.builder()
                .voucherTypeId(voucherType)
                .memberId(user)
                .description(voucherType.getDescription())
                .discount(voucherType.getDiscount())
                .discountLength(voucherType.getDiscountLength())
                .status("Active")
                .startDate(LocalDate.now())
                .endDate(LocalDate.now().plusDays(voucherType.getDiscountLength()))
                .build());

        //user.setPoint(user.getPoint() - voucherType.getPointNeeded());
        userRepository.updatePointByUserId(user.getPoint() - voucherType.getPointNeeded(), memberId);
        userRepository.save(user);
        return voucher;
    }

}
