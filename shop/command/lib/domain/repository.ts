import { Result } from "@/lib/fp/result";
import { PrismaClient } from "@prisma/client";

export type StoreEvent<DomainEvent> = (
  prisma: PrismaClient,
  domainEvent: DomainEvent
) => Promise<Result<void>>;

export type FindEvents<DomainEvent> = (
  prisma: PrismaClient,
  aggregateId: string
) => Promise<Result<DomainEvent[]>>;