import { Result, createSuccess, createError, pipe } from '@/lib/result/resultType';
import * as jwt from "jsonwebtoken";

type Authorization = string | null;
type Token = string | null;
type Subject = string | null;

const token = 'eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJUR3lEUXhzaGhyQkZSSVhrbVJ2MVhZXzlLckpFOVg0MXpHcWZaN0U1Ym5BIn0.eyJleHAiOjE2OTgwNjUxMTEsImlhdCI6MTY5ODA2NDgxMSwianRpIjoiYjljMGQ5YTktYTc2ZS00MDQ2LTgyNzAtYTcwMmNiN2Q3NWYxIiwiaXNzIjoiaHR0cHM6Ly9pYW0tcHJvdmlkZXIuYWltZXJ6YXJhc2hpLmNvbS9yZWFsbXMvYWltZXJ6YXJhc2hpIiwiYXVkIjpbInBvc3RncmFwaGlsZSIsImFjY291bnQiXSwic3ViIjoiZDU1ODkyYjMtMDdjNS00YWQ2LWIxNjctMGY5ZTQ5NjBlYWI4IiwidHlwIjoiQmVhcmVyIiwiYXpwIjoid2Vic2l0ZS11aSIsInNlc3Npb25fc3RhdGUiOiI5YTgxYjc4NS03ZDRjLTRkMGUtODYwZS0zMzBjYTI5MjM2ODQiLCJhY3IiOiIxIiwiYWxsb3dlZC1vcmlnaW5zIjpbIi8qIl0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJvZmZsaW5lX2FjY2VzcyIsInVtYV9hdXRob3JpemF0aW9uIiwiZGVmYXVsdC1yb2xlcy1haW1lcnphcmFzaGkiXX0sInJlc291cmNlX2FjY2VzcyI6eyJhY2NvdW50Ijp7InJvbGVzIjpbIm1hbmFnZS1hY2NvdW50IiwibWFuYWdlLWFjY291bnQtbGlua3MiLCJ2aWV3LXByb2ZpbGUiXX19LCJzY29wZSI6ImVtYWlsIHByb2ZpbGUiLCJzaWQiOiI5YTgxYjc4NS03ZDRjLTRkMGUtODYwZS0zMzBjYTI5MjM2ODQiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicHJlZmVycmVkX3VzZXJuYW1lIjoiMjAyMzEwMjMyMTM5MDAwMDBAZXhhbXBsZS5jb20iLCJlbWFpbCI6IjIwMjMxMDIzMjEzOTAwMDAwQGV4YW1wbGUuY29tIn0.VMtBAKFELj3kYIYMzxIYmZHD9Ub0ZE3i5dACVEuvlNkp8njMbKO152C_P9f3sB4dujx1WfXuqu1tif-TFk7-1XseFtbWq-IW3d_6nhXJvnEz2NBrSMtQka58jInFfP85Cz0fH46K5idtGPplHrkCbFZ6iq11GAUcsP-5iKDREkf6gMXP3s2lFPZPZdn2J8TvrAyjG3iys-IG4fUxLSIT9ip0cths--MEaiKs21WOncoTr9qezBwQQdBOL2SVyOPgbfVflxNU8QXVwn29sEM9GT6ZTxG4CoJI0v8T6L3rP0TWOT4ee3qU-zKMO4LzugpukbTRkW-kAhTZlpldcmRb3g';

// Authorizationヘッダーからトークンを取得する関数
function extractToken(authorization: Authorization): Result<Token> {
  if (!authorization || !/^Bearer\s/.test(authorization)) {
    return createError(new Error("Invalid Authorization Header"));
  }
  return createSuccess(authorization.replace(/^Bearer\s/, ''));
}

// トークンからSubjectを取得する関数
function extractSubject(token: Token): Result<Subject> {
  const decoded = jwt.decode(`${token}`, { complete: true }) as jwt.Jwt;
  if (!decoded || !decoded.payload.sub) {
    return createError(new Error("Invalid Authorization Header"));
  }
  return createSuccess(decoded.payload.sub);
}

export function getSubject(authorization: Authorization): Result<Subject> {
  return pipe(authorization, extractToken, extractSubject);
}

