package com.example.server.services.impl;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.example.server.pojos.Users;
import com.example.server.repositories.UserRepository;
import com.example.server.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.*;
import java.util.logging.Level;
import java.util.logging.Logger;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

@Service
public class UserServiceImp implements UserService {

    @Autowired
    private UserRepository userRepo;
    @Autowired
    private BCryptPasswordEncoder passwordEncoder;
    @Autowired
    private Cloudinary cloudinary;
    
    LocalDateTime currentTime = LocalDateTime.now();
    Date currentDate = Date.from(currentTime.atZone(ZoneId.systemDefault()).toInstant());
    
    @Override
    public Users addUser(Map<String, String> params, MultipartFile avatar) {
        Users u = new Users();
        u.setEmail(params.get("email"));
        u.setFirstName(params.get("firstName"));
        u.setLastName(params.get("lastName"));
        u.setUsername(params.get("username"));
        u.setIsActive(false);
        u.setCreatedAt(this.currentDate);
        u.setRole(params.get("role"));
        String role = params.get("role");
        if ("ALUMNI".equals(role)) {
            u.setStudentId(params.get("studentId")); 
            u.setPassword(this.passwordEncoder.encode(params.get("password")));
        } else {
            u.setPassword(this.passwordEncoder.encode("Abc@123"));
        }
        if (!avatar.isEmpty()) {
            try {
                Map res = this.cloudinary.uploader().upload(avatar.getBytes(),
                        ObjectUtils.asMap("resource_type", "auto"));
                u.setAvatar(res.get("secure_url").toString());
            } catch (IOException ex) {
                Logger.getLogger(UserServiceImp.class.getName()).log(Level.SEVERE, null, ex);
            }
        }

        this.userRepo.addUser(u);
        return u;
    }
    
    @Override
    public Users getUserByUsername(String username) {
        return this.userRepo.getUserByUsername(username);
    }
    
    @Override
    public boolean authUser(String username, String password) {
        Users u = this.userRepo.getUserByUsername(username);
        Boolean check = isCreatedAtWithin24Hours(u.getCreatedAt());
        if (this.userRepo.authUser(username, password))
            return true;

        return false;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Users u = this.userRepo.getUserByUsername(username);
        if (u == null) {
            throw new UsernameNotFoundException("Invalid");
        }
        Set<GrantedAuthority> authorities = new HashSet<>();
        authorities.add(new SimpleGrantedAuthority(u.getRole()));
        return new org.springframework.security.core.userdetails.User(
                u.getUsername(), u.getPassword(), authorities);
    }

    @Override
    public boolean changePassword(String password, String newPassword, Users u) {
        password = this.passwordEncoder.encode(password);
        if( passwordEncoder.matches(password, u.getPassword()))
        {
            u.setPassword(this.passwordEncoder.encode(newPassword));
            u.setUpdatedAt(this.currentDate);
            return true;
        }
        return false;
    }

    @Override
    public List<Users> getUsersByRole(String role) {
        return userRepo.getUsersByRole(role);
    }

    @Override
    public List<Users> getAllUsers() {
        return userRepo.getAllUsers();
    }

    @Override
    public Users getUserById(Long userId) {
        return userRepo.getUserById(userId);
    }

    private boolean isCreatedAtWithin24Hours(Date createdAt) {
        Date now = new Date();
        long timeDifferenceInMillis = now.getTime() - createdAt.getTime();
        long twentyFourHoursInMillis = 24 * 60 * 60 * 1000; // 24 giờ * 60 phút * 60 giây * 1000 milliseconds

        return timeDifferenceInMillis <= twentyFourHoursInMillis;
    }
}
