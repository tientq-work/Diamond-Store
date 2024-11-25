package com.example.diamondstore.repositories;

import com.example.diamondstore.entities.Comment;
import com.example.diamondstore.entities.Product;
import com.example.diamondstore.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Integer> {
    List<Comment> findAllByProductId(Product productId);
    List<Comment> findAllByUserId(User userId);
    List<Comment> findAllByUserIdAndProductId(User userId, Product productId);
}
