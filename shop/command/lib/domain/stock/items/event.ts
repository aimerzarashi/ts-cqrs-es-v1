import { components } from "@/schemas/stockItemEvent";

export type StockItemEvent = StockItemCreatedEvent | StockItemUpdatedEvent;

export type StockItemCreatedEvent = components["schemas"]["StockItemCreatedEvent"];

export type StockItemUpdatedEvent = components["schemas"]["StockItemUpdatedEvent"];