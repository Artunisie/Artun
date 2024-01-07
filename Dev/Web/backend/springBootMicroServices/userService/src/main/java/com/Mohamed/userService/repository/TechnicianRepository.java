package com.Mohamed.userService.repository;

import com.Mohamed.userService.entity.Technician;
 import org.springframework.data.jpa.repository.JpaRepository;

 public interface TechnicianRepository extends JpaRepository<Technician,Long> {
   Technician findTechnicianByEmail(String email);
 }
