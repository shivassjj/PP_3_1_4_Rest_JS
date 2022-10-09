package ru.kata.spring.boot_security.demo.service;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.kata.spring.boot_security.demo.model.User;
import ru.kata.spring.boot_security.demo.repository.UserRepository;

import java.util.List;

@Service
public class UserServiceImpl implements UserService{

    private final UserRepository userRepository;

    private final RoleServiceImpl roleService;

    public UserServiceImpl(UserRepository userRepository, RoleServiceImpl roleService) {
        this.userRepository = userRepository;
        this.roleService = roleService;
    }

    public User findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public List<User> findAllUsers() {
        return userRepository.findAll();
    }

    @Transactional
    public void saveUser(User user) {
        user.setPassword(new BCryptPasswordEncoder().encode(user.getPassword()));
        userRepository.save(user);
    }

    public User findByIdUsers(Long id) {
        return userRepository.findById(id).orElseThrow(() -> new RuntimeException("Пользователь не найден"));
    }

//    @Transactional
//    public void updateUser(Long id, User user) {
//        User userFromDb = findByIdUsers(id);
//        userFromDb.setFirstName(user.getFirstName());
//        userFromDb.setLastName(user.getLastName());
//        userFromDb.setPassword(new BCryptPasswordEncoder().encode(user.getPassword()));
//        userFromDb.setAge(user.getAge());
//        userFromDb.setEmail(user.getEmail());
//        userFromDb.setRoles(user.getRoles());
//        userRepository.save(userFromDb);
//    }

    @Transactional
    public void updateUser(Long id, User user) {
        user.setId(id);
        user.setPassword(new BCryptPasswordEncoder().encode(user.getPassword()));
        userRepository.save(user);
    }

    @Transactional
    public void deleteByIdUsers(Long id) {
        userRepository.deleteById(id);
    }

    @Override
    @Transactional
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = findByEmail(email);
        if(user == null) {
            throw new UsernameNotFoundException(String.format("User '%s' not found", email));
        }
        return new org.springframework.security.core.userdetails.User(user.getEmail(), user.getPassword(),
                roleService.mapRolesToAuthorities(user.getRoles()));
    }

}
