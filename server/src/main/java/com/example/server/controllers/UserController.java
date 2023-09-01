package com.example.server.controllers;

import com.example.server.pojos.Users;
import com.example.server.services.DepartmentService;
import com.example.server.services.MajorService;
import com.example.server.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
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

    @GetMapping("/users")
    public String list(Model model, @RequestParam(value = "role", required = false) String role) {
        if (role != null) {
            model.addAttribute("users", userService.getUsersByRole(role));
            model.addAttribute("role", role);
            return "listUser";
        } else {
            model.addAttribute("role", "ALL");
            model.addAttribute("user", new Users());
            return "userDetail";
        }
    }

    @GetMapping("/users/{id}")
    public String update(@PathVariable(value = "id") Long id, Model model) {
        Users u = userService.getUserById(id);
        model.addAttribute("user", u);

        model.addAttribute("departments", departmentService.getAllDepartments());
        if (u.getMajorId() != null) {
            model.addAttribute("majors", majorService.getMajorsByDepartmentId(u.getMajorId().getDepartmentId().getId()));
        }
        return "userDetail";
    }

    @PostMapping("/users")
    public String add(Model model, @ModelAttribute(value = "user") @Valid Users u, BindingResult rs) {
        model.addAttribute("departments", departmentService.getAllDepartments());
        if (!rs.hasErrors())
            if (userService.addOrUpdateUser(u))
                return "redirect:/";
        return "userDetail";
    }
}
