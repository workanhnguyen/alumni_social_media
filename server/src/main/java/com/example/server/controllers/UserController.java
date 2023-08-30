package com.example.server.controllers;

import com.example.server.pojos.Users;
import com.example.server.services.DepartmentService;
import com.example.server.services.MajorService;
import com.example.server.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.security.Principal;

@Controller
@ControllerAdvice
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private DepartmentService departmentService;
    @Autowired
    private MajorService majorService;

    @RequestMapping("/")
    public String index(Model model, Principal loggedInUser) {
        model.addAttribute("users", userService.getAllUsers());
        model.addAttribute("role", "ALL");

        return loggedInUser != null ? "listUser" : "login";
    }

    @GetMapping("/users/{id}")
    public String userDetail(@PathVariable Long id, Model model) {
        model.addAttribute("user", userService.getUserById(id));
        model.addAttribute("departments", departmentService.getAllDepartments());
        model.addAttribute("majors", majorService.getAllMajors());
        return "userDetail";
    }

    @GetMapping("/users")
    public String allUsers(@RequestParam(value = "role", required = false) String role, Model model) {
        if (role != null) {
            model.addAttribute("users", userService.getUsersByRole(role));
            model.addAttribute("role", role);
            return "listUser";
        } else {
            model.addAttribute("user", new Users());
            return "addUser";
        }
    }
}
