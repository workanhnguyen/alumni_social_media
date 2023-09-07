package com.example.server.controllers;

import com.example.server.components.JwtService;
import com.example.server.services.GroupService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import java.security.Principal;
import java.util.Map;

@Controller
@ControllerAdvice
public class GroupController {
    @Autowired
    private GroupService groupService;
    @Autowired
    private Environment env;
    @Autowired
    private JwtService jwtService;
    @GetMapping("/groups")
    public String index(Model model, @RequestParam Map<String, String> params, Principal loggedInUser, RedirectAttributes redirectAttributes) {
        String dynamicToken = jwtService.generateTokenLogin(loggedInUser.getName());
        model.addAttribute("authToken", dynamicToken);

        if (params.isEmpty()) {
            params.put("page", "1");

            redirectAttributes.addAttribute("page", "1");
            return "redirect:/groups";
        }

        int pageSize = Integer.parseInt(this.env.getProperty("PAGE_SIZE"));
        Long count = this.groupService.countGroup();

        model.addAttribute("counter", Math.ceil(count * 1.0/pageSize));
        model.addAttribute("groups", groupService.getGroups(params));
        model.addAttribute("pageIndex", params.get("page"));

        return "listGroup";
    }
}
