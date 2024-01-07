//package com.Mohamed.userService.controller;
//
//
//import java.util.List;
//
//import org.keycloak.admin.client.Keycloak;
//import org.keycloak.admin.client.resource.UserResource;
//import org.keycloak.representations.idm.UserRepresentation;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.web.bind.annotation.*;
//
//import com.Mohamed.userService.dto.SimpleKeycloakUser;
//import com.Mohamed.userService.entity.User;
//
//import jakarta.validation.Valid;
//
//
//@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600, allowCredentials="true")
//@RestController
//@RequestMapping("api/")
//public class KeycloakController {
//
//    @Autowired
//private Keycloak keycloak;
//
//
//
//    @GetMapping("/user/{id}")
//    public User getUserById(@PathVariable("id") String id) {
//        UserResource userResource = keycloak.realm("Artun").users().get(id);
//       UserRepresentation userRep= userResource.toRepresentation() ;
//        User user = new User(userRep.getId() , userRep.getFirstName(),userRep.getLastName(),userRep.getEmail(),userRep.getCreatedTimestamp());
//
//        return user;
//    }
//}
