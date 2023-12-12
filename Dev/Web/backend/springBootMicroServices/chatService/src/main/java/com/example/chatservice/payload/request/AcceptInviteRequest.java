package com.example.chatservice.payload.request;

import lombok.Data;

@Data
public class AcceptInviteRequest {
    
    private Long inviteId ; 
    private Long userId  ; 


}
