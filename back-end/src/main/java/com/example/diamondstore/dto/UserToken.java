package com.example.diamondstore.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class UserToken {
    private int userId;
    private String email;
    private String fullName;
    private int roleId;
    private String address;
    private String phone;
    private String token;
}
