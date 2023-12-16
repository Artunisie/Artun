package com.example.chatservice.payload.request;

import lombok.Data;

@Data
public class CreateConversationRequest {
    
    private String userId ; 
    private String proposition_user_id  ; 


}
