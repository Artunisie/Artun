// package com.Mohamed.userService.controller;

// import com.Mohamed.userService.entity.Admin;
// import com.Mohamed.userService.entity.Client;
// import com.Mohamed.userService.entity.Technician;
// import com.Mohamed.userService.service.AdminService;
// import com.Mohamed.userService.service.ClientService;
// import com.Mohamed.userService.service.UserService;
// import com.Mohamed.userService.util.linksUtil;
// import jakarta.servlet.http.HttpServletRequest;
// import lombok.RequiredArgsConstructor;
// import org.springframework.http.HttpStatus;
// import org.springframework.http.ResponseEntity;
// import org.springframework.web.bind.annotation.*;

// @RestController
// @RequestMapping("/artun/app/user/admin/")
// @RequiredArgsConstructor
// public class AdminController {

//     private final AdminService adminService;
//     private final UserService userService;
//     private final linksUtil util;

//     @PostMapping("/add")
//     public ResponseEntity<String> addStudent(@RequestBody Admin admin, HttpServletRequest request){
//         boolean enregistrementReussi = adminService.addAdmin(admin);
//         String applicationURL = util.getSiteURL(request);
//         userService.sendVerificationEmail(admin, applicationURL);
//         if (enregistrementReussi) {
//             return ResponseEntity.ok("Votre enregistrement sur le site a été effectué avec succès ! Veuillez vérifier votre adresse e-mail pour activer votre compte.");
//         } else {
//             return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Erreur lors de l'enregistrement.");
//         }
//     }

//     @PutMapping("/update")
//     public ResponseEntity<String> updateTechnician(@RequestBody Admin admin, @RequestParam("email") String email) {
//         boolean isUpdated = adminService.updateAdmin(admin, email);
//         if (isUpdated) {
//             return ResponseEntity.ok("Mise à jour du admin réussie.");
//         } else {
//             return ResponseEntity.badRequest().body("Impossible de mettre à jour les informations de l'admin.");
//         }
//     }
// }
