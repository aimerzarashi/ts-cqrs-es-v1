import { NextRequest, NextResponse } from "next/server";
import { headers } from 'next/headers';
import { extractAccountId } from '@/lib/headers/auth';
import { paths } from '@/schemas/openapi/stockItem';
import { create, StockItemCreateCommand } from "@/lib/domain/stock/items/aggregate";
import { storeEvent } from "@/lib/domain/stock/items/repository";
import { PrismaClient } from "@prisma/client";

type RequestBody = paths['/stock/items']['post']['requestBody']['content']['application/json'];

export async function POST(request: NextRequest) {
  const headersList = headers();
  const authorization = headersList.get('authorization');

  const extractAccountIdResult = extractAccountId(authorization);
  if (!extractAccountIdResult.success) {
    console.error(extractAccountIdResult.error);
    return NextResponse.json(
      { message: 'Unauthorized' },
      { status: 401 }
    );
  }

  const accountId = extractAccountIdResult.value;
  const requestBody: RequestBody = await request.json();
  const stockItemCreateCommand: StockItemCreateCommand = {
    id: crypto.randomUUID(),
    name: requestBody.name,
    accountId: accountId,
  };
  const createResult = create(stockItemCreateCommand);
  if (!createResult.success) {
    return NextResponse.json(
      { message: 'Bad Request' },
      { status: 400 }
    )
  }

  const prisma = new PrismaClient();
  const { domainEvent } = createResult.value;
  const storeEventResult = await storeEvent(prisma, domainEvent);
  if (!storeEventResult.success) {
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    )
  }

  return NextResponse.json({ message: 'Created' }, { status: 201 });
}