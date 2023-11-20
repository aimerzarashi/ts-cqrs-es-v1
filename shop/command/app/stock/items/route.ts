import { NextRequest, NextResponse } from "next/server";
import { headers } from 'next/headers';
import { extractAccountId } from '@/lib/headers/auth';
import { paths } from '@/schemas/openapi/stockItem';
import { create, StockItemCreateCommand } from "@/lib/domain/stock/items/aggregate";
import { storeEvent } from "@/lib/domain/stock/items/repository";

type RequestBody = paths['/stock/items']['post']['requestBody']['content']['application/json'];

export async function POST(request: NextRequest) {
  const headersList = headers();
  const authorization = headersList.get('authorization');

  const extractAccountIdResult = extractAccountId(authorization);
  if (!extractAccountIdResult.success) {
    console.error(extractAccountIdResult.error);
    return NextResponse.json(
      { message: 'failed' },
      { status: 401 }
    );
  }

  const accountId = extractAccountIdResult.value;
  const stockItemCreateCommand: StockItemCreateCommand = {
    id: crypto.randomUUID(),
    name: "test1",
    accountId: accountId,
  };
  const createResult = create(stockItemCreateCommand);
  if (!createResult.success) {
    return NextResponse.json(
      { message: 'failed' },
      { status: 400 }
    )
  }

  const { domainEvent } = createResult.value;
  const storeEventResult = await storeEvent(domainEvent);
  if (!storeEventResult.success) {
    return NextResponse.json(
      { message: 'failed' },
      { status: 500 }
    )
  }

  return NextResponse.json({ message: 'success' }, { status: 201 });
}