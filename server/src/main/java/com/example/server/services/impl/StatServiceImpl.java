package com.example.server.services.impl;

import com.example.server.pojos.Majors;
import com.example.server.repositories.MajorRepository;
import com.example.server.repositories.StatRepository;
import com.example.server.services.MajorService;
import com.example.server.services.StatService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.util.ArrayList;
import java.util.HashMap;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class StatServiceImpl implements StatService {
    @Autowired
    private StatRepository statRepository;

    @Override
    public List<Map<String, Object>> statUsersByYear(Long startYear, Long endYear) {
        List<Object[]> result = statRepository.statUsersByYear(startYear, endYear);

        // Tạo danh sách kết quả JSON
        List<Map<String, Object>> jsonResult = new ArrayList<>();

        // Tạo một bản đồ cho mỗi năm từ startYear đến endYear
        for (Long year = startYear; year <= endYear; year++) {
            Map<String, Object> yearData = new HashMap<>();
            yearData.put("year", year);
            yearData.put("quantityOfUser", 0); 

            for (Object[] row : result) {
                Long createdYear = ((Number) row[0]).longValue();
                Long userCount = ((Number) row[1]).longValue();
                if (createdYear.equals(year)) {
                    yearData.put("quantityOfUser", userCount);
                    break;
                }
            }

            jsonResult.add(yearData);
        }

        return jsonResult;
    }

    @Override
    public List<Map<String, Object>> statPostsByYear(Long startYear, Long endYear) {
        List<Object[]> result = statRepository.statPostsByYear(startYear, endYear);

        // Tạo danh sách kết quả JSON
        List<Map<String, Object>> jsonResult = new ArrayList<>();

        // Tạo một bản đồ cho mỗi năm từ startYear đến endYear
        for (Long year = startYear; year <= endYear; year++) {
            Map<String, Object> yearData = new HashMap<>();
            yearData.put("year", year);
            yearData.put("quantityOfPost", 0); 

            for (Object[] row : result) {
                Long createdYear = ((Number) row[0]).longValue();
                Long postCount = ((Number) row[1]).longValue();
                if (createdYear.equals(year)) {
                    yearData.put("quantityOfPost", postCount);
                    break;
                }
            }

            jsonResult.add(yearData);
        }

        return jsonResult;
    }

   @Override
    public List<Map<String, Object>> statUsersByMonth(Long year) {
        List<Object[]> result = statRepository.statUsersByMonth(year);

        // Tạo danh sách kết quả JSON
        List<Map<String, Object>> jsonResult = new ArrayList<>();

        // Tạo một bản đồ cho mỗi tháng từ 1 đến 12
        for (Integer month = 1; month <= 12; month++) {
            Map<String, Object> monthData = new HashMap<>();
            monthData.put("month", month);
            monthData.put("quantityOfUser", 0); 

            for (Object[] row : result) {
                Integer createdMonth = ((Number) row[0]).intValue();
                Long userCount = ((Number) row[1]).longValue();
                if (createdMonth == month) {
                    monthData.put("quantityOfUser", userCount);
                    break;
                }
            }

            jsonResult.add(monthData);
        }

        return jsonResult;
    }

    @Override
    public List<Map<String, Object>> statPostsByMonth(Long year) {
        List<Object[]> result = statRepository.statPostsByMonth(year);

        List<Map<String, Object>> jsonResult = new ArrayList<>();

        for (Integer month = 1; month <= 12; month++) {
            Map<String, Object> monthData = new HashMap<>();
            monthData.put("month", month);
            monthData.put("quantityOfPost", 0); 

            for (Object[] row : result) {
                Integer createdMonth = ((Number) row[0]).intValue();
                Long postCount = ((Number) row[1]).longValue();
                if (createdMonth == month) {
                    monthData.put("quantityOfPost", postCount);
                    break;
                }
            }

            jsonResult.add(monthData);
        }

        return jsonResult;
    }

    @Override
    public List<Map<String, Object>> statPostsByQuater(Long year, Long quaTer) {
        List<Object[]> result = statRepository.statPostsByMonth(year);
        int startMonth;
        int endMonth;
        List<Map<String, Object>> jsonResult = new ArrayList<>();
        if (quaTer == 1) {
            startMonth = 1;
            endMonth = 3;
        } else if (quaTer == 2) {
            startMonth = 4;
            endMonth = 6;
        } else if (quaTer == 3) {
            startMonth = 7;
            endMonth = 9;
        } else {
            startMonth = 10;
            endMonth = 12;
        }
            
        
        for (Integer month = startMonth; month <= endMonth; month++) {
            Map<String, Object> monthData = new HashMap<>();
            monthData.put("month", month);
            monthData.put("quantityOfPost", 0); 

            for (Object[] row : result) {
                Integer createdMonth = ((Number) row[0]).intValue();
                Long postCount = ((Number) row[1]).longValue();
                if (createdMonth == month) {
                    monthData.put("quantityOfPost", postCount);
                    break;
                }
            }

            jsonResult.add(monthData);
        }

        return jsonResult;
    }

    @Override
    public List<Map<String, Object>> statUsersByQuater(Long year, Long quaTer) {
        List<Object[]> result = statRepository.statUsersByMonth(year);

        List<Map<String, Object>> jsonResult = new ArrayList<>();
        
        int startMonth;
        int endMonth;
        
        if (quaTer == 1) {
            startMonth = 1;
            endMonth = 3;
        } else if (quaTer == 2) {
            startMonth = 4;
            endMonth = 6;
        } else if (quaTer == 3) {
            startMonth = 7;
            endMonth = 9;
        } else {
            startMonth = 10;
            endMonth = 12;
        }

        for (Integer month = startMonth; month <= endMonth; month++) {
            Map<String, Object> monthData = new HashMap<>();
            monthData.put("month", month);
            monthData.put("quantityOfUser", 0); 

            for (Object[] row : result) {
                Integer createdMonth = ((Number) row[0]).intValue();
                Long userCount = ((Number) row[1]).longValue();
                if (createdMonth == month) {
                    monthData.put("quantityOfUser", userCount);
                    break;
                }
            }

            jsonResult.add(monthData);
        }

        return jsonResult;
    }
    
}
