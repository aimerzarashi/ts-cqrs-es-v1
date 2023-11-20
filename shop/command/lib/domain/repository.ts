import { Result } from "@/lib/fp/result";
import { DomainEvent } from "./aggregate";

export type StoreEvent<Command> = (domainEvent: DomainEvent<Command>) => Promise<Result<void>>;

export type FindEvents<Command> = (aggregateId: string) => Promise<Result<DomainEvent<Command>[]>>;