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

import java.util.Map;

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

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteUser(@PathVariable("id") Long id) {
        boolean suppressionReussie = userService.deleteUser(id);
        if (suppressionReussie) {
            return ResponseEntity.ok("L'utilisateur a été supprimé avec succès.");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("L'utilisateur n'existe pas ou n'a pas pu être supprimé.");
        }
    }

    @GetMapping("/findById/{userId}")
    public ResponseEntity<?> ifUserExists(@PathVariable Long userId) {
        Map<String, Boolean> userExists;
        try {
            userExists = userService.ifUserExiste(userId);
        } catch (UserNotFoundException ex) {
            return new ResponseEntity<>("USER service respond : L'utilisateur avec l'ID " + userId + " n'a pas été trouvé.", HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(userExists, HttpStatus.OK);
    }


}
