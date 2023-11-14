import { Result, createError, createSuccess } from "@/lib/fp/result";
import {
  StockItemAggregate,
} from "./aggregate";

export type ApplyResult = {
  appliedAggregate: StockItemAggregate;
  occurredEvent: StockItemEvent;
};

export type StockItemCommand = CreateStockItemCommand | UpdateStockItemCommand;

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

export type CreateStockItemCommand = {
  accountId: string;
  name: string;
};

export type UpdateStockItemCommand = {
  name: string;
};

export const create = (
  aggregate: StockItemAggregate,
  command: CreateStockItemCommand
): Result<ApplyResult> => {
  if (!command.name) {
    return createError(
      new Error(
        JSON.stringify({ message: "name is required", command: command })
      ),
      command
    );
  }

  if (!command.accountId) {
    return createError(new Error("accountId is required"), command);
  }

  const appliedAggregate: StockItemAggregate = {
    id: aggregate.id,
    name: command.name,
    accountId: command.accountId,
  };

  const occurredEvent: StockItemCreatedEvent = {
    aggregateId: aggregate.id,
    eventType: "Created",
    eventPayload: {
      name: command.name,
      accountId: command.accountId,
    },
  };

  return createSuccess({
    appliedAggregate: appliedAggregate,
    occurredEvent: occurredEvent,
  });
};

export const update = (
  aggregate: StockItemAggregate,
  command: UpdateStockItemCommand
): Result<ApplyResult> => {
  if (!command.name) {
    return createError(new Error("name is required"), command);
  }

  const appliedAggregate: StockItemAggregate = {
    id: aggregate.id,
    name: command.name,
    accountId: aggregate.accountId,
  };

  const occurredEvent: StockItemUpdatedEvent = {
    aggregateId: aggregate.id,
    eventType: "Updated",
    eventPayload: {
      name: command.name,
    },
  };

  return createSuccess({
    appliedAggregate: appliedAggregate,
    occurredEvent: occurredEvent,
  });
};