import { Result, createError, createSuccess } from "@/lib/fp/result";

export type DomainEvent<Command> = {
  id: string;
  occurredAt: string;
  aggregateId: string;
  type: string;
  payload: Command;
}

export type ApplyResult<Aggregate, DomainEvent> = {
  aggregate: Aggregate;
  domainEvent: DomainEvent;
};

export type CommandHandlers<Aggregate, Command> = Map<
  string,
  (aggregate: Aggregate, command: Command) => Result<ApplyResult<Aggregate, DomainEvent<Command>>>
>;

export function Regenerate<Aggregate, Command>(
  events: DomainEvent<Command>[],
  handlers: CommandHandlers<Aggregate, Command>
): Result<Aggregate> {
  return events.reduce((result: Result<any>, event) => {
    const commandHandler = handlers.get(event.type);

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
      ? createSuccess(applyResult.value)
      : result;
  }, createError(new Error("No events"), events));
}