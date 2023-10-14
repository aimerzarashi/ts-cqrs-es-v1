import jwt from "jsonwebtoken";

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

export async function createUser(accessToken: string, email: string): Promise<void> {
  console.debug({
    type: 'iam provider createUser',
    accessToken: accessToken,
    email: email,
  });
  const res = await fetch(`${iamDomain}/admin/realms/${iamRealm}/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
      'Authorization': `Bearer ${accessToken}`
    },
    body: JSON.stringify({
      username: email,
      enabled: 'true',
      email: email,
      emailVerified: 'true',
      "credentials":[{
        type: 'password',
        value: email,
        temporary: 'false'
      }]
    })
  });    
}

export async function getToken(email: string): Promise<{accessToken:string, accessExpiresIn: number, refreshToken: string, refreshExpiresIn: number}> {  
  console.debug({
    type: 'iam provider getToken',
    email: email
  });
  const res = await fetch(`${iamDomain}/realms/${process.env.IAM_REALM}/protocol/openid-connect/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `Basic ${Buffer.from(`${iamClientId}:${iamClientSecret}`).toString('base64')}`
    },
    body: `grant_type=password&username=${email}&password=${email}`
  });
  const token = await res.json();

  let accessExpiresIn: number = 0;
  let refreshExpiresIn: number = 0;
  const decoded = jwt.decode(token?.access_token);
  if (decoded) {
    const jwtPayload = decoded as jwt.JwtPayload;
    if (jwtPayload.exp) {
      accessExpiresIn = jwtPayload?.exp;
      refreshExpiresIn = jwtPayload?.exp + token?.refresh_expires_in - token?.expires_in;
    }
  }
  return { accessToken: token?.access_token, accessExpiresIn: accessExpiresIn, refreshToken: token?.refresh_token, refreshExpiresIn: refreshExpiresIn };
};

export async function refreshToken(email: string, refreshToken: string): Promise<{accessToken:string, accessExpiresIn: number, refreshToken: string, refreshExpiresIn: number}> {  
  console.debug({
    type: 'iam provider refreshToken',
    email: email
  });
  const res = await fetch(`${iamDomain}/realms/${process.env.IAM_REALM}/protocol/openid-connect/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `Basic ${Buffer.from(`${iamClientId}:${iamClientSecret}`).toString('base64')}`
    },
    body: `grant_type=password&username=${email}&password=${email}&token=${refreshToken}`
  });
  const token = await res.json();

  let accessExpiresIn: number = 0;
  let refreshExpiresIn: number = 0;
  const decoded = jwt.decode(token?.access_token);
  if (decoded) {
    const jwtPayload = decoded as jwt.JwtPayload;
    if (jwtPayload.exp) {
      accessExpiresIn = jwtPayload?.exp;
      refreshExpiresIn = jwtPayload?.exp + token?.refresh_expires_in - token?.expires_in;
    }
  }
  return { accessToken: token?.access_token, accessExpiresIn: accessExpiresIn, refreshToken: token?.refresh_token, refreshExpiresIn: refreshExpiresIn };
};