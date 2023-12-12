package com.Mohamed.userService.controller;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.Mohamed.userService.dto.SimpleKeycloakUser;
import com.Mohamed.userService.entity.User;
import com.Mohamed.userService.service.KeycloakService;

import jakarta.validation.Valid;




@RestController
@RequestMapping("api/v1/register")
public class KeycloakController {

    private final KeycloakService keycloakService;

    @Autowired
    public KeycloakController(KeycloakService keycloakService) {
        this.keycloakService = keycloakService;
    }


    @PostMapping
    public User createUser(@Valid @RequestBody SimpleKeycloakUser simpleKeycloakUserMono) {
        return keycloakService.createUserInKeycloakAndConvertToUser(simpleKeycloakUserMono);
    }

    @GetMapping
    public List<User> findAllUsers() {
        return keycloakService.findAllUsers();
    }

}
