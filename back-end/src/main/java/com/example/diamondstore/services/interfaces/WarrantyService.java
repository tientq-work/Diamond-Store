package com.example.diamondstore.services.interfaces;

import com.example.diamondstore.dto.WarrantyDTO;
import com.example.diamondstore.entities.Warranty;
import com.example.diamondstore.exceptions.DataNotFoundException;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Component
public interface WarrantyService {

    Warranty addWarranty(WarrantyDTO warrantyDTO) throws DataNotFoundException;
    Warranty updateWarranty(Integer warrantyId,WarrantyDTO warrantyDTO) throws DataNotFoundException;
    void deleteWarranty(Integer warrantyId) throws DataNotFoundException;
    List<Warranty> viewAllWarranty();
    Warranty getWarrantyById(Integer warrantyId) throws DataNotFoundException;
    List<Warranty> getWarrantyByOrderDetailId(Integer id);
}
