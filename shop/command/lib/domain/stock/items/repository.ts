import { PrismaClient } from "@prisma/client";
import { Result, createSuccess, createError } from "@/lib/fp/result";
import { StockItemEvent } from "@/lib/domain/stock/items/event";

export async function store(event: StockItemEvent): Promise<Result<void>> {
  const prisma = new PrismaClient();
  const result = await prisma.stockItemEvent.create({
    data: {
      id: event.id,
      occurredAt: event.occurredAt,
      aggregateId: event.aggregateId,
      type: event.type,
      payload: event.payload,
    },
  });
  if (!result) {
    return createError(
      new Error(
        JSON.stringify({ message: "Failed to store event", event: event })
      ),
      event
    );
  }

  prisma.$disconnect();
  return createSuccess(undefined);
}

export async function get(
  aggregateId: string
): Promise<Result<StockItemEvent[]>> {
  const prisma = new PrismaClient();

  const events = await prisma.stockItemEvent.findMany({
    select: {
      id: true,
      occurredAt: true,
      aggregateId: true,
      type: true,
      payload: true,
    },
    where: {
      aggregateId: aggregateId,
    },
    orderBy: {
      occurredAt: "asc",
    }
  });
  const stockItemEvents: StockItemEvent[] = events.map(
    (event) =>
    ({
      id: event.id,
      occurredAt: event.occurredAt.toISOString(),
      aggregateId: event.aggregateId,
      type: event.type,
      payload: event.payload,
    } as StockItemEvent)
  );

  prisma.$disconnect();
  return createSuccess(stockItemEvents);
}