package com.example.server.repositories;

import com.example.server.pojos.Departments;

import java.util.List;

public interface DepartmentRepository {
    List<Departments> getAllDepartments();
}
