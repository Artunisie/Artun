package com.Mohamed.userService.service;

import com.Mohamed.userService.entity.User;
import com.Mohamed.userService.util.PasswordEncoderUtil;
import net.bytebuddy.utility.RandomString;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public class UserService {

    public void addUser(User user){
        String password = user.getPassword();
        String cryptedPassword = PasswordEncoderUtil.crypterPassword(password);
        user.setPassword(cryptedPassword);
        user.setEnable(false);
        String randomCode = RandomString.make(64);
        user.setVerificationCode(randomCode);
        Date currentDate = new Date();
        user.setAccountCreationDate(currentDate);
    }

}
