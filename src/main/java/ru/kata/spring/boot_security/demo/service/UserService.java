package ru.kata.spring.boot_security.demo.service;

import org.springframework.security.core.userdetails.UserDetailsService;
import ru.kata.spring.boot_security.demo.model.User;

import java.util.List;

public interface UserService extends UserDetailsService {

    User findByEmail(String email);

    List<User> findAllUsers();

    void saveUser(User user);

    User findByIdUsers(Long id);

    void updateUser(Long id, User user);

    void deleteByIdUsers(Long id);

}
