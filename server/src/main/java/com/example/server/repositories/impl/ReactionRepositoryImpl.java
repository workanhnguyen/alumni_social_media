package com.example.server.repositories.impl;

import com.example.server.dtos.ReactionDto;
import com.example.server.pojos.Groups;
import com.example.server.pojos.Majors;
import com.example.server.pojos.Posts;
import com.example.server.pojos.Reactions;
import com.example.server.repositories.MajorRepository;
import com.example.server.repositories.ReactionRepository;
import org.hibernate.Session;
import org.hibernate.query.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.orm.hibernate5.LocalSessionFactoryBean;
import org.springframework.stereotype.Repository;

import javax.persistence.NoResultException;
import javax.transaction.Transactional;
import java.util.List;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

@Repository
@Transactional
public class ReactionRepositoryImpl implements ReactionRepository {
    @Autowired
    private LocalSessionFactoryBean factory;
    
    @PersistenceContext
    private EntityManager entityManager;
    
    
    @Override
    public Reactions addReaction(Reactions re) {
        Session s = this.factory.getObject().getCurrentSession();
        s.save(re);
        return re;   
    }
    
    @Override
    public Boolean deleteReactionById(Long reactionId) {
    Session s = this.factory.getObject().getCurrentSession();
    Reactions reactionToDelete = s.get(Reactions.class, reactionId);
    
    if (reactionToDelete != null) {
        s.delete(reactionToDelete);
        return true;
    }
    
    return false;
    }

    @Override
    public List<Reactions> findAllPost(Posts p) {
        Session s = this.factory.getObject().getCurrentSession();
        String queryString = "FROM Reactions r WHERE r.postId = :postId";
        Query q = s.createQuery(queryString);
        q.setParameter("postId", p);
        List<Reactions> res = q.getResultList();

        return res;
    }

    @Override
    public Reactions findReactionByUserIdAndPostId(Long userId, Long postId) {
        Session s = this.factory.getObject().getCurrentSession();
        String queryString = "FROM Reactions r WHERE r.postId.id = :postId AND r.userId.id = :userId";

        Query q = s.createQuery(queryString);
        q.setParameter("postId", postId);
        q.setParameter("userId", userId);
        try {
            Reactions re = (Reactions) q.getSingleResult();
            return re;
        } catch (NoResultException e) {
            return null;
        }
    }
}

