package com.example.server.services.impl;

import com.example.server.dtos.CommentDto;
import com.example.server.dtos.GroupDto;
import com.example.server.dtos.UserDto;
import com.example.server.pojos.Comments;
import com.example.server.pojos.Groups;
import com.example.server.pojos.Letters;
import com.example.server.pojos.Majors;
import com.example.server.pojos.Posts;
import com.example.server.pojos.Users;
import com.example.server.repositories.LetterRepository;

import com.example.server.services.GroupService;
import com.example.server.services.LetterService;
import com.example.server.services.UserService;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.*;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;



@Service
public class LetterServiceImp implements LetterService {
    @Autowired
    private LetterRepository letterRepo;
    
   


    @Override
    public Letters addLetter(Map<String, String> params, Users u) {
        LocalDateTime currentTime = LocalDateTime.now();
        Date currentDate = Date.from(currentTime.atZone(ZoneId.systemDefault()).toInstant());
        Letters l = new Letters();
        l.setCreatedAt(currentDate);
        l.setContent(params.get("content"));
        l.setDescription(params.get("description"));
        return this.letterRepo.addLetter(l);
    }

    @Override
    public Boolean deleteLetter(Long id) {
        Letters l = this.letterRepo.findLetterById(id);
        return this.letterRepo.deleteLetter(l);
    }

    @Override
    public Boolean addUserToLetter(Users user, Letters l) {
        return letterRepo.addUsertoLetter(l, user);
    }

    @Override
    public Boolean removeUserFromLetter(Letters l, Users user) {
        return letterRepo.removeUserFromLetter(l, user);

    }

    @Override
    public Letters findLetterById(Long letterId) {
        return this.letterRepo.findLetterById(letterId);
    }
    
   
}
