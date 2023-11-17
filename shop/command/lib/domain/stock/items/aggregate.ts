import { Result, createError, createSuccess } from "@/lib/fp/result";
import { CommandHandlers } from "./command";
import { StockItemEvent } from "./event";

// StockItem モデル
export type StockItemAggregate = {
  id: string;
  name: string;
  accountId: string;
};

export function generate(): Result<StockItemAggregate> {
  return createSuccess({
    id: crypto.randomUUID(),
    name: "",
    accountId: "",
  });
}

export function regenerate(
  events: StockItemEvent[]
): Result<StockItemAggregate> {
  const initialAggregate: StockItemAggregate = {
    id: events[0].aggregateId,
    name: "",
    accountId: "",
  };

  return events.reduce((result: Result<any>, event) => {
    const commandHandler = CommandHandlers.get(event.type);

    if (!commandHandler) {
      return createError(
        new Error(`Unknown event type: ${event.type}`),
        event
      );
    }

    const applyResult = commandHandler(
      result.value.aggregate,
      event.payload
    );

    return applyResult.success
      ? createSuccess(applyResult.value.appliedAggregate)
      : result;
  }, createSuccess({ aggregate: initialAggregate }));
}