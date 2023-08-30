package com.example.server.services;

import com.example.server.pojos.Majors;

import java.util.List;

public interface MajorService {
    List<Majors> getAllMajors();
    List<Majors> getMajorsByDepartmentId(Integer departmentId);
}
