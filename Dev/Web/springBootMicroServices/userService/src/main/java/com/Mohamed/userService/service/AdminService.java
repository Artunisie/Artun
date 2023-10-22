package com.Mohamed.userService.service;

import com.Mohamed.userService.entity.Admin;
import com.Mohamed.userService.entity.Client;
import com.Mohamed.userService.repository.AdminRepository;
import com.Mohamed.userService.repository.ClientRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class AdminService {

    private final AdminRepository adminRepository;
    private final UserService userService;

    public boolean addAdmin(Admin admin){
        try {
            userService.addUser(admin);
            adminRepository.save(admin);
            return true;

        }catch (Exception e){
            e.printStackTrace();
            return false;
        }
    }
}
