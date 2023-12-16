// package com.Mohamed.userService.service;

// import com.Mohamed.userService.entity.Client;
// import com.Mohamed.userService.entity.Technician;
// import com.Mohamed.userService.exceptions.AccountNotActivateException;
// import com.Mohamed.userService.exceptions.UserNotFoundException;
// import com.Mohamed.userService.repository.ClientRepository;
// import lombok.RequiredArgsConstructor;
// import lombok.extern.slf4j.Slf4j;
// import org.springframework.stereotype.Service;

// @Service
// @RequiredArgsConstructor
// @Slf4j
// public class ClientService {

//     private final ClientRepository clientRepository;
//     private final UserService userService;

//     public boolean addClient(Client client){
//         try {
//             userService.addUser(client);
//             clientRepository.save(client);
//             return true;

//         }catch (Exception e){
//             e.printStackTrace();
//             return false;
//         }
//     }

//     public boolean updateClient(Client client, String email) {
//         try {
//             userService.updateUser(client, email);
//             Client existingClient = clientRepository.findClientByEmail(email);
//             clientRepository.save(existingClient);
//             return true;
//         } catch (UserNotFoundException userNotFoundException) {
//             userNotFoundException.printStackTrace();
//             return false;
//         } catch (AccountNotActivateException accountNotActivateException) {
//             accountNotActivateException.printStackTrace();
//             return false;
//         }
//     }
// }
