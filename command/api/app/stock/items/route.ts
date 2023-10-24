import { NextRequest, NextResponse } from "next/server";
import { headers } from 'next/headers';
import { getSubject } from '@/lib/auth/validation';

export async function POST(request: NextRequest) {
  const headersList = headers();
  const authorization = headersList.get('authorization');

  const subject = getSubject(authorization);
  if (subject.kind == 'error') {
    return NextResponse.json(
      { error: 'Invalid Authorization Header' },
      { status: 401 }
    );
  }

  console.debug({ subject: subject });

  return NextResponse.json({ message: "Hello World" }, { status: 201 });
}