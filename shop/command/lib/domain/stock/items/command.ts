import { Result, createError, createSuccess } from "@/lib/fp/result";
import { StockItemAggregate } from "./aggregate";
import { StockItemEvent, StockItemCreatedEvent, StockItemUpdatedEvent } from "./event";
import { components } from "@/schemas/asyncapi/stockItemEvent";

export type ApplyResult = {
  appliedAggregate: StockItemAggregate;
  occurredEvent: StockItemEvent;
};

export type StockItemCommand = StockItemCreateCommand | StockItemUpdateCommand;

export type StockItemCreateCommand = components["schemas"]["StockItemCreateCommand"]

export type StockItemUpdateCommand = components["schemas"]["StockItemUpdateCommand"];

export function create(command: StockItemCreateCommand): Result<ApplyResult> {
  if (!command.id) {
    return createError(new Error("id is required"), command);
  }

  if (!command.name) {
    return createError(new Error("name is required"), command);
  }

  if (!command.accountId) {
    return createError(new Error("accountId is required"), command);
  }

  const appliedAggregate: StockItemAggregate = {
    id: command.id,
    name: command.name,
    accountId: command.accountId,
  };

  const occurredEvent: StockItemCreatedEvent = {
    id: crypto.randomUUID(),
    occurredAt: new Date().toISOString(),
    aggregateId: appliedAggregate.id,
    type: "Created",
    payload: {
      id: command.id,
      name: command.name,
      accountId: command.accountId,
    },
  };

  return createSuccess({
    appliedAggregate: appliedAggregate,
    occurredEvent: occurredEvent,
  });
}

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

export const CommandHandlers = new Map<
  string,
  (aggregate: StockItemAggregate, command: any) => Result<ApplyResult>
>();
CommandHandlers.set("Created", (aggregate, command) => create(command));
CommandHandlers.set("Updated", (aggregate, command) => update(aggregate, command));