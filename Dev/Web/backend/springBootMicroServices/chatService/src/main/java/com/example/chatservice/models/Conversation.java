package com.example.chatservice.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Data
@Entity
public class Conversation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    

    
    @ElementCollection
    @CollectionTable(joinColumns = @JoinColumn(name = "conversation_id"))
    private List<String> userIds;


    @JsonIgnore
    @OneToMany(mappedBy = "conversation")
    private List<Message> messages;


    //make the equals function to return true when the 2 conversations have the same ID
    @Override
    public boolean equals(Object obj) {
        if (this == obj)
            return true;
        if (obj == null)
            return false;
        if (getClass()!= obj.getClass())
            return false;
        Conversation other = (Conversation) obj;
        if (id == null){
            return false;
        }
        if (other.id == null) {
            return false;
        }
        return id.equals(other.id);
    }



}