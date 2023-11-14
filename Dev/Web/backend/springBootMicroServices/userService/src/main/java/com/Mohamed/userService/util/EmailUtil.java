package com.Mohamed.userService.util;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EmailUtil {
    private final JavaMailSender mailSender;

    public void sendSimpleMessage(String toEmail,
                                  String fromEmail,
                                  String body,
                                  String subject) throws MessagingException {

        //SimpleMailMessage message1 = new SimpleMailMessage();
        // Pour Inclure le contenu html
        MimeMessage message = mailSender.createMimeMessage();
        // L'objet MimeMessageHelper est utilisé pour ajouter des destinataires, des expéditeurs, des sujets, du texte, du contenu HTML, des pièces jointes, etc., à l'objet MimeMessage
        MimeMessageHelper helper = new MimeMessageHelper(message,true);

        helper.setFrom(fromEmail);
        helper.setTo(toEmail);
        helper.setText(body,true);
        helper.setSubject(subject);

        /*ClassPathResource imageResource = new ClassPathResource("images/mail.jpg");
        helper.addInline("myImage", imageResource);*/

        mailSender.send(message);
        System.out.println("Mail send successfuly");

    }
}
