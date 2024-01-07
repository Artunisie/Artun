package com.Mohamed.userService.service;

 import com.Mohamed.userService.dto.ResetPasswordRequeste;
 import com.Mohamed.userService.entity.Client;
 import com.Mohamed.userService.entity.Technician;
 import com.Mohamed.userService.entity.User;
 import com.Mohamed.userService.exceptions.AccountNotActivateException;
 import com.Mohamed.userService.exceptions.InvalidEntityException;
 import com.Mohamed.userService.exceptions.UserNotFoundException;
 import com.Mohamed.userService.repository.UserRepository;
 import com.Mohamed.userService.util.EmailUtil;
 import com.Mohamed.userService.util.PasswordEncoderUtil;
 import jakarta.mail.MessagingException;
 import lombok.RequiredArgsConstructor;
 import lombok.extern.slf4j.Slf4j;
 import net.bytebuddy.utility.RandomString;
 import reactor.core.publisher.Flux;
 import reactor.core.publisher.Mono;

 import org.springframework.stereotype.Service;

 import java.util.*;

 import static com.Mohamed.userService.enumerations.UserTypes.CLIENT;
 import static com.Mohamed.userService.enumerations.UserTypes.TECHNICIAN;
 import static com.Mohamed.userService.myResources.EmailRessource.*;
 import static com.Mohamed.userService.myResources.ErrorCodes.ACCOUNT_ALREADY_VERIFIED;
 import static com.Mohamed.userService.myResources.ErrorCodes.ACCOUNT_NOT_FOUND;

 @Service
 @Slf4j
 @RequiredArgsConstructor
 public class UserService {
     private final UserRepository userRepository;
     private final EmailUtil emailUtil;

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

//     public void sendVerificationEmail(User user, String siteURL) {
//         String toEmail = user.getEmail();
//         String fullName = user.getFirstName() + user.getLastName();
//         String emailSubject = EMAIL_REGISTER_SUBJECT;
//         emailSubject += fullName;

//         String emailBody = getString(user, siteURL);
//         try {
//             emailUtil.sendSimpleMessage(toEmail, FROM_EMAIL, emailBody, emailSubject);
//         } catch (MessagingException e) {
//             System.err.println("Une erreur s'est produite lors de l'envoi de l'email : " + e.getMessage());

//         }
//     }

//     private static String getString(User user, String siteURL) {
//         String verifyURL = siteURL + "/artun/app/user/verify?code=" + user.getVerificationCode();
//         String emailBody = EMAIL_REGISTER_BODY;
//         emailBody += "<br><br><body>\n" + "    <div style=\"display: inline-block;\">\n" + " <img src=\"https://i.postimg.cc/9QHBGTfv/mail.jpg\" alt=\"Image\"/>\n" + "        <h3 style=\"text-align: center;\"><a href=\"" + verifyURL + "\" style=\"text-align: center;\">VÉRIFIER VOTRE E-MAIL ICI</a></h3>\n" + "        \n" + "    </div>\n" + "</body>";
//         emailBody += "\n" + EMAIL_SIGNATURE;
//         return emailBody;
//     }

//     public int verify(String verificationCode) {
//         User user = userRepository.findUserByVerificationCode(verificationCode);
//         int errorCode = 0;
//         if (user == null) {
//             errorCode = ACCOUNT_NOT_FOUND;
//         } else if (user.isEnable()) {
//             errorCode = ACCOUNT_ALREADY_VERIFIED;
//         } else {
//             user.setEnable(true);
//             userRepository.save(user);
//         }
//         return errorCode;
//     }

//     public void generateRestPasswordTokenAndLink(String email, String siteURL) throws UserNotFoundException {
//         User user = userRepository.findUserByEmail(email).get();
//         String token = null;
//         if (user != null) {
//             token = RandomString.make(64);
//             user.setRestPasswordToken(token);

//             Calendar calendar = Calendar.getInstance();
//             calendar.add(Calendar.HOUR, 2);
//             Date expirationDate = calendar.getTime();
//             user.setResetPasswordTokenExpiration(expirationDate);

//             userRepository.save(user);
//             sendForgotPasswordEmail(user, siteURL);
//         } else {
//             throw new UserNotFoundException("Could not find a user with this email");
//         }
//     }

//     public void sendForgotPasswordEmail(User user, String siteUrl) {
//         String restPasswordLink = siteUrl + "/artun/app/user/restPassword/procedure?token=" + user.getRestPasswordToken();
//         String toEmail = user.getEmail();
//         String emailSubject = EMAIL_FORGOT_PASSWORD_SUBJECT + toEmail;
//         String emailBody = EMAIL_FORGOT_PASSWORD_BODY;
//         emailBody += "<br><br><body>\n" + "    <div style=\"display: inline-block;\">\n" + "  <img src=\"https://i.postimg.cc/KzZXhzGM/passw-ord.jpg\" alt=\"Image\" style=\"display: block; margin: 0 auto;\" />\n" + "   <h3><a href=\"" + restPasswordLink + "\" style=\"text-align: center;\">REINITIALISEZ VOTRE MOT DE PASSE ICI</a></h3>\n" + "        \n" + "    </div>\n" + "</body>";
//         emailBody += "\n" + EMAIL_SIGNATURE;
//         try {
//             emailUtil.sendSimpleMessage(toEmail, FROM_EMAIL, emailBody, emailSubject);
//         } catch (MessagingException e) {
//             System.err.println("Une erreur s'est produite lors de l'envoi de l'email : " + e.getMessage());

//         }

//     }

//     public User getUserByRestPasswordToken(String restPasswordToken) {
//         return userRepository.findUserByRestPasswordToken(restPasswordToken);
//     }

//     public void restPassword(ResetPasswordRequeste requeste) {
//         String restPasswordToken = requeste.getRestPasswordToken();
//         String newPassword = requeste.getNewPassword();

//         System.out.println(newPassword);
//         System.out.println(restPasswordToken);

//         if (restPasswordToken == null || newPassword == null) {
//             throw new IllegalArgumentException("Token de réinitialisation et nouveau mot de passe sont requis.");
//         }
//         User user = getUserByRestPasswordToken(restPasswordToken);
//         if (user != null) {
//             Date now = new Date();
//             Date expirationDate = user.getResetPasswordTokenExpiration();
//             if (expirationDate != null && now.before(expirationDate)) {

//                 newPassword = PasswordEncoderUtil.crypterPassword(newPassword);
//                 user.setPassword(newPassword);
//                 user.setRestPasswordToken(null);
//                 user.setResetPasswordTokenExpiration(null);
//                 userRepository.save(user);
//             } else {
//                 throw new IllegalArgumentException("Le token de réinitialisation de mot de passe a expiré.");
//             }
//         } else {
//             throw new IllegalArgumentException("Étudiant non trouvé.");
//         }
//     }

//     public void updateUser(User user, String email) throws UserNotFoundException, AccountNotActivateException {
//         User userToUpdate = userRepository.findUserByEmail(email).orElse(null);
//         if (userToUpdate == null) {
//             throw new UserNotFoundException("L'utilisateur avec l'adresse e-mail " + email + " n'a pas été trouvé. Impossible de mettre à jour l'utilisateur.");
//         } else if (!userToUpdate.isEnable()) {
//             throw new AccountNotActivateException("Le compte n'est pas activé. Impossible de mettre à jour les informations de l'utilisateur.");
//         } else {
//             userToUpdate.setNumCin(user.getNumCin());
//             userToUpdate.setFirstName(user.getFirstName());
//             userToUpdate.setLastName(user.getLastName());
//             userToUpdate.setPhoneNumber(user.getPhoneNumber());
//             userToUpdate.setDateOfBirth(user.getDateOfBirth());
//             userToUpdate.setAddress(user.getAddress());
//             userToUpdate.setEmail(user.getEmail());

//             String password = user.getPassword();
//             String cryptedPassword = PasswordEncoderUtil.crypterPassword(password);
//             userToUpdate.setPassword(cryptedPassword);
//             userRepository.save(userToUpdate);
//         }
//     }

//     public boolean deleteUser(Long id) {
//         if (id == null) {
//             log.error("Utilisateur ID is null");
//             return false;
//         }
//         Optional<User> user = userRepository.findById(id);
//         if (user.isPresent()) {
//             userRepository.deleteById(id);
//             log.info("Utilisateur avec ID " + id + " a été supprimé avec succès.");
//             return true;
//         } else {
//             log.warn("Utilisateur avec ID " + id + " n'existe pas. Aucune suppression effectuée.");
//             return false;
//         }
//     }

//     public Map<String, Boolean> ifUserExiste(Long userId) throws UserNotFoundException {
//         Optional<User> user = userRepository.findById(userId);
//         String userType = "";
//         boolean exicte = false;

//         if(user.isPresent()){
//             User myUser = user.get();

//             if(myUser instanceof Client){
//                 userType = CLIENT.name();
//                 exicte = true;
//             }else if(myUser instanceof Technician){
//                 userType = TECHNICIAN.name();
//                 exicte = true;
//             }

//             Map<String, Boolean> userMap = new HashMap<>();
//             userMap.put(userType,exicte);

//             //Debug
//             log.info("validated");

//             return userMap;
//         }else {
//             throw new UserNotFoundException("USER service respond : L'utilisateur avec l'ID " + userId + " n'a pas été trouvé.");
//         }

//     }

//     public User saveUser(User user) {
//         return userRepository.save(user);
//     }

//     public List<User> findAllUsers() {
//         return userRepository.findAll();
//     }


// }