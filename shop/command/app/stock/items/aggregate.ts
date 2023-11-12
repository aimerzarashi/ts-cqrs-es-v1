import { Result, createError, createSuccess } from '@/lib/fp/result';
import { StockItemEvent, CreatePayload, UpdatePayload } from '@/app/stock/items/event';

// StockItem モデル
export type StockItem = {
  id: string;
  name: string;
  accountId: string;
};

function applyCreatedEvent(aggregate: StockItem, payload: CreatePayload): Result<StockItem> {
  if (!payload.name) {
    return createError(new Error('name is required'), payload);
  }

  if (!payload.accountId) {
    return createError(new Error('accountId is required'), payload);
  }

  return createSuccess({
    id: aggregate.id,
    name: payload.name,
    accountId: payload.accountId,
  });
}

function applyUpdatedEvent(aggregate: StockItem, payload: UpdatePayload): Result<StockItem> {
  if (!payload.name) {
    return createError(new Error('name is required'), payload);
  }

  return createSuccess({
    id: aggregate.id,
    name: payload.name,
    accountId: aggregate.accountId,
  });
}

const eventHandlers = new Map<string, (aggregate: StockItem, payload: any) => Result<StockItem>>();
eventHandlers.set('Created', applyCreatedEvent);
eventHandlers.set('Updated', applyUpdatedEvent);

export function apply(stockItem: StockItem | undefined, events: StockItemEvent[]): Result<StockItem> {
  stockItem ? stockItem : stockItem = {
    id: events[0].aggregateId,
    name: '',
    accountId: '',
  }
  return events.reduce((result: Result<any>, event) => {
    const handler = eventHandlers.get(event.type);
    if (!handler) {
      return createError(new Error('Unknown event type: ' + event.type), event);
    }
    return result.success ? handler(result.value, event.payload) : result;
  }, createSuccess(stockItem));
}