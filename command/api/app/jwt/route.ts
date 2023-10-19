import { NextResponse } from "next/server";
import { headers } from 'next/headers';
import jwt from "jsonwebtoken";
import { JwksClient } from "jwks-rsa";

export async function GET() {
  const headersInstance = headers();
  const authorization = headersInstance.get('Authorization');
  console.debug({authorization: authorization});
  let accessToken: string = '';
  if (authorization) {
    accessToken = authorization.replace('Bearer ', '');
    console.debug({accessToken: accessToken});
  }


  let decodedToken;
  if (accessToken) {
    decodedToken = jwt.decode(accessToken, {complete: true}) as jwt.Jwt;
  }

  const client = new JwksClient({
    jwksUri: 'http://iam-provider:8080/realms/aimerzarashi/protocol/openid-connect/certs',
    requestHeaders: {}, // Optional
    timeout: 30000 // Defaults to 30s
  });

  const key = await client.getSigningKey(decodedToken?.header.kid);
  const signingKey = key.getPublicKey();

  console.debug({signingKey: signingKey});

  let decoded2;
  let accessTokenMessage;
  jwt.verify(accessToken, signingKey, { algorithms: ['RS256'], complete: true }, function(err, decoded) {
    if (err) {
      accessTokenMessage = err;
    }
    decoded2 = decoded;
  });

  return NextResponse.json({ decoded: decoded2, accessTokenMessage: accessTokenMessage }, { status: 200 }); }