const iamDomain = process.env.IAM_URL;
const iamAdminUsername = process.env.IAM_ADMIN_USERNAME;
const iamAdminPassword = process.env.IAM_ADMIN_PASSWORD;
const iamRealm = process.env.IAM_REALM;
const iamClientId = process.env.IAM_CLIENT_ID;
const iamClientSecret = process.env.IAM_CLIENT_SECRET;

export async function createUser(accessToken, username, email, password) {
  console.log({
    type: 'createUser',
    accessToken: accessToken,
    username: username,
    email: email,
    password: password
  });
  const res = await fetch(`${iamDomain}/admin/realms/${iamRealm}/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
      'Authorization': `Bearer ${accessToken}`
    },
    body: JSON.stringify({
      username: username,
      enabled: 'true',
      email: email,
      emailVerified: 'true',
      "credentials":[{
        type: password,
        value: password,
        temporary: 'false'
      }]
    })
  });    
}

export async function getAdminToken() {  
  console.log('getAdminToken');
  const res = await fetch(`${iamDomain}/realms/master/protocol/openid-connect/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `Basic ${Buffer.from(`${iamClientId}:${iamClientSecret}`).toString('base64')}`
    },
    body: `client_id=admin-cli&grant_type=password&username=${iamAdminUsername}&password=${iamAdminPassword}`
  });
  return (await res.json())?.access_token;
};

export async function getToken(username, password) {  
  console.log({
    type: 'getToken',
    username: username,
    password: password
  });
  const res = await fetch(`${iamDomain}/realms/${process.env.IAM_REALM}/protocol/openid-connect/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `Basic ${Buffer.from(`${iamClientId}:${iamClientSecret}`).toString('base64')}`
    },
    body: `grant_type=password&username=${username}&password=${password}`
  });
  return (await res.json())?.access_token;
};