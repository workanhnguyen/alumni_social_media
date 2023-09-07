/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.example.server.controllers;

import com.example.server.pojos.Users;
import com.example.server.services.StatService;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author maidv
 */

@RestController
@RequestMapping("/api/stats")
public class ApiStatController {
    @Autowired
    private StatService statService;
    
    @GetMapping("/users/{start_year}/to/{end_year}")
    @CrossOrigin
    public ResponseEntity<List<Map<String, Object>>> statUsersByYear( @PathVariable("start_year") Long startYear,
    @PathVariable("end_year") Long endYear) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            if (authentication != null && authentication.getAuthorities().stream().anyMatch(role -> role.getAuthority().equals("ROLE_ADMIN"))) {
            List<Map<String, Object>> jsonResult = statService.statUsersByYear(startYear, endYear);
            return ResponseEntity.ok(jsonResult);
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }
    
    @GetMapping("/posts/{start_year}/to/{end_year}")
    @CrossOrigin
    public ResponseEntity<List<Map<String, Object>>> statPostsByYear( @PathVariable("start_year") Long startYear,
    @PathVariable("end_year") Long endYear) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            if (authentication != null && authentication.getAuthorities().stream().anyMatch(role -> role.getAuthority().equals("ROLE_ADMIN"))) {
                List<Map<String, Object>> jsonResult = statService.statPostsByYear(startYear, endYear);
            return ResponseEntity.ok(jsonResult);
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }
    
    @GetMapping("/users/{year}")
    @CrossOrigin
    public ResponseEntity<List<Map<String, Object>>> statUsersByMonth( @PathVariable("year") Long year) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            if (authentication != null && authentication.getAuthorities().stream().anyMatch(role -> role.getAuthority().equals("ROLE_ADMIN"))) {
            List<Map<String, Object>> jsonResult = statService.statUsersByMonth(year);
            return ResponseEntity.ok(jsonResult);
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }
    
    @GetMapping("/posts/{year}")
    @CrossOrigin
    public ResponseEntity<List<Map<String, Object>>> statPostsByMonth( @PathVariable("year") Long year) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            if (authentication != null && authentication.getAuthorities().stream().anyMatch(role -> role.getAuthority().equals("ROLE_ADMIN"))) {
            List<Map<String, Object>> jsonResult = statService.statPostsByMonth(year);
            return ResponseEntity.ok(jsonResult);
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }
    
    @GetMapping("/posts/{year}/month/{quater}")
    @CrossOrigin
    public ResponseEntity<List<Map<String, Object>>> statPostsByQuater( @PathVariable("year") Long year,
            @PathVariable("quater") Long quater) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            if (authentication != null && authentication.getAuthorities().stream().anyMatch(role -> role.getAuthority().equals("ROLE_ADMIN"))) {
            List<Map<String, Object>> jsonResult = statService.statPostsByQuater(year,quater);
            return ResponseEntity.ok(jsonResult);
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }
    
    @GetMapping("/users/{year}/month/{quater}")
    @CrossOrigin
    public ResponseEntity<List<Map<String, Object>>> statUsersByQuater( @PathVariable("year") Long year,
            @PathVariable("quater") Long quater) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            if (authentication != null && authentication.getAuthorities().stream().anyMatch(role -> role.getAuthority().equals("ROLE_ADMIN"))) {
            List<Map<String, Object>> jsonResult = statService.statUsersByQuater(year,quater);
            return ResponseEntity.ok(jsonResult);
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }
}
