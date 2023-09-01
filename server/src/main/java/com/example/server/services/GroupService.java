/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.example.server.services;


import com.example.server.pojos.Groups;
import com.example.server.pojos.Users;
import java.util.Map;

/**
 *
 * @author maidv
 */
public interface GroupService {
    Groups addGroup(Map<String, String> params, Users u);
    
    Groups editGroup(Map<String, String> params, Long grId);
    
    Boolean deleteGroup(Long id);
}
