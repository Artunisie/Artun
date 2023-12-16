package com.example.chatservice.payload.request;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import jakarta.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.info.ProjectInfoProperties.Build;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;

import com.example.chatservice.models.Conversation;
import com.example.chatservice.models.User;
import com.example.chatservice.payload.response.UserInfoResponse;
import com.example.chatservice.service.KeycloakFeignClient;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
@Data
@NoArgsConstructor
@Component
public class ConversationDTO {

    private Long id;
    private List<UserIdFirstNameUplet> users;
    
    private KeycloakFeignClient keycloakFeignClient ;
    
    @Autowired
    public ConversationDTO(KeycloakFeignClient keycloakFeignClient) {
        this.keycloakFeignClient = keycloakFeignClient;
    }

@Bean 
public UserInfoResponse bean(){
    UserInfoResponse response = keycloakFeignClient.findUserById("bbb83ed4-4174-456a-979b-ebf49b3d9d82");
    System.out.println(response.getFirstName());
    System.out.println("Feign client response " + response);
    return response ;
}

    public ConversationDTO(Long id, List<UserIdFirstNameUplet> users) {
        this.id = id;
        this.users = users;
    }

    public ConversationDTO(Conversation conversation) {
        this.users =new ArrayList<>();
        this.id =conversation.getId();

        for (String user : conversation.getUserIds()) {
            String id = user;
            System.out.println("user id " + id);
            UserInfoResponse response = keycloakFeignClient.findUserById(id);
            System.out.println("first name " + response.getFirstName());
            this.users.add(new UserIdFirstNameUplet(response.getId(), response.getFirstName()));
        }
    }
}
