package com.example.server.services;

import com.example.server.pojos.Users;
import java.util.Map;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.multipart.MultipartFile;

public interface UserService extends UserDetailsService {
    Users addUser(Map<String, String> params, MultipartFile avatar);
    Users getUserByUsername(String username);
    boolean authUser(String username, String password);
    
}
