package com.example.server.repositories.impl;

import com.example.server.pojos.Majors;
import com.example.server.pojos.Questions;
import com.example.server.pojos.Surveys;
import com.example.server.repositories.MajorRepository;
import com.example.server.repositories.QuestionRepository;
import com.example.server.repositories.SurveyRepository;
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
public class QuestionRepositoryImpl implements QuestionRepository {
    @Autowired
    private LocalSessionFactoryBean factory;

    @Override
    public Questions addQuestion(Questions q) {
        Session s = this.factory.getObject().getCurrentSession();
        s.save(q);
        s.flush();
        return q;
    }
    
}
