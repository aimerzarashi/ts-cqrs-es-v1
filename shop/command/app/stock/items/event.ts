export type StockItemEvent = {
  aggregateId: string;
  type: string;
  payload: StockItemEventPayload
}
export type StockItemEventPayload = CreatePayload | UpdatePayload;
export type StockItemEvents = StockItemEvent[];

export type CreatePayload = {
  accountId: string;
  name: string;
}

export type UpdatePayload = {
  name: string;
}