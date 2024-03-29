/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.example.server.services.impl;

import com.cloudinary.utils.ObjectUtils;
import com.example.server.dtos.CommentDto;
import com.example.server.dtos.ImageDto;
import com.example.server.dtos.PostDto;
import com.example.server.dtos.ReactionDto;
import com.example.server.dtos.ReactionDto2;
import com.example.server.dtos.UserDto;
import com.example.server.pojos.Images;
import com.example.server.pojos.Posts;
import com.example.server.pojos.Users;
import com.example.server.repositories.ImageRepository;
import com.example.server.repositories.PostRepository;
import com.example.server.services.CommentService;
import com.example.server.services.ImageService;
import com.example.server.services.PostService;
import com.example.server.services.ReactionService;
import java.io.IOException;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.logging.Level;
import java.util.logging.Logger;
import java.util.stream.Collectors;
import org.apache.velocity.exception.ResourceNotFoundException;
import org.hibernate.Hibernate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

/**
 *
 * @author maidv
 */
@Service
public class PostServiceImp implements PostService {

    @Autowired
    private PostRepository postRepo;
    
    @Autowired
    private ImageService imageService;
    
    @Autowired
    private CommentService cmtService;
    
    @Autowired
    private ReactionService reactionService;
    
    @Autowired
    private ImageRepository imageRepo;
    
    

    @Override
    public PostDto addPost(Map<String, String> params, Users u, List<MultipartFile> files) {
        LocalDateTime currentTime = LocalDateTime.now();
        Date currentDate = Date.from(currentTime.atZone(ZoneId.systemDefault()).toInstant());
        Posts p = new Posts();
        p.setContent(params.get("content"));
        p.setIsLocked(false);
        p.setCreatedAt(currentDate);
        p.setUserId(u);
        
        this.postRepo.addPost(p);
        
        Posts savedPost = this.postRepo.findPostById(p.getId());

        if (!files.isEmpty())
            for(MultipartFile file: files )
                this.imageService.addImage(file, savedPost);
        
        PostDto postDto = findPostById(p.getId());
        
        return postDto;
    }

    @Override
    public Posts updatePost(Map<String, String> params, Users u, Long postId) {
        LocalDateTime currentTime = LocalDateTime.now();
        Date currentDate = Date.from(currentTime.atZone(ZoneId.systemDefault()).toInstant());
        Posts p = postRepo.findPostById(postId);
        if (p != null && Objects.equals(u.getId(), p.getUserId().getId())) {
            p.setContent(params.get("content"));
            boolean isLocked = Boolean.valueOf(params.get("isLocked"));
            p.setIsLocked(isLocked);
            p.setUpdatedAt(currentDate);
            p.setUserId(u);
            return this.postRepo.updatePost(p);
        }
        return null;
    }

    @Override
    public Boolean deletePost(Long id, Users u) {
        Posts p = postRepo.findPostById(id);
        if (p != null && (Objects.equals(u.getId(), p.getUserId().getId()) || "ROLE_ADMIN".equals(u.getRole()))) {
            postRepo.deletePost(p);
            return true;
        }
        return false;
    }
//
    @Override
    public Boolean lockPost(Long id, Users u) {
        Posts p = postRepo.findPostById(id);
        if (p != null && Objects.equals(u.getId(), p.getUserId().getId())) {
            p.setIsLocked(true);
            postRepo.lockPost(p);
            return true;
        }
        return false;
       
    }
    

    @Override
    public Boolean unlockPost(Long id, Users u) {
        Posts p = postRepo.findPostById(id);
        if (p != null && Objects.equals(u.getId(), p.getUserId().getId())) {
            p.setIsLocked(false);
            postRepo.lockPost(p);
            return true;
        }
        return false;
    }
    
    
//
//    @Override
//    public List<PostDto> findAllPosts() {
//        List<Post> posts = postRepository.findAllPosts();
//        return posts.stream()
//                .map(p -> mapper.map(p, PostDto.class))
//                .collect(Collectors.toList());
//    }
//
//    @Override
//    public List<PostDto> getAllMyPostsAndSharePosts(Long currentUserId, String orderDir) {
//        String direction = orderDir != null ? orderDir.toLowerCase() : "asc";
//        List<Post> posts = postRepository.findPostsByUserId(currentUserId, direction);
//        List<PostDto> postDtos = new ArrayList<>();
//        posts.forEach(p -> {
//            PostDto postDto = PostDto.builder()
//                    .isLocked(p.getIsLocked())
//                    .isSurvey(p.getIsSurvey())
//                    .content(p.getContent())
//                    .id(p.getId())
//                    .userId(p.getUserId())
//                    .timestamp(p.getTimestamp())
//                    .build();
//            postDtos.add(postDto);
//        });
//        return postDtos;
//    }
//
    @Override
    public List<PostDto> findPostsByUserId(Users u) {
      
        List<Posts> posts = postRepo.findPostsByUserId(u);
        List<PostDto> listPostDto = new ArrayList<>();
        
        posts.forEach(p -> {
            PostDto postDto = this.findPostById(p.getId());
            listPostDto.add(postDto);
        });
        return listPostDto;
    }

    @Override
    public List<PostDto> getPosts(Map<String, String> params) {
        List<Posts> posts = postRepo.getPosts(params);
        List<PostDto> postDtos = new ArrayList<>();

        posts.forEach(p -> {
            PostDto postDto = this.findPostById(p.getId());
            postDtos.add(postDto);
        });

        return postDtos;
    }

    @Override
    public List<PostDto> getAllPosts(int currentPage) {
        List<Posts> posts = postRepo.findAllPosts(currentPage);
        List<PostDto> listPostDto = new ArrayList<>();
         posts.forEach(p -> {
            PostDto postDto = this.findPostById(p.getId());
            listPostDto.add(postDto);
        });
        return listPostDto;
    }

    @Override
    public Long countPost() {
        return this.postRepo.countPost();
    }

    @Override
    public Long countPost(Users u) {
        return this.postRepo.countPost(u);
    }

    @Override
    public PostDto findPostById(Long id) {
        Posts p = this.postRepo.findPostById(id);
        List<Images> imagesList = imageRepo.findByPostId(p);
        List<ImageDto> imagesDto = new ArrayList<>();
        List<CommentDto> commentsDto = this.cmtService.getCmtByPosts(1, p);
        Long quantityOfReaction = this.countReactionsByPostId(id);
        List<ReactionDto2> reactionsDto2 = this.reactionService.listReaction2(p);
        
        imagesList.forEach(i -> {
            ImageDto imgDto = ImageDto.builder()
                    .id(i.getId())
                    .url(i.getImageUrl())
                    .isActive(i.getIsActive())
                    .build();
            imagesDto.add(imgDto);
        });
        
        
        UserDto userDto = UserDto.builder()
                .id(p.getUserId().getId())
                .username(p.getUserId().getUsername())
                .email(p.getUserId().getEmail())
                .firstName(p.getUserId().getFirstName())
                .lastName(p.getUserId().getLastName())
                .avatar(p.getUserId().getAvatar())
                .bgImage(p.getUserId().getBgImage())
                .phone(p.getUserId().getPhone())
                .createdAt(p.getUserId().getCreatedAt())
                .updatedAt(p.getUserId().getUpdatedAt())
                .isActive(p.getUserId().getIsActive())
                .role(p.getUserId().getRole())
                .studentId(p.getUserId().getStudentId())
                .majorId(p.getUserId().getMajorId())
                .build();
        
        PostDto postDto = PostDto.builder()
                .id(p.getId())
                .content(p.getContent())
                .createdAt(p.getCreatedAt())
                .updatedAt(p.getUpdatedAt())
                .isLocked(p.getIsLocked())
                .user(userDto)
                .images(imagesDto)
                .comments(commentsDto)
                .reactions(reactionsDto2)
                .quantityOfReaction(quantityOfReaction)
                .build();
        
        return postDto;
    }
    
    @Override
    public Long countCommentsByPostId(Long postId) {
        return this.postRepo.countCommentsByPostId(postId);
    }

    @Override
    public Long countReactionsByPostId(Long postId) {
        return this.postRepo.countReactionsByPostId(postId);
    }

}
