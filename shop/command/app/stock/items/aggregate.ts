import { PrismaClient, StockItemEvent } from '@prisma/client';
import { Result, createError, createSuccess } from '@/lib/fp/result';

// StockItem モデル
type StockItem = {
  id: string;
  name: string;
  accountId: string;
};

// イベントの型定義
type createCommand = {
  accountId: string;
  name: string;
};

type updateCommand = {
  name: string;
};

function applyCreatedEvent(aggregate: StockItem, payload: createCommand): Result<StockItem> {
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

function applyUpdatedEvent(aggregate: StockItem, payload: updateCommand): Result<StockItem> {
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

function regenerate(events: StockItemEvent[]): Result<StockItem> {
  const stockItem = {
    id: events[0].aggregateId,
    name: '',
    accountId: '',
  }
  return events.reduce((result: Result<any>, event) => {
    const handler = eventHandlers.get(event.type);
    if (!handler) {
      return createError(new Error('Unknown event type: ' + event.type), event);
    }
    return result.success ? handler(result.value, JSON.parse(event.payload as string)) : result;
  }, createSuccess(stockItem));
}

export async function get(aggregateId: string): Promise<Result<StockItem>> {

  const prisma = new PrismaClient();

  // Eventを取得する
  const stockItemEvents = await prisma.stockItemEvent.findMany({
    select: {
      id: true,
      occurredAt: true,
      aggregateId: true,
      type: true,
      payload: true
    },
    where: {
      aggregateId: aggregateId
    }
  });

  const stockItem = regenerate(stockItemEvents);
  console.debug(stockItem);

  prisma.$disconnect();

  return stockItem;
}

export async function apply(aggregate: StockItem, command: { name: string }): Promise<Result<StockItem>> {

  if (!command.name) {
    return createError(new Error('name is required'), command);
  }

  const handler = eventHandlers.get('Updated');
  if (!handler) {
    return createError(new Error('Unknown command type: ' + command), command);
  }

  const result = handler(aggregate, command);

  const prisma = new PrismaClient();

  // Eventを作成する
  const event = await prisma.stockItemEvent.create({
    data: {
      aggregateId: aggregate.id,
      type: 'Updated',
      payload: command
    }
  })

  return createSuccess(aggregate);
}