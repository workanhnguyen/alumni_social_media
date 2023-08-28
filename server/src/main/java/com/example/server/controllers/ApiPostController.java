/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.example.server.controllers;

import com.example.server.components.JwtService;
import com.example.server.dtos.PostDto;
import com.example.server.pojos.Posts;
import com.example.server.pojos.Users;
import com.example.server.services.PostService;
import com.example.server.services.UserService;
import static java.lang.Boolean.FALSE;
import static java.lang.Boolean.TRUE;
import java.security.Principal;
import java.util.ArrayList;
import java.util.Collections;
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
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

/**
 *
 * @author maidv
 */
@RestController
@RequestMapping("/api/posts")
public class ApiPostController {

    @Autowired
    private PostService postService;

    @Autowired
    private UserService userService;

    @PostMapping(path = "/new/", produces = {MediaType.APPLICATION_JSON_VALUE})
    @CrossOrigin
    public ResponseEntity<?> createPost(@RequestParam Map<String, String> params, @RequestParam(value = "files", required = false) List<MultipartFile> files) {
        if (files == null) {
            files = Collections.emptyList(); // Set default value to an empty list
        }

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && !(authentication instanceof AnonymousAuthenticationToken)) {
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            Users currentUser = userService.getUserByUsername(userDetails.getUsername());
            PostDto p = this.postService.addPost(params, currentUser, files);
            return new ResponseEntity<>(p, HttpStatus.CREATED);
        }
        return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
    }


//    @PutMapping(path = "/{id}", produces = {MediaType.APPLICATION_JSON_VALUE})
//    @CrossOrigin
//    public ResponseEntity<Posts> updatePost(@PathVariable("id") Long postId, @RequestBody Map<String, String> params) {
//        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
//        if (authentication != null && !(authentication instanceof AnonymousAuthenticationToken)) {
//            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
//            Users currentUser = userService.getUserByUsername(userDetails.getUsername());
//            Posts p = this.postService.updatePost(params, currentUser, postId);
//            return new ResponseEntity<>(p, HttpStatus.OK);
//        }
//        return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
//    }
    //ok


    @DeleteMapping("/{id}/")
    @CrossOrigin
    public ResponseEntity<String> deletePost(@PathVariable("id") Long postId) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && !(authentication instanceof AnonymousAuthenticationToken)) {
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            Users currentUser = userService.getUserByUsername(userDetails.getUsername());
            Boolean rs = postService.deletePost(postId, currentUser);
            if (rs) {
                return new ResponseEntity<>("TRUE", HttpStatus.OK);
            } else {
                return ResponseEntity.badRequest().body("FALSE");
            }
        } else {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
    }
    //
//    @GetMapping(path = "/", produces = MediaType.APPLICATION_JSON_VALUE)
//    @CrossOrigin
//    public ResponseEntity<List<Posts>> details(Principal user) {
//        Users u = this.userService.getUserByUsername(user.getName());
//        return new ResponseEntity<>(HttpStatus.OK);
//    }
    //ok
    @GetMapping(path = "/counts/", produces = MediaType.APPLICATION_JSON_VALUE)
    @CrossOrigin
    public ResponseEntity<Long> countPost() {
        Long count = this.postService.countPost();
        return new ResponseEntity<>(count, HttpStatus.OK);
    }
    //ok
    @GetMapping(path = "/current_user/counts/", produces = MediaType.APPLICATION_JSON_VALUE)
    @CrossOrigin
    public ResponseEntity<Long> countPostFindUserId() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && !(authentication instanceof AnonymousAuthenticationToken)) {
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            Users currentUser = userService.getUserByUsername(userDetails.getUsername());
            Long count = this.postService.countPost(currentUser);
            return new ResponseEntity<>(count, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
    }

    @GetMapping("/{id}/locked/")
    @CrossOrigin
    public ResponseEntity<?> locked(@PathVariable("id") Long postId) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && !(authentication instanceof AnonymousAuthenticationToken)) {
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            Users currentUser = userService.getUserByUsername(userDetails.getUsername());
            Boolean rs = postService.lockPost(postId, currentUser);
            if (rs) {
                return new ResponseEntity<>(postService.findPostById(postId), HttpStatus.OK);
            } else {
                return ResponseEntity.badRequest().body("FALSE");
            }
        } else {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
    }

    @GetMapping("/{id}/unlocked/")
    @CrossOrigin
    public ResponseEntity<?> unLocked(@PathVariable("id") Long postId) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && !(authentication instanceof AnonymousAuthenticationToken)) {
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            Users currentUser = userService.getUserByUsername(userDetails.getUsername());
            Boolean rs = postService.unlockPost(postId, currentUser);
            if (rs) {
                return new ResponseEntity<>(postService.findPostById(postId), HttpStatus.OK);
            } else {
                return ResponseEntity.badRequest().body("FALSE");
            }
        } else {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
    }

    @GetMapping(path = "/{id}/", produces = MediaType.APPLICATION_JSON_VALUE)
    @CrossOrigin
    public ResponseEntity<PostDto> findPostById(@PathVariable("id") Long postId) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && !(authentication instanceof AnonymousAuthenticationToken)) {
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            Users currentUser = userService.getUserByUsername(userDetails.getUsername());
            PostDto p = postService.findPostById(postId);
            if (p != null) {
                return new ResponseEntity<>(p, HttpStatus.OK);
            } else {
                return new ResponseEntity<>(null, HttpStatus.OK);
            }
        } else {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
    }


}