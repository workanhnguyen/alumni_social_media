/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.example.server.repositories.impl;

import com.example.server.repositories.StatRepository;
import java.util.List;
import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.PersistenceContext;
import javax.persistence.PersistenceUnit;
import javax.transaction.Transactional;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.query.NativeQuery;
import org.springframework.stereotype.Repository;

/**
 *
 * @author maidv
 */
@Repository
@Transactional
public class StatRepositoryImp implements StatRepository{
    @PersistenceContext
    private EntityManager entityManager;
    
    @PersistenceUnit
    private EntityManagerFactory entityManagerFactory;
    
    @Override
    public List<Object[]> statUsersByYear(Long startYear, Long endYear) {
        SessionFactory sessionFactory = entityManagerFactory.unwrap(SessionFactory.class);
        Session session = sessionFactory.openSession();

        String sql = "SELECT EXTRACT(YEAR FROM created_at) AS createdYear, COUNT(*) AS userCount " +
                     "FROM users " +
                     "WHERE EXTRACT(YEAR FROM created_at) BETWEEN :startYear AND :endYear " +
                     "GROUP BY EXTRACT(YEAR FROM created_at) " +
                     "ORDER BY createdYear";

        NativeQuery<Object[]> query = session.createSQLQuery(sql);
        query.setParameter("startYear", startYear);
        query.setParameter("endYear", endYear);

        List<Object[]> result = query.list();
        return result;

    }

    @Override
    public List<Object[]> statPostsByYear(Long startYear, Long endYear ) {
        SessionFactory sessionFactory = entityManagerFactory.unwrap(SessionFactory.class);
        Session session = sessionFactory.openSession();

        String sql = "SELECT EXTRACT(YEAR FROM created_at) AS createdYear, COUNT(*) AS postCount " +
                     "FROM posts " +
                     "WHERE EXTRACT(YEAR FROM created_at) BETWEEN :startYear AND :endYear " +
                     "GROUP BY EXTRACT(YEAR FROM created_at) " +
                     "ORDER BY createdYear";

        NativeQuery<Object[]> query = session.createSQLQuery(sql);
        query.setParameter("startYear", startYear);
        query.setParameter("endYear", endYear);

        List<Object[]> result = query.list();
        return result;
    }
    
    @Override
    public List<Object[]> statUsersByMonth(Long year) {
        SessionFactory sessionFactory = entityManagerFactory.unwrap(SessionFactory.class);
        Session session = sessionFactory.openSession();

        String sql = "SELECT EXTRACT(MONTH FROM created_at) AS createdMonth, COUNT(*) AS userCount " +
                 "FROM users " +
                 "WHERE EXTRACT(YEAR FROM created_at) = :year " +
                 "GROUP BY EXTRACT(MONTH FROM created_at) " +
                 "ORDER BY createdMonth";

        NativeQuery<Object[]> query = session.createSQLQuery(sql);
        query.setParameter("year", year);

        List<Object[]> result = query.list();
        return result;
    }

    @Override
    public List<Object[]> statPostsByMonth(Long year) {
        SessionFactory sessionFactory = entityManagerFactory.unwrap(SessionFactory.class);
        Session session = sessionFactory.openSession();

        String sql = "SELECT EXTRACT(MONTH FROM created_at) AS createdMonth, COUNT(*) AS userCount " +
                 "FROM posts " +
                 "WHERE EXTRACT(YEAR FROM created_at) = :year " +
                 "GROUP BY EXTRACT(MONTH FROM created_at) " +
                 "ORDER BY createdMonth";

        NativeQuery<Object[]> query = session.createSQLQuery(sql);
        query.setParameter("year", year);

        List<Object[]> result = query.list();
        return result;
    }
}
