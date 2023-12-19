package com.example.chatservice.repository;

import com.example.chatservice.models.Conversation;
import com.example.chatservice.models.User;

import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface ConversationRepository extends JpaRepository<Conversation, Long> {
   Optional<Conversation> findById(Long id);
   @Query("SELECT c FROM Conversation c WHERE :userId MEMBER OF c.userIds")
   List<Conversation> findByUserId(@Param("userId") String userId);
}
