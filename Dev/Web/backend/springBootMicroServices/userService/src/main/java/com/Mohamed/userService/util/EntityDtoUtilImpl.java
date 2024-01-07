// package com.Mohamed.userService.util;
//
// import org.springframework.beans.BeanUtils;
// import org.springframework.stereotype.Component;
//
// import com.Mohamed.userService.dto.SimpleKeycloakUser;
// import com.Mohamed.userService.entity.Admin;
// import com.Mohamed.userService.entity.Client;
// import com.Mohamed.userService.entity.Technician;
// import com.Mohamed.userService.entity.User;
//
// @Component
// public class EntityDtoUtilImpl implements EntityDtoUtil{
//
//     @Override
//     public User mapSimpleKeycloakToUser(SimpleKeycloakUser simpleKeycloakUser) {
//         User user ;
//         if (simpleKeycloakUser.getRole() == "technicien"){
//             user= new Technician() ;
//         BeanUtils.copyProperties(simpleKeycloakUser,user);
//         // user.setLastName(simpleKeycloakUser.getFirstName());
//         // user.setLastName(simpleKeycloakUser.getLastName());
//         return user;
//         }
//          else if (simpleKeycloakUser.getRole() == "admin"){
//             user= new Admin() ;
//         BeanUtils.copyProperties(simpleKeycloakUser,user);
//         // user.setLastName(simpleKeycloakUser.getFirstName());
//         // user.setLastName(simpleKeycloakUser.getLastName());
//          return user;
//         }
//         else { //meaning user is a client
//             user= new Client() ;
//         BeanUtils.copyProperties(simpleKeycloakUser,user);
//         // user.setLastName(simpleKeycloakUser.getFirstName());
//         // user.setLastName(simpleKeycloakUser.getLastName());
//         return user;
//         }
//     }
// }
