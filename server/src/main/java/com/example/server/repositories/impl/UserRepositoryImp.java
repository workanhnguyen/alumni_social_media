package com.example.server.repositories.impl;

import com.example.server.pojos.Users;
import com.example.server.repositories.UserRepository;
import org.hibernate.HibernateException;
import org.hibernate.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.orm.hibernate5.LocalSessionFactoryBean;
import org.springframework.stereotype.Repository;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import javax.transaction.Transactional;
import org.hibernate.query.Query;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import javax.persistence.NoResultException;

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
        Users u = this.getUserByUsername(username);
        if (u != null) {
            return this.passEncoder.matches(password, u.getPassword());
        } else {
            return false;
        }
    }

    @Override
    public Users getUserByUsername(String username) {
        Session s = this.factory.getObject().getCurrentSession();
        Query q = s.createQuery("FROM Users WHERE username=:un");
        q.setParameter("un", username);

        try {
            return (Users) q.getSingleResult();
        } catch (NoResultException e) {
            return null;
        }
    }

    @Override
    public List<Users> getUsersByRole(String role) {
        Session s = this.factory.getObject().getCurrentSession();
        Query q = s.createQuery("FROM Users WHERE role=:r");
        q.setParameter("r", role);
        return q.getResultList();
    }

    @Override
    public List<Users> getIsActiveUser(boolean isActive) {
        Session s = this.factory.getObject().getCurrentSession();
        Query q = s.createQuery("FROM Users WHERE isActive=:a");
        q.setParameter("a", isActive);
        return q.getResultList();
    }

    @Override
    public List<Users> getUsers(Map<String, String> params) {
        Session s = this.factory.getObject().getCurrentSession();
        CriteriaBuilder b = s.getCriteriaBuilder();
        CriteriaQuery<Users> q = b.createQuery(Users.class);
        Root root = q.from(Users.class);
        q.select(root);

        if (params != null) {
            List<Predicate> predicates = new ArrayList<>();

            String role = params.get("role");
            if (role != null && !role.isEmpty()) {
                predicates.add(b.like(root.get("role"), String.format("%%%s%%", role)));
            } else {
                predicates.add(b.notLike(root.get("role"), String.format("%%%s%%", "ADMIN")));
            }
            String isActive = params.get("active");
            if (isActive != null && !isActive.isEmpty()) {
                predicates.add(b.equal(root.get("isActive"), Boolean.parseBoolean(isActive)));
            }
            String username = params.get("username");
            if (username != null && !username.isEmpty()) {
                predicates.add(b.like(root.get("username"), username));
            }

            q.where(predicates.toArray(Predicate[]::new));
        }

        q.orderBy(b.desc(root.get("id")));
        Query query = s.createQuery(q);

        return query.getResultList();
    }

    @Override
    public Users getUserById(Long userId) {
        Session s = this.factory.getObject().getCurrentSession();
        Query q = s.createQuery("FROM Users WHERE id=:userId");
        q.setParameter("userId", userId);
        return (Users) q.getSingleResult();
    }

    @Override
    public Boolean addOrUpdateUser(Users u) {
        Session s = this.factory.getObject().getCurrentSession();
        try {
            if (u.getId() == null) {
                s.save(u);
            } else {
                s.update(u);
            }

            return true;
        } catch (HibernateException e) {
            e.printStackTrace();
            return false;
        }
    }

    @Override
    public Boolean deleteUserById(Long userId) {
        Session s = this.factory.getObject().getCurrentSession();
        Users u = this.getUserById(userId);

        if (u != null) {
            s.delete(u);
            return true;
        }

        return false;
    }
}
