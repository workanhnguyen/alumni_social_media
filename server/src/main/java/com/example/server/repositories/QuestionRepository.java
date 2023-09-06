package com.example.server.repositories;

import com.example.server.pojos.Majors;
import com.example.server.pojos.Questions;
import com.example.server.pojos.Surveys;

import java.util.List;

public interface QuestionRepository {
    Questions addQuestion(Questions sv);
}
