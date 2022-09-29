package ru.kata.spring.boot_security.demo.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import ru.kata.spring.boot_security.demo.service.UserServiceImpl;

import java.security.Principal;

@Controller
@RequestMapping("/user")
public class UserControllers {

    private final UserServiceImpl userServiceImpl;

    public UserControllers(UserServiceImpl userServiceImpl) {
        this.userServiceImpl = userServiceImpl;
    }

    @GetMapping()
    public String getUser(Principal principal, Model model) {
        model.addAttribute("user", userServiceImpl.findByUsername(principal.getName()));
        return "user/user";
    }
}
