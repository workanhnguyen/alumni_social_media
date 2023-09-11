/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.example.server.repositories;

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
public interface LetterRepository {
    Letters addLetter(Letters l); 
    Letters updateLetter(Letters l); 
    Boolean deleteLetter(Letters l);
    Boolean addUsertoLetter(Letters l, Users user);
    Boolean removeUserFromLetter(Letters l, Users user);
    Letters findLetterById(Long id);
    List<Letters> getLetterByUser(Users u);
    
}
