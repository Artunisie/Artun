package com.example.chatservice.payload.request ;

import com.example.chatservice.models.User;

public class UserIdFirstNameUplet {
    private String userId;
    private String firstName;

    public UserIdFirstNameUplet(String userId, String firstName) {
        this.userId = userId;
        this.firstName = firstName;
    }


    public String getUserId() {
        return userId;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }
}
