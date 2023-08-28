/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.example.server.repositories.impl;

import com.example.server.pojos.Images;
import com.example.server.pojos.Posts;
import com.example.server.repositories.ImageRepository;
import java.util.ArrayList;
import java.util.List;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
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
public class ImageRepositoryImp implements ImageRepository{
    
    @PersistenceContext
    private EntityManager entityManager;
    
    @Autowired
    private LocalSessionFactoryBean factory;
   
    @Override
    public Images addImage(Images image) {
        Session s = this.factory.getObject().getCurrentSession();
        s.save(image);
        return image;   
    }

    @Override
    public List<Images> findByPostId(Posts p) {
        TypedQuery<Images> query = this.entityManager.createQuery(
        "SELECT i FROM Images i WHERE i.postId = :post", Images.class);
    
        query.setParameter("post", p);
    
        return query.getResultList();
    }
    
}
