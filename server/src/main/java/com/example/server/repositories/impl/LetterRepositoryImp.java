/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.example.server.repositories.impl;

import com.example.server.pojos.Posts;
import com.example.server.repositories.*;
import com.example.server.pojos.Groups;
import com.example.server.pojos.Letters;
import com.example.server.pojos.Users;

import java.util.*;
import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.PersistenceContext;
import javax.persistence.PersistenceUnit;
import javax.persistence.criteria.*;
import javax.transaction.Transactional;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.query.NativeQuery;
import org.hibernate.query.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.orm.hibernate5.LocalSessionFactoryBean;
import org.springframework.stereotype.Repository;

/**
 *
 * @author maidv
 */
@Repository
@Transactional
public class LetterRepositoryImp implements LetterRepository{
    @Autowired
    private LocalSessionFactoryBean factory;
    @PersistenceContext
    private EntityManager entityManager;
    @Autowired
    private Environment env;
    @PersistenceUnit
    private EntityManagerFactory entityManagerFactory;
   

    @Override
    public Letters addLetter(Letters l) {
        Session s = this.factory.getObject().getCurrentSession();
        s.save(l);
        return l; 
    }

    @Override
    public Letters updateLetter(Letters l) {
        Session s = this.factory.getObject().getCurrentSession();
        s.update(l);
        return l; 
    }

    @Override
    public Boolean deleteLetter(Letters l) {
        Session s = this.factory.getObject().getCurrentSession();
        s.delete(l);
        return true;
    }

    @Override
    public Boolean addUsertoLetter(Letters l, Users user) {
        l.getUsersSet().add(user);
        this.entityManager.merge(l);
        return true;
    }

    @Override
    public Boolean removeUserFromLetter(Letters l, Users user) {
        l.getUsersSet().remove(user); 
        entityManager.merge(l);
        return true;
    }
    
    @Override
    public Letters findLetterById(Long id) {
        Session s = this.factory.getObject().getCurrentSession();
        return s.get(Letters.class, id);   
    }

    @Override
    public List<Object[]> getLetterByUser(Users u) {
        SessionFactory sessionFactory = entityManagerFactory.unwrap(SessionFactory.class);
        Session session = sessionFactory.openSession();

        String sql = "SELECT l.* FROM letters l " +
                "INNER JOIN user_letter ul ON l.letter_id = ul.letter_id " +
                "WHERE ul.user_id = :userId";

        NativeQuery<Object[]> query = session.createSQLQuery(sql);
        query.setParameter("userId", u);

        List<Object[]> result = query.list();
        return result;
    }
}
