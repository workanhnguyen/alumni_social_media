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
public class GroupRepositoryImp implements GroupRepository{
    @Autowired
    private LocalSessionFactoryBean factory;
    @PersistenceContext
    private EntityManager entityManager;
    @Autowired
    private Environment env;
    @PersistenceUnit
    private EntityManagerFactory entityManagerFactory;

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

    @Override
    public List<Groups> getGroups(Map<String, String> params) {
        Session s = this.factory.getObject().getCurrentSession();
        CriteriaBuilder b = s.getCriteriaBuilder();
        CriteriaQuery<Groups> q = b.createQuery(Groups.class);
        Root<Groups> root = q.from(Groups.class);
        q.select(root);

        if (params != null) {
            List<Predicate> predicates = new ArrayList<>();

            String groupName = params.get("name");
            if (groupName != null && !groupName.isEmpty()) {
                predicates.add(b.like(root.get("groupName"), groupName));
            }

            q.where(predicates.toArray(Predicate[]::new));
            q.orderBy(b.desc(root.get("createdAt")));
        }

        Query query = s.createQuery(q);

        String page = params.get("page");
        if (page != null && !page.isEmpty()) {

            int p = Integer.parseInt(page);
            int pageSize = Integer.parseInt(this.env.getProperty("PAGE_SIZE"));

            query.setFirstResult((p - 1) * pageSize);
            query.setMaxResults(pageSize);
        }

        return query.getResultList();
    }

    @Override
    public Long countGroup() {
        return entityManager.createQuery("SELECT COUNT(g) FROM Groups g ", Long.class)
                .getSingleResult();
    }

    @Override
    public List<Groups> getGroupByUser(Users u) {
        SessionFactory sessionFactory = entityManagerFactory.unwrap(SessionFactory.class);
        Session session = sessionFactory.openSession();


        String sql = "SELECT g.id, g.group_name, g.created_at, g.updated_at, g.creator_id FROM groupsjv g " +
             "INNER JOIN group_member gm ON g.id = gm.group_id " +
             "WHERE gm.user_id = :userId";

        NativeQuery<Groups> q = session.createNativeQuery(sql, Groups.class);
        q.setParameter("userId", u.getId());
        List<Groups> groups = q.list();


        return groups;
    }
}
