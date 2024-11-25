package com.example.diamondstore.api;

import com.example.diamondstore.dto.CommentDTO;
import com.example.diamondstore.entities.Comment;
import com.example.diamondstore.exceptions.DataNotFoundException;
import com.example.diamondstore.services.interfaces.CommentService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/comment")

public class CommentController {

    @Autowired
    private CommentService commentService;

    @PutMapping("/edit/{commentId}")
    @PreAuthorize("hasRole('ROLE_Member')")
    public ResponseEntity<?> editComment(
            @PathVariable int commentId,
            @Valid @RequestBody CommentDTO comment,
            Authentication authentication
    ) {
        try {
            commentService.editComment(commentId, comment);
            return ResponseEntity.ok("Update comment successfully");
        } catch (DataNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Error: " + e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error: " + e.getMessage());
        }
    }

    @PostMapping("/add")
    @PreAuthorize("hasRole('ROLE_Member')")
    public ResponseEntity<?> addComment(
            @Valid @RequestBody CommentDTO comment,
            Authentication authentication
    ) {
        try {

            if (authentication == null || !authentication.isAuthenticated()) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User not authenticated");
            }

            commentService.addComment(comment);
            return ResponseEntity.ok("Add successfully");
        } catch (DataNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Error: " + e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error: " + e.getMessage());
        }
    }

    @DeleteMapping("/delete/{commentId}")
    @PreAuthorize("hasAnyRole('ROLE_Member', 'ROLE_Manager')")
    public ResponseEntity<?> deleteComment(
            @PathVariable int commentId,
            Authentication authentication
    ) {
        try {
            // Kiểm tra người dùng đã đăng nhập
            if (authentication == null || !authentication.isAuthenticated()) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User not authenticated");
            }

            commentService.deleteComment(commentId);
            return ResponseEntity.ok("Delete comment successfully");
        } catch (DataNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Error: " + e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error: " + e.getMessage());
        }
    }

    @GetMapping("/product/{productId}")
    public ResponseEntity<List<Comment>> getAllCommentsByProductId(@PathVariable Integer productId) {
        List<Comment> comments = commentService.getAllCommentsByProductId(productId);
        return ResponseEntity.ok(comments);
    }

    @GetMapping("/user/{userId}")
    @PreAuthorize("hasRole('ROLE_Manager')")
    public ResponseEntity<List<Comment>> getAllCommentsByUserId(@PathVariable Integer userId) {
        List<Comment> comments = commentService.getAllCommentsByUserId(userId);
        return ResponseEntity.ok(comments);
    }

    @GetMapping("/user/{userId}/product/{productId}")
    @PreAuthorize("hasRole('ROLE_Manager')")
    public ResponseEntity<List<Comment>> getAllCommentsByUserIdAndProductId(@PathVariable Integer userId, @PathVariable Integer productId) {
        List<Comment> comments = commentService.getAllCommentsByUserIdAndProductId(userId, productId);
        return ResponseEntity.ok(comments);
    }
}
