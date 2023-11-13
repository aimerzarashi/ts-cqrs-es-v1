import { CreateStockItemCommand, UpdateStockItemCommand } from "./command";

export type StockItemEvent = StockItemCreatedEvent | StockItemUpdatedEvent;

export type StockItemCreatedEvent = {
  aggregateId: string;
  eventType: "Created";
  eventPayload: CreateStockItemCommand;
};

export type StockItemUpdatedEvent = {
  aggregateId: string;
  eventType: "Updated";
  eventPayload: UpdateStockItemCommand;
};