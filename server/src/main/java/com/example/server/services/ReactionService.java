package com.example.server.services;

import com.example.server.dtos.PostDto;
import com.example.server.dtos.ReactionDto;
import com.example.server.pojos.Majors;
import com.example.server.pojos.Posts;
import com.example.server.pojos.Reactions;
import com.example.server.pojos.Users;

import java.util.List;
import java.util.Map;

public interface ReactionService {
    ReactionDto addReaction(Map<String, String> params, Users u, PostDto p);
    Boolean deleteReaction(Long id);
    ReactionDto reactionDto(Reactions re);
    List<ReactionDto> listReaction (PostDto p);
}
