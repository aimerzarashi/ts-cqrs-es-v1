import { PrismaClient } from "@prisma/client";
import { Result, createSuccess, createError } from "@/lib/fp/result";
import { StockItemEvent } from "@/lib/domain/stock/items/aggregate";

export async function store(event: StockItemEvent): Promise<Result<void>> {
  const prisma = new PrismaClient();
  const result = await prisma.stockItemEvent.create({
    data: {
      aggregateId: event.aggregateId,
      eventType: event.eventType,
      eventPayload: event.eventPayload,
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
      aggregateId: true,
      eventPayload: true,
      eventType: true,
    },
    where: {
      aggregateId: aggregateId,
    },
  });
  const stockItemEvents: StockItemEvent[] = events.map(
    (event) =>
    ({
      aggregateId: event.aggregateId,
      eventType: event.eventType,
      eventPayload: event.eventPayload,
    } as StockItemEvent)
  );

  prisma.$disconnect();
  return createSuccess(stockItemEvents);
}