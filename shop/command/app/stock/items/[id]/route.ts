import { NextRequest, NextResponse } from "next/server";
import { headers } from 'next/headers';
import { extractAccountId } from '@/lib/headers/auth';
import { paths } from '@/schemas/openapi/stockItem';
import { generate, update, StockItemUpdateCommand } from "@/lib/domain/stock/items/aggregate";
import { findEvents, storeEvent } from "@/lib/domain/stock/items/repository";
import { PrismaClient } from "@prisma/client";

type RequestBody = paths['/stock/items/{id}']['put']['requestBody']['content']['application/json'];

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  const headersList = headers();
  const authorization = headersList.get('authorization');

  // アカウントIDを取得
  const extractAccountIdResult = extractAccountId(authorization);
  if (!extractAccountIdResult.success) {
    console.error(extractAccountIdResult.error);
    return NextResponse.json(
      { message: 'Unauthorized' },
      { status: 401 }
    );
  }

  const aggregateId: string = params.id;

  const requestBody: RequestBody = await request.json();
  const stockItemUpdateCommand: StockItemUpdateCommand = {
    name: requestBody.name,
  };

  const prisma = new PrismaClient();
  const findEventsResult = await findEvents(prisma, aggregateId);
  if (!findEventsResult.success) {
    return NextResponse.json(
      { message: 'Not Found' },
      { status: 404 }
    )
  }

  const foundDomainEvents = findEventsResult.value;
  const generateResult = generate(foundDomainEvents);
  if (!generateResult.success) {
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    )
  }

  const aggregate = generateResult.value;
  const updateResult = update(aggregate, stockItemUpdateCommand);
  if (!updateResult.success) {
    return NextResponse.json(
      { message: 'Bad Request' },
      { status: 400 }
    )
  }

  const { domainEvent } = updateResult.value;
  const storeEventResult = await storeEvent(prisma, domainEvent);
  if (!storeEventResult.success) {
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    )
  }

  return NextResponse.json({ message: 'OK' }, { status: 200 });
}