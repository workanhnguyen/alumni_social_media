package com.example.server.services;

import com.example.server.pojos.Users;

import java.util.List;
import java.util.Map;

import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.multipart.MultipartFile;

public interface UserService extends UserDetailsService {
    Users addUser(Map<String, String> params, MultipartFile avatar);
    Users getUserByUsername(String username);
    boolean authUser(String username, String password);
    boolean changePassword(String password, String newPassword, Users u);

    // Van Anh
    List<Users> getUsersByRole(String role);
    List<Users> getIsActiveUser(boolean isActive);
    List<Users> getUsers(Map<String, String> params);
    Users getUserById(Long userId);
    Boolean addOrUpdateUser(Users u);
    Boolean deleteUserById(Long userId);
}
