package com.example.server.controllers;

import com.example.server.components.JwtService;
import com.example.server.dtos.PostDto;
import com.example.server.services.PostService;
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
import java.util.Map;

@Controller
@ControllerAdvice
@PropertySource("classpath:configs.properties")
public class PostController {
    @Autowired
    private PostService postService;
    @Autowired
    private Environment env;
    @Autowired
    private JwtService jwtService;

    @GetMapping("/posts")
    public String list(Model model, @RequestParam Map<String, String> params, Principal loggedInUser, RedirectAttributes redirectAttributes) {
        String dynamicToken = jwtService.generateTokenLogin(loggedInUser.getName());
        model.addAttribute("authToken", dynamicToken);

        if (params.isEmpty()) {
            // If not present, add the default value of "page=1" to the parameters
            params.put("page", "1");

            // Redirect to the same URL with the "page" parameter added
            redirectAttributes.addAttribute("page", "1");
            return "redirect:/posts";
        }

        int pageSize = Integer.parseInt(this.env.getProperty("PAGE_SIZE"));
        Long count = this.postService.countPost();

        model.addAttribute("counter", Math.ceil(count * 1.0/pageSize));
        model.addAttribute("posts", postService.getPosts(params));
        model.addAttribute("pageIndex", params.get("page"));

        if (params.get("username") != null) {
            model.addAttribute("usernamePlaceholder", params.get("username"));
        }
        return "listPost";
    }

    @GetMapping("/posts/{id}")
    public String detail(@PathVariable( value = "id") Long postId, Model model) {
        PostDto post = postService.findPostById(postId);
        model.addAttribute("post", post);
        model.addAttribute("images", post.getImages());
        return "postDetail";
    }
}
