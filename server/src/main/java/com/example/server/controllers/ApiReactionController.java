package com.example.server.controllers;

import com.example.server.dtos.PostDto;
import com.example.server.dtos.ReactionDto;
import com.example.server.pojos.Groups;
import com.example.server.pojos.Majors;
import com.example.server.pojos.Reactions;
import com.example.server.pojos.Users;
import com.example.server.services.MajorService;
import com.example.server.services.PostService;
import com.example.server.services.ReactionService;
import com.example.server.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;

@RestController
@RequestMapping("/api/reactions")
public class ApiReactionController {
    @Autowired
    private ReactionService reactionService;
    @Autowired
    private UserService userService;
    @Autowired
    private PostService postService;
    
    
    @PostMapping(path = "/posts/{id}/", produces = {MediaType.APPLICATION_JSON_VALUE})
    @CrossOrigin
    public ResponseEntity<ReactionDto> addReaction(@RequestBody Map<String, String> params, @PathVariable("id") Long postId) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && !(authentication instanceof AnonymousAuthenticationToken)) {
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            Users currentUser = userService.getUserByUsername(userDetails.getUsername());
            PostDto postDto = postService.findPostById(postId);
            ReactionDto re = reactionService.addReaction(params, currentUser, postDto);
            return new ResponseEntity<>(re, HttpStatus.CREATED);
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }
    
    @DeleteMapping(path = "/{id}/", produces = {MediaType.APPLICATION_JSON_VALUE})
    @CrossOrigin
    public ResponseEntity<?> deleteReaction( @PathVariable("id") Long reId) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && !(authentication instanceof AnonymousAuthenticationToken)) {
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            Users currentUser = userService.getUserByUsername(userDetails.getUsername());
            Boolean rs = reactionService.deleteReaction(reId);
            if (rs) {
                return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            }
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }
    
    @GetMapping(path = "/posts/{id}/", produces = {MediaType.APPLICATION_JSON_VALUE})
    @CrossOrigin
    public ResponseEntity<List<ReactionDto>> getAllReactionByPost( @PathVariable("id") Long postId) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && !(authentication instanceof AnonymousAuthenticationToken)) {
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            Users currentUser = userService.getUserByUsername(userDetails.getUsername());
            PostDto postDto = postService.findPostById(postId);
            List<ReactionDto> res = reactionService.listReaction(postDto);
            return new ResponseEntity<>(res, HttpStatus.OK);
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }

    @GetMapping(path = "/reaction-on-post/{id}/")
    @CrossOrigin
    public ResponseEntity<?> findReactionByUserIdAndPostId(@PathVariable("id") Long postId) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && !(authentication instanceof AnonymousAuthenticationToken)) {
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            Users currentUser = userService.getUserByUsername(userDetails.getUsername());

            ReactionDto re = reactionService.findReactionByUserIdAndPostId(currentUser.getId(), postId);
            return new ResponseEntity<>(re, HttpStatus.OK);
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }
}
