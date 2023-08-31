/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.example.server.repositories.impl;

import com.example.server.pojos.Posts;
import com.example.server.pojos.Users;
import com.example.server.repositories.PostRepository;
import java.util.List;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;
import org.hibernate.Session;
import org.hibernate.query.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.orm.hibernate5.LocalSessionFactoryBean;
import org.springframework.stereotype.Repository;

/**
 *
 * @author maidv
 */
@Repository
@Transactional
public class PostRepositoryImp implements PostRepository {
    @Autowired
    private LocalSessionFactoryBean factory;
    
    @PersistenceContext
    private EntityManager entityManager;
    
    @Override
    public Posts addPost(Posts p) {
        Session s = this.factory.getObject().getCurrentSession();
        s.save(p);
        s.flush();
        return p;
    }
    
    @Override
    public Posts updatePost(Posts post) {
        Session s = this.factory.getObject().getCurrentSession();
        s.update(post);
        return post;
    }

    @Override
    public Boolean deletePost(Posts post) {
        Session s = this.factory.getObject().getCurrentSession();
        s.delete(post);
        return true;
    }
//
    @Override
    public Boolean lockPost(Posts post) {
        Session s = this.factory.getObject().getCurrentSession();
        s.update(post);
        return true;
    }

    @Override
    public Boolean unlockPost(Posts post) {
        Session s = this.factory.getObject().getCurrentSession();
        s.update(post);
        return true;
    }
//
    @Override
    public Posts findPostById(Long id) {
        Session s = this.factory.getObject().getCurrentSession();
        return s.get(Posts.class, id);
    }
//
//    @Override
//    public Post findPostByIdAndUserId(Long id, Long userId) {
//        Session s = this.factory.getObject().getCurrentSession();
//        Query q = s.createQuery("SELECT p FROM Post p WHERE p.userId=:userId and p.id=:id");
//        q.setParameter("userId", userId);
//        q.setParameter("id", id);
//        try {
//            return (Post) q.getSingleResult();
//        } catch (NoResultException e) {
//            return null;
//        }
//    }
//
    @Override
    public List<Posts> findAllPosts(int currentPage) {
        Session s = this.factory.getObject().getCurrentSession();
        int pageSize = 10;
        int startPosition = (currentPage - 1) * pageSize;
        Query q = s.createQuery("FROM Posts p ORDER BY p.createdAt desc");
        q.setFirstResult(startPosition);
        q.setMaxResults(pageSize);

        List<Posts> posts = q.getResultList();
    
        return posts;
    }
//
    @Override
    public List<Posts> findPostsByUserId(Users u) {
        Session s = this.factory.getObject().getCurrentSession();
        String queryString = "SELECT p FROM Posts p WHERE p.userId.id = :userId ORDER BY p.createdAt desc";
        Query q = s.createQuery(queryString);
        q.setParameter("userId", u.getId());

        List<Posts> posts = q.getResultList();
        return posts;
    }

    @Override
    public Long countPost() {
        return entityManager.createQuery("SELECT COUNT(p) FROM Posts p ", Long.class)
            .getSingleResult();    
    }

    @Override
    public Long countPost(Users u) {
        return entityManager.createQuery("SELECT COUNT(p) FROM Posts p WHERE p.userId.id = :userId " , Long.class)
        .setParameter("userId", u.getId())
        .getSingleResult();    
    }

    @Override
    public Long countCommentsByPostId(Long postId) {
        return entityManager.createQuery("SELECT COUNT(c) FROM Comments c WHERE c.postId.id = :postId " , Long.class)
        .setParameter("postId", postId)
        .getSingleResult();
    }
  
}
