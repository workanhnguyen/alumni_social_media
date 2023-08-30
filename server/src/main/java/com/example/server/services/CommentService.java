/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.example.server.services;

import com.example.server.dtos.CommentDto;
import com.example.server.dtos.PostDto;
import com.example.server.pojos.Comments;
import com.example.server.pojos.Posts;
import com.example.server.pojos.Users;
import java.util.List;
import java.util.Map;

/**
 *
 * @author maidv
 */
public interface CommentService {
   CommentDto addComment(Map<String, String> params, Users u, PostDto p);
   
   CommentDto updateComment(Map<String, String> params, Users u, Long cmtId);

   Boolean deleteComment(Long id, Users u);
   
   CommentDto findCmtById(Long id);
   
   List<CommentDto> getCmtByPosts(int currentPage, Posts p);
   
}
