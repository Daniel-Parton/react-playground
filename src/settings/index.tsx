import { get } from 'js-cookie';

export interface AppSettingsProps {
  appUrl: string
}

export const cypressTestCookieName = 'Cypress-Test';

const getAppSettings = () => {
  let appSettings: Partial<AppSettingsProps> = {
    localCypressTestEnabled: get(cypressTestCookieName) ? true : false,
    graphAuthority: 'https://graph.microsoft.com',
    ...{} as any
  };
  if (process.env.NODE_ENV === 'development') {
    appSettings.appUrl = 'http://localhost:3000';
  } else {
    appSettings.appUrl = '#{AppUrl}';
  }
  return appSettings;
}


export default getAppSettings;