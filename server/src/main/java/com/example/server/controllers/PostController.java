package com.example.server.controllers;

import com.example.server.services.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.Map;

@Controller
@ControllerAdvice
public class PostController {
    @Autowired
    private PostService postService;

    @GetMapping("/posts")
    public String list(Model model, @RequestParam Map<String, String> params) {
        if (params.get("username") != null) {
            model.addAttribute("posts", postService.getPosts(params));
            model.addAttribute("usernamePlaceholder", params.get("username"));
        } else {
            model.addAttribute("posts", postService.getPosts(params));
        }
        return "listPost";
    }
}
