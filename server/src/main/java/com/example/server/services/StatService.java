package com.example.server.services;

import com.example.server.pojos.Majors;

import java.util.List;
import java.util.Map;

public interface StatService {
    List<Map<String, Object>> statUsersByYear(Long startYear, Long endYear);
    List<Map<String, Object>> statPostsByYear(Long startYear, Long endYear);
    List<Map<String, Object>> statUsersByMonth(Long year);
    List<Map<String, Object>> statPostsByMonth(Long year);
}
