/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.example.server.services;


import com.example.server.dtos.GroupDto;
import com.example.server.dtos.GroupDto1;
import com.example.server.pojos.Groups;
import com.example.server.pojos.Users;

import java.util.List;
import java.util.Map;
import java.util.Set;

/**
 *
 * @author maidv
 */
public interface GroupService {
    Groups addGroup(Map<String, String> params, Users u);
    
    Groups editGroup(Map<String, String> params, Long grId);
    
    Boolean deleteGroup(Long id);
    
    Groups findGroupById(Long grId);
    
    
    Boolean addUserToGroup(Users user, Groups group);
    
    Boolean removeUserFromGroup(Groups gr, Users user);
    
    GroupDto getGroupMembers(Long groupId);
    List<GroupDto> getGroups(Map<String, String> params);
    Long countGroup();
    List<GroupDto1> getGroupByUser(Users u);
}
