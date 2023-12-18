package com.example.chatservice.payload.request;
import java.util.ArrayList;
import java.util.List;

import org.jboss.logging.Messages;
import org.keycloak.admin.client.Keycloak;
import org.springframework.beans.factory.annotation.Autowired;

import com.example.chatservice.models.Conversation;
import com.example.chatservice.models.Message;
import com.example.chatservice.models.User;
import com.example.chatservice.payload.response.MessageDTO;
import com.example.chatservice.service.KeycloakFeignClient;

import lombok.Data;
import lombok.NoArgsConstructor;
@Data
@NoArgsConstructor
public class ConversationAndMessagesResponse {

  
  private KeycloakFeignClient keycloakFeignClient ;

    private List<UserIdFirstNameUplet> users ; 

    private List<MessageDTO> messages;
@Autowired
    ConversationAndMessagesResponse(KeycloakFeignClient keycloakFeignClient) {
        this.keycloakFeignClient = keycloakFeignClient;
    }

  
    


}
