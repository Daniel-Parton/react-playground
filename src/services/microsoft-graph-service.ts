import { Client } from '@microsoft/microsoft-graph-client';
import { UserAgentApplication } from 'msal';
import getSettings from '../settings';

const settings = getSettings();

const getUserAgentApplication = (authClientId: string) => new UserAgentApplication({
  auth: {
    clientId: authClientId,
    redirectUri: settings.appUrl
  },
  cache: {
    cacheLocation: "localStorage",
    storeAuthStateInCookie: true
  }
});

async function getClient(userAgent: UserAgentApplication) {
  const accessToken = await userAgent.acquireTokenSilent({
    scopes: ['User.Read', 'User.ReadBasic.All']
  });
  return Client.init({
    authProvider: (done) => {
      done(null, accessToken.accessToken);
    }
  });
}
// GET me/
export async function getUserDetails(userAgent: UserAgentApplication) {
  const client = await getClient(userAgent);
  const user = await client.api('/me').get();
  return user;
}

// GET users/
export async function getAllUsersDetails(userAgent: UserAgentApplication) {
  const client = await getClient(userAgent);
  const allusers = await client.api('/users').get();
  return allusers;
}

// GET users by matching search string with firstName, surname, displayName or UPN
export async function searchForPeople(userAgent: UserAgentApplication, searchText: string) {
  const client = await getClient(userAgent);
  return await client.api('/users')
    .filter(`startsWith(givenName,'${searchText}') or startsWith(surname,'${searchText}') or startsWith(displayName, '${searchText}') or startsWith(userPrincipalName, '${searchText}')`)
    .select('displayName,givenName,surname,mail,userPrincipalName,id')
    .top(20)
    .get();
}

// GET me/people?$search={searchText}
export async function smartSearchForPeople(userAgent: UserAgentApplication, searchText: string) {
  const client = await getClient(userAgent);
  if (searchText) {
    return await client.api('/me/people')
      .select('displayName,givenName,surname,scoredEmailAddresses,userPrincipalName,id')
      .top(20)
      .get();
  }
  else {
    return await client.api('/me/people')
      .search(`${searchText}`)
      .select('displayName,givenName,surname,scoredEmailAddresses,userPrincipalName,id')
      .top(20)
      .get();
  }
}

// GET groups?$filter=startsWith(displayName, '${searchText}')
export async function searchForGroups(userAgent: UserAgentApplication, searchText: string) {
  const client = await getClient(userAgent);
  return await client.api('/groups')
    .filter(`startsWith(displayName,'${searchText}')`)
    .select('displayName,mail,id')
    .top(20)
    .get();
}
