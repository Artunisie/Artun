package com.example.chatservice.payload.request;

import com.example.chatservice.models.Conversation;
import com.example.chatservice.models.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;
@AllArgsConstructor
@NoArgsConstructor
@Data

public class ConversationDTO {

    private Long id;

    private List<UserIdFirstNameUplet> users ; 


    public static ConversationDTO  ConversationToDTO(Conversation conversation) {
        ConversationDTO dto = new ConversationDTO();
        dto.setUsers(new ArrayList<>());
        dto.setId(conversation.getId());
      
         for (User user : conversation.getUsers()) {
            
            dto.users.add(new UserIdFirstNameUplet(user.getId(), user.getFirstName()));
        }
        return dto;
    }
    

}
