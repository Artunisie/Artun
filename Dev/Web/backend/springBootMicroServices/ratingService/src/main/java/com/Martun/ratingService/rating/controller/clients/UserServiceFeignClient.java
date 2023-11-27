package com.Martun.ratingService.rating.controller.clients;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "users-services", url = "http://localhost:8001/artun/app/user")
public interface UserServiceFeignClient {
    @GetMapping("/findById/{userId}")
    ResponseEntity<?> ifUserExists(@PathVariable("userId") Long userId);
}
