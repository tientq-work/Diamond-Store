package com.example.diamondstore.repositories;

import com.example.diamondstore.entities.Order;
import com.example.diamondstore.entities.OrderDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface OrderDetailRepository extends JpaRepository<OrderDetail, Integer> {
    List<OrderDetail> findByOrderId(Order order);
    OrderDetail findByOrderDetailId(Integer id);
}
