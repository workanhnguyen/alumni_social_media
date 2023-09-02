package com.example.server.services.impl;

import com.example.server.pojos.Majors;
import com.example.server.repositories.MajorRepository;
import com.example.server.services.MajorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MajorServiceImpl implements MajorService {
    @Autowired
    private MajorRepository majorRepository;
    @Override
    public List<Majors> getAllMajors() {
        return majorRepository.getAllMajors();
    }

    @Override
    public List<Majors> getMajorsByDepartmentId(Integer departmentId) {
        return majorRepository.getMajorsByDepartmentId(departmentId);
    }

    @Override
    public Majors getMajorById(Long majorId) {
        return majorRepository.getMajorById(majorId);
    }
}
