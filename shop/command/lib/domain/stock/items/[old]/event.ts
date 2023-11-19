import { components } from "@/schemas/asyncapi/stockItemEvent";

export type StockItemEvent = StockItemCreatedEvent | StockItemUpdatedEvent;

export type StockItemCreatedEvent = components["schemas"]["StockItemCreatedEvent"];
export type StockItemUpdatedEvent = components["schemas"]["StockItemUpdatedEvent"];