/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.example.server.services;

import com.example.server.pojos.Posts;
import com.example.server.pojos.Users;
import java.util.Map;

/**
 *
 * @author maidv
 */
public interface PostService {
    Posts addPost(Map<String, String> params, Users u);
    
    Posts updatePost(Map<String, String> params, Users u, Long postId);
    
    Boolean deletePost(Long id, Users u);

//    PostDto lockPost(Long id, Long userId);
//
//    PostDto unlockPost(Long id, Long userId);
//
    Posts findPostById(Long id);
//
//    List<PostDto> findAllPosts();
//
//    List<PostDto> getAllMyPostsAndSharePosts(Long currentUserId, String orderDir);
//
//    List<PostDto> findPostsByUserId(Long userId, String orderDir);
//
//    List<PostDto> getAllPosts();
}
