import { Result, createError, createSuccess } from "@/lib/fp/result";
import {
  StockItemEvent,
} from "./event";
import {
  StockItemCommand,
  CreateStockItemCommand,
  UpdateStockItemCommand,
} from "./command";

// StockItem モデル
export type StockItem = {
  id: string;
  name: string;
  accountId: string;
};

type ApplyResult = {
  aggregate: StockItem;
  occurredEvent: StockItemEvent;
};

export function generate(): Result<StockItem> {
  return createSuccess({
    id: crypto.randomUUID(),
    name: "",
    accountId: "",
  });
}

type ApplyHandler = (
  aggregate: StockItem,
  command: StockItemCommand
) => StockItemEvent;

export const create = (
  aggregate: StockItem,
  command: CreateStockItemCommand
): Result<ApplyResult> => {
  if (!command.name) {
    return createError(new Error("name is required"), command);
  }

  if (!command.accountId) {
    return createError(new Error("accountId is required"), command);
  }

  return createSuccess({
    aggregate: {
      id: aggregate.id,
      name: command.name,
      accountId: command.accountId,
    },
    occurredEvent: {
      aggregateId: aggregate.id,
      eventType: "Created",
      eventPayload: {
        name: command.name,
        accountId: command.accountId,
      },
    },
  });
};

export const update = (
  aggregate: StockItem,
  command: UpdateStockItemCommand
): Result<ApplyResult> => {
  if (!command.name) {
    return createError(new Error("name is required"), command);
  }

  console.log({ aggregate: aggregate });

  return createSuccess({
    aggregate: {
      id: aggregate.id,
      name: command.name,
      accountId: aggregate.accountId,
    },
    occurredEvent: {
      aggregateId: aggregate.id,
      eventType: "Updated",
      eventPayload: {
        name: command.name,
      },
    },
  });
};

const eventHandlers = new Map<
  string,
  (aggregate: StockItem, command: any) => Result<ApplyResult>
>();
eventHandlers.set("Created", create);
eventHandlers.set("Updated", update);

export function regenerate(events: StockItemEvent[]): Result<StockItem> {
  return events.reduce((result: Result<any>, event) => {
    const handler = eventHandlers.get(event.eventType);
    if (!handler) {
      return createError(
        new Error("Unknown event type: " + event.eventType),
        event
      );
    }
    const applyResult = handler(result.value.aggregate, event.eventPayload);
    return applyResult.success
      ? createSuccess(applyResult.value.aggregate)
      : result;
  }, createSuccess({ aggregate: { id: events[0].aggregateId, name: "", accountId: "" } }));
}