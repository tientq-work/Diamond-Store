package com.example.diamondstore.services;

import com.example.diamondstore.entities.Role;
import com.example.diamondstore.repositories.OrderRepository;
import com.example.diamondstore.repositories.RoleRepository;
import com.example.diamondstore.repositories.UserRepository;
import com.example.diamondstore.services.interfaces.DashboardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.temporal.WeekFields;
import java.util.ArrayList;
import java.time.ZoneId;
import java.time.temporal.WeekFields;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Locale;

@Service
public class DashboardServiceImpl implements DashboardService {
    @Autowired
    UserRepository userRepository;

    @Autowired
    OrderRepository orderRepository;

    @Autowired
    RoleRepository roleRepository;

    @Override
    public int countMember(Role role) {
        Role memberRole = roleRepository.findById(5).orElseThrow(() -> new IllegalArgumentException("Role not found"));
        return userRepository.countMember(memberRole);
    }

    @Override
    public int countProcessingOrder() {
        return orderRepository.countProcessingOrder();
    }

    @Override
    public int countCompleteOrder() {
        return orderRepository.countCompleteOrder();
    }

    @Override
    public int countCancelOrder() {
        return orderRepository.countCancelOrder();
    }

    @Override
    public float totalRevenue() {
        return orderRepository.totalRevenue();
    }

    @Override
    public List<BigDecimal> getDailyRevenueForWeek() {
        LocalDate now = LocalDate.now();
        LocalDate startOfWeek = now.with(WeekFields.of(Locale.getDefault()).getFirstDayOfWeek());
        List<BigDecimal> dailyRevenue = new ArrayList<>();

        for (int i = 0; i < 7; i++) {
            LocalDate day = startOfWeek.plusDays(i);
            BigDecimal revenue = orderRepository.getRevenueBetweenDates(day, day.plusDays(1));
//            Date startDate = Date.from(day.atStartOfDay(ZoneId.systemDefault()).toInstant());
//            Date endDate = Date.from(day.plusDays(1).atStartOfDay(ZoneId.systemDefault()).toInstant());
//            BigDecimal revenue = orderRepository.getRevenueBetweenDates(startDate, endDate);
            dailyRevenue.add(revenue);
        }

        return dailyRevenue;
    }

    @Override
    public List<BigDecimal> getWeeklyRevenueForMonth() {
        List<BigDecimal> weeklyRevenues = new ArrayList<>();
        LocalDate now = LocalDate.now();
        LocalDate startOfMonth = now.withDayOfMonth(1);

        for (int i = 0; i < 4; i++) {
            LocalDate startOfWeek = startOfMonth.plusDays(i * 7);
            LocalDate endOfWeek = startOfWeek.plusDays(6);
            BigDecimal revenue = orderRepository.getRevenueBetweenDates(startOfWeek, endOfWeek);
//            Date startDate = Date.from(startOfWeek.atStartOfDay(ZoneId.systemDefault()).toInstant());
//            Date endDate = Date.from(endOfWeek.atStartOfDay(ZoneId.systemDefault()).toInstant());
//            BigDecimal revenue = orderRepository.getRevenueBetweenDates(startDate, endDate);
            weeklyRevenues.add(revenue);
        }
        return weeklyRevenues;
    }

    @Override
    public List<BigDecimal> getMonthlyRevenueForYear() {
        List<BigDecimal> monthlyRevenues = new ArrayList<>();
        LocalDate now = LocalDate.now();

        for (int i = 0; i < 12; i++) {
            LocalDate startOfMonth = now.withMonth(i + 1).withDayOfMonth(1);
            LocalDate endOfMonth = startOfMonth.plusMonths(1).minusDays(1);
            BigDecimal revenue = orderRepository.getRevenueBetweenDates(startOfMonth, endOfMonth);
//            Date startDate = Date.from(startOfMonth.atStartOfDay(ZoneId.systemDefault()).toInstant());
//            Date endDate = Date.from(endOfMonth.atStartOfDay(ZoneId.systemDefault()).toInstant());
//            BigDecimal revenue = orderRepository.getRevenueBetweenDates(startDate, endDate);
            monthlyRevenues.add(revenue);
        }
        return monthlyRevenues;
    }
}
