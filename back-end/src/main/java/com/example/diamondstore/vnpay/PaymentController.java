package com.example.diamondstore.vnpay;

import com.example.diamondstore.core.response.ResponseObject;
import com.example.diamondstore.entities.Order;
import com.example.diamondstore.repositories.OrderRepository;
import com.example.diamondstore.services.interfaces.OrderService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.Instant;
import java.time.LocalDate;
import java.util.Date;

@RestController
@RequestMapping("${spring.application.api-prefix}/payment")
@RequiredArgsConstructor
public class PaymentController {
    private final PaymentService paymentService;
    @Autowired
    private OrderRepository orderRepository;

    @GetMapping("/vn-pay")
    public ResponseObject<PaymentDTO.VNPayResponse> pay(HttpServletRequest request) {

        return new ResponseObject<>(HttpStatus.OK, "Success", paymentService.createVnPayPayment(request));
    }
    @GetMapping("/vn-pay-callback")
    public ResponseObject<PaymentDTO.VNPayResponse> payCallbackHandler(HttpServletRequest request) {
        String status = request.getParameter("vnp_ResponseCode");
        int orderId = Integer.parseInt(request.getParameter("vnp_OrderInfo"));
        if (status.equals("00")) {
            Order order = orderRepository.findByOrderId(orderId);
            order.setPayment_date(LocalDate.now());
            order.setPaymentStatus(true);
            orderRepository.save(order);
            return new ResponseObject<>(HttpStatus.OK, "Success", new PaymentDTO.VNPayResponse("00", "Success", "DCM KHO VAI LOL"));
        } else {
            return new ResponseObject<>(HttpStatus.BAD_REQUEST, "Failed", null);
        }
    }
}
