import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { JwksClient } from "jwks-rsa";

const accessToken: string = 'eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJUR3lEUXhzaGhyQkZSSVhrbVJ2MVhZXzlLckpFOVg0MXpHcWZaN0U1Ym5BIn0.eyJleHAiOjE2OTcwMjY5MTYsImlhdCI6MTY5NzAyNjYxNiwianRpIjoiZmQzNWVlODMtODgzOC00NDc4LWEzOGItOTdhMjU0ZGU2YWNmIiwiaXNzIjoiaHR0cHM6Ly9pYW0tcHJvdmlkZXIuYWltZXJ6YXJhc2hpLmNvbS9yZWFsbXMvYWltZXJ6YXJhc2hpIiwiYXVkIjoiYWNjb3VudCIsInN1YiI6IjNhZWYxNjVlLWViNzMtNDY4Yi1hMjdkLWQxNGVkOWViODc0ZCIsInR5cCI6IkJlYXJlciIsImF6cCI6IndlYnNpdGUtdWkiLCJzZXNzaW9uX3N0YXRlIjoiMmQyY2Q0NWQtY2FmMS00YjZhLWI4YTYtODViZjlkM2MxNDZhIiwiYWNyIjoiMSIsImFsbG93ZWQtb3JpZ2lucyI6WyIvKiJdLCJyZWFsbV9hY2Nlc3MiOnsicm9sZXMiOlsib2ZmbGluZV9hY2Nlc3MiLCJ1bWFfYXV0aG9yaXphdGlvbiIsImRlZmF1bHQtcm9sZXMtYWltZXJ6YXJhc2hpIl19LCJyZXNvdXJjZV9hY2Nlc3MiOnsiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJlbWFpbCBwcm9maWxlIiwic2lkIjoiMmQyY2Q0NWQtY2FmMS00YjZhLWI4YTYtODViZjlkM2MxNDZhIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInByZWZlcnJlZF91c2VybmFtZSI6IjIwMjMxMDExMjA0ODAwQGV4YW1wbGUuY29tIiwiZW1haWwiOiIyMDIzMTAxMTIwNDgwMEBleGFtcGxlLmNvbSJ9.FNF4nZpCmkn72-XuiAXkZOYxXAqTL3Sf8F-5apKrH_eyBs8GHZX1orCdte1WFi8TsFyWpjRfX9kHhfqfc2K0C-_JRvOK5wYNfDIFyRyNTx3hOuFgscMV6x0M63dGcbNPlmLBZdCBlWEtx-M7h1aJ9SVfIbSaSmq7uF47P0PQgDC2I4uZ8mDRJzzwzId4I6UnBLKWejKrD1ZzygRJFyKl14pdLRtDIWEKCmCSJi28ZgECzu35gtN5stvhc-FrUJ48u6y4ikv7W6odw97XzfoGuOjdK9Ol4DHB9RKTuzJ7s0UgbVcsN6xmgQK_xqG64_RJUlnGOGbQhKm_Ee63T0pnhg';
const refreshToken: string = 'eyJhbGciOiJIUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICIzYzdmMTY5Zi03Yjk5LTQwM2YtOTEwMS1lYTIwOTNiN2RmNTIifQ.eyJleHAiOjE2OTcwMjg0MTYsImlhdCI6MTY5NzAyNjYxNiwianRpIjoiNzRmMWQxMzgtMzdlZi00MGMzLWE2MTQtZTY5NDUzMzI5NGU0IiwiaXNzIjoiaHR0cHM6Ly9pYW0tcHJvdmlkZXIuYWltZXJ6YXJhc2hpLmNvbS9yZWFsbXMvYWltZXJ6YXJhc2hpIiwiYXVkIjoiaHR0cHM6Ly9pYW0tcHJvdmlkZXIuYWltZXJ6YXJhc2hpLmNvbS9yZWFsbXMvYWltZXJ6YXJhc2hpIiwic3ViIjoiM2FlZjE2NWUtZWI3My00NjhiLWEyN2QtZDE0ZWQ5ZWI4NzRkIiwidHlwIjoiUmVmcmVzaCIsImF6cCI6IndlYnNpdGUtdWkiLCJzZXNzaW9uX3N0YXRlIjoiMmQyY2Q0NWQtY2FmMS00YjZhLWI4YTYtODViZjlkM2MxNDZhIiwic2NvcGUiOiJlbWFpbCBwcm9maWxlIiwic2lkIjoiMmQyY2Q0NWQtY2FmMS00YjZhLWI4YTYtODViZjlkM2MxNDZhIn0.ohK_JfvhBOBZRwP_KgOT751ri4dFT_971-Wug6C33ck';

export async function GET() {

  const client = new JwksClient({
    jwksUri: 'http://iam-provider:8080/realms/aimerzarashi/protocol/openid-connect/certs',
    requestHeaders: {}, // Optional
    timeout: 30000 // Defaults to 30s
  });

  const kid = 'TGyDQxshhrBFRIXkmRv1XY_9KrJE9X41zGqfZ7E5bnA';
  const key = await client.getSigningKey(kid);
  const signingKey = key.getPublicKey();

  let accessTokenMessage;
  jwt.verify(accessToken, signingKey, { algorithms: ['RS256'] }, function(err, decoded) {
    if (err) {
      accessTokenMessage = err;
    }
  });

  let refreshTokenMessage;
  jwt.verify(refreshToken, signingKey, { algorithms: ['HS256'] }, function(err, decoded) {
    if (err) {
      refreshTokenMessage = err;
    }
  });

  return NextResponse.json({ accessTokenMessage: accessTokenMessage, refreshTokenMessage: refreshTokenMessage }, { status: 200 });
}


