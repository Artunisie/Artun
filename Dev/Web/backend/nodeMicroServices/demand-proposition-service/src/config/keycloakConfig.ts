import KeycloakConnect, { KeycloakConfig } from 'keycloak-connect';
import express from 'express';
import session from 'express-session';

class KeycloakConfigService {
  private keycloak;

  constructor(router: express.Router) {
    this.keycloak = new KeycloakConnect({ store: new session.MemoryStore() });

    // Add a session middleware
    router.use(
      session({
        secret: 'your-secret-key',
        resave: false,
        saveUninitialized: true,
      })
    );

    // Initialize Keycloak middleware
    router.use(this.keycloak.middleware());
  }

  getKeycloak() {
    return this.keycloak;
  }
}

export default KeycloakConfigService;
