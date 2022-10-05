package ru.kata.spring.boot_security.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.kata.spring.boot_security.demo.model.Role;

import java.util.List;

public interface RoleRepository extends JpaRepository<Role, Long> {
    Role findRoleByName(String name);

    List<Role> findAll();
}
