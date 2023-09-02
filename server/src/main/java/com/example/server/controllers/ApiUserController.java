package com.example.server.controllers;

import com.example.server.components.JwtService;

import com.example.server.pojos.Users;
import com.example.server.services.MajorService;
import com.example.server.services.PostService;
import com.example.server.services.UserService;
import java.security.Principal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

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
    @Autowired
    private MajorService majorService;

    @PostMapping(path = "/register/",
            consumes = {MediaType.MULTIPART_FORM_DATA_VALUE},
            produces = {MediaType.APPLICATION_JSON_VALUE})
    @CrossOrigin
    public ResponseEntity<?> addUser(@RequestParam Map<String, String> params, @RequestPart MultipartFile avatar) {
        String role = params.get("role");

        if (params.containsKey("username") && userService.getUserByUsername(params.get("username")) != null)
            return ResponseEntity.status(HttpStatus.CONFLICT).build();
        if (!isValidUserData(params, avatar, role)) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        } else {
            this.userService.addUser(params, avatar);
            return ResponseEntity.status(HttpStatus.CREATED).build();
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
    @CrossOrigin
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

//    @PutMapping(path = "/{id}/",
//            consumes = {MediaType.MULTIPART_FORM_DATA_VALUE},
//            produces = {MediaType.APPLICATION_JSON_VALUE})
//    @CrossOrigin
//    public ResponseEntity<?> updateUser(@RequestParam Map<String, String> params, @RequestPart(name = "bgImage") MultipartFile bgImage) {
//        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
//        if (authentication != null && !(authentication instanceof AnonymousAuthenticationToken)) {
//            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
//            Users currentUser = userService.getUserByUsername(userDetails.getUsername());
//            currentUser.setPhone(params.get("phone"));
//            currentUser.setBgImageFile(bgImage);
//            if (userService.addOrUpdateUser(currentUser))
//                return new ResponseEntity<>(userService.getUserById(currentUser.getId()), HttpStatus.OK);
//            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
//        }
//        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
//    }

    // Cái này chưa ổn
//    @DeleteMapping("/{id}/")
//    public ResponseEntity<?> deleteUser(@PathVariable("id") Long userId) {
//        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
//
//        // Check if the user is authenticated and has the role ADMIN
//        if (authentication != null && authentication.getAuthorities().stream()
//                .anyMatch(role -> role.getAuthority().equals("ADMIN"))) {
//            if (this.userService.deleteUserById(userId)) {
//                return ResponseEntity.noContent().build();
//            } else {
//                return ResponseEntity.notFound().build();
//            }
//        } else {
//            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
//        }
//    }

    @GetMapping(path = "/current_user/", produces = MediaType.APPLICATION_JSON_VALUE)
    @CrossOrigin
    public ResponseEntity<?> details(Principal user) {
        Users u = this.userService.getUserByUsername(user.getName());

        if (u.getIsActive())
            return new ResponseEntity<>(u, HttpStatus.OK);
        return new ResponseEntity<>(false, HttpStatus.OK);
    }
    

    @GetMapping("/{username}/")
    @CrossOrigin
    public ResponseEntity<Users> getUserByUsername(@PathVariable("username") String username) {
        Users u = this.userService.getUserByUsername(username);

        if (u != null)
            return new ResponseEntity<>(u, HttpStatus.OK);
        return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
    }

    private boolean isValidUserData(Map<String, String> params, MultipartFile avatar, String role) {
        //role GV - LECTURER, ko cần password
        //role CSV - ALUMNI cần MSSV

        if ("ROLE_LECTURER".equals(role)) {
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

    private Users populateUser(Users currentUser, Map<String, String> params, MultipartFile avatar, MultipartFile bgImage) {
        if (params.containsKey("phone")) {
            currentUser.setPhone(params.get("phone"));
        }
        if (params.containsKey("majorId")) {
            currentUser.setMajorId(majorService.getMajorById(Long.parseLong(params.get("majorId"))));
        }
        if (params.containsKey("academicYear")) {
            currentUser.setAcademicYear(params.get("academicYear"));
        }
        // Set to empty if avatar is null
        currentUser.setAvatarFile(avatar);
        // Set to empty if bgImage is null
        currentUser.setBgImageFile(bgImage);
        // Return the updated currentUser object
        return currentUser;
    }

}
