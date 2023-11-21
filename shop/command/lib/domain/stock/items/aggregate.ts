import { components } from "@/schemas/asyncapi/stockItemEvent";

import {
  ApplyResult,
  CommandHandlers,
  GenerateCurried,
} from "@/lib/domain/aggregate";
import { Result, createSuccess, createError } from "@/lib/fp/result";

export type StockItemEvent = StockItemCreatedEvent | StockItemUpdatedEvent;
type StockItemCreatedEvent = components["schemas"]["StockItemCreatedEvent"];
type StockItemUpdatedEvent = components["schemas"]["StockItemUpdatedEvent"];

export type StockItemCommand = StockItemCreateCommand | StockItemUpdateCommand;
export type StockItemCreateCommand =
  components["schemas"]["StockItemCreateCommand"];
export type StockItemUpdateCommand =
  components["schemas"]["StockItemUpdateCommand"];

type StockItem = {
  id: string;
  name: string;
  accountId: string;
};

export const commandHandlers: CommandHandlers<
  StockItem,
  StockItemCommand,
  StockItemEvent
> = new Map();
commandHandlers.set("Created", (aggregate: StockItem, command: any) =>
  create(command)
);
commandHandlers.set("Updated", (aggregate: StockItem, command: any) =>
  update(aggregate, command)
);

const CurriedGenerate: GenerateCurried<
  StockItem,
  StockItemCommand,
  StockItemEvent
> = (commandHandlers) => (domainEvents) => {
  return domainEvents.reduce((result: Result<StockItem>, event) => {
    const commandHandler = commandHandlers.get(event.type);

    if (!commandHandler) {
      return createError(new Error(`Unknown event type: ${event.type}`), event);
    }

    const applyResult = commandHandler(result.value, event.payload);

    return applyResult.success
      ? createSuccess(applyResult.value.aggregate)
      : applyResult;
  }, createError(new Error("No events"), domainEvents));
};

export const generate: (domainEvents: StockItemEvent[]) => Result<StockItem> =
  CurriedGenerate(commandHandlers);

export const create = (
  command: StockItemCreateCommand
): Result<ApplyResult<StockItem, StockItemCreatedEvent>> => {
  if (!command.id) {
    return createError(new Error("id is required"), command);
  }
  if (!command.name) {
    return createError(new Error("name is required"), command);
  }
  if (!command.accountId) {
    return createError(new Error("accountId is required"), command);
  }

  const appliedAggregate: StockItem = {
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
};

export const update = (
  aggregate: StockItem,
  command: StockItemUpdateCommand
): Result<ApplyResult<StockItem, StockItemUpdatedEvent>> => {
  if (!command.name) {
    return createError(new Error("name is required"), command);
  }

  const appliedAggregate: StockItem = {
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