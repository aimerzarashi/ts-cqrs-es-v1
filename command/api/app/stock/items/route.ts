import { NextRequest, NextResponse } from "next/server";
import { headers } from 'next/headers';
import { extractAccountId } from '@/lib/auth/validation';
import { paths } from '@/types/openapi';

type RequestBody = paths['/stock/items']['post']['requestBody']['content']['application/json'];

export async function POST(request: NextRequest) {
  const headersList = headers();
  const authorization = headersList.get('authorization');

  const accountId = extractAccountId(authorization);
  if (accountId.kind == 'error') {
    return NextResponse.json(
      { error: accountId.error.message },
      { status: 401 }
    );
  }

  const requestbody: RequestBody = await request.json();
  console.debug({ accountId: accountId, requestbody: requestbody });

  return NextResponse.json({ message: 'success' }, { status: 201 });
}