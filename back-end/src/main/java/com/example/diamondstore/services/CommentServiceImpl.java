package com.example.diamondstore.services;

import com.example.diamondstore.dto.CommentDTO;
import com.example.diamondstore.entities.Comment;
import com.example.diamondstore.entities.Product;
import com.example.diamondstore.entities.User;
import com.example.diamondstore.exceptions.DataNotFoundException;
import com.example.diamondstore.repositories.CommentRepository;
import com.example.diamondstore.repositories.ProductRepository;
import com.example.diamondstore.repositories.UserRepository;
import com.example.diamondstore.services.interfaces.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

@Service
public class CommentServiceImpl implements CommentService {

    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ProductRepository productRepository;


    @Override
    @Transactional
    public void addComment(CommentDTO commentDTO) throws DataNotFoundException {
        User user = userRepository.findById(commentDTO.getUserId())
                .orElseThrow(() -> new DataNotFoundException("User not found"));
        Product product = productRepository.findById(commentDTO.getProductId())
                .orElseThrow(() -> new DataNotFoundException("Product not found"));

        Comment comment = new Comment();
        comment.setUserId(user);
        comment.setProductId(product);
        comment.setContent(commentDTO.getContent());
        comment.setDate(LocalDate.now());

        commentRepository.save(comment);
    }

    @Override
    @Transactional
    public void deleteComment(Integer commentId) throws DataNotFoundException {
        Comment comment = commentRepository.findById(commentId)
                .orElseThrow(() -> new DataNotFoundException("Comment not found"));
        commentRepository.delete(comment);
    }

    @Override
    @Transactional
    public void editComment(Integer commentId, CommentDTO commentDTO) throws DataNotFoundException {
        Comment comment = commentRepository.findById(commentId)
                .orElseThrow(() -> new DataNotFoundException("Comment not found"));

        User user = userRepository.findById(commentDTO.getUserId())
                .orElseThrow(() -> new DataNotFoundException("User not found"));
        Product product = productRepository.findById(commentDTO.getProductId())
                .orElseThrow(() -> new DataNotFoundException("Product not found"));

        comment.setUserId(user);
        comment.setProductId(product);
        comment.setContent(commentDTO.getContent());

        commentRepository.save(comment);
    }

    @Override
    public List<Comment> getAllCommentsByProductId(Integer productId) {
        return commentRepository.findAllByProductId(productRepository.findProductByProductId(productId));
    }

    @Override
    public List<Comment> getAllCommentsByUserId(Integer userId) {
        return commentRepository.findAllByUserId(userRepository.findUserByUserId(userId));
    }

    @Override
    public List<Comment> getAllCommentsByUserIdAndProductId(Integer userId, Integer productId) {
        return commentRepository.findAllByUserIdAndProductId(userRepository.findUserByUserId(userId), productRepository.findProductByProductId(productId));
    }
}
