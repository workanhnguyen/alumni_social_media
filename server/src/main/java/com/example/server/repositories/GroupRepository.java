/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.example.server.repositories;

import com.example.server.pojos.Groups;
import com.example.server.pojos.Users;

import java.util.List;
import java.util.Map;
import java.util.Set;

/**
 *
 * @author maidv
 */
public interface GroupRepository {
    Groups addGroup(Groups gr);
    Groups updateGroup(Groups gr);
    Groups findGroupById(Long id);
    Boolean deleteGroup(Groups gr);
    Boolean addUsertoGr(Groups gr, Users user);
    Boolean removeUserFromGroup(Groups gr, Users user);
    Set<Users> getGroupMembers(Long groupId);
    List<Groups> getGroups(Map<String, String> params);
    Long countGroup();
    List<Groups> getGroupByUser(Users u);
}
