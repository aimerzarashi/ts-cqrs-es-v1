import { NextRequest, NextResponse } from "next/server";
import { headers } from 'next/headers';
import { extractAccountId } from '@/lib/headers/auth';
import { paths } from '@/schemas/openapi/stockItem';
import { generate, update, StockItemUpdateCommand } from "@/lib/domain/stock/items/aggregate";
import { findEvents, storeEvent } from "@/lib/domain/stock/items/repository";

type RequestBody = paths['/stock/items/{id}']['put']['requestBody']['content']['application/json'];

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  const headersList = headers();
  const authorization = headersList.get('authorization');

  // アカウントIDを取得
  const extractAccountIdResult = extractAccountId(authorization);
  if (!extractAccountIdResult.success) {
    console.error(extractAccountIdResult.error);
    return NextResponse.json(
      { message: 'failed' },
      { status: 401 }
    );
  }

  const stockItemUpdateCommand: StockItemUpdateCommand = {
    name: "test2",
  };

  const findEventsResult = await findEvents(params.id);
  if (!findEventsResult.success) {
    return NextResponse.json(
      { message: 'failed' },
      { status: 400 }
    )
  }

  const foundDomainEvents = findEventsResult.value;
  const generateResult = generate(foundDomainEvents);
  if (!generateResult.success) {
    return NextResponse.json(
      { message: 'failed' },
      { status: 400 }
    )
  }

  const aggregate = generateResult.value;
  const updateResult = update(aggregate, stockItemUpdateCommand);
  if (!updateResult.success) {
    return NextResponse.json(
      { message: 'failed' },
      { status: 500 }
    )
  }

  const { domainEvent } = updateResult.value;
  const storeEventResult = await storeEvent(domainEvent);
  if (!storeEventResult.success) {
    return NextResponse.json(
      { message: 'failed' },
      { status: 500 }
    )
  }

  return NextResponse.json({ message: 'success' }, { status: 200 });
}