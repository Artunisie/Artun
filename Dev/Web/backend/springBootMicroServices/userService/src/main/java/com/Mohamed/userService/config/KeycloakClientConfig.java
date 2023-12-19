package com.Mohamed.userService.config;


import org.jboss.resteasy.client.jaxrs.ResteasyClientBuilder;
import org.keycloak.OAuth2Constants;
import org.keycloak.admin.client.Keycloak;
import org.keycloak.admin.client.KeycloakBuilder;
import org.keycloak.admin.client.resource.RealmResource;
import org.keycloak.representations.idm.UserRepresentation;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;

@Component
public class KeycloakClientConfig {

 @Bean
    public Keycloak keycloak() {
 Keycloak keycloak = KeycloakBuilder.builder()
    .serverUrl("http://localhost:8080")
    .realm("master")
    .clientId("admin-cli")
    .username("admin")
    .password("admin")
    .grantType(OAuth2Constants.PASSWORD)
    .build();

keycloak.tokenManager().getAccessToken();
RealmResource realmResource = keycloak.realm("Artun");
UserRepresentation userRepresentation = realmResource.users().get("bbb83ed4-4174-456a-979b-ebf49b3d9d82").toRepresentation();

// Access and print specific attributes
System.out.println("User ID: " + userRepresentation.getId());
System.out.println("Username: " + userRepresentation.getUsername());
System.out.println("Email: " + userRepresentation.getEmail());        return keycloak;
    }
        
}
