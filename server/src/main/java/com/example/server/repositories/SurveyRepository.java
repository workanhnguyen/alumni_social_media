package com.example.server.repositories;

import com.example.server.pojos.Majors;
import com.example.server.pojos.Surveys;

import java.util.List;

public interface SurveyRepository {
    Surveys addSurvey(Surveys sv);
}
