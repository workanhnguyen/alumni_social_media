package com.example.server.controllers;

import com.example.server.components.JwtService;
import com.example.server.dtos.GroupDto1;
import com.example.server.dtos.LetterDto;
import com.example.server.dtos.UserDto;
import com.example.server.pojos.Groups;
import com.example.server.pojos.Letters;

import com.example.server.pojos.Users;
import com.example.server.services.GroupService;
import com.example.server.services.LetterService;
import com.example.server.services.MajorService;
import com.example.server.services.PostService;
import com.example.server.services.UserService;
import java.util.ArrayList;
import java.util.List;

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
    
    @Autowired
    private LetterService letterService;
    
    @Autowired
    private GroupService groupService;

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
    
    @PostMapping(path = "/current_user/avatar/",
            consumes = {MediaType.MULTIPART_FORM_DATA_VALUE},
            produces = {MediaType.APPLICATION_JSON_VALUE})
    @CrossOrigin
    public ResponseEntity<?> updateAvatarUser(@RequestPart MultipartFile updateAvatar) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && !(authentication instanceof AnonymousAuthenticationToken)) {
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            Users currentUser = userService.getUserByUsername(userDetails.getUsername());
            UserDto userDto = userService.updateAvatarUser( updateAvatar, currentUser);
            if (userDto != null)
                return new ResponseEntity<>(userDto, HttpStatus.OK);
            return new ResponseEntity(false,HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
    }
    
    @PostMapping(path = "/current_user/cover_image/",
            consumes = {MediaType.MULTIPART_FORM_DATA_VALUE},
            produces = {MediaType.APPLICATION_JSON_VALUE})
    @CrossOrigin
    public ResponseEntity<?> updateBgUser(@RequestPart(value = "coverImage") MultipartFile updateBg) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && !(authentication instanceof AnonymousAuthenticationToken)) {
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            Users currentUser = userService.getUserByUsername(userDetails.getUsername());
            UserDto userDto = userService.updateBgUser(updateBg, currentUser);
            if (userDto != null)
                return new ResponseEntity<>(userDto, HttpStatus.OK);
            return new ResponseEntity(false,HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
    }
    
    
    @PatchMapping(path = "/current_user/update_info/")
    @CrossOrigin
    public ResponseEntity<?> updateInfoUser(@RequestBody Map<String, String> params) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && !(authentication instanceof AnonymousAuthenticationToken)) {
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            Users currentUser = userService.getUserByUsername(userDetails.getUsername());
            UserDto userDto = userService.updateInfo(params, currentUser);
            if (userDto != null)
                return new ResponseEntity<>(userDto, HttpStatus.OK);
            return new ResponseEntity(false,HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
    }
    
    @PostMapping("/login/")
    @CrossOrigin
    public ResponseEntity<?> login(@RequestBody Users user) {
        if (this.userService.authUser(user.getUsername(), user.getPassword())) {
            String token = this.jwtService.generateTokenLogin(user.getUsername());
            Users u = userService.getUserByUsername(user.getUsername());
            if (u.getIsActive())
                if("ROLE_LECTURER".equals(u.getRole()) )
                    if( this.userService.checkTimeUser(u)) 
                        return new ResponseEntity<>(token, HttpStatus.OK);
                    else 
                        return new ResponseEntity<>("account is locked", HttpStatus.LOCKED);
                else
                    return new ResponseEntity<>(token, HttpStatus.OK);
            else
                return ResponseEntity.status(HttpStatus.LOCKED).build();
        }

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }
    
    @PatchMapping("/change_password/")
    @CrossOrigin
    public ResponseEntity<?> changePassword(@RequestBody Map<String, String> params) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && !(authentication instanceof AnonymousAuthenticationToken)) {
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            Users currentUser = userService.getUserByUsername(userDetails.getUsername());
            if (this.userService.changePassword( params, currentUser)) {
                return new ResponseEntity<>( "SUCCESSFUL",HttpStatus.OK);
            } else {
                return new ResponseEntity<>( "WRONG_PASSWORD",HttpStatus.OK);
            }
        }
        return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
    }

   

    @DeleteMapping("/{id}/")
    @CrossOrigin
    public ResponseEntity<?> deleteUser(@PathVariable("id") Long userId) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.getAuthorities().stream().anyMatch(role -> role.getAuthority().equals("ROLE_ADMIN"))) {
            Users userDelete = userService.getUserById(userId);
            if (this.userService.deleteUserById(userDelete)) {
                return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
            } else {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
            }
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }

    @GetMapping(path = "/current_user/", produces = MediaType.APPLICATION_JSON_VALUE)
    @CrossOrigin
    public ResponseEntity<UserDto> details() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && !(authentication instanceof AnonymousAuthenticationToken)) {
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            Users currentUser = userService.getUserByUsername(userDetails.getUsername());
            UserDto userDto = userService.userToUserDto(currentUser);
            return new ResponseEntity<>( userDto,HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
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
    
    @GetMapping("/current_user/letters")
    @CrossOrigin
    public ResponseEntity<List<Letters>> getLetterByUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && !(authentication instanceof AnonymousAuthenticationToken)) {
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            Users currentUser = userService.getUserByUsername(userDetails.getUsername());
            List<Letters> letters = new ArrayList<> ();
            letters = letterService.getLetterByUser(currentUser);
            return new ResponseEntity<>( letters,HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
      
    }
    
    @GetMapping("/current_user/groups")
    @CrossOrigin
    public ResponseEntity<List<GroupDto1>> getGroupByUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && !(authentication instanceof AnonymousAuthenticationToken)) {
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            Users currentUser = userService.getUserByUsername(userDetails.getUsername());
            List<GroupDto1> groupDto1 = new ArrayList<> ();
            groupDto1 = groupService.getGroupByUser(currentUser);
            return new ResponseEntity<>( groupDto1,HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
      
    }

}
