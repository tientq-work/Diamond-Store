package com.example.diamondstore.vnpay;

import com.example.diamondstore.core.config.payment.VNPAYConfig;
import com.example.diamondstore.repositories.OrderRepository;
import com.example.diamondstore.util.VNPayUtil;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
@RequiredArgsConstructor
public class PaymentService {
    private final Logger logger = LoggerFactory.getLogger(PaymentService.class);
    private final VNPAYConfig vnPayConfig;
    @Autowired
    private OrderRepository orderRepository;

    public PaymentDTO.VNPayResponse createVnPayPayment(HttpServletRequest request) {
        int orderId = Integer.parseInt(request.getParameter("orderId"));
        //long amount = Integer.parseInt(request.getParameter("amount")) * 100L;
        long amount = (int) Math.round(orderRepository.findByOrderId(orderId).getPayment().doubleValue()) * 100L;
        String bankCode = request.getParameter("bankCode");
        logger.info(request.getHeader("Returnurl"));
        Map<String, String> vnpParamsMap = vnPayConfig.getVNPayConfig(request.getHeader("Returnurl"));
        vnpParamsMap.put("vnp_Amount", String.valueOf(amount));
        vnpParamsMap.put("vnp_OrderInfo",  String.valueOf(orderId));
        if (bankCode != null && !bankCode.isEmpty()) {
            vnpParamsMap.put("vnp_BankCode", bankCode);
        }
        vnpParamsMap.put("vnp_IpAddr", VNPayUtil.getIpAddress(request));
        //build query url
        String queryUrl = VNPayUtil.getPaymentURL(vnpParamsMap, true);
        String hashData = VNPayUtil.getPaymentURL(vnpParamsMap, false);
        String vnpSecureHash = VNPayUtil.hmacSHA512(vnPayConfig.getSecretKey(), hashData);
        queryUrl += "&vnp_SecureHash=" + vnpSecureHash;
        String paymentUrl = vnPayConfig.getVnp_PayUrl() + "?" + queryUrl;
        return PaymentDTO.VNPayResponse.builder()
                .code("ok")
                .message("success")
                .paymentUrl(paymentUrl).build();
    }
}
