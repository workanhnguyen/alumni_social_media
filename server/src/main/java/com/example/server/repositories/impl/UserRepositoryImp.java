package com.example.server.repositories.impl;

import com.example.server.pojos.Users;
import com.example.server.repositories.UserRepository;
import org.hibernate.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.orm.hibernate5.LocalSessionFactoryBean;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import org.hibernate.query.Query;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.List;

@Repository
@Transactional
public class UserRepositoryImp implements UserRepository {
    
    @Autowired
    private LocalSessionFactoryBean factory;
    @Autowired
    private BCryptPasswordEncoder passEncoder;
    
    @Override
    public Users addUser(Users user) {
        Session s = this.factory.getObject().getCurrentSession();
        s.save(user);

        return user;
    }

    @Override
    public boolean authUser(String username, String password) {
        Users  u = this.getUserByUsername(username);
        return this.passEncoder.matches(password, u.getPassword());
    }

    @Override
     public Users getUserByUsername(String username) {
        Session s = this.factory.getObject().getCurrentSession();
        Query q = s.createQuery("FROM Users WHERE username=:un");
        q.setParameter("un", username);

        return (Users) q.getSingleResult();
    }

    @Override
    public List<Users> getUsersByRole(String role) {
        Session s = this.factory.getObject().getCurrentSession();
        Query q = s.createQuery("FROM Users WHERE role=:r");
        q.setParameter("r", role);
        return q.getResultList();
    }

    @Override
    public List<Users> getAllUsers() {
        Session s = this.factory.getObject().getCurrentSession();
        Query q = s.createQuery("FROM Users WHERE role <> 'ADMIN'");
        return q.getResultList();
    }

    @Override
    public Users getUserById(Long userId) {
        Session s = this.factory.getObject().getCurrentSession();
        Query q = s.createQuery("FROM Users WHERE id=:userId");
        q.setParameter("userId", userId);
        return (Users) q.getSingleResult();
    }
}
