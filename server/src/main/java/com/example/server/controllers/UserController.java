package com.example.server.controllers;

import com.example.server.components.JwtService;
import com.example.server.pojos.Users;
import com.example.server.services.DepartmentService;
import com.example.server.services.MajorService;
import com.example.server.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.security.Principal;
import java.util.Map;

@Controller
@ControllerAdvice
public class UserController {

    @Autowired
    private UserService userService;
    @Autowired
    private JwtService jwtService;
    @Autowired
    private DepartmentService departmentService;
    @Autowired
    private MajorService majorService;

    @RequestMapping("/")
    public String index(Model model, Principal loggedInUser, @RequestParam Map<String, String> params) {
        String dynamicToken = jwtService.generateTokenLogin(loggedInUser.getName());
        model.addAttribute("users", userService.getUsers(params));
        model.addAttribute("authToken", dynamicToken);

        return loggedInUser != null ? "listUser" : "login";
    }

    @GetMapping("/users")
    public String list(Model model, @RequestParam Map<String, String> params) {
        if (params.get("role") != null) {
            model.addAttribute("users", userService.getUsers(params));
            model.addAttribute("role", params.get("role"));
            return "listUser";
        } else if (params.get("active") != null) {
            model.addAttribute("users", userService.getUsers(params));
            model.addAttribute("active", params.get("active"));
            return "listUser";
        } else {
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

//    @DeleteMapping("/users/{id}")
//    public String delete(@PathVariable(value = "id") Long userId) {
//        if (userService.deleteUserById(userId)) {
//            return "redirect:/";
//        }
//        return "redirect:/";
//    }
}
