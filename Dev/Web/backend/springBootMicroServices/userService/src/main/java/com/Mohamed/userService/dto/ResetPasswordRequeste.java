package com.Mohamed.userService.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
//@Builder de Lombok et est utilisée pour générer automatiquement un constructeur de type "builder" pour laclasse
public class ResetPasswordRequeste {
    private String restPasswordToken;
    private String newPassword;
}
