package com.example.chatservice.payload.request;

import lombok.Data;

@Data
public class InviteRequest {
    private Long senderId  ; 
    private String recieverEmail  ; 

}
