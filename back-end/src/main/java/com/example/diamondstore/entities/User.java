package com.example.diamondstore.entities;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Past;
import jakarta.validation.constraints.PastOrPresent;
import jakarta.validation.constraints.Pattern;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;


import java.time.LocalDate;
import java.util.Collection;
import java.util.Date;
import java.util.Set;

@Builder
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
@Table(name = "[User]")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "userid")
    private int userId;

    @Column(name = "full_name", nullable = false)
    private String fullName;

    @Pattern(regexp = "^[0-9]{10}$", message = "Phone number must be 10 digits")
    @Column(name = "phone_number", nullable = false)
    private String phone;

    @Column(name = "password", nullable = false)
    private String password;

    @Email(regexp = "^[a-zA-Z][a-zA-Z0-9._%+-]*@gmail\\.[a-zA-Z]{2,}$", message = "Email must be a valid Gmail address and should not start with a digit")
    @Column(name = "email", nullable = false, unique = true)
    private String email;

    @Temporal(TemporalType.DATE)
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy")
    @Past(message = "DoB must be in the past")
    @Column(name = "dob")
    private LocalDate dob;

    @Column(name = "gender")
    private String gender;

    @ManyToOne
    @JoinColumn(name = "roleid", nullable = false)
    private Role roleid;

    @Column(name = "point_accumulation")
    private int point;

    @Column(name = "status")
    private String status;

    @Column(name = "type_login")
    private String typeLogin;

    @Temporal(TemporalType.DATE)
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy")
    @Column(name = "create_at")
    private LocalDate createAt;

    @Temporal(TemporalType.DATE)
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy")
    @Column(name = "update_at")
    private LocalDate updateAt;

    @Column(name = "token_password")
    private String tokenPassword;

    @Column(name = "token_create_date")
    private Date tokenCreateDate;

    @Column(name = "address")
    private String address;

    @JsonIgnore
    @OneToMany(mappedBy = "userId", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Collection<Comment> comments;

    @JsonIgnore
    @OneToMany(mappedBy = "cid", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Set<Order> orders;

    @JsonIgnore
    @OneToMany(mappedBy = "deliveryStaff", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Collection<Order> orderDelivery;

    @JsonIgnore
    @OneToMany(mappedBy = "memberId", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Collection<Voucher> vouchers;
}
