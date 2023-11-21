import { createSuccess, createError } from "@/lib/fp/result";
import { StockItemEvent } from "./aggregate";
import { StoreEvent, FindEvents } from "@/lib/domain/repository";

export const storeEvent: StoreEvent<StockItemEvent> = async (prisma, domainEvent) => {
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
        JSON.stringify({
          message: "Failed to store event",
          domainEvent: domainEvent,
        })
      ),
      domainEvent
    );
  }

  return createSuccess(undefined);
};

export const findEvents: FindEvents<StockItemEvent> = async (prisma, aggregateId) => {
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
    },
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

  return stockItemEvents.length > 0
    ? createSuccess(stockItemEvents)
    : createError(new Error("No Events"), aggregateId);
};