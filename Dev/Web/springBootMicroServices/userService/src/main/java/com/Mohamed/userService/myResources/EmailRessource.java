package com.Mohamed.userService.myResources;

public interface EmailRessource {

    String EMAIL_REGISTER_SUBJECT = "Confirmation de l'enregistrement sur Artun pour : ";
    String EMAIL_FORGOT_PASSWORD_SUBJECT = "Réinitialisation de mot de passe pour:  ";
    String EMAIL_FORGOT_PASSWORD_BODY = "Nous avons bien reçu votre demande de réinitialisation de mot de passe pour votre compte sur Artun.<br>Nous sommes là pour vous aider à récupérer l'accès à votre compte en toute sécurité." +
            "<br> Veuillez cliquez sur le lien ci-dessous pour accéder à la page de réinitialisation de mot de passe <br> <b>Remarque: le lien est valable seulement pour 2 heures</b>";
    String EMAIL_REGISTER_BODY = "Nous avons le plaisir de vous informer que votre enregistrement sur Artun a été complété avec succès.<br>Afin d'activer votre compte, veuillez cliquer sur le lien de vérification ci-dessous:";
    String EMAIL_SIGNATURE = "Cordialement,\n" + "L'équipe de Artun";

    String FROM_EMAIL = "artunsociety@gmail.com";

}
