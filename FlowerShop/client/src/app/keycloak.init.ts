import { KeycloakService, KeycloakOptions } from 'keycloak-angular';
import { KeycloakConfig } from 'keycloak-js';

export function initializeKeycloak(keycloak: KeycloakService) {
  return () =>
    keycloak.init({
      config: {
        url: 'http://127.0.0.1:8080',
        realm: 'FlowerShop',
        clientId: 'FlowerShopClientApp',
      },
      initOptions: {
        checkLoginIframe: false,
        checkLoginIframeInterval: 25,
      },
      // initOptions: {
      //   onLoad: 'check-sso',
      //   silentCheckSsoRedirectUri: window.location.origin + '/assets/silent-check-sso.html'
      // },
      // loadUserProfileAtStartUp: true
    });
}
