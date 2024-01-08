 package com.Mohamed.userService.repository;

 import com.Mohamed.userService.entity.User;
 import org.springframework.data.jpa.repository.JpaRepository;
 import org.springframework.data.jpa.repository.Query;

 import java.util.Optional;

<<<<<<< HEAD
 public interface UserRepository extends JpaRepository<User,String> {
=======
 public interface UserRepository extends JpaRepository<User,Long> {
>>>>>>> 131adcc0678076388b19741e9ca2599f75c81b52
     Optional<User> findUserByEmail(String email);

      Optional<User> findUserByNumCin(Integer numCin);

      User findUserByVerificationCode(String code);

     User findUserByRestPasswordToken(String restPasswordToken);
 }
