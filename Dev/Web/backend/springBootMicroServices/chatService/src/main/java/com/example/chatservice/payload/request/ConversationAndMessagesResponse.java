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
@Data
public class ConversationAndMessagesResponse {

  @Autowired
  private KeycloakFeignClient keycloakFeignClient ;

    private List<UserIdFirstNameUplet> users ; 

    private List<MessageDTO> messages;

    ConversationAndMessagesResponse(){

    }
    public ConversationAndMessagesResponse(Conversation conversation){
      this.messages = new ArrayList<MessageDTO>() ; 
      this.users = new ArrayList<UserIdFirstNameUplet>() ;  
      //sysout every message on the list messages
      for (Message message : conversation.getMessages()) {
// MessageDTO instance 
this.messages.add(new MessageDTO(message)); 
      }
//loop throught the users array list and create a UserIdFirstNameUplet instance for every user in the conversation and add it to the ArrayList
      for (String user : conversation.getUserIds()) {
        String id = user ; 
        String FirstName = keycloakFeignClient.findUserById(id).getFirstName() ;
        this.users.add(new UserIdFirstNameUplet(id,FirstName));
      }
    }
    


}
