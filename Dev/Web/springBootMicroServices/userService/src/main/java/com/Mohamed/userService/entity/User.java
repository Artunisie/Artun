package com.Mohamed.userService.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.Date;

@Entity
@Getter
@Setter
@Inheritance(strategy = InheritanceType.TABLE_PER_CLASS)
public abstract class User {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;
    private Integer numCin;
    private String firstName;
    private String lastName;
    private String phoneNumber;
    private Date dateOfBirth;
    private String address;
    private String email;
    private String password;
    private Date accountCreationDate;
    private boolean enable;
    private String verificationCode;
    private String restPasswordToken;
    private Date resetPasswordTokenExpiration;


}
