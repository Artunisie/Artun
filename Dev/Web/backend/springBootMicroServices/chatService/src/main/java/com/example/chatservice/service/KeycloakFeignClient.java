package com.example.chatservice.service;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import com.example.chatservice.payload.response.UserInfoResponse;



@FeignClient(name = "users-services", url = "http://localhost:8089/api/")
public interface KeycloakFeignClient {

    @GetMapping("user/{id}")
    UserInfoResponse findUserById(@PathVariable("id") String id);
}
