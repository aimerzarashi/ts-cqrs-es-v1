import { components } from "@/schemas/StockItemEvent";

export type StockItemEvent = StockItemCreatedEvent | StockItemUpdatedEvent;

export type StockItemCreatedEvent = components["schemas"]["StockItemCreatedEvent"];

export type StockItemUpdatedEvent = components["schemas"]["StockItemUpdatedEvent"];