/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.example.server.repositories;

import com.example.server.pojos.Comments;
import com.example.server.pojos.Posts;

/**
 *
 * @author maidv
 */

public interface CommentRepository {
   Comments addComment(Comments cmt);
   Comments findCommentById(Long id);
   Comments updateComment(Comments cmt);
   Boolean deleteComment(Comments cmt);
}
