package com.example.server.controllers;

import com.example.server.components.JwtService;
import com.example.server.services.GroupService;
import com.example.server.services.LetterService;
import com.example.server.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.PropertySource;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import java.security.Principal;
import java.util.HashMap;
import java.util.Map;

@Controller
@ControllerAdvice
@PropertySource("classpath:configs.properties")
public class LetterController {
    @Autowired
    private Environment env;
    @Autowired
    private JwtService jwtService;
    @Autowired
    private LetterService letterService;
    @Autowired
    private UserService userService;
    @Autowired
    private GroupService groupService;

    @GetMapping("/letters")
    public String index(Model model, @RequestParam Map<String, String> params, Principal loggedInUser, RedirectAttributes redirectAttributes) {
        String dynamicToken = jwtService.generateTokenLogin(loggedInUser.getName());
        model.addAttribute("authToken", dynamicToken);

        if (params.isEmpty()) {
            // If not present, add the default value of "page=1" to the parameters
            params.put("page", "1");

            // Redirect to the same URL with the "page" parameter added
            redirectAttributes.addAttribute("page", "1");
            return "redirect:/letters";
        }

        int pageSize = Integer.parseInt(this.env.getProperty("PAGE_SIZE"));

        Long count = this.letterService.countLetters();

        model.addAttribute("counter", Math.ceil(count * 1.0/pageSize));
        model.addAttribute("letters", letterService.getLetters(params));
        model.addAttribute("pageIndex", params.get("page"));

        return "listLetter";
    }

    @GetMapping("/letters/new")
    public String addLetter(Model model, Principal loggedInUser) {
        String dynamicToken = jwtService.generateTokenLogin(loggedInUser.getName());
        model.addAttribute("authToken", dynamicToken);
        model.addAttribute("users", userService.getUsers(new HashMap<>()));
        model.addAttribute("groups", groupService.getGroups(new HashMap<>()));
        return "addLetter";
    }

    @GetMapping("/letters/{id}")
    public String detail(Model model, @PathVariable(value = "id") long letterId) {
        model.addAttribute("letter", letterService.getLetterMembers(letterId));
        return "letterDetail";
    }
}
