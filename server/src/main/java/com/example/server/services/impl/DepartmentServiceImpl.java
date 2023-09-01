package com.example.server.services.impl;

import com.example.server.pojos.Departments;
import com.example.server.repositories.DepartmentRepository;
import com.example.server.repositories.UserRepository;
import com.example.server.services.DepartmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DepartmentServiceImpl implements DepartmentService {

    @Autowired
    private DepartmentRepository departmentRepository;
    
    @Override
    public List<Departments> getAllDepartments() {
        return departmentRepository.getAllDepartments();
    }
}
