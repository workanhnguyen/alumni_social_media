package com.example.server.controllers;

import com.example.server.components.JwtService;
import com.example.server.pojos.Users;
import com.example.server.services.DepartmentService;
import com.example.server.services.MajorService;
import com.example.server.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
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
    private BCryptPasswordEncoder passwordEncoder;
    @Autowired
    private DepartmentService departmentService;
    @Autowired
    private MajorService majorService;

    // Index
    @RequestMapping("/")
    public String index(Model model, Principal loggedInUser, @RequestParam Map<String, String> params) {
        String dynamicToken = jwtService.generateTokenLogin(loggedInUser.getName());
        model.addAttribute("users", userService.getUsers(params));
        model.addAttribute("authToken", dynamicToken);

        return loggedInUser != null ? "listUser" : "login";
    }

    // Load user by conditions
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
        } else if (params.get("username") != null) {
            model.addAttribute("users", userService.getUsers(params));
            model.addAttribute("usernamePlaceholder", params.get("username"));
            return "listUser";
        } else {
            model.addAttribute("user", new Users());
            return "userDetail";
        }
    }

    // Load user details
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

    // Update user
    @PostMapping("/users/{id}")
    public String update(Model model, @ModelAttribute(value = "user") @Valid Users u, BindingResult rs) {
        model.addAttribute("departments", departmentService.getAllDepartments());
        if (!rs.hasErrors()) if (userService.addOrUpdateUser(u)) return "redirect:/";
        return "userDetail";
    }

    // GET - Create new empty bean user
    @GetMapping("/users/new")
    public String createEmptyUser(Model model) {
        Users u = new Users();
        u.setPassword("ou@123");
        u.setRole("ROLE_LECTURER");
        u.setIsActive(true);

        model.addAttribute("user", u);

        return "addUser";
    }

    // POST - Add bean user to database
    @PostMapping("/users/new")
    public String addUser(Model model, @ModelAttribute(value = "user") @Valid Users user, BindingResult rs) {

        boolean customError = user.getAvatarFile() == null || user.getAvatarFile().isEmpty()
                || user.getBgImageFile() == null || user.getBgImageFile().isEmpty()
                || user.getPhone() == null || user.getPhone().isEmpty()
                || user.getAcademicYear() == null || user.getAcademicYear().isEmpty();

        user.setPassword(this.passwordEncoder.encode("ou@123"));
        user.setRole("ROLE_LECTURER");
        user.setIsActive(true);

        if (!rs.hasErrors() && !customError) {
            if (userService.addOrUpdateUser(user)) return "redirect:/";
        }

        if (user.getAvatarFile() == null || user.getAvatarFile().isEmpty())
            model.addAttribute("isAvatarFileEmpty", true);
        else model.addAttribute("isAvatarFileEmpty", false);
        if (user.getBgImageFile() == null || user.getBgImageFile().isEmpty())
            model.addAttribute("isBgImageFileEmpty", true);
        else model.addAttribute("isBgImageFileEmpty", false);
        if (user.getAcademicYear() == null || user.getAcademicYear().isEmpty())
            model.addAttribute("isAcademicYearEmpty", true);
        else model.addAttribute("isAcademicYearEmpty", true);
        if (user.getPhone() == null || user.getPhone().isEmpty()) model.addAttribute("isPhoneEmpty", true);
        else model.addAttribute("isPhoneEmpty", true);
        return "addUser";
    }
}
