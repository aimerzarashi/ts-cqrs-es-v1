import { Result, createError, createSuccess } from "@/lib/fp/result";
import { StockItemAggregate, generate } from "./aggregate";
import { StockItemCreatedEvent } from "./event";
import { StockItemCreateCommand, ApplyResult } from "./command";


export function create(command: StockItemCreateCommand): Result<ApplyResult> {
  if (!command.name) {
    return createError(new Error("name is required"), command);
  }

  if (!command.accountId) {
    return createError(new Error("accountId is required"), command);
  }

  const generatedAggregateResult = generate();

  if (!generatedAggregateResult.success) {
    return createError(new Error("initialAggregate is error"), command);
  }
  const appliedAggregate: StockItemAggregate = {
    id: generatedAggregateResult.value.id,
    name: command.name,
    accountId: command.accountId,
  };

  const occurredEvent: StockItemCreatedEvent = {
    id: crypto.randomUUID(),
    occurredAt: new Date().toISOString(),
    aggregateId: generatedAggregateResult.value.id,
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
}
