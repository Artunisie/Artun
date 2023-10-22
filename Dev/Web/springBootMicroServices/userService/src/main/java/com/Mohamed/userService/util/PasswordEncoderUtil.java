package com.Mohamed.userService.util;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class PasswordEncoderUtil {

    private static final BCryptPasswordEncoder PASSWORD_ENCODER = new BCryptPasswordEncoder();

    public static String crypterPassword(String password){
        return PASSWORD_ENCODER.encode(password);
    }

    public static boolean verifierPassword(String password, String encodedPassword){
        return
                PASSWORD_ENCODER.matches(password,encodedPassword);
    }
}
