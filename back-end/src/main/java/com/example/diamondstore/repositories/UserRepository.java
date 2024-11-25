package com.example.diamondstore.repositories;

import com.example.diamondstore.entities.Role;
import com.example.diamondstore.entities.User;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
    User findByEmailAndPassword(String email, String password);
    User findUserByEmail(String email);
    User findUserByTokenPassword(String token);
    @Modifying
    @Transactional
    @Query("UPDATE User u SET u.status = :status WHERE u.userId = :userId")
    Integer updateStatusByUserId(@Param("status") String status, @Param("userId") int userId);
    @Modifying
    @Transactional
    @Query("UPDATE User u SET u.point = :point WHERE u.userId = :userId")
    void updatePointByUserId(@Param("point") int point, @Param("userId") int userId);
    User findUserByUserId(int id);
    List<User> findUsersByRoleid(Role role);


    @Query("SELECT COUNT(u) FROM User u WHERE u.roleid = :role")
    int countMember(@Param("role") Role role); // dem so User co roleId = 5
}
