package com.Mohamed.userService.repository;

import com.Mohamed.userService.entity.Admin;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AdminRepository extends JpaRepository<Admin, Long> {
}
