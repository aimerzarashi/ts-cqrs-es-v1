import { NextRequest, NextResponse } from "next/server";
import { headers } from 'next/headers';
import { extractAccountId } from '@/lib/auth/validation';
import { paths } from '@/schmemas/stock';
import { validation } from '@/app/stock/items/validation';
import { PrismaClient } from '@prisma/client';

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

  const requestbody: RequestBody = await request.json();
  const validStockItem = validation(requestbody);
  if (!validStockItem.success) {
    console.error(validStockItem.error);
    return NextResponse.json(
      { message: 'failed' },
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
  if (!stockItemEvent) {
    console.error(new Error('failed to create stock item event'));
    return NextResponse.json(
      { message: 'failed' },
      { status: 500 }
    );
  }

  return NextResponse.json({ message: 'success' }, { status: 201 });
}