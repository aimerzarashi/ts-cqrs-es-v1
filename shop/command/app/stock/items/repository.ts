import { PrismaClient } from '@prisma/client';
import { Result, createError, createSuccess } from '@/lib/fp/result';
import { StockItem, apply } from '@/app/stock/items/aggregate';
import { StockItemEvent, StockItemEventPayload } from '@/app/stock/items/event';

export async function save(aggregateId: string, event: StockItemEvent): Promise<Result<void>> {

  const prisma = new PrismaClient();

  const result = await prisma.stockItemEvent.create({
    data: {
      aggregateId: aggregateId,
      type: event.type,
      payload: event.payload
    }
  })
  if (!result) {
    return createError(new Error('Failed to save event'), { aggregateId: aggregateId, event: event });
  }

  return createSuccess(undefined);
}

export async function get(aggregateId: string): Promise<Result<StockItem>> {

  console.debug({ aggregateId: aggregateId });

  const prisma = new PrismaClient();

  // Eventを取得する
  const result = await prisma.stockItemEvent.findMany({
    select: {
      id: true,
      occurredAt: true,
      aggregateId: true,
      type: true,
      payload: true
    },
    where: {
      aggregateId: aggregateId
    }
  });
  console.debug({ result: result });

  const stockItemEvents: StockItemEvent[] = result.reduce((result: StockItemEvent[], event) => {
    result.push({
      aggregateId: event.aggregateId,
      type: event.type,
      payload: JSON.parse(event.payload?.toString() as string) as StockItemEventPayload
    });
    return result;
  }, []);
  console.debug({ stockItemEvents: stockItemEvents });

  const stockItem = apply(undefined, stockItemEvents);
  console.debug({ stockItem: stockItem });

  prisma.$disconnect();

  return stockItem;
}