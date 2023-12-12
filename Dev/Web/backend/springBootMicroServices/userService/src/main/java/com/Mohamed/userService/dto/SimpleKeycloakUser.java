package com.Mohamed.userService.dto;


import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;


@Data
public class SimpleKeycloakUser {

    private String id;
    @NotBlank
    private String firstName;
    @NotBlank
    private String lastName;
    @Email
    private String email;
    @NotBlank
    private String username;
    @NotBlank
    private String password;

    // add any other attributes that you want to be separated from keycloak
    @NotBlank
    private String role ; 

}

