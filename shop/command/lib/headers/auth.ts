import { Result, createSuccess, createError, pipe } from '@/lib/fp/result';
import * as jwt from "jsonwebtoken";

type Authorization = string | null;
type Token = string | null;
type CustomClaims = { account_id: string };
type DecodedClaims = jwt.JwtPayload & CustomClaims;

// Authorizationヘッダーからトークンを取得する関数
function extractToken(authorization: Authorization): Result<string> {
  if (!authorization || !/^Bearer\s/.test(authorization)) {
    return createError(new Error("Invalid Authorization Header"), authorization);
  }
  return createSuccess(authorization.replace(/^Bearer\s/, ''));
}

// トークンをデコードする関数
function decodeToken(token: Token): Result<DecodedClaims> {
  const decodedClaims = jwt.decode(`${token}`) as DecodedClaims;
  if (!decodedClaims) {
    return createError(new Error("Invalid Token"), decodedClaims);
  }
  return createSuccess(decodedClaims);
}

// デコードからアカウントIDを取得する関数
function getAccountId(claims: DecodedClaims): Result<string> {
  if (!claims.account_id) {
    return createError(new Error("Invalid Account Id"), claims.account_id);
  }
  return createSuccess(claims.account_id);
}

export function extractAccountId(authorization: Authorization): Result<string> {
  return pipe(authorization, extractToken, decodeToken, getAccountId);
}