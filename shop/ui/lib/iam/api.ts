import jwt from "jsonwebtoken";
import crypto from "crypto";
import { Result, createSuccess, createError } from "@/lib/function/result";

const iamDomain = process.env.IAM_URL;
const iamAdminUsername = process.env.IAM_ADMIN_USERNAME;
const iamAdminPassword = process.env.IAM_ADMIN_PASSWORD;
const iamRealm = process.env.IAM_REALM;
const iamClientId = process.env.IAM_CLIENT_ID;
const iamClientSecret = process.env.IAM_CLIENT_SECRET;

type UserToken = {
  accessToken: string
  accessExpiresIn: number
  refreshToken: string
  refreshExpiresIn: number
}

type adminToken = {
  accessToken: string
}

export async function getAdminToken(): Promise<Result<adminToken>> {
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
  if (res.status !== 200) {
    return createError(new Error(res.statusText));
  }
  const token = await res.json();
  return createSuccess({ accessToken: token.access_token });
};

export async function createUser(accessToken: string, email: string): Promise<Result<void>> {
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
      // "credentials": [{
      //   type: 'password',
      //   value: email,
      //   temporary: 'false'
      // }]
      attributes: {
        accountId: crypto.randomUUID(),
      }
    })
  });
  if (res?.status !== 201) {
    return createError(new Error(res?.statusText));
  }
  return createSuccess(undefined);
}

export async function getToken(email: string): Promise<Result<UserToken>> {
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
    // body: `grant_type=password&username=${email}&password=${email}`
    body: `grant_type=password&username=${email}`
  });

  if (res.status !== 200) {
    return createError(new Error(res.statusText));
  }

  const token = await res.json();

  let accessExpiresIn: number = 0;
  if (token?.access_token) {
    const decoded = jwt.decode(token?.access_token) as jwt.JwtPayload;
    if (decoded.exp) {
      accessExpiresIn = decoded.exp;
    }
  }
  let refreshExpiresIn: number = 0;
  if (token?.refresh_token) {
    const decoded = jwt.decode(token?.refresh_token) as jwt.JwtPayload;
    if (decoded.exp) {
      refreshExpiresIn = decoded.exp;
    }
  }

  return createSuccess({ accessToken: token?.access_token, accessExpiresIn: accessExpiresIn, refreshToken: token?.refresh_token, refreshExpiresIn: refreshExpiresIn });
};

export async function refreshToken(refreshToken: string): Promise<Result<UserToken>> {
  console.debug({
    type: 'iam provider refreshToken',
    refreshToken: refreshToken
  });
  const res = await fetch(`${iamDomain}/realms/${process.env.IAM_REALM}/protocol/openid-connect/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `Basic ${Buffer.from(`${iamClientId}:${iamClientSecret}`).toString('base64')}`
    },
    body: `grant_type=refresh_token&refresh_token=${refreshToken}`
  });

  if (res.status !== 200) {
    throw new Error(res.statusText);
  }

  const token = await res.json();

  let accessExpiresIn: number = 0;
  if (token?.access_token) {
    const decoded = jwt.decode(token?.access_token) as jwt.JwtPayload;
    if (decoded.exp) {
      accessExpiresIn = decoded.exp;
    }
  }
  let refreshExpiresIn: number = 0;
  if (token?.refresh_token) {
    const decoded = jwt.decode(token?.refresh_token) as jwt.JwtPayload;
    if (decoded.exp) {
      refreshExpiresIn = decoded.exp;
    }
  }

  const tokenToken: UserToken = {
    accessToken: token?.access_token,
    accessExpiresIn: accessExpiresIn,
    refreshToken: token?.refresh_token,
    refreshExpiresIn: refreshExpiresIn
  }

  return createSuccess(tokenToken);
};

export async function logout(refreshToken: string): Promise<Result<void>> {
  console.debug({
    type: 'iam provider logout',
    email: refreshToken
  });
  const res = await fetch(`${iamDomain}/realms/${process.env.IAM_REALM}/protocol/openid-connect/logout`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `Basic ${Buffer.from(`${iamClientId}:${iamClientSecret}`).toString('base64')}`
    },
    body: `refresh_token=${refreshToken}`
  });

  if (res.status !== 200) {
    return createError(new Error(res.statusText));
  }

  return createSuccess(undefined);
}