package com.Mohamed.userService.repository;

import com.Mohamed.userService.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User,Long> {
    Optional<User> findUserByEmail(String email);

    Optional<User> findUserByNumCin(Integer numCin);

    User findUserByVerificationCode(String code);

    User findUserByRestPasswordToken(String restPasswordToken);
}
