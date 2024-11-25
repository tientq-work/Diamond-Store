package com.example.diamondstore.services.interfaces;

import com.example.diamondstore.dto.OrderDetailDTO;
import com.example.diamondstore.dto.UpdateOrderDetailDTO;
import com.example.diamondstore.entities.OrderDetail;
import com.example.diamondstore.exceptions.DataNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public interface OrderDetailService {
    OrderDetail createOrderDetail(OrderDetailDTO orderDetailDTO);

    OrderDetail updateOrderDetail(Integer orderDetailId, UpdateOrderDetailDTO updateOrderDetailDTO) throws DataNotFoundException;

    void deleteOrderDetail(Integer orderDetailId) throws DataNotFoundException;

    OrderDetail getOrderDetailById(Integer orderDetailId) throws DataNotFoundException;

    List<OrderDetail> getAllOrderDetail();

    List<OrderDetail> getOrderDetailsByOrderId(Integer orderId);

//    float calculateTotalPrice(Integer orderId) throws DataNotFoundException;
}
