/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.example.server.services;


import com.example.server.dtos.GroupDto;
import com.example.server.pojos.Groups;
import com.example.server.pojos.Letters;
import com.example.server.pojos.Users;

import java.util.List;
import java.util.Map;
import java.util.Set;

/**
 *
 * @author maidv
 */
public interface LetterService {
    Letters addLetter(Map<String, String> params, Users u);
    
    Boolean deleteLetter(Long id);
    
    Letters findLetterById(Long grId);
    Boolean addUserToLetter(Users user, Letters l);
    
    Boolean removeUserFromLetter(Letters l, Users user);
    

}
