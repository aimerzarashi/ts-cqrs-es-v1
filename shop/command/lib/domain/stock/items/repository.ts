import { PrismaClient } from "@prisma/client";
import { Result, createSuccess, createError } from "@/lib/fp/result";
import { StockItemEvent, StockItemCommand } from "./aggregate";
import { StoreEvent, FindEvents } from "@/lib/domain/repository";

export const storeEvent: StoreEvent<StockItemCommand> = async (domainEvent) => {
  const prisma = new PrismaClient();
  const result = await prisma.stockItemEvent.create({
    data: {
      id: domainEvent.id,
      occurredAt: domainEvent.occurredAt,
      aggregateId: domainEvent.aggregateId,
      type: domainEvent.type,
      payload: domainEvent.payload,
    },
  });
  if (!result) {
    return createError(
      new Error(
        JSON.stringify({ message: "Failed to store event", domainEvent: domainEvent })
      ),
      domainEvent
    );
  }

  prisma.$disconnect();
  return createSuccess(undefined);
};

export const findEvents: FindEvents<StockItemCommand> = async (aggregateId) => {
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