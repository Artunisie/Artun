import { KeycloakService } from 'keycloak-angular';
import { environment } from './environment';

export function initializeKeycloak(keycloak: KeycloakService) {
  const config = {
    url: environment.keycloakUrl,
    realm: environment.keycloakRealm,
    clientId: environment.keycloakClientId,
  };

  keycloak.init({
    config,
    initOptions: {
      onLoad: 'login-required',
      checkLoginIframe: false,
    },
    enableBearerInterceptor: true,
    bearerExcludedUrls: ['/assets', '/favicon.ico'],
  });
}
