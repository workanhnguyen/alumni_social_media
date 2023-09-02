/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.example.server.controllers;

import com.example.server.pojos.Departments;
import com.example.server.pojos.Majors;
import com.example.server.services.DepartmentService;
import com.example.server.services.MajorService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 *
 * @author maidv
 */
@RestController
@RequestMapping("/api/departments")
public class ApiDepartmentController {
    @Autowired
    private DepartmentService departmentService;
    
    @GetMapping("/")
    @CrossOrigin
    public ResponseEntity<List<Departments>> getAllDepartment() {
        List<Departments> listDepartments = departmentService.getAllDepartments();
        return ResponseEntity.ok(listDepartments);
    }
}
