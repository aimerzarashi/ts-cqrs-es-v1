import { NextRequest, NextResponse } from "next/server";
import { headers } from 'next/headers';
import { extractAccountId } from '@/lib/auth/validation';
import { paths } from '@/types/openapi';
import { validation } from './validation';
import { PrismaClient } from '@prisma/client';

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
  const validStockItem = validation(requestbody);
  if (validStockItem.kind == 'error') {
    return NextResponse.json(
      { error: validStockItem.error.message },
      { status: 400 }
    );
  }

  const prisma = new PrismaClient();
  const stockItemEvent = await prisma.stockItemEvent.create({
    data: {
      aggregateId: crypto.randomUUID(),
      eventType: 'Created',
      eventPayload: JSON.stringify({
        accountId: accountId.value,
        ...validStockItem.value.body
      }),
    }
  });

  return NextResponse.json({ message: 'success' }, { status: 201 });
}