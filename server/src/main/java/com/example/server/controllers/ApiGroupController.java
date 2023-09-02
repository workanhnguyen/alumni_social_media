/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.example.server.controllers;

import com.example.server.dtos.CommentDto;
import com.example.server.dtos.GroupDto;
import com.example.server.dtos.PostDto;
import com.example.server.pojos.Groups;
import com.example.server.pojos.Users;
import com.example.server.repositories.GroupRepository;
import com.example.server.services.GroupService;

import com.example.server.services.UserService;
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
@RequestMapping("/api/groups")
public class ApiGroupController {

    @Autowired
    private UserService userService;
    
    @Autowired
    private GroupService grService;
    
    @Autowired
    private GroupRepository groupRepository;
    
    @PostMapping(path = "/new/", produces = {MediaType.APPLICATION_JSON_VALUE})
    @CrossOrigin
    public ResponseEntity<Groups> createGroup(@RequestBody Map<String, String> params) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && !(authentication instanceof AnonymousAuthenticationToken)) {
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            Users currentUser = userService.getUserByUsername(userDetails.getUsername());
            Groups gr = this.grService.addGroup(params, currentUser);

            return new ResponseEntity<>(gr, HttpStatus.CREATED);
        }
        return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
    }
    
    @PutMapping(path = "/{id}/", produces = {MediaType.APPLICATION_JSON_VALUE})
    @CrossOrigin
    public ResponseEntity<Groups> updateGroup(@PathVariable("id") Long grId, @RequestBody Map<String, String> params) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && !(authentication instanceof AnonymousAuthenticationToken)) {
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            Users currentUser = userService.getUserByUsername(userDetails.getUsername());
            Groups gr = this.grService.editGroup(params, grId);
            return new ResponseEntity<>(gr, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
    }
    
    
    @DeleteMapping("/{id}/")
    @CrossOrigin
    public ResponseEntity<String> deletePost(@PathVariable("id") Long grId) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && !(authentication instanceof AnonymousAuthenticationToken)) {
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            Users currentUser = userService.getUserByUsername(userDetails.getUsername());
            Boolean rs = grService.deleteGroup(grId);
            if (rs) {
                return new ResponseEntity<>("TRUE", HttpStatus.NO_CONTENT);
            } else {
                return ResponseEntity.badRequest().body("FALSE");
            }
        } else {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
    }
    
    @PostMapping("/{groupId}/add_user/{userId}")
    public ResponseEntity<String> addUserToGroup(@PathVariable Long groupId, @PathVariable Long userId) {
        Groups group = grService.findGroupById(groupId);
        Users user = userService.getUserById(userId);

        if (group == null || user == null) {
            return ResponseEntity.badRequest().body("Group or user not found.");
        }

        if (grService.addUserToGroup(user, group)) {
            return ResponseEntity.ok("User added to group successfully.");
        } else
            return ResponseEntity.badRequest().body("FALSE");
    }
    
    
    @DeleteMapping("/{groupId}/remove_user/{userId}")
    public ResponseEntity<String> removeUserFromGroup(@PathVariable Long groupId, @PathVariable Long userId) {
        Groups group = grService.findGroupById(groupId);
        Users user = userService.getUserById(userId);

        if (group == null || user == null) {
            return ResponseEntity.badRequest().body("Group or user not found.");
        }

        if (grService.removeUserFromGroup(group, user)) {
            return ResponseEntity.ok("User removed from group successfully.");
        } else {
            return ResponseEntity.badRequest().body("User is not in the group.");
        }
    }
    
    
    @GetMapping("/{groupId}/members")
    public ResponseEntity<GroupDto> getGroupMembers(@PathVariable Long groupId) {
        GroupDto grDto = grService.getGroupMembers(groupId);
        return ResponseEntity.ok(grDto);
    }
    
}