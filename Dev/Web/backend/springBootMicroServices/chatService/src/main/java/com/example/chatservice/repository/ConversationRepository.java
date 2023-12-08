package com.example.chatservice.repository;

import com.example.chatservice.models.Conversation;
import com.example.chatservice.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;


public interface ConversationRepository extends JpaRepository<Conversation, Long> {
   Optional<Conversation> findById(Long id);
   List<Conversation> findByUsers(User user);
}

