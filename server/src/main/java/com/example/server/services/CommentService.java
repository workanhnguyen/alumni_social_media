/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.example.server.services;

import com.example.server.pojos.Comments;
import com.example.server.pojos.Posts;
import com.example.server.pojos.Users;
import java.util.Map;

/**
 *
 * @author maidv
 */
public interface CommentService {
   Comments addComment(Map<String, String> params, Users u, Posts p);
   
   Comments updateComment(Map<String, String> params, Users u, Long cmtId);

   Boolean deleteComment(Long id, Users u);
}
