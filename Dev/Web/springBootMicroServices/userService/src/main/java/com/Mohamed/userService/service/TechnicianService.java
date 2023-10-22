package com.Mohamed.userService.service;

import com.Mohamed.userService.entity.Admin;
import com.Mohamed.userService.entity.Technician;
import com.Mohamed.userService.repository.AdminRepository;
import com.Mohamed.userService.repository.TechnicianRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class TechnicianService {

    private final TechnicianRepository technicianRepository;
    private final UserService userService;

    public boolean addTechnician(Technician technician){
        try {
            //double A = technician.getRating();
            //double B = technician.getHourlyRate();
            //System.out.println(" a:"+ A + "\n"+ "B" + B );
            userService.addUser(technician);
            //System.out.println("*Technicien:"+technician.toString());
            technicianRepository.save(technician);
            return true;

        }catch (Exception e){
            e.printStackTrace();
            return false;
        }
    }
}
