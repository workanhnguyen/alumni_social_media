package com.example.server.repositories.impl;

import com.example.server.pojos.Majors;
import com.example.server.repositories.MajorRepository;
import org.hibernate.Session;
import org.hibernate.query.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.orm.hibernate5.LocalSessionFactoryBean;
import org.springframework.stereotype.Repository;

import javax.persistence.NoResultException;
import javax.transaction.Transactional;
import java.util.List;

@Repository
@Transactional
public class MajorRepositoryImpl implements MajorRepository {
    @Autowired
    private LocalSessionFactoryBean factory;
    @Override
    public List<Majors> getAllMajors() {
        Session s = this.factory.getObject().getCurrentSession();
        Query q = s.createQuery("FROM Majors");
        return q.getResultList();
    }

    @Override
    public List<Majors> getMajorsByDepartmentId(Integer departmentId) {
        Session s = this.factory.getObject().getCurrentSession();
        Query q = s.createQuery("FROM Majors WHERE departmentId.id=:departmentId");
        q.setParameter("departmentId", departmentId);
        return q.getResultList();
    }

    @Override
    public Majors getMajorById(Long majorId) {
        Session s = this.factory.getObject().getCurrentSession();
        Query q = s.createQuery("FROM Majors WHERE id=:majorId");
        q.setParameter("majorId", majorId);

        try {
            return (Majors) q.getSingleResult();
        } catch (NoResultException e) {
            return null;
        }
    }
}
