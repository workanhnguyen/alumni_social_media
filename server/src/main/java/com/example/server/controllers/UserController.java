package com.example.server.controllers;

import com.example.server.components.JwtService;
import com.example.server.pojos.Users;
import com.example.server.services.DepartmentService;
import com.example.server.services.MajorService;
import com.example.server.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

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
    @Autowired
    private Environment env;

    // Index
    @RequestMapping("/")
    public String index(Model model, Principal loggedInUser, @RequestParam Map<String, String> params) {
//        String dynamicToken = jwtService.generateTokenLogin(loggedInUser.getName());
//        model.addAttribute("users", userService.getUsers(params));
//        model.addAttribute("authToken", dynamicToken);

        return loggedInUser != null ? "redirect:/users" : "login";
    }

    // Load user by conditions
    @GetMapping("/users")
    public String list(Model model, Principal loggedInUser, @RequestParam Map<String, String> params, RedirectAttributes redirectAttributes) {
        String dynamicToken = jwtService.generateTokenLogin(loggedInUser.getName());
        model.addAttribute("authToken", dynamicToken);

        if (params.isEmpty()) {
            // If not present, add the default value of "page=1" to the parameters
            params.put("page", "1");

            // Redirect to the same URL with the "page" parameter added
            redirectAttributes.addAttribute("page", "1");
            return "redirect:/users";
        }

        int pageSize = Integer.parseInt(this.env.getProperty("PAGE_SIZE"));
        Long count = this.userService.countUser();

        model.addAttribute("counter", Math.ceil(count * 1.0/pageSize));
        model.addAttribute("users", userService.getUsers(params));
        model.addAttribute("pageIndex", params.get("page"));

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
        }
//        else {
//            model.addAttribute("user", new Users());
//            return "userDetail";
//        }
        return "listUser";
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
        u.setMajorId(majorService.getMajorById(1L));
        model.addAttribute("departments", departmentService.getAllDepartments());
        if (!rs.hasErrors()) if (userService.addOrUpdateUser(u)) return "redirect:/";
        return "userDetail";
    }

    // GET - Create new empty bean user
    @GetMapping("/users/new")
    public String createEmptyUser(Model model, @ModelAttribute(value = "user") Users user) {
        Users u = user;
        if (user.getLastName() != null) u.setLastName(user.getLastName().trim());
        if (user.getFirstName() != null) u.setFirstName(user.getFirstName().trim());
        if (user.getAcademicYear() != null) u.setAcademicYear(user.getAcademicYear().trim());
        if (user.getEmail() != null) u.setEmail(user.getEmail().trim());
        if (user.getPhone() != null) u.setPhone(user.getPhone().trim());
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
                || user.getPhone() == null || user.getPhone().trim().isEmpty()
                || user.getAcademicYear() == null || user.getAcademicYear().trim().isEmpty() || (user.getUsername() != null && userService.getUserByUsername(user.getUsername()) != null);

//        Users u = user;
//        if (user.getLastName() != null) u.setLastName(user.getLastName().trim());
//        if (user.getFirstName() != null) u.setFirstName(user.getFirstName().trim());
//        if (user.getAcademicYear() != null) u.setAcademicYear(user.getAcademicYear().trim());
//        if (user.getEmail() != null) u.setEmail(user.getEmail().trim());
//        if (user.getPhone() != null) u.setPhone(user.getPhone().trim());
//        u.setPassword("ou@123");
//        u.setRole("ROLE_LECTURER");
//        u.setIsActive(true);

        if (!rs.hasErrors() && !customError) {
            if (userService.addOrUpdateUser(user)) {
                return "redirect:/";
            }
        }

        if (user.getUsername() != null && userService.getUserByUsername(user.getUsername()) != null)
            model.addAttribute("isUsernameExisting", true);
        else model.addAttribute("isUsernameExisting", false);
        if (user.getAvatarFile() == null || user.getAvatarFile().isEmpty())
            model.addAttribute("isAvatarFileEmpty", true);
        else model.addAttribute("isAvatarFileEmpty", false);
        if (user.getBgImageFile() == null || user.getBgImageFile().isEmpty())
            model.addAttribute("isBgImageFileEmpty", true);
        else model.addAttribute("isBgImageFileEmpty", false);
        if (user.getAcademicYear() == null || user.getAcademicYear().trim().isEmpty())
            model.addAttribute("isAcademicYearEmpty", true);
        else model.addAttribute("isAcademicYearEmpty", false);
        if (user.getPhone() == null || user.getPhone().trim().isEmpty()) model.addAttribute("isPhoneEmpty", true);
        else model.addAttribute("isPhoneEmpty", false);

//        model.addAttribute("user", u);
        return "addUser";
    }
}
