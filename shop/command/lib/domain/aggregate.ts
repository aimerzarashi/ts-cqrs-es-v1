import { Result, createError, createSuccess } from "@/lib/fp/result";

export type DomainEvent<Command> = {
  id: string;
  occurredAt: string;
  aggregateId: string;
  type: string;
  payload: Command;
};

export type ApplyResult<Aggregate, DomainEvent> = {
  aggregate: Aggregate;
  domainEvent: DomainEvent;
};

export type CommandHandlers<Aggregate, Command> = Map<
  string,
  (
    aggregate: Aggregate,
    command: Command
  ) => Result<ApplyResult<Aggregate, DomainEvent<Command>>>
>;

export type GenerateCurried<Aggregate, Command> = (
  commandHandlers: CommandHandlers<Aggregate, Command>
) => (domainEvents: DomainEvent<Command>[]) => Result<Aggregate>;