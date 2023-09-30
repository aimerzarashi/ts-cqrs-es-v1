import { NextResponse } from "next/server";
import { headers } from 'next/headers'
import * as jwt from "jsonwebtoken"

export async function POST(request: Request) {
  const headersList  = headers()
  const authorization = headersList.get('authorization')

  if (!authorization || !/^Bearer\s/.test(authorization)) {
    return NextResponse.json(
      { error: 'Invalid authorization header' },
      { status: 401 }
    )
  }

  const accessToken = authorization.replace(/^Bearer\s/, '')

  type JwtPayload = {
    userId: string,
    accountId: string,
  };

  // authentication token verify
  const jwtSecret = process.env.AUTHN_PUBLIC_KEY as jwt.Secret;
  try {
    const jwtPayload = jwt.verify(accessToken, jwtSecret) as JwtPayload;
    const requestBody = await request.json()
    return NextResponse.json(
      { body: requestBody, accessToken: accessToken, accountId: jwtPayload.accountId },
      { status: 200 }
    )
  } catch(err) {
    return NextResponse.json(
      { error: 'Invalid authorization' },
      { status: 401 }
    ) 
  }
}