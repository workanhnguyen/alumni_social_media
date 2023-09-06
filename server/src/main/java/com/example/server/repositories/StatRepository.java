/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.example.server.repositories;

import java.util.List;

/**
 *
 * @author maidv
 */
public interface StatRepository {
    List<Object[]> statUsersByYear(Long startYear, Long endYear);
    List<Object[]> statPostsByYear(Long startYear, Long endYear);
    List<Object[]> statUsersByMonth(Long year);
    List<Object[]> statPostsByMonth(Long year);
}
