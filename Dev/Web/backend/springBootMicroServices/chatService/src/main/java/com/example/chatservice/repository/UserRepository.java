package com.example.chatservice.repository;


import com.example.chatservice.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

 Optional <User> findById(Long id ) ; 

  Optional<User> findByEmail(String Email);

  Boolean existsByFirstName(String firstName);

  Boolean existsByEmail(String email);

List<User>  findByEmailContainingIgnoreCase(String Email) ; 
 Optional<User> findByResetPasswordToken(String token);
}
