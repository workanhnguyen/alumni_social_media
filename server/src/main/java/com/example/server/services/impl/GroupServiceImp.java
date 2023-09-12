package com.example.server.services.impl;

import com.example.server.dtos.CommentDto;
import com.example.server.dtos.GroupDto;
import com.example.server.dtos.GroupDto1;
import com.example.server.dtos.UserDto;
import com.example.server.pojos.Comments;
import com.example.server.pojos.Groups;
import com.example.server.pojos.Majors;
import com.example.server.pojos.Posts;
import com.example.server.pojos.Users;
import com.example.server.repositories.GroupRepository;

import com.example.server.services.GroupService;
import com.example.server.services.UserService;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.*;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;



@Service
public class GroupServiceImp implements GroupService {
    @Autowired
    private GroupRepository grRepo;
    
    @Autowired
    private UserService userService;

    @Override
    public Groups addGroup(Map<String, String> params, Users u) {
        LocalDateTime currentTime = LocalDateTime.now();
        Date currentDate = Date.from(currentTime.atZone(ZoneId.systemDefault()).toInstant());
        Groups gr = new Groups();
        gr.setCreatedAt(currentDate);
        gr.setGroupName(params.get("group_name"));
        gr.setCreatorId(u);
        
        return this.grRepo.addGroup(gr);  
    }

    @Override
    public Groups editGroup(Map<String, String> params, Long grId) {      
        LocalDateTime currentTime = LocalDateTime.now();
        Date currentDate = Date.from(currentTime.atZone(ZoneId.systemDefault()).toInstant());
        Groups gr = grRepo.findGroupById(grId);
        gr.setUpdatedAt(currentDate);
        gr.setGroupName(params.get("group_name"));
        gr.setCreatorId(gr.getCreatorId());
        
        return this.grRepo.updateGroup(gr);
    }

    @Override
    public Boolean deleteGroup(Long id) {
        Groups gr = this.grRepo.findGroupById(id);
        return this.grRepo.deleteGroup(gr);
    }

    @Override
    public Groups findGroupById(Long grId) {
        return this.grRepo.findGroupById(grId);
    }

    @Override
    public Boolean addUserToGroup(Users user, Groups group) {
        return grRepo.addUsertoGr(group, user);
    }

    @Override
    public Boolean removeUserFromGroup(Groups gr, Users user) {
        return grRepo.removeUserFromGroup(gr, user);
    }
    
    @Override
    public GroupDto getGroupMembers(Long groupId) {
        Groups group = grRepo.findGroupById(groupId);
        if (group != null) {
            
            GroupDto grDto = GroupDto.builder()
                    .id(group.getId())
                    .groupName(group.getGroupName())
                    .createdAt(group.getCreatedAt())
                    .updatedAt(group.getUpdatedAt())
                    .creatorId(userService.userToUserDto(group.getCreatorId()))
                    .usersSet(group.getUsersSet()
                            .stream()
                            .map(userService::userToUserDto) // Sử dụng mapper để chuyển đổi User thành UserDto
                            .collect(Collectors.toSet()))
                    .build();
            return grDto;
        } else {
            return null; 
        }
    }

    @Override
    public List<GroupDto> getGroups(Map<String, String> params) {
        List<Groups> groups = grRepo.getGroups(params);

        if (!groups.isEmpty()) {
            List<GroupDto> groupDtos = new ArrayList<>();

            groups.forEach(g -> {
                GroupDto grDto = GroupDto.builder()
                        .id(g.getId())
                        .groupName(g.getGroupName())
                        .createdAt(g.getCreatedAt())
                        .updatedAt(g.getUpdatedAt())
                        .creatorId(userService.userToUserDto(g.getCreatorId()))
                        .usersSet(g.getUsersSet()
                                .stream()
                                .map(userService::userToUserDto) // Sử dụng mapper để chuyển đổi User thành UserDto
                                .collect(Collectors.toSet()))
                        .build();
                groupDtos.add(grDto);
            });

            return groupDtos;
        }
        return new ArrayList<>();
    }

    @Override
    public Long countGroup() {
        return grRepo.countGroup();
    }

    @Override
    public List<GroupDto1> getGroupByUser(Users u) {
        List<Groups> groups = new ArrayList<> ();
        groups = grRepo.getGroupByUser(u);
        if (!groups.isEmpty()) {
            List<GroupDto1> groupDto1 = new ArrayList<>();

            groups.forEach(g -> {
                GroupDto1 grDto1 = GroupDto1.builder()
                        .id(g.getId())
                        .groupName(g.getGroupName())
                        .createdAt(g.getCreatedAt())
                        .updatedAt(g.getUpdatedAt())
                        .creatorId(userService.userToUserDto(g.getCreatorId()))
                        .build();
                groupDto1.add(grDto1);
            });

            return groupDto1;
        }
        return new ArrayList<>();
    }
}
