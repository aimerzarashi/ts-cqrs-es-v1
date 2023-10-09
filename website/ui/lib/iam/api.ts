const iamDomain = process.env.IAM_URL;
const iamAdminUsername = process.env.IAM_ADMIN_USERNAME;
const iamAdminPassword = process.env.IAM_ADMIN_PASSWORD;
const iamRealm = process.env.IAM_REALM;
const iamClientId = process.env.IAM_CLIENT_ID;
const iamClientSecret = process.env.IAM_CLIENT_SECRET;

export async function getAdminToken(): Promise<{ accessToken: string }> {  
  console.debug({
    type: 'iam provider getAdminToken'
  });
  const res = await fetch(`${iamDomain}/realms/master/protocol/openid-connect/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: `client_id=admin-cli&grant_type=password&username=${iamAdminUsername}&password=${iamAdminPassword}`
  });
  const token = await res.json();
  return { accessToken: token?.access_token };
};


export async function createUser(accessToken: string, username: string, email: string, password: string) {
  console.debug({
    type: 'iam provider createUser',
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

export async function getToken(username: string, password: string): Promise<{accessToken:string, refreshToken: string}> {  
  console.debug({
    type: 'iam provider getToken',
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
  const token = await res.json();
  return { accessToken: token?.access_token, refreshToken: token?.refresh_token };
};