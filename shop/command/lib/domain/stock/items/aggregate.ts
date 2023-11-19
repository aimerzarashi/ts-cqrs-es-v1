import { components } from "@/schemas/asyncapi/stockItemEvent";

import { ApplyResult, CommandHandlers, Regenerate } from "@/lib/domain/aggregate";
import { Result, createSuccess, createError } from "@/lib/fp/result";

export type StockItemEvent = StockItemCreatedEvent | StockItemUpdatedEvent;
type StockItemCreatedEvent = components["schemas"]["StockItemCreatedEvent"];
type StockItemUpdatedEvent = components["schemas"]["StockItemUpdatedEvent"];

export type StockItemCommand = StockItemCreateCommand | StockItemUpdateCommand;
export type StockItemCreateCommand = components["schemas"]["StockItemCreateCommand"]
export type StockItemUpdateCommand = components["schemas"]["StockItemUpdateCommand"];

type StockItem = {
  id: string;
  name: string;
  accountId: string;
}

export const commandHandlers: CommandHandlers<StockItem, StockItemCommand> = new Map(
);
commandHandlers.set("Created", (aggregate: StockItem, command: any) => create(command));
commandHandlers.set("Updated", (aggregate: StockItem, command: any) => update(aggregate, command));

export const regenerate = Regenerate<StockItem, StockItemCommand>([], commandHandlers);

export const create = (command: StockItemCreateCommand): Result<ApplyResult<StockItem, StockItemCreatedEvent>> => {
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

  return createSuccess(
    {
      aggregate: appliedAggregate,
      domainEvent: domainEvent,
    }
  );
};

export const update = (
  aggregate: StockItem,
  command: StockItemUpdateCommand
): Result<ApplyResult<StockItem, StockItemUpdatedEvent>> => {
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
  }

  return createSuccess({
    aggregate: appliedAggregate,
    domainEvent: domainEvent,
  });
}