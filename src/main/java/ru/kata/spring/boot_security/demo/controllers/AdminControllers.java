package ru.kata.spring.boot_security.demo.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import ru.kata.spring.boot_security.demo.model.User;
import ru.kata.spring.boot_security.demo.service.UserService;

@Controller
@RequestMapping("/admin")
public class AdminControllers {

    private final UserService userService;

    public AdminControllers(UserService userService) {
        this.userService = userService;
    }

    @GetMapping()
    public String getUsers(Model model) {
        model.addAttribute("users", userService.findAllUsers());
        return "admin/list";
    }

    @GetMapping("/add")
    public String getAddUserPage(Model model) {
        model.addAttribute("user", new User());
        return "admin/add";
    }

    @PostMapping()
    public String createUser(@ModelAttribute("user") User user) {
        userService.saveUser(user);
        return "redirect:/admin";
    }

    @DeleteMapping("/{id}")
    public String deleteUser(@PathVariable("id") Long id) {
        userService.deleteByIdUsers(id);
        return "redirect:/admin";
    }

    @GetMapping("/edit/{id}")
    public String getEditUserPage(Model model, @PathVariable("id") Long id) {
        model.addAttribute("user", userService.findByIdUsers(id));
        return "admin/edit";
    }

    @PatchMapping("/{id}")
    public String updateUser(@ModelAttribute("user") User user, @PathVariable("id") Long id) {
        userService.updateUser(id, user);
        return "redirect:/admin";
    }
}
