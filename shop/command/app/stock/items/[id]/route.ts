import { NextRequest, NextResponse } from "next/server";
import { headers } from 'next/headers';
import { extractAccountId } from '@/lib/auth/validation';

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  const headersList = headers();
  const authorization = headersList.get('authorization');

  const accountId = extractAccountId(authorization);
  if (accountId.kind == 'error') {
    console.error(accountId.error);
    return NextResponse.json(
      { message: 'failed' },
      { status: 401 }
    );
  }

  console.debug(params.id);

  console.debug(await request.json());

  return NextResponse.json({ message: 'success' }, { status: 200 });
}