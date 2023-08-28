/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.example.server.controllers;


import com.example.server.dtos.CommentDto;
import com.example.server.dtos.UserDto;
import com.example.server.pojos.Comments;
import com.example.server.pojos.Posts;
import com.example.server.pojos.Users;
import com.example.server.services.CommentService;
import com.example.server.services.PostService;
import com.example.server.services.UserService;
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
    private UserService userService;
    
    @Autowired
    private CommentService commentService;
    
//    @PostMapping(path = "/new/posts/{id}", produces = {MediaType.APPLICATION_JSON_VALUE})
//    @CrossOrigin
//    public ResponseEntity<CommentDto> createComment(@PathVariable("id") Long postId, @RequestBody Map<String, String> params) {
//        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
//        if (authentication != null && !(authentication instanceof AnonymousAuthenticationToken)) {
//            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
//            Users currentUser = userService.getUserByUsername(userDetails.getUsername());
//            Posts currentPost = postService.findPostById(postId);
//            
//            Comments cmt = this.commentService.addComment(params, currentUser, currentPost);
//            CommentDto commentDto = new CommentDto();
//            commentDto.setId(cmt.getId());
//            commentDto.setContent(cmt.getContent());
//            commentDto.setCreatedAt(cmt.getCreatedAt());
//            commentDto.setUpdatedAt(cmt.getUpdatedAt());
//            UserDto userDto = UserDto.builder()
//                .id(currentUser.getId())
//                .username(currentUser.getUsername())
//                .email(currentUser.getEmail())
//                .firstName(currentUser.getFirstName())
//                .lastName(currentUser.getLastName())
//                .phone(currentUser.getPhone())
//                .createdAt(currentUser.getCreatedAt())
//                .isActive(currentUser.getIsActive())
//                .avatar(currentUser.getAvatar())
//                .bgImage(currentUser.getBgImage())
//                .role(currentUser.getRole())
//                .updatedAt(currentUser.getUpdatedAt())
//                .studentId(currentUser.getStudentId())
////                .majorId(currentUser.getMajorId().getId())
//                .build();
//
//            commentDto.setUser(userDto);
//            return new ResponseEntity<>(commentDto, HttpStatus.CREATED);
//        }
//        return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
//    }
    
    @PutMapping(path = "/{id}", produces = {MediaType.APPLICATION_JSON_VALUE})
    @CrossOrigin
    public ResponseEntity<CommentDto> updateComment(@PathVariable("id") Long cmtId, @RequestBody Map<String, String> params) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && !(authentication instanceof AnonymousAuthenticationToken)) {
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            Users currentUser = userService.getUserByUsername(userDetails.getUsername());           
            Comments cmt = this.commentService.updateComment(params, currentUser, cmtId);
            CommentDto commentDto = new CommentDto();
            commentDto.setId(cmt.getId());
            commentDto.setContent(cmt.getContent());
            commentDto.setCreatedAt(cmt.getCreatedAt());
            commentDto.setUpdatedAt(cmt.getUpdatedAt());
            UserDto userDto = UserDto.builder()
                .id(currentUser.getId())
                .username(currentUser.getUsername())
                .email(currentUser.getEmail())
                .firstName(currentUser.getFirstName())
                .lastName(currentUser.getLastName())
                .phone(currentUser.getPhone())
                .createdAt(currentUser.getCreatedAt())
                .isActive(currentUser.getIsActive())
                .avatar(currentUser.getAvatar())
                .bgImage(currentUser.getBgImage())

                .role(currentUser.getRole())
                .updatedAt(currentUser.getUpdatedAt())
                .studentId(currentUser.getStudentId())
//                .majorId(currentUser.getMajorId().getId())
                .build();

            commentDto.setUser(userDto);
            return new ResponseEntity<>(commentDto, HttpStatus.CREATED);           
        }
        return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
    }
    
    @DeleteMapping("/{id}")
    @CrossOrigin
    public ResponseEntity<String> deleteComment(@PathVariable("id") Long cmtId) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && !(authentication instanceof AnonymousAuthenticationToken)) {
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            Users currentUser = userService.getUserByUsername(userDetails.getUsername());
            Boolean rs = commentService.deleteComment(cmtId, currentUser);
            if (rs) {
                return new ResponseEntity<>("TRUE", HttpStatus.OK);
            } else {
                return ResponseEntity.badRequest().body("FALSE");
            }
        } else {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
    }
    
    @GetMapping("/{id}")
    @CrossOrigin
    public ResponseEntity<String> getCommentId(@PathVariable("id") Long cmtId) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && !(authentication instanceof AnonymousAuthenticationToken)) {
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            Users currentUser = userService.getUserByUsername(userDetails.getUsername());
            Boolean rs = commentService.deleteComment(cmtId, currentUser);
            if (rs) {
                return new ResponseEntity<>("TRUE", HttpStatus.OK);
            } else {
                return ResponseEntity.badRequest().body("FALSE");
            }
        } else {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
    }
    
   
    
    
    
    
    
    
    
}
