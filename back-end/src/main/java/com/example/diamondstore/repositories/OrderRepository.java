package com.example.diamondstore.repositories;
import com.example.diamondstore.entities.Order;
import com.example.diamondstore.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Date;
import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, Integer> {
    Order findByOrderId(Integer orderId);

    List<Order> findByCid(User cid);

    List<Order> findByDeliveryStaff(User delivery);

    List<Order> findByStatus(String status);

    @Query("SELECT COUNT(o) FROM Order o WHERE o.status NOT IN ('Cancelled', 'Delivered')")
    int countProcessingOrder(); // Ngoai tru cac status la Cancel, Deliver thi dem het

    @Query("SELECT COUNT(o) FROM Order o WHERE o.status = 'Delivered'")
    int countCompleteOrder(); //Dem Status Deliver

    @Query("SELECT COUNT(o) FROM Order o WHERE o.status = 'Cancelled'")
    int countCancelOrder(); // Dem Cancel status

    @Query("SELECT SUM(o.payment) FROM Order o WHERE o.status = 'Delivered'")
    float totalRevenue(); // Dung ham Sum nhung Order co Status la Deliver

    @Query("SELECT COUNT(o) FROM Order o WHERE o.status = 'Shipping' AND o.deliveryStaff = :deliveryStaff")
    int countShippingOrderByDeliveryId(@Param("deliveryStaff") User deliveryStaff);

    @Query("SELECT COALESCE(SUM(o.payment), 0) FROM Order o WHERE o.payment_date BETWEEN :startDate AND :endDate AND o.status = 'Delivered'")
    BigDecimal getRevenueBetweenDates(LocalDate startDate, LocalDate endDate);

    //BigDecimal getRevenueBetweenDates(Date startDate, Date endDate);

    @Query("SELECT COALESCE(SUM(o.payment), 0) FROM Order o WHERE o.payment_date BETWEEN :startDate AND :endDate AND o.status = 'Delivered' GROUP BY FUNCTION('DAY', o.payment_date)")
    List<BigDecimal> getDailyRevenueBetweenDates(Date startDate, Date endDate);

    @Query("SELECT COALESCE(SUM(o.payment), 0) FROM Order o WHERE o.payment_date BETWEEN :startDate AND :endDate AND o.status = 'Delivered' GROUP BY FUNCTION('WEEK', o.payment_date)")
    List<BigDecimal> getWeeklyRevenueBetweenDates(Date startDate, Date endDate);

    @Query("SELECT COALESCE(SUM(o.payment), 0) FROM Order o WHERE o.payment_date BETWEEN :startDate AND :endDate AND o.status = 'Delivered' GROUP BY FUNCTION('MONTH', o.payment_date)")
    List<BigDecimal> getMonthlyRevenueBetweenDates(Date startDate, Date endDate);
}