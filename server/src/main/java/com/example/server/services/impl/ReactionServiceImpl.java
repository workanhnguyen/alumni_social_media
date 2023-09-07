package com.example.server.services.impl;

import com.example.server.dtos.PostDto;
import com.example.server.dtos.ReactionDto;
import com.example.server.dtos.ReactionDto2;
import com.example.server.dtos.UserDto;
import com.example.server.pojos.Groups;
import com.example.server.pojos.Majors;
import com.example.server.pojos.Posts;
import com.example.server.pojos.Reactions;
import com.example.server.pojos.Users;
import com.example.server.repositories.MajorRepository;
import com.example.server.repositories.PostRepository;
import com.example.server.repositories.ReactionRepository;
import com.example.server.services.MajorService;
import com.example.server.services.PostService;
import com.example.server.services.ReactionService;
import com.example.server.services.UserService;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.Date;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class ReactionServiceImpl implements ReactionService {

    @Autowired
    private UserService userService;
    
    @Autowired
    private PostService postService;
    
    @Autowired
    private PostRepository postRepo;
    
    @Autowired
    private ReactionRepository reRepo;
    
    @Override
    public ReactionDto addReaction(Map<String, String> params, Users u, PostDto p) {
        LocalDateTime currentTime = LocalDateTime.now();
        Date currentDate = Date.from(currentTime.atZone(ZoneId.systemDefault()).toInstant());
        Reactions re = new Reactions();
        re.setCreatedAt(currentDate);
        re.setReactionType(params.get("reaction_type"));
        re.setPostId(this.postRepo.findPostById(p.getId()));
        re.setUserId(u);
        this.reRepo.addReaction(re);
        ReactionDto reDto = reactionDto(re);
        return reDto;
        
    }

    @Override
    public ReactionDto reactionDto(Reactions re) {
        ReactionDto reDto = ReactionDto.builder()
            .id(re.getId())
            .reactionType(re.getReactionType())
            .createdAt(re.getCreatedAt())
            .updatedAt(re.getUpdatedAt())
            .userId(this.userService.userToUserDto(re.getUserId()))
            .postId(this.postService.findPostById(re.getPostId().getId()))
            .build();
        return reDto;
    }
    
     public ReactionDto2 reactionDto2(Reactions re) {
        ReactionDto2 reDto2 = ReactionDto2.builder()
            .id(re.getId())
            .reactionType(re.getReactionType())
            .userId(re.getUserId().getId())
            .postId(re.getPostId().getId())
            .build();
        return reDto2;
    }
    

    @Override
    public Boolean deleteReaction(Long id) {
        return this.reRepo.deleteReactionById(id);
    }

    @Override
    public List<ReactionDto> listReaction(PostDto p) {
        
        List<Reactions> res = reRepo.findAllPost(this.postRepo.findPostById(p.getId()));
        List<ReactionDto> reDtos = new ArrayList<>();
         
        res.forEach(r -> {
            ReactionDto reDto = this.reactionDto(r);
            reDtos.add(reDto);
        });
        return reDtos;
    }
    
    @Override
    public List<ReactionDto2> listReaction2(Posts p) {
        
        List<Reactions> res = reRepo.findAllPost(p);
        List<ReactionDto2> reDtos = new ArrayList<>();
         
        res.forEach(r -> {
            ReactionDto2 reDto2 = this.reactionDto2(r);
            reDtos.add(reDto2);
        });
        return reDtos;
    }
    
    
}
