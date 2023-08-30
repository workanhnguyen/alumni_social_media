/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.example.server.repositories;

import com.example.server.pojos.Posts;
import com.example.server.pojos.Users;
import java.util.List;

/**
 *
 * @author maidv
 */

public interface PostRepository {
    Posts addPost(Posts p);
    
    Posts updatePost(Posts post);

    Boolean deletePost(Posts post);
    
    Long countPost();
    
    Long countPost(Users u);
//
    Boolean lockPost(Posts post);

    Boolean unlockPost(Posts post);
//
    Posts findPostById(Long id);

//    Post findPostByIdAndUserId(Long id, Long userId);

    List<Posts> findAllPosts(int currentPage);

    List<Posts> findPostsByUserId(Users userId);
    
    Long countCommentsByPostId(Long postId);
  
}
