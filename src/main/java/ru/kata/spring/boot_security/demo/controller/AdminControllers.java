package ru.kata.spring.boot_security.demo.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import ru.kata.spring.boot_security.demo.model.User;
import ru.kata.spring.boot_security.demo.service.UserServiceImpl;

@Controller
@RequestMapping("/admin")
public class AdminControllers {

    private final UserServiceImpl userServiceImpl;

    public AdminControllers(UserServiceImpl userServiceImpl) {
        this.userServiceImpl = userServiceImpl;
    }

    @GetMapping()
    public String getUsers(Model model) {
        model.addAttribute("users", userServiceImpl.findAllUsers());
        return "admin/list";
    }

    @GetMapping("/add")
    public String getUserFormCreation(Model model) {
        model.addAttribute("user", new User());
        return "admin/add";
    }

    @PostMapping()
    public String createUser(@ModelAttribute("user") User user) {
        userServiceImpl.saveUser(user);
        return "redirect:/admin";
    }

    @DeleteMapping("/{id}")
    public String deleteUser(@PathVariable("id") Long id) {
        userServiceImpl.deleteByIdUsers(id);
        return "redirect:/admin";
    }

    @GetMapping("/edit/{id}")
    public String getUserFormEdit(Model model, @PathVariable("id") Long id) {
        model.addAttribute("user", userServiceImpl.findByIdUsers(id));
        return "admin/edit";
    }

    @PatchMapping("/{id}")
    public String updateUser(@ModelAttribute("user") User user, @PathVariable("id") Long id) {
        userServiceImpl.updateUser(id, user);
        return "redirect:/admin";
    }
}
