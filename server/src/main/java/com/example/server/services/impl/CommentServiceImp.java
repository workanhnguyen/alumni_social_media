/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.example.server.services.impl;

import com.example.server.pojos.Comments;
import com.example.server.pojos.Posts;
import com.example.server.pojos.Users;
import com.example.server.repositories.CommentRepository;
import com.example.server.repositories.PostRepository;
import com.example.server.services.CommentService;
import com.example.server.services.PostService;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Date;
import java.util.Map;
import java.util.Objects;
import org.apache.velocity.exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author maidv
 */
@Service
public class CommentServiceImp implements CommentService {

    @Autowired
    private CommentRepository cmtRepo;

    @Override
    public Comments addComment(Map<String, String> params, Users u, Posts p) {
        LocalDateTime currentTime = LocalDateTime.now();
        Date currentDate = Date.from(currentTime.atZone(ZoneId.systemDefault()).toInstant());
        Comments cmt = new Comments();
        cmt.setContent(params.get("content"));
        cmt.setCreatedAt(currentDate);
        cmt.setUserId(u);
        cmt.setPostId(p);
        return this.cmtRepo.addComment(cmt);
    }

    @Override
    public Comments updateComment(Map<String, String> params, Users u, Long cmtId) {
        LocalDateTime currentTime = LocalDateTime.now();
        Date currentDate = Date.from(currentTime.atZone(ZoneId.systemDefault()).toInstant());
        Comments cmt = cmtRepo.findCommentById(cmtId);
        if (cmt != null && Objects.equals(u.getId(), cmt.getUserId().getId())) {
            cmt.setContent(params.get("content"));
            cmt.setUpdatedAt(currentDate);
            cmt.setUserId(u);
            cmt.setPostId(cmt.getPostId());
            return this.cmtRepo.updateComment(cmt);
        }
        return null;    
    }

    @Override
    public Boolean deleteComment(Long id, Users u) {
        Comments cmt = cmtRepo.findCommentById(id);
        if (cmt != null && (Objects.equals(u.getId(), cmt.getUserId().getId())
                || Objects.equals(u.getId(), cmt.getPostId().getUserId().getId()))) {
            cmtRepo.deleteComment(cmt);
            return true;
        }
        return false;   
    }
}
