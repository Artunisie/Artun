package com.example.chatservice.payload.request;

import com.example.chatservice.models.User;

public class UserIdFirstNameUplet {
    private Long userId;
    private String firstName;

    public UserIdFirstNameUplet(Long userId, String firstName) {
        this.userId = userId;
        this.firstName = firstName;
    }
    UserIdFirstNameUplet(User user){
        this.userId = user.getId();
        this.firstName = user.getFirstName();    
    }

    public Long getUserId() {
        return userId;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }
}
