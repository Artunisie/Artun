package com.example.chatservice.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.converter.SimpleMessageConverter;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import com.example.chatservice.* ;
import com.example.chatservice.models.Conversation;
import com.example.chatservice.models.User;
import com.example.chatservice.payload.response.MessageDTO;
import com.example.chatservice.repository.ConversationRepository;
import com.example.chatservice.service.KeycloakFeignClient;





@Controller
public class WebSocketTestController {

@Autowired
ConversationRepository conversationRepository;

@Autowired
private KeycloakFeignClient keycloakFeignClient ; 

@Autowired
private SimpMessagingTemplate simpMessagingTemplate ;

    @MessageMapping("conversation/{id}")//gets from resume
    public String UpdateConversation(@DestinationVariable("id") Long conversationId, MessageDTO messagerequest) {

System.out.println("conversationId"+conversationId);
        Conversation conversation = conversationRepository.findById(conversationId).get() ;
List<String> users = conversation.getUserIds() ;

for (String user : users) {

    simpMessagingTemplate.convertAndSend("/start/conversation/"+user,messagerequest) ; 
}
        return "ok";
    }





}