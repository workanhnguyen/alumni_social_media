/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.example.server.services;

import com.example.server.dtos.PostDto;
import com.example.server.pojos.Posts;
import com.example.server.pojos.Users;
import java.util.List;
import java.util.Map;
import org.springframework.web.multipart.MultipartFile;

/**
 *
 * @author maidv
 */
public interface PostService {
    PostDto addPost(Map<String, String> params, Users u, List<MultipartFile> files);
    
    Posts updatePost(Map<String, String> params, Users u, Long postId);
    
    Boolean deletePost(Long id, Users u);
    
    Long countPost();
    
    Long countPost(Users u);

    Boolean lockPost(Long id, Users user);

    Boolean unlockPost(Long id, Users user);
//
//    Posts findPostById(Long id);
    
    PostDto findPostById(Long id);
//
//    List<PostDto> findAllPosts();
//
//    List<PostDto> getAllMyPostsAndSharePosts(Long currentUserId, String orderDir);
//
    List<PostDto> findPostsByUserId(Users u);
    List<PostDto> getPosts(Map<String, String> params);
//
    List<PostDto> getAllPosts(int currentPage);
    
    Long countCommentsByPostId(Long postId);
    
    Long countReactionsByPostId(Long postId);
    
}
