package com.Mohamed.userService.service;

import com.Mohamed.userService.entity.Client;
import com.Mohamed.userService.repository.ClientRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class ClientService {

    private final ClientRepository clientRepository;
    private final UserService userService;

    public boolean addClient(Client client){
        try {
            userService.addUser(client);
            clientRepository.save(client);
            return true;

        }catch (Exception e){
            e.printStackTrace();
            return false;
        }
    }
}
