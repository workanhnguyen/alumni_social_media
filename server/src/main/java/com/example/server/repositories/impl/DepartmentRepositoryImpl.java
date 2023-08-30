package com.example.server.repositories.impl;

import com.example.server.pojos.Departments;
import com.example.server.pojos.Users;
import com.example.server.repositories.DepartmentRepository;
import org.hibernate.Session;
import org.hibernate.query.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.orm.hibernate5.LocalSessionFactoryBean;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;

@Repository
@Transactional
public class DepartmentRepositoryImpl implements DepartmentRepository {
    @Autowired
    private LocalSessionFactoryBean factory;
    @Override
    public List<Departments> getAllDepartments() {
        Session s = this.factory.getObject().getCurrentSession();
        Query q = s.createQuery("FROM Departments");
        return q.getResultList();
    }
}
