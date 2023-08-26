/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.example.server.repositories.impl;

import com.example.server.pojos.Posts;
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
public class PostRepositoryImp implements PostRepository {
    @Autowired
    private LocalSessionFactoryBean factory;
    @Override
    public Posts addPost(Posts p) {
        Session s = this.factory.getObject().getCurrentSession();
        s.save(p);
        return p;
    }
    
}
