package com.Mohamed.userService.util;

import com.Mohamed.userService.dto.SimpleKeycloakUser;
import com.Mohamed.userService.entity.User;

@FunctionalInterface
public interface EntityDtoUtil {

    /**
     * this method should be implemented in order to split SimpleKeycloakUser into a keycllak user and a simple user while
     * the two users share the same id through the field "id"
     * @param simpleKeycloakUser
     * @return User
     */
    User mapSimpleKeycloakToUser(SimpleKeycloakUser simpleKeycloakUser);

}
