package com.Mohamed.userService.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.Date;

@Entity
@Getter
@Setter
@ToString
<<<<<<< HEAD
@NoArgsConstructor
@AllArgsConstructor
//@Inheritance(strategy = InheritanceType.TABLE_PER_CLASS)
public class User {
    private String id;
   private Integer numCin;
=======
@Inheritance(strategy = InheritanceType.TABLE_PER_CLASS)
public abstract class User {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;
    private Integer numCin;
>>>>>>> 131adcc0678076388b19741e9ca2599f75c81b52
    private String firstName;
    private String lastName;
    private String phoneNumber;
    private Date dateOfBirth;
<<<<<<< HEAD
   private String address;
    private String email;
    private String password;
    private Long createdTimestamp;
    private String role ;
     private boolean enable;
     private String verificationCode;
     private String restPasswordToken;
     private Date resetPasswordTokenExpiration;
=======
    private String address;
    private String email;
    private String password;
    private Date accountCreationDate;
    private boolean enable;
    private String verificationCode;
    private String restPasswordToken;
    private Date resetPasswordTokenExpiration;
>>>>>>> 131adcc0678076388b19741e9ca2599f75c81b52


}
