package com.example.diamondstore.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class UserLoginResponse {
    private int userId;
    private String fullName;
    private String email;
    private int roleId;
    private String address;
    private String phone;
}
