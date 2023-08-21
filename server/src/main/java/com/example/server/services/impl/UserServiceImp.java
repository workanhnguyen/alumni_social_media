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
import java.util.HashSet;
import java.util.Map;
import java.util.Set;
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
    
    @Override
    public Users addUser(Map<String, String> params, MultipartFile avatar) {
        Users u = new Users();
        u.setEmail(params.get("email"));
        u.setFirstName(params.get("firstName"));
        u.setLastName(params.get("lastName"));
        u.setUsername(params.get("username"));
        
        u.setRole(params.get("role"));
        String role = params.get("role");
        if ("2".equals(role)) {
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
        return this.userRepo.authUser(username, password);
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
}
