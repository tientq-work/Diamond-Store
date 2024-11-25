package com.example.diamondstore.services.interfaces;

import com.example.diamondstore.entities.Role;

import java.math.BigDecimal;
import java.util.List;

public interface DashboardService {
    int countMember(Role role);

    int countProcessingOrder();

    int countCompleteOrder();

    int countCancelOrder();

    float totalRevenue();

    List<BigDecimal> getDailyRevenueForWeek();
    List<BigDecimal> getWeeklyRevenueForMonth();
    List<BigDecimal> getMonthlyRevenueForYear();
}
