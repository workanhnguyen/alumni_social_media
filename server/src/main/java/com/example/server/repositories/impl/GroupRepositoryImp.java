/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.example.server.repositories.impl;

import com.example.server.repositories.*;
import com.example.server.pojos.Groups;
import com.example.server.pojos.Users;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
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
public class GroupRepositoryImp implements GroupRepository{
    @Autowired
    private LocalSessionFactoryBean factory;
    
    @PersistenceContext
    private EntityManager entityManager;
    
    
    @Override
    public Groups addGroup(Groups gr) {
        Session s = this.factory.getObject().getCurrentSession();
        s.save(gr);
        return gr;   
    }

    @Override
    public Groups updateGroup(Groups gr) {
        Session s = this.factory.getObject().getCurrentSession();
        s.update(gr);
        return gr;    
    }

    @Override
    public Groups findGroupById(Long id) {
        Session s = this.factory.getObject().getCurrentSession();
        return s.get(Groups.class, id);   
    }

    @Override
    public Boolean deleteGroup(Groups gr) {
        Session s = this.factory.getObject().getCurrentSession();
        s.delete(gr);
        return true;    
    }

    @Override
    public Boolean addUsertoGr(Groups gr, Users user) { 
        gr.getUsersSet().add(user);
        this.entityManager.merge(gr);
        return true;
        
    }

    @Override
    public Boolean removeUserFromGroup(Groups gr, Users user) {
        gr.getUsersSet().remove(user); 
        entityManager.merge(gr);
        return true;
    }

    @Override
    public Set<Users> getGroupMembers(Long groupId) {
        List<Groups> groups = new ArrayList<>();
        for (Groups group : groups) {
            if (group.getId().equals(groupId)) {
                return group.getUsersSet();
            }
        }
        return new HashSet<>(); 
       }
}
