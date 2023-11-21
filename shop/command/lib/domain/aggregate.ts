import { Result, createError, createSuccess } from "@/lib/fp/result";

export type ApplyResult<Aggregate, DomainEvent> = {
  aggregate: Aggregate;
  domainEvent: DomainEvent;
};

export type CommandHandlers<Aggregate, Command, DomainEvent> = Map<
  string,
  (
    aggregate: Aggregate,
    command: Command
  ) => Result<ApplyResult<Aggregate, DomainEvent>>
>;

export type GenerateCurried<Aggregate, Command, DomainEvent> = (
  commandHandlers: CommandHandlers<Aggregate, Command, DomainEvent>
) => (domainEvents: DomainEvent[]) => Result<Aggregate>;