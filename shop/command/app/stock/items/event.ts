export type StockItemEvent = {
  aggregateId: string;
  type: string;
  payload: StockItemEventPayload
}
export type StockItemEventPayload = CreatePayload | UpdatePayload;

export type CreatePayload = {
  accountId: string;
  name: string;
}

export type UpdatePayload = {
  name: string;
}