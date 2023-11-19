import { Result, createError, createSuccess } from "@/lib/fp/result";
import { StockItemAggregate } from "./aggregate";
import { StockItemEvent, StockItemCreatedEvent, StockItemUpdatedEvent } from "./event";
import { components } from "@/schemas/asyncapi/stockItemEvent";

export type ApplyResult = {
  aggregate: StockItemAggregate;
  domainEvent: StockItemEvent;
};

export type StockItemCommand = StockItemCreateCommand | StockItemUpdateCommand;
export type StockItemCreateCommand = components["schemas"]["StockItemCreateCommand"]
export type StockItemUpdateCommand = components["schemas"]["StockItemUpdateCommand"];

export const create = (command: StockItemCreateCommand): Result<ApplyResult> => {
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

  const domainEvent: StockItemCreatedEvent = {
    id: crypto.randomUUID(),
    occurredAt: new Date().toISOString(),
    aggregateId: command.id,
    type: "Created",
    payload: {
      id: command.id,
      name: command.name,
      accountId: command.accountId,
    },
  };

  return createSuccess({
    aggregate: appliedAggregate,
    domainEvent: domainEvent,
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

  const domainEvent: StockItemUpdatedEvent = {
    id: crypto.randomUUID(),
    occurredAt: new Date().toISOString(),
    aggregateId: aggregate.id,
    type: "Updated",
    payload: {
      name: command.name,
    },
  };

  return createSuccess({
    aggregate: appliedAggregate,
    domainEvent: domainEvent,
  });
};

export const CommandHandlers = new Map<
  string,
  (aggregate: StockItemAggregate, command: StockItemCommand) => Result<ApplyResult>
>();
CommandHandlers.set("Created", (undefined, command: any) => create(command));
CommandHandlers.set("Updated", (aggregate: StockItemAggregate, command: any) => update(aggregate, command));