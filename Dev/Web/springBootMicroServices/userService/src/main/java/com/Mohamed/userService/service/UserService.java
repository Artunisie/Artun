package com.Mohamed.userService.service;

import com.Mohamed.userService.entity.User;
import com.Mohamed.userService.exceptions.InvalidEntityException;
import com.Mohamed.userService.repository.UserRepository;
import com.Mohamed.userService.util.PasswordEncoderUtil;
import lombok.RequiredArgsConstructor;
import net.bytebuddy.utility.RandomString;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;

    public void addUser(User user) {
        boolean emailTest = emailUserAlreadyExists(user.getEmail());
        boolean cinTest = numCinUserAlreadyExists(user.getNumCin());
        if (emailTest) {
            throw new InvalidEntityException("Un autre utilisateur avec le meme email existe deja");
        }
        if (cinTest) {
            throw new InvalidEntityException("Un autre utilisateur avec le meme cin existe deja");
        }
        String password = user.getPassword();
        String cryptedPassword = PasswordEncoderUtil.crypterPassword(password);
        user.setPassword(cryptedPassword);
        user.setEnable(false);
        String randomCode = RandomString.make(64);
        user.setVerificationCode(randomCode);
        Date currentDate = new Date();
        user.setAccountCreationDate(currentDate);
    }

    private boolean emailUserAlreadyExists(String email) {
        Optional<User> user = userRepository.findUserByEmail(email);
        return user.isPresent();
    }

    private boolean numCinUserAlreadyExists(Integer numCin) {
        Optional<User> user = userRepository.findUserByNumCin(numCin);
        return user.isPresent();
    }

}
