package com.example.server.controllers;

import com.example.server.components.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.GetMapping;

import java.security.Principal;

@Controller
@ControllerAdvice
public class StatisticController {
    @Autowired
    private JwtService jwtService;

    @GetMapping("/statistic")
    public String index(Model model, Principal loggedInUser) {
        String dynamicToken = jwtService.generateTokenLogin(loggedInUser.getName());
        model.addAttribute("authToken", dynamicToken);
        return "statistic";
    }
}
