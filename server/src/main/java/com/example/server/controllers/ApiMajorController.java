package com.example.server.controllers;

import com.example.server.pojos.Majors;
import com.example.server.services.MajorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/majors")
public class ApiMajorController {
    @Autowired
    private MajorService majorService;

    @GetMapping
    @CrossOrigin
    public ResponseEntity<List<Majors>> getMajorsByDepartment(@RequestParam(value = "departmentId") Integer departmentId) {
        List<Majors> majors = majorService.getMajorsByDepartmentId(departmentId);
        return ResponseEntity.ok(majors);
    }
}
