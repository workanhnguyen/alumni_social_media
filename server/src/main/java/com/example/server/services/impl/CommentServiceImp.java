/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.example.server.services.impl;

import com.example.server.dtos.CommentDto;
import com.example.server.dtos.ImageDto;
import com.example.server.dtos.PostDto;
import com.example.server.dtos.UserDto;
import com.example.server.pojos.Comments;
import com.example.server.pojos.Images;
import com.example.server.pojos.Posts;
import com.example.server.pojos.Users;
import com.example.server.repositories.CommentRepository;
import com.example.server.repositories.PostRepository;
import com.example.server.services.CommentService;
import com.example.server.services.PostService;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
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
    
    @Autowired
    private PostRepository postRepo;

    @Override
    public CommentDto addComment(Map<String, String> params, Users u, PostDto p) {
        LocalDateTime currentTime = LocalDateTime.now();
        Date currentDate = Date.from(currentTime.atZone(ZoneId.systemDefault()).toInstant());
        Comments cmt = new Comments();
        cmt.setContent(params.get("content"));
        cmt.setCreatedAt(currentDate);
        cmt.setUserId(u);
        Posts post = this.postRepo.findPostById(p.getId());
        cmt.setPostId(post);
        this.cmtRepo.addComment(cmt);
        Comments savedCmt = this.cmtRepo.findCommentById(cmt.getId());
        CommentDto cmtDto = findCmtById(savedCmt.getId());
        return cmtDto;
    }

    @Override
    public CommentDto updateComment(Map<String, String> params, Users u, Long cmtId) {
        LocalDateTime currentTime = LocalDateTime.now();
        Date currentDate = Date.from(currentTime.atZone(ZoneId.systemDefault()).toInstant());
        Comments cmt = cmtRepo.findCommentById(cmtId);
        if (cmt != null && Objects.equals(u.getId(), cmt.getUserId().getId())) {
            cmt.setContent(params.get("content"));
            cmt.setUpdatedAt(currentDate);
            cmt.setUserId(u);
            cmt.setPostId(cmt.getPostId());
            this.cmtRepo.updateComment(cmt);
            CommentDto cmtDto = findCmtById(cmtId);
            return cmtDto;
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
    
    @Override
    public CommentDto findCmtById(Long id) {
        Comments c = this.cmtRepo.findCommentById(id);
           
        UserDto userDto = UserDto.builder()
                .id(c.getUserId().getId())
                .username(c.getUserId().getUsername())
                .email(c.getUserId().getEmail())
                .firstName(c.getUserId().getFirstName())
                .lastName(c.getUserId().getLastName())
                .avatar(c.getUserId().getAvatar())
                .bgImage(c.getUserId().getBgImage())
                .phone(c.getUserId().getPhone())
                .createdAt(c.getUserId().getCreatedAt())
                .updatedAt(c.getUserId().getUpdatedAt())
                .isActive(c.getUserId().getIsActive())
                .role(c.getUserId().getRole())
                .studentId(c.getUserId().getStudentId())
                .majorId(c.getUserId().getMajorId())
                .build();
        
        CommentDto cmtDto = CommentDto.builder()
                .id(c.getId())
                .content(c.getContent())
                .createdAt(c.getCreatedAt())
                .updatedAt(c.getUpdatedAt())
                .user(userDto)
                .build();
        
        return cmtDto;
    }
    
    
    @Override
    public List<CommentDto> getCmtByPosts(int currentPage, Posts p) {
        List<Comments> cmts = cmtRepo.findAllCmts(currentPage, p);
        List<CommentDto> listCmtDto = new ArrayList<>();
        cmts.forEach(c -> {
            CommentDto cmtDto = this.findCmtById(c.getId());
            listCmtDto.add(cmtDto);
        });
        return listCmtDto;
    }
    
   
}
