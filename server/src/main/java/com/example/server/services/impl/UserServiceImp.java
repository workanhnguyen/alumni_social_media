package com.example.server.services.impl;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.example.server.dtos.UserDto;
import com.example.server.pojos.Users;
import com.example.server.repositories.UserRepository;
import com.example.server.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetailsService;
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

    @Override
    public Users addUser(Map<String, String> params, MultipartFile avatar) {
        LocalDateTime currentTime = LocalDateTime.now();
        Date currentDate = Date.from(currentTime.atZone(ZoneId.systemDefault()).toInstant());
        Users u = new Users();
        u.setEmail(params.get("email"));
        u.setFirstName(params.get("firstName"));
        u.setLastName(params.get("lastName"));
        u.setUsername(params.get("username"));
        u.setIsActive(false);
        u.setCreatedAt(currentDate);
        u.setRole(params.get("role"));
        String role = params.get("role");
        if ("ROLE_ALUMNI".equals(role)) {
            u.setStudentId(params.get("studentId")); 
            u.setPassword(this.passwordEncoder.encode(params.get("password")));
        } else {
            u.setPassword(this.passwordEncoder.encode("ou@123"));
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
//        Users u = this.userRepo.getUserByUsername(username);
//        Boolean check = isCreatedAtWithin24Hours(u.getCreatedAt());

        return this.userRepo.authUser(username, password);
    }

    @Override
    public boolean changePassword( Map<String, String> params, Users u) {       
        LocalDateTime currentTime = LocalDateTime.now();
        Date currentDate = Date.from(currentTime.atZone(ZoneId.systemDefault()).toInstant());
        if( passwordEncoder.matches(params.get("password"), u.getPassword()))
        {
            u.setPassword(this.passwordEncoder.encode(params.get("newPassword")));
            u.setUpdatedAt(currentDate);
           
            return  this.userRepo.addOrUpdateUser(u);
        }
        return false;
    }

    @Override
    public List<Users> getUsersByRole(String role) {
        return userRepo.getUsersByRole(role);
    }

    @Override
    public List<Users> getIsActiveUser(boolean isActive) {
        return userRepo.getIsActiveUser(isActive);
    }

    @Override
    public List<Users> getUsers(Map<String, String> params) {
        return this.userRepo.getUsers(params);
    }

    @Override
    public Users getUserById(Long userId) {
        return userRepo.getUserById(userId);
    }

    @Override
    public Boolean addOrUpdateUser(Users u) {
        if (u.getAvatarFile() != null && !u.getAvatarFile().isEmpty()) {
            try {
                Map res = this.cloudinary.uploader().upload(u.getAvatarFile().getBytes(), ObjectUtils.asMap("resource_type", "auto"));
                u.setAvatar(res.get("secure_url").toString());
            } catch (IOException e) {
                Logger.getLogger(UserServiceImp.class.getName()).log(Level.SEVERE, null, e);
            }
        }
        if (u.getBgImageFile() != null && !u.getBgImageFile().isEmpty()) {
            try {
                Map res = this.cloudinary.uploader().upload(u.getBgImageFile().getBytes(), ObjectUtils.asMap("resource_type", "auto"));
                u.setBgImage(res.get("secure_url").toString());
            } catch (IOException e) {
                Logger.getLogger(UserServiceImp.class.getName()).log(Level.SEVERE, null, e);
            }
        }
        return this.userRepo.addOrUpdateUser(u);
    }

    @Override
    public Boolean deleteUserById(Users u) {
        LocalDateTime currentTime = LocalDateTime.now();
        Date currentDate = Date.from(currentTime.atZone(ZoneId.systemDefault()).toInstant());
        u.setUpdatedAt(currentDate);
        u.setIsActive(false);
        return this.userRepo.addOrUpdateUser(u);
        
    }

    private boolean isCreatedAtWithin24Hours(Date createdAt) {
        Date now = new Date();
        long timeDifferenceInMillis = now.getTime() - createdAt.getTime();
        long twentyFourHoursInMillis = 24 * 60 * 60 * 1000; // 24 giờ * 60 phút * 60 giây * 1000 milliseconds

        return timeDifferenceInMillis <= twentyFourHoursInMillis;
    }
    
    @Override
    public UserDto userToUserDto(Users user) {
        UserDto userDto = UserDto.builder()
            .id(user.getId())
            .username(user.getUsername())
            .email(user.getEmail())
            .firstName(user.getFirstName())
            .lastName(user.getLastName())
            .avatar(user.getAvatar())
            .bgImage(user.getBgImage())
            .phone(user.getPhone())
            .createdAt(user.getCreatedAt())
            .isActive(user.getIsActive())
            .role(user.getRole())
            .updatedAt(user.getUpdatedAt())
            .studentId(user.getStudentId())
            .academicYear(user.getAcademicYear())
            .majorId(user.getMajorId())
            .groupsSet(user.getGroupsSet())
            .build();
        return userDto;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Users u = this.userRepo.getUserByUsername(username);
        if (u == null) {
            throw new UsernameNotFoundException("User not found");
        } else {
            Set<GrantedAuthority> authorities = new HashSet<>();
            authorities.add(new SimpleGrantedAuthority(u.getRole()));
            return new org.springframework.security.core.userdetails.User(
                    u.getUsername(), u.getPassword(), authorities);
        }
    }

    @Override
    public UserDto updateAvatarUser(MultipartFile avatar, Users u) {
        if (!avatar.isEmpty()) {
            try {
                Map res = this.cloudinary.uploader().upload(avatar.getBytes(),
                        ObjectUtils.asMap("resource_type", "auto"));
                u.setAvatar(res.get("secure_url").toString());
            } catch (IOException ex) {
                Logger.getLogger(UserServiceImp.class.getName()).log(Level.SEVERE, null, ex);
            }
        }
        Boolean rs = this.userRepo.addOrUpdateUser(u);
        
        if (rs) {
            UserDto userDto = userToUserDto(u);
            return userDto;
        }
        
        return null;
    }
}
