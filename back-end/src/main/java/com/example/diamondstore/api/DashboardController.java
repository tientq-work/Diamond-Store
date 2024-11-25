package com.example.diamondstore.api;

import com.example.diamondstore.entities.Role;
import com.example.diamondstore.repositories.RoleRepository;
import com.example.diamondstore.response.ApiResponse;
import com.example.diamondstore.services.interfaces.DashboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("api/dashboard")
@RequiredArgsConstructor
public class DashboardController {

    @Autowired
    private DashboardService dashboardService;

    @Autowired
    private RoleRepository roleRepository;

    @GetMapping("/countMember")
    @PreAuthorize("hasRole('ROLE_Admin')")
    public ResponseEntity<ApiResponse> countMembers() {
        try {
            Role memberRole = roleRepository.findById(5)
                    .orElseThrow(() -> new IllegalArgumentException("Role not found"));
            int memberCount = dashboardService.countMember(memberRole);

            return ResponseEntity.ok(
                    ApiResponse.builder()
                            .success(true)
                            .message("Number of members counted successfully")
                            .data(memberCount)
                            .build());
        } catch (Exception e) {
            return ResponseEntity.ok(
                    ApiResponse.builder()
                            .success(false)
                            .message("Count members failed! Error: " + e.getMessage())
                            .build());
        }
    }

    @GetMapping("/countProcessingOrder")
    @PreAuthorize("hasRole('ROLE_Admin')")
    public ResponseEntity<ApiResponse> countProcessingOrders() {
        try {
            int count = dashboardService.countProcessingOrder();

            return ResponseEntity.ok(
                    ApiResponse.builder()
                            .success(true)
                            .message("Number of processing orders counted successfully")
                            .data(count)
                            .build());
        } catch (Exception e) {
            return ResponseEntity.ok(
                    ApiResponse.builder()
                            .success(false)
                            .message("Count processing orders failed! Error: " + e.getMessage())
                            .build());
        }
    }

    @GetMapping("/countCompleteOrder")
    @PreAuthorize("hasRole('ROLE_Admin')")
    public ResponseEntity<ApiResponse> countCompleteOrders() {
        try {
            int count = dashboardService.countCompleteOrder();

            return ResponseEntity.ok(
                    ApiResponse.builder()
                            .success(true)
                            .message("Number of complete orders counted successfully")
                            .data(count)
                            .build());
        } catch (Exception e) {
            return ResponseEntity.ok(
                    ApiResponse.builder()
                            .success(false)
                            .message("Count complete orders failed! Error: " + e.getMessage())
                            .build());
        }
    }

    @GetMapping("/countCancelOrder")
    @PreAuthorize("hasRole('ROLE_Admin')")
    public ResponseEntity<ApiResponse> countCancelOrders() {
        try {
            int count = dashboardService.countCancelOrder();

            return ResponseEntity.ok(
                    ApiResponse.builder()
                            .success(true)
                            .message("Number of cancel orders counted successfully")
                            .data(count)
                            .build());
        } catch (Exception e) {
            return ResponseEntity.ok(
                    ApiResponse.builder()
                            .success(false)
                            .message("Count cancel orders failed! Error: " + e.getMessage())
                            .build());
        }
    }

    @GetMapping("/totalRevenue")
    @PreAuthorize("hasRole('ROLE_Admin')")
    public ResponseEntity<ApiResponse> totalRevenue() {
        try {
            float revenue = dashboardService.totalRevenue();

            return ResponseEntity.ok(
                    ApiResponse.builder()
                            .success(true)
                            .message("Total revenue calculated successfully")
                            .data(revenue)
                            .build());
        } catch (Exception e) {
            return ResponseEntity.ok(
                    ApiResponse.builder()
                            .success(false)
                            .message("Calculate total revenue failed! Error: " + e.getMessage())
                            .build());
        }
    }

    @GetMapping("/weekly")
    public ResponseEntity<ApiResponse> getDailyRevenueForWeek() {
        try {
            List<BigDecimal> list = dashboardService.getDailyRevenueForWeek();
            return ResponseEntity.ok(
                    ApiResponse.builder()
                            .success(true)
                            .message("Get Daily Revenue For Week successfully")
                            .data(list)
                            .build());
        } catch (Exception e) {
            return ResponseEntity.ok(
                    ApiResponse.builder()
                            .success(false)
                            .message("Get Daily Revenue For Week failed! Error: " + e.getMessage())
                            .build());
        }
    }

    @GetMapping("/monthly")
    public ResponseEntity<ApiResponse> getWeeklyRevenueForMonth() {
        try {
            List<BigDecimal> list = dashboardService.getWeeklyRevenueForMonth();
            return ResponseEntity.ok(
                    ApiResponse.builder()
                            .success(true)
                            .message("Get Weekly Revenue For Month successfully")
                            .data(list)
                            .build());
        } catch (Exception e) {
            return ResponseEntity.ok(
                    ApiResponse.builder()
                            .success(false)
                            .message("Get Weekly Revenue For Month Error: " + e.getMessage())
                            .build());
        }
    }

    @GetMapping("/yearly")
    public ResponseEntity<ApiResponse> getMonthlyRevenueForYear() {
        try {
            List<BigDecimal> list = dashboardService.getMonthlyRevenueForYear();
            return ResponseEntity.ok(
                    ApiResponse.builder()
                            .success(true)
                            .message("Get Monthly Revenue For Year successfully")
                            .data(list)
                            .build());
        } catch (Exception e) {
            return ResponseEntity.ok(
                    ApiResponse.builder()
                            .success(false)
                            .message("Get Monthly Revenue For Year failed! Error: " + e.getMessage())
                            .build());
        }
    }
}
