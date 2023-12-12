package com.example.chatservice.controllers;

import com.example.chatservice.repository.ConversationRepository;
import com.example.chatservice.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600, allowCredentials="true")
//@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/user")
public class UserController {
    @Autowired
    ConversationRepository conversationRepository ; 
    
    @Autowired
    UserRepository userRepository ;


    










}
