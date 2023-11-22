import { PrismaClient } from "@prisma/client";
import { components } from "@/schemas/asyncapi/stockItemEvent";

type StockItemEventAggregateId = components["schemas"]["StockItemCreatedEvent"]["aggregateId"];
type StockItemCreatedEventPayload = components["schemas"]["StockItemCreatedEvent"]["payload"];
type StockItemUpdatedEventPayload = components["schemas"]["StockItemUpdatedEvent"]["payload"];

export const eventHandlers = new Map<string, (aggregateId: StockItemEventAggregateId, event: any) => void>();
eventHandlers.set("Created", stockItemCreated);
eventHandlers.set("Updated", stockItemUpdated);

export async function stockItemCreated(aggregateId: StockItemEventAggregateId, payload: StockItemCreatedEventPayload) {
  const prisma = new PrismaClient();
  const result = await prisma.stockItem.create({
    data: {
      id: aggregateId,
      accountId: payload.accountId,
      name: payload.name
    }
  });
  prisma.$disconnect();

  console.debug({
    result: result
  });
}

export async function stockItemUpdated(aggregateId: StockItemEventAggregateId, payload: StockItemUpdatedEventPayload) {
  const prisma = new PrismaClient();
  const result = await prisma.stockItem.update({
    where: {
      id: aggregateId
    },
    data: {
      name: payload.name
    }
  });
  prisma.$disconnect();

  console.debug({
    result: result
  });
}