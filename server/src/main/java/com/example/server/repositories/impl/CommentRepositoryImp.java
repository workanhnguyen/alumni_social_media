/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.example.server.repositories.impl;

import com.example.server.pojos.Comments;
import com.example.server.pojos.Posts;
import com.example.server.repositories.CommentRepository;
import com.example.server.repositories.PostRepository;
import javax.transaction.Transactional;
import org.hibernate.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.orm.hibernate5.LocalSessionFactoryBean;
import org.springframework.stereotype.Repository;

/**
 *
 * @author maidv
 */
@Repository
@Transactional
public class CommentRepositoryImp implements CommentRepository {

    @Autowired
    private LocalSessionFactoryBean factory;

    @Override
    public Comments addComment(Comments cmt) {
        Session s = this.factory.getObject().getCurrentSession();
        s.save(cmt);
        return cmt;
    }

    @Override
    public Comments findCommentById(Long id) {
        Session s = this.factory.getObject().getCurrentSession();
        return s.get(Comments.class, id);    }

    @Override
    public Comments updateComment(Comments cmt) {
        Session s = this.factory.getObject().getCurrentSession();
        s.update(cmt);
        return cmt;    
    }

    @Override
    public Boolean deleteComment(Comments cmt) {
        Session s = this.factory.getObject().getCurrentSession();
        s.delete(cmt);
        return true;    
    }
}
