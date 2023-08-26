/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.example.server.services.impl;

import com.example.server.pojos.Posts;
import com.example.server.pojos.Users;
import com.example.server.repositories.PostRepository;
import com.example.server.services.PostService;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Date;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author maidv
 */
@Service
public class PostServiceImp implements PostService  {

    @Autowired
    private PostRepository postRepo;
    
    LocalDateTime currentTime = LocalDateTime.now();
    Date currentDate = Date.from(currentTime.atZone(ZoneId.systemDefault()).toInstant());
    @Override
    public Posts addPost(Map<String, String> params, Users u) {
        Posts p = new Posts();
        p.setContent(params.get("content"));
        p.setIsLocked(false);
        p.setCreatedAt(currentDate);
        p.setUserId(u);
        return this.postRepo.addPost(p);
    }
    
}
