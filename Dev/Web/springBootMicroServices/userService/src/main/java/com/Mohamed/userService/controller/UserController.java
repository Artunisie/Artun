package com.Mohamed.userService.controller;

import com.Mohamed.userService.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import static com.Mohamed.userService.myResources.Codes.ACCOUNT_VERIFIED;
import static com.Mohamed.userService.myResources.ErrorCodes.ACCOUNT_ALREADY_VERIFIED;
import static com.Mohamed.userService.myResources.ErrorCodes.ACCOUNT_NOT_FOUND;

@RestController
@RequestMapping("/artun/app/user/")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @GetMapping("/verify")
    public String verifyAccount(@RequestParam("code") String verificationCode) {
        int verified = userService.verify(verificationCode);

        switch (verified) {
            case ACCOUNT_VERIFIED:
                return "accountVerified";
            case ACCOUNT_NOT_FOUND:
                return "accountNotFound";
            case ACCOUNT_ALREADY_VERIFIED:
                return "accountAlreadyVerified";
            default:
                return "unknown";
        }
    }
}
