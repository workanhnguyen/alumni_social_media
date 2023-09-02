package com.example.server.services.impl;

import com.example.server.dtos.CommentDto;
import com.example.server.dtos.GroupDto;
import com.example.server.dtos.UserDto;
import com.example.server.pojos.Comments;
import com.example.server.pojos.Groups;
import com.example.server.pojos.Majors;
import com.example.server.pojos.Posts;
import com.example.server.pojos.Users;
import com.example.server.repositories.GroupRepository;

import com.example.server.services.GroupService;
import com.example.server.services.UserService;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Date;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;
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
    
  
    
}
