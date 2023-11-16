import { Result, createError, createSuccess } from "@/lib/fp/result";
import { StockItemAggregate } from "./aggregate";
import { StockItemCreatedEvent, StockItemUpdatedEvent } from "./event";
import { components } from "@/schemas/stockItem";
export type ApplyResult = {
  appliedAggregate: StockItemAggregate;
  occurredEvent: StockItemEvent;
};

export type StockItemCommand = StockItemCreateCommand | StockItemUpdateCommand;

export type StockItemEvent = StockItemCreatedEvent | StockItemUpdatedEvent;

export type StockItemCreateCommand = components["schemas"]["StockItemCreateCommand"];

export type StockItemUpdateCommand = components["schemas"]["StockItemUpdateCommand"];

export const create = (
  aggregate: StockItemAggregate,
  command: StockItemCreateCommand
): Result<ApplyResult> => {
  if (!command.name) {
    return createError(new Error("name is required"), command);
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
    id: crypto.randomUUID(),
    occurredAt: new Date().toISOString(),
    aggregateId: aggregate.id,
    type: "Created",
    payload: {
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
  command: StockItemUpdateCommand
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
    id: crypto.randomUUID(),
    occurredAt: new Date().toISOString(),
    aggregateId: aggregate.id,
    type: "Updated",
    payload: {
      name: command.name,
    },
  };

  return createSuccess({
    appliedAggregate: appliedAggregate,
    occurredEvent: occurredEvent,
  });
};