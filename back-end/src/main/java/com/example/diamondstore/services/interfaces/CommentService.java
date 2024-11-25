package com.example.diamondstore.services.interfaces;

import com.example.diamondstore.dto.CommentDTO;
import com.example.diamondstore.entities.Comment;
import com.example.diamondstore.exceptions.DataNotFoundException;

import java.util.List;

public interface CommentService {
    void addComment(CommentDTO commentDTO) throws DataNotFoundException;
    void deleteComment(Integer commentId) throws DataNotFoundException;
    void editComment(Integer commentId, CommentDTO commentDTO) throws DataNotFoundException;
    List<Comment> getAllCommentsByProductId(Integer productId);
    List<Comment> getAllCommentsByUserId(Integer userId);
    List<Comment> getAllCommentsByUserIdAndProductId(Integer userId, Integer productId);
}
