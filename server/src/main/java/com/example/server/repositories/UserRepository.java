package com.example.server.repositories;

import com.example.server.pojos.Users;

import java.util.List;
import java.util.Map;

public interface UserRepository {
    Users addUser(Users user);
    boolean authUser(String username, String password);
    Users getUserByUsername(String username);

    // Van Anh
    List<Users> getUsersByRole(String role);
    List<Users> getAllUsers();
    Users getUserById(Long userId);
    Boolean addOrUpdateUser(Users u);
}
