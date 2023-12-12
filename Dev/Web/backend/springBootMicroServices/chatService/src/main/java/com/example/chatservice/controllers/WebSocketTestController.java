package com.example.chatservice.controllers;

import com.example.chatservice.models.Conversation;
import com.example.chatservice.models.User;
import com.example.chatservice.payload.response.MessageDTO;
import com.example.chatservice.repository.ConversationRepository;
import com.example.chatservice.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import java.util.List;
@Controller
public class WebSocketTestController {

@Autowired
ConversationRepository conversationRepository;

@Autowired
private UserRepository userRepository ; 

@Autowired
private SimpMessagingTemplate simpMessagingTemplate ;

    @MessageMapping("conversation/{id}")//gets from resume
    public String UpdateConversation(@DestinationVariable("id") Long conversationId, MessageDTO messagerequest) {

System.out.println("conversationId"+conversationId);
        Conversation conversation = conversationRepository.findById(conversationId).get() ;
List<User> users = conversation.getUsers() ;

for (User user : users) {

    simpMessagingTemplate.convertAndSend("/start/conversation/"+user.getId(),messagerequest) ; 
}
        return "ok";
    }





}