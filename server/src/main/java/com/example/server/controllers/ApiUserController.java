package com.example.server.controllers;

import com.example.server.components.JwtService;
import com.example.server.dtos.UserDto;
import com.example.server.pojos.Posts;

import com.example.server.pojos.Users;
import com.example.server.services.PostService;
import com.example.server.services.UserService;
import java.security.Principal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.User;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.security.Principal;
import java.util.Map;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;

@RestController
@RequestMapping("/api/users")
public class ApiUserController {
    @Autowired
    private JwtService jwtService;
    
    @Autowired
    private UserService userService;
     @Autowired
    private PostService postService;

    @PostMapping(path = "/register/",
            consumes = {MediaType.MULTIPART_FORM_DATA_VALUE},
            produces = {MediaType.APPLICATION_JSON_VALUE})
    @CrossOrigin
    public ResponseEntity<?> addUser(@RequestParam Map<String, String> params, @RequestPart MultipartFile avatar) {
        String role = params.get("role");
        if (!isValidUserData(params, avatar, role)) {
            return new ResponseEntity<>(false, HttpStatus.BAD_REQUEST);
        } else {
            this.userService.addUser(params, avatar);
            return new ResponseEntity<>(true, HttpStatus.CREATED);
        }
    }
    
    @PostMapping("/login/")
    @CrossOrigin
    public ResponseEntity<String> login(@RequestBody Users user) {
        if (this.userService.authUser(user.getUsername(), user.getPassword())) {
            String token = this.jwtService.generateTokenLogin(user.getUsername());
            
            return new ResponseEntity<>(token, HttpStatus.OK);
        }

        return new ResponseEntity<>("error", HttpStatus.BAD_REQUEST);
    }
    
    @PostMapping("/change_password/")
    public ResponseEntity<?> changePassword(
            @RequestParam String password,
            @RequestParam String newPassword,
            Principal user) {
        Users u = this.userService.getUserByUsername(user.getName());

        if (this.userService.changePassword(password,newPassword, u )) {
            return new ResponseEntity<>( HttpStatus.OK);
        } else {
            return new ResponseEntity<>( HttpStatus.BAD_REQUEST);
        }
    }

    
    
    @GetMapping(path = "/current_user/", produces = MediaType.APPLICATION_JSON_VALUE)
    @CrossOrigin
    public ResponseEntity<?> details(Principal user) {
        Users u = this.userService.getUserByUsername(user.getName());

        if (u.getIsActive())
            return new ResponseEntity<>(u, HttpStatus.OK);
        return new ResponseEntity<>(false, HttpStatus.OK);
    }
    
//     @PostMapping(path = "/new")
//    @CrossOrigin
//    public ResponseEntity<Posts> createPost(@RequestParam Map<String, String> params) {
//            // Thêm bài viết mới
//            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
//            if (authentication != null && !(authentication instanceof AnonymousAuthenticationToken)) {
//                UserDetails userDetails = (UserDetails) authentication.getPrincipal();
//                Users currentUser = userService.getUserByUsername(userDetails.getUsername());
//                Posts p = this.postService.addPost(params, currentUser);
//                return new ResponseEntity<>(p, HttpStatus.CREATED);           
//            }
//            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
//            
//
//       
//    }


    private boolean isValidUserData(Map<String, String> params, MultipartFile avatar, String role) {
        //role GV - LECTURER, ko cần password
        //role CSV - ALUMNI cần MSSV
        //r
        if ("LECTURER".equals(role)) {
            return params.containsKey("username") && params.containsKey("role")
                && avatar != null && params.containsKey("firstName") 
                && params.containsKey("lastName")
                && params.containsKey("email");
        } else {
            return params.containsKey("username") && params.containsKey("role")
                && avatar != null && params.containsKey("password")
                && params.containsKey("firstName") && params.containsKey("lastName")
                && params.containsKey("email") && params.containsKey("studentId");
        }
}
}
