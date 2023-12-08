package com.example.chatservice.payload.request;

import com.example.chatservice.models.Conversation;
import com.example.chatservice.models.Message;
import com.example.chatservice.models.User;
import com.example.chatservice.payload.response.MessageDTO;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;
@Data
public class ConversationAndMessagesResponse {

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
      for (User user : conversation.getUsers()) {
        this.users.add(new UserIdFirstNameUplet(user.getId(),user.getFirstName()));
      }
    }
    


}
