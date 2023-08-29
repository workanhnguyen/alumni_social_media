package com.example.server.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.RequestMapping;

import java.security.Principal;

@Controller
@ControllerAdvice
public class UserController {
    @RequestMapping("/")
    public String index(Model model, Principal loggedInUser) {
        model.addAttribute("message", "List of user");

        return loggedInUser != null ? "listUser" : "login";
    }
}
