import { Result, createError, createSuccess } from "@/lib/fp/result";

type Event<Command> = {
  id: string;
  occurredAt: string;
  aggregateId: string;
  type: string;
  payload: Command;
};

type ApplyResult<Aggregate, Command> = {
  aggregate: Aggregate;
  domainEvent: Event<Command>;
};

export type CommandHandlers<Aggregate, Command> = Map<
  string,
  (aggregate: Aggregate, command: Command) => Result<ApplyResult<Aggregate, Command>>
>;

export function regenerate<Aggregate, Command>(
  events: Event<Command>[],
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
      ? createSuccess(applyResult.value.aggregate)
      : result;
  }, createError(new Error("No events"), events));
}