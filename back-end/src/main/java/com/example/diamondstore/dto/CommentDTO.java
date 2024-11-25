package com.example.diamondstore.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data

public class CommentDTO {
    private String content;
    private Integer productId;
    private Integer userId;
}
