package com.example.server.repositories;

import com.example.server.pojos.Users;
import java.util.Map;

public interface UserRepository {
    Users addUser(Users user);
    boolean authUser(String username, String password);
    Users getUserByUsername(String username);
}
