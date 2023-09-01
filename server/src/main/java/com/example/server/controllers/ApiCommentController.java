/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.example.server.controllers;


import com.example.server.dtos.CommentDto;
import com.example.server.dtos.PostDto;
import com.example.server.dtos.UserDto;
import com.example.server.pojos.Comments;
import com.example.server.pojos.Posts;
import com.example.server.pojos.Users;
import com.example.server.repositories.PostRepository;
import com.example.server.services.CommentService;
import com.example.server.services.PostService;
import com.example.server.services.UserService;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author maidv
 */
@RestController
@RequestMapping("/api/comments")
public class ApiCommentController {
    @Autowired
    private PostService postService;
    
    @Autowired
    private PostRepository postRepo;

    @Autowired
    private UserService userService;
    
    @Autowired
    private CommentService cmtService;
    
    @PostMapping(path = "/new/posts/{id}/", produces = {MediaType.APPLICATION_JSON_VALUE})
    @CrossOrigin
    public ResponseEntity<CommentDto> createComment(@PathVariable("id") Long postId, @RequestBody Map<String, String> params) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && !(authentication instanceof AnonymousAuthenticationToken)) {
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            Users currentUser = userService.getUserByUsername(userDetails.getUsername());
            PostDto currentPost = postService.findPostById(postId);
            if (!currentPost.getIsLocked()){
                CommentDto cmt = this.cmtService.addComment(params, currentUser, currentPost);
                return new ResponseEntity<>(cmt, HttpStatus.CREATED);
            }
            return new ResponseEntity<>( HttpStatus.LOCKED);
        }
        return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
    }
    
    @PostMapping(path = "/{id}/comments", produces = {MediaType.APPLICATION_JSON_VALUE})
    @CrossOrigin
    public ResponseEntity<CommentDto> createCommentByCmt(@PathVariable("id") Long cmtId, @RequestBody Map<String, String> params) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && !(authentication instanceof AnonymousAuthenticationToken)) {
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            Users currentUser = userService.getUserByUsername(userDetails.getUsername());
            CommentDto cmt = this.cmtService.addCommentByCmt(params, currentUser, cmtId);
            return new ResponseEntity<>(cmt, HttpStatus.CREATED);
        }
        return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
    }

    @PutMapping(path = "/{id}/", produces = {MediaType.APPLICATION_JSON_VALUE})
    @CrossOrigin
    public ResponseEntity<CommentDto> updateComment(@PathVariable("id") Long cmtId, @RequestBody Map<String, String> params) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && !(authentication instanceof AnonymousAuthenticationToken)) {
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            Users currentUser = userService.getUserByUsername(userDetails.getUsername());
            CommentDto cmtDto = cmtService.updateComment(params, currentUser, cmtId);
            return new ResponseEntity<>(cmtDto, HttpStatus.CREATED);
        }
        return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
    }
//    
    @DeleteMapping("/{id}/")
    @CrossOrigin
    public ResponseEntity<String> deleteComment(@PathVariable("id") Long cmtId) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && !(authentication instanceof AnonymousAuthenticationToken)) {
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            Users currentUser = userService.getUserByUsername(userDetails.getUsername());
            Boolean rs = cmtService.deleteComment(cmtId, currentUser);
            if (rs) {
                return new ResponseEntity<>("TRUE", HttpStatus.NO_CONTENT);
            } else {
                return ResponseEntity.badRequest().body("FALSE");
            }
        } else {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
    }
//    
//    @GetMapping("/{id}")
//    @CrossOrigin
//    public ResponseEntity<String> getCommentId(@PathVariable("id") Long cmtId) {
//        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
//        if (authentication != null && !(authentication instanceof AnonymousAuthenticationToken)) {
//            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
//            Users currentUser = userService.getUserByUsername(userDetails.getUsername());
//            Boolean rs = commentService.deleteComment(cmtId, currentUser);
//            if (rs) {
//                return new ResponseEntity<>("TRUE", HttpStatus.OK);
//            } else {
//                return ResponseEntity.badRequest().body("FALSE");
//            }
//        } else {
//            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
//        }
//    }
    
    @GetMapping("/posts/{id}/")
    @CrossOrigin
    public ResponseEntity<List<CommentDto>> getCommentByPost(@PathVariable("id") Long postId, @RequestParam(defaultValue = "1") int page) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && !(authentication instanceof AnonymousAuthenticationToken)) {
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            Users currentUser = userService.getUserByUsername(userDetails.getUsername());
            Posts p = postRepo.findPostById(postId);
            List<CommentDto> listCmtDto = cmtService.getCmtByPosts(0, p);
            if (listCmtDto != null) {
                return new ResponseEntity<>(listCmtDto, HttpStatus.OK);
            } else {
                return new ResponseEntity<>(new ArrayList<>(), HttpStatus.OK);
            }
        } else {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
    }
}
