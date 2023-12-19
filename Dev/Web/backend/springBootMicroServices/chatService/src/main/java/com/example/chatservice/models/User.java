package com.example.chatservice.models ;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

import com.example.chatservice.payload.response.UserInfoResponse;

import jakarta.persistence.*;
import jakarta.validation.Valid;

import lombok.Data;

@Data
public class User {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private String id;


  private String firstName;
  private String lastName;

  private String email;

  private String password;
@ManyToMany(mappedBy = "users", fetch = FetchType.EAGER )
    private List<Conversation> conversations;

    private  String  resetPasswordToken;

  public User(String FirstName,String LastName , String email, String password) {
    this.firstName = FirstName;
    this.lastName = LastName ;
    this.email = email;
    this.password = password;
  }
  public User(){}


   public static User fromUserInfoResponse(UserInfoResponse userInfoResponse) {
        User user = new User();
        user.setFirstName(userInfoResponse.getFirstName());
        user.setLastName(userInfoResponse.getLastName());
        user.setEmail(userInfoResponse.getEmail());
        user.setPassword(userInfoResponse.getPassword());
        // Set other fields as needed
        return user;
    }




}
