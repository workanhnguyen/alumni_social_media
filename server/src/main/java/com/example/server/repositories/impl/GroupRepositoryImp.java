/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.example.server.repositories.impl;

import com.example.server.repositories.*;
import com.example.server.pojos.Groups;
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

}
