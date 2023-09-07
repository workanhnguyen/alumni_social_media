package com.example.server.repositories;

import com.example.server.dtos.ReactionDto;
import com.example.server.pojos.Majors;
import com.example.server.pojos.Posts;
import com.example.server.pojos.Reactions;

import java.util.List;

public interface ReactionRepository {
    Reactions addReaction(Reactions re);
    Boolean deleteReactionById(Long reactionId);
    List<Reactions> findAllPost(Posts p);
    Reactions findReactionByUserIdAndPostId (Long userId, Long postId);
}
