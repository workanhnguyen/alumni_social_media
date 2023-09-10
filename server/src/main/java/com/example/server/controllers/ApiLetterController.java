/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.example.server.controllers;

import com.example.server.dtos.CommentDto;
import com.example.server.dtos.GroupDto;
import com.example.server.dtos.PostDto;
import com.example.server.pojos.Groups;
import com.example.server.pojos.Letters;
import com.example.server.pojos.Users;
import com.example.server.repositories.GroupRepository;
import com.example.server.services.GroupService;
import com.example.server.services.LetterService;

import com.example.server.services.UserService;

import java.util.HashMap;
import java.util.Map;
import java.util.Set;
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
@RequestMapping("/api/letters")
public class ApiLetterController {

    @Autowired
    private UserService userService;
    
    @Autowired
    private LetterService letterService;
    
    @PostMapping(path = "/new/", produces = {MediaType.APPLICATION_JSON_VALUE})
    @CrossOrigin
    public ResponseEntity<Letters> createLetter(@RequestBody Map<String, String> params) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && !(authentication instanceof AnonymousAuthenticationToken)) {
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            Users currentUser = userService.getUserByUsername(userDetails.getUsername());
            Letters l = this.letterService.addLetter(params, currentUser);

            return new ResponseEntity<>(l, HttpStatus.CREATED);
        }
        return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
    }
    
    
    @DeleteMapping("/{id}/")
    @CrossOrigin
    public ResponseEntity<String> deletePost(@PathVariable("id") Long letterId) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && !(authentication instanceof AnonymousAuthenticationToken)) {
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            Users currentUser = userService.getUserByUsername(userDetails.getUsername());
            Boolean rs = letterService.deleteLetter(letterId);
            if (rs) {
                return new ResponseEntity<>("TRUE", HttpStatus.NO_CONTENT);
            } else {
                return ResponseEntity.badRequest().body("FALSE");
            }
        } else {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
    }
    
    @PostMapping("/{letterId}/add_user/{userId}")
    @CrossOrigin
    public ResponseEntity<String> addUserToGroup(@PathVariable(value = "letterId") Long letterId, @PathVariable(value = "userId") Long userId) {
        Letters l = letterService.findLetterById(letterId);
        Users user = userService.getUserById(userId);

        if (l == null || user == null) {
            return ResponseEntity.badRequest().body("Letter or user not found.");
        }

        if (letterService.addUserToLetter(user, l)) {
            return ResponseEntity.status(HttpStatus.OK).build();
        } else
            return ResponseEntity.badRequest().body("FALSE");
    }
    
    
    @DeleteMapping("/{letterId}/remove_user/{userId}")
    @CrossOrigin
    public ResponseEntity<String> removeUserFromGroup(@PathVariable Long letterId, @PathVariable Long userId) {
        Letters l = letterService.findLetterById(letterId);
        Users user = userService.getUserById(userId);

        if (l == null || user == null) {
            return ResponseEntity.badRequest().body("Group or user not found.");
        }

        if (letterService.removeUserFromLetter(l, user)) {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        } else {
            return ResponseEntity.badRequest().body("User is not in the group.");
        }
    }

    @GetMapping("")
    @CrossOrigin
    public ResponseEntity<?> getLetters() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && !(authentication instanceof AnonymousAuthenticationToken)) {
            return new ResponseEntity<>(letterService.getLetters(new HashMap<>()), HttpStatus.OK);
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }
}