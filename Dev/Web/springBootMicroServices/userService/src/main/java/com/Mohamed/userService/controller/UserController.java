package com.Mohamed.userService.controller;

import com.Mohamed.userService.dto.ResetPasswordRequeste;
import com.Mohamed.userService.exceptions.UserNotFoundException;
import com.Mohamed.userService.service.UserService;
import com.Mohamed.userService.util.linksUtil;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import static com.Mohamed.userService.myResources.Codes.ACCOUNT_VERIFIED;
import static com.Mohamed.userService.myResources.ErrorCodes.ACCOUNT_ALREADY_VERIFIED;
import static com.Mohamed.userService.myResources.ErrorCodes.ACCOUNT_NOT_FOUND;

@RestController
@RequestMapping("/artun/app/user/")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;
    private final linksUtil util;

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


    @GetMapping("/restPassword/request")
    public ResponseEntity<String> restPasswordRequest(@RequestParam("email") String email, HttpServletRequest request){
        String applicationURL = util.getSiteURL(request);
        try {
            userService.generateRestPasswordTokenAndLink(email,applicationURL);
            return ResponseEntity.ok("Password token generated check your email");
        }catch (UserNotFoundException e)
        {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @PostMapping("/restPassword/procedure")
    public ResponseEntity<String> resetPassword(@RequestBody ResetPasswordRequeste requeste) {
        try {
            userService.restPassword(requeste);
            return new ResponseEntity<>("Réinitialisation de mot de passe réussie", HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            return new ResponseEntity<>("Une erreur s'est produite lors de la réinitialisation du mot de passe", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
