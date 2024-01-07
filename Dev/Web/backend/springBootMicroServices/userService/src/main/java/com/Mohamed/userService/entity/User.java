package com.Mohamed.userService.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.Date;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
//@Inheritance(strategy = InheritanceType.TABLE_PER_CLASS)
public class User {
    private String id;
   private Integer numCin;
    private String firstName;
    private String lastName;
    private String phoneNumber;
    private Date dateOfBirth;
   private String address;
    private String email;
    private String password;
    private Long createdTimestamp;
    private String role ;
     private boolean enable;
     private String verificationCode;
     private String restPasswordToken;
     private Date resetPasswordTokenExpiration;



    
}
