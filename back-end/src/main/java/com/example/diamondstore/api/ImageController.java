package com.example.diamondstore.api;

import com.example.diamondstore.dto.ImageListDTO;
import com.example.diamondstore.entities.Image;
import com.example.diamondstore.response.ApiResponse;
import com.example.diamondstore.services.interfaces.ImageService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/image")
@RequiredArgsConstructor
public class ImageController {
    @Autowired
    private ImageService imageService;

    @GetMapping("/list/{id}")
    public ResponseEntity<ApiResponse> getImagesByProductId(@PathVariable int id) throws Exception {
        List<Image> list = imageService.getImagesByProductId(id);
        if(list.isEmpty()){
            return ResponseEntity.ok(ApiResponse.builder()
                    .success(false)
                    .message("List images is empty!")
                    .build());
        }else{
            return ResponseEntity.ok(ApiResponse.builder()
                    .success(true)
                    .message("Get List Images By Product")
                    .data(list)
                    .build());
        }
    }

    @PostMapping("/list/save")
    public ResponseEntity<ApiResponse> saveListImagesByProductId(@RequestBody ImageListDTO imageListDTO) throws Exception {
        List<Image> list = imageService.saveListImagesByProductId(imageListDTO);
        if(list.isEmpty()){
            return ResponseEntity.ok(ApiResponse.builder()
                    .success(false)
                    .message("List images is empty!")
                    .build());
        }else{
            return ResponseEntity.ok(ApiResponse.builder()
                    .success(true)
                    .message("Save List Images By Product")
                    .data(list)
                    .build());
        }
    }
}
