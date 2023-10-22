package com.Mohamed.userService.service;

import com.Mohamed.userService.entity.User;
import com.Mohamed.userService.exceptions.InvalidEntityException;
import com.Mohamed.userService.repository.UserRepository;
import com.Mohamed.userService.util.EmailUtil;
import com.Mohamed.userService.util.PasswordEncoderUtil;
import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;
import net.bytebuddy.utility.RandomString;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.Optional;

import static com.Mohamed.userService.myResources.EmailRessource.*;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final EmailUtil emailUtil;

    public void addUser(User user) {
        boolean emailTest = emailUserAlreadyExists(user.getEmail());
        boolean cinTest = numCinUserAlreadyExists(user.getNumCin());
       /* if (emailTest) {
            throw new InvalidEntityException("Un autre utilisateur avec le meme email existe deja");
        }
        if (cinTest) {
            throw new InvalidEntityException("Un autre utilisateur avec le meme cin existe deja");
        }*/
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

    public void sendVerificationEmail(User user, String siteURL) {
        String toEmail = user.getEmail();
        String fullName = user.getFirstName() + user.getLastName();
        String emailSubject = EMAIL_REGISTER_SUBJECT;
        emailSubject += fullName;

        String emailBody = getString(user, siteURL);
        try {
            emailUtil.sendSimpleMessage(toEmail, FROM_EMAIL, emailBody, emailSubject);
        } catch (MessagingException e) {
            System.err.println("Une erreur s'est produite lors de l'envoi de l'email : " + e.getMessage());

        }
    }

    private static String getString(User user, String siteURL) {
        String verifyURL = siteURL + "/artun/app/user/verify?code=" + user.getVerificationCode();
        String emailBody = EMAIL_REGISTER_BODY;
        emailBody += "<br><br><body>\n" + "    <div style=\"display: inline-block;\">\n" + "        <img src=\"https://i.postimg.cc/9QHBGTfv/mail.jpg\" alt=\"Image\"/>\n" + "        <h3 style=\"text-align: center;\"><a href=\"" + verifyURL + "\" style=\"text-align: center;\">VÉRIFIER VOTRE E-MAIL ICI</a></h3>\n" + "        \n" + "    </div>\n" + "</body>";
        emailBody += "\n" + EMAIL_SIGNATURE;
        return emailBody;
    }


}
