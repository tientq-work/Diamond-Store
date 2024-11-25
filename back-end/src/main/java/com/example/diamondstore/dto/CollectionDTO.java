package com.example.diamondstore.dto;


import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class CollectionDTO {
    @NotEmpty(message = "Collection name cannot be empty")
    private String name;
    @NotEmpty(message = "Description cannot be empty")
    private String description;
    private String url;
}
