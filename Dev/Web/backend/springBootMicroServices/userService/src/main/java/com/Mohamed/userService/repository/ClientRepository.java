 package com.Mohamed.userService.repository;

 import com.Mohamed.userService.entity.Client;
 import com.Mohamed.userService.entity.Technician;
 import org.springframework.data.jpa.repository.JpaRepository;

 public interface ClientRepository extends JpaRepository<Client, Long> {

<<<<<<< HEAD
    Client findClientByEmail(String email);
=======
     Client findClientByEmail(String email);
>>>>>>> 131adcc0678076388b19741e9ca2599f75c81b52

 }
