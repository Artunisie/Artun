package com.Mohamed.userService.repository;

import com.Mohamed.userService.entity.Client;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ClientRepository extends JpaRepository<Client, Long> {
}
