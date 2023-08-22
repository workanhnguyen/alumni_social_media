package com.example.server.controllers;

import com.example.server.components.JwtService;
import com.example.server.dtos.UserDto;
import com.example.server.pojos.Users;
import com.example.server.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.User;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.security.Principal;
import java.util.Map;

@RestController
@RequestMapping("/api/users")
public class ApiUserController {
    @Autowired
    private JwtService jwtService;
    
    @Autowired
    private UserService userService;

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
    
//    public ResponseEntity<UserDto> login(@RequestBody Users user) {
//        if (this.userService.authUser(user.getUsername(), user.getPassword())) {
//            String token = this.jwtService.generateTokenLogin(user.getUsername());
//            Users loggedInUser = this.userService.getUserByUsername(user.getUsername());
//
//            UserDto response = new UserDto();
//            response.setToken(token);
//            response.setUser(loggedInUser);
//
//            return new ResponseEntity<>(response, HttpStatus.OK);
//        }
//        return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
//    }

    @GetMapping(path = "/current-user/", produces = MediaType.APPLICATION_JSON_VALUE)
    @CrossOrigin
    public ResponseEntity<?> details(Principal user) {
        Users u = this.userService.getUserByUsername(user.getName());
        return new ResponseEntity<>(u, HttpStatus.OK);
    }
    
    
    
    private boolean isValidUserData(Map<String, String> params, MultipartFile avatar, String role) {
        //role 1-GV, ko cần password
        //rolw 2-CSV cần MSSV
        if ("1".equals(role)) {
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