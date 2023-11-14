package com.Mohamed.userService.service;

import com.Mohamed.userService.entity.Admin;
import com.Mohamed.userService.entity.Client;
import com.Mohamed.userService.entity.Technician;
import com.Mohamed.userService.exceptions.AccountNotActivateException;
import com.Mohamed.userService.exceptions.UserNotFoundException;
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

    public boolean updateAdmin(Admin admin, String email) {
        try {
            userService.updateUser(admin, email);
            Admin existingAdmin = adminRepository.findAdminByEmail(email);
            adminRepository.save(existingAdmin); // Enregistrez existingTechnician, pas technician
            return true;
        } catch (UserNotFoundException userNotFoundException) {
            userNotFoundException.printStackTrace();
            return false;
        } catch (AccountNotActivateException accountNotActivateException) {
            accountNotActivateException.printStackTrace();
            return false;
        }
    }
}
