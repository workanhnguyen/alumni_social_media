package com.example.server.repositories;

import com.example.server.pojos.Majors;

import java.util.List;

public interface MajorRepository {
    List<Majors> getAllMajors();
    List<Majors> getMajorsByDepartmentId(Integer departmentId);
    Majors getMajorById(Long majorId);
}
