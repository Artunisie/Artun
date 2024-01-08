<<<<<<< HEAD
package com.Mohamed.userService.repository;

import com.Mohamed.userService.entity.Technician;
 import org.springframework.data.jpa.repository.JpaRepository;

 public interface TechnicianRepository extends JpaRepository<Technician,Long> {
   Technician findTechnicianByEmail(String email);
=======
 package com.Mohamed.userService.repository;

 import com.Mohamed.userService.entity.Technician;
 import org.springframework.data.jpa.repository.JpaRepository;

 public interface TechnicianRepository extends JpaRepository<Technician,Long> {
     Technician findTechnicianByEmail(String email);
>>>>>>> 131adcc0678076388b19741e9ca2599f75c81b52
 }
