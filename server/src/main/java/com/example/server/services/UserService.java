package com.example.server.services;

import com.example.server.dtos.UserDto;
import com.example.server.pojos.Users;

import java.util.List;
import java.util.Map;

import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.multipart.MultipartFile;

public interface UserService extends UserDetailsService {
    Users addUser(Map<String, String> params, MultipartFile avatar);
    Users getUserByUsername(String username);
    boolean authUser(String username, String password);
    boolean changePassword( Map<String, String> params, Users u);
    Boolean deleteUserById(Users u);
    // Van Anh
    List<Users> getUsersByRole(String role);
    List<Users> getIsActiveUser(boolean isActive);
    List<Users> getUsers(Map<String, String> params);
    Users getUserById(Long userId);
    Boolean addOrUpdateUser(Users u);
    UserDto updateAvatarUser( MultipartFile updateAvatar, Users u);
    UserDto updateBgUser( MultipartFile updateBg, Users u);
    UserDto userToUserDto(Users user);
    UserDto updateInfo( Map<String, String> params, Users u);
    Long countUser();
    Boolean checkTimeUser(Users u);
}
