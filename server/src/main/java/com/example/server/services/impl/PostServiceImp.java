/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.example.server.services.impl;

import com.example.server.pojos.Posts;
import com.example.server.pojos.Users;
import com.example.server.repositories.PostRepository;
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
public class PostServiceImp implements PostService {

    @Autowired
    private PostRepository postRepo;

    @Override
    public Posts addPost(Map<String, String> params, Users u) {
        LocalDateTime currentTime = LocalDateTime.now();
        Date currentDate = Date.from(currentTime.atZone(ZoneId.systemDefault()).toInstant());
        Posts p = new Posts();
        p.setContent(params.get("content"));
        p.setIsLocked(false);
        p.setCreatedAt(currentDate);
        p.setUserId(u);
        return this.postRepo.addPost(p);
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
        if (p != null && Objects.equals(u.getId(), p.getUserId().getId())) {
            postRepo.deletePost(p);
            return true;
        }
        return false;
    }
//
//    @Override
//    public PostDto lockPost(Long id, Long userId) {
//        Post post = postRepository.findPostById(id);
//        if (post == null) {
//            throw new ResourceNotFoundException("Post", "id", id);
//        }
//        post.setIsLocked(true);
//        List<Role> roles = userService.getAllRoleOfUser(userId);
//        Boolean hasAdminRole = roles.stream().anyMatch(r -> r.getName().equals("SYS_ADMIN"));
//        if (hasAdminRole || post.getUserId() == userId) {
//            return mapper.map(postRepository.lockPost(post), PostDto.class);
//        } else {
//            return null;
//        }
//    }
//
//    @Override
//    public PostDto unlockPost(Long id, Long userId) {
//        Post post = postRepository.findPostById(id);
//        if (post == null) {
//            throw new ResourceNotFoundException("Post", "id", id);
//        }
//        post.setIsLocked(false);
//        List<Role> roles = userService.getAllRoleOfUser(userId);
//        Boolean hasAdminRole = roles.stream().anyMatch(r -> r.getName().equals("SYS_ADMIN"));
//        if (hasAdminRole || post.getUserId() == userId) {
//            return mapper.map(postRepository.unlockPost(post), PostDto.class);
//        } else {
//            return null;
//        }
//    }
//
    @Override
    public Posts findPostById(Long id) {
        Posts post = postRepo.findPostById(id);
        return post;
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
//    @Override
//    public List<PostDto> findPostsByUserId(Long userId, String orderDir) {
//        String direction = orderDir != null ? orderDir.toLowerCase() : "asc";
//        List<Post> posts = postRepository.findPostsByUserId(userId, direction);
//        return posts.stream()
//                .map(p -> mapper.map(p, PostDto.class))
//                .collect(Collectors.toList());
//    }
//
//    @Override
//    public List<PostDto> getAllPosts() {
//        List<Post> posts = postRepository.findAllPosts();
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

}
