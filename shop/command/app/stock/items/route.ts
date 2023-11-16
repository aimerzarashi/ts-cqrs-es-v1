import { NextRequest, NextResponse } from "next/server";
import { headers } from 'next/headers';
import { extractAccountId } from '@/lib/auth/validation';
import { paths } from '@/schemas/stockItem';

type RequestBody = paths['/stock/items']['post']['requestBody']['content']['application/json'];

export async function POST(request: NextRequest) {
  const headersList = headers();
  const authorization = headersList.get('authorization');

  const accountId = extractAccountId(authorization);
  if (!accountId.success) {
    console.error(accountId.error);
    return NextResponse.json(
      { message: 'failed' },
      { status: 401 }
    );
  }


  return NextResponse.json({ message: 'success' }, { status: 201 });
}