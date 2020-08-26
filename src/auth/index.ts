import { MsalAuthProvider, LoginType } from 'react-aad-msal';
import getSettings from '../settings';
import { Configuration, AuthenticationParameters } from 'msal';

const settings = getSettings();

const getConfig = (authAuthority: string, authClientId: string) => {
  const config: Configuration = {
    auth: {
      authority: authAuthority,
      clientId: authClientId,
      validateAuthority: false,
      redirectUri: settings.appUrl,
      postLogoutRedirectUri: settings.appUrl,
      navigateToLoginRequestUrl: false
    },
    cache: {
      cacheLocation: "localStorage",
      storeAuthStateInCookie: true,
    },
    framework: {
      isAngular: false
    }
  };

  return config;
};


export const getAuthParams = (scopeUrl: string, authAuthority: string) => {
  const params: AuthenticationParameters = {
    scopes: [
      scopeUrl,
    ],
    extraScopesToConsent: [
      'https://graph.microsoft.com/User.Read',
      'https://graph.microsoft.com/User.ReadBasic.All',
    ],
    authority: authAuthority
  }
  return params;
};

export const getAuthProvider = (authAuthority: string, authClientId: string, scopeUrl: string) => {
  return new MsalAuthProvider(getConfig(authAuthority, authClientId), getAuthParams(scopeUrl, authAuthority), {
    loginType: LoginType.Redirect,
    tokenRefreshUri: settings.appUrl
  });
};