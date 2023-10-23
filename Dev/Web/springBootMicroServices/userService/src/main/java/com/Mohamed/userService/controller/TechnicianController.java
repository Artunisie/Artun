package com.Mohamed.userService.controller;

import com.Mohamed.userService.entity.Admin;
import com.Mohamed.userService.entity.Technician;
import com.Mohamed.userService.exceptions.AccountNotActivateException;
import com.Mohamed.userService.exceptions.UserNotFoundException;
import com.Mohamed.userService.service.TechnicianService;
import com.Mohamed.userService.service.UserService;
import com.Mohamed.userService.util.linksUtil;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/artun/app/user/technician/")
@RequiredArgsConstructor
public class TechnicianController {
    private final TechnicianService technicianService;
    private final UserService userService;
    private final linksUtil util;

    @PostMapping("/add")
    public ResponseEntity<String> addStudent(@RequestBody Technician technician, HttpServletRequest request){
        boolean enregistrementReussi = technicianService.addTechnician(technician);
        String applicationURL = util.getSiteURL(request);
        userService.sendVerificationEmail(technician, applicationURL);
        if (enregistrementReussi) {
            return ResponseEntity.ok("Votre enregistrement sur le site a été effectué avec succès ! Veuillez vérifier votre adresse e-mail pour activer votre compte.");
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Erreur lors de l'enregistrement.");
        }
    }

    @PutMapping("/update")
    public ResponseEntity<String> updateTechnician(@RequestBody Technician technician, @RequestParam("email") String email) {
        boolean isUpdated  = technicianService.updateTechnician(technician, email);
        if (isUpdated) {
            return ResponseEntity.ok("Mise à jour du Technicien réussie.");
        } else {
            return ResponseEntity.badRequest().body("Impossible de mettre à jour les informations du Technicien.");
        }

    }
}
