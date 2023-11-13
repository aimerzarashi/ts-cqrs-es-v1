import { describe, it } from "node:test";
import assert from "node:assert";
import { PrismaClient } from "@prisma/client";
import { generate, create, regenerate, update } from "./aggregate";
import {
  StockItemCommand,
  CreateStockItemCommand,
  UpdateStockItemCommand,
} from "./command";
import { StockItemEvent } from "./event";

describe("create", () => {
  it("generate", async () => {
    const stockItem = generate();
    if (!stockItem.success) {
      assert.fail("stockItem is null");
    }
  });

  it("apply", async () => {
    const stockItem = generate();
    if (!stockItem.success) {
      assert.fail("stockItem is null");
    }

    const createStockItemCommand: CreateStockItemCommand = {
      name: "test1",
      accountId: crypto.randomUUID(),
    };
    const stockItemEvent = create(stockItem.value, createStockItemCommand);
    if (!stockItemEvent.success) {
      assert.fail("stockItemEvent is null");
    }

    const prisma = new PrismaClient();
    const result = await prisma.stockItemEvent.create({
      data: {
        aggregateId: stockItemEvent.value.occurredEvent.aggregateId,
        eventType: stockItemEvent.value.occurredEvent.eventType,
        eventPayload: stockItemEvent.value.occurredEvent.eventPayload,
      },
    });
    prisma.$disconnect();
  });

  it("regenerate", async () => {
    const stockItem = generate();
    if (!stockItem.success) {
      assert.fail("stockItem is null");
    }

    const createStockItemCommand: CreateStockItemCommand = {
      name: "test1",
      accountId: crypto.randomUUID(),
    };
    const createResult = create(stockItem.value, createStockItemCommand);
    if (!createResult.success) {
      assert.fail("stockItemEvent is null");
    }

    const prisma = new PrismaClient();
    const result = await prisma.stockItemEvent.create({
      data: {
        aggregateId: createResult.value.occurredEvent.aggregateId,
        eventType: createResult.value.occurredEvent.eventType,
        eventPayload: createResult.value.occurredEvent.eventPayload,
      },
    });
    if (!result) {
      assert.fail("result is null");
    }

    const events = await prisma.stockItemEvent.findMany({
      select: {
        aggregateId: true,
        eventPayload: true,
        eventType: true,
      },
      where: {
        aggregateId: createResult.value.aggregate.id,
      },
    });
    const stockItemEvents: StockItemEvent[] = events.map(
      (event) =>
      ({
        aggregateId: event.aggregateId,
        eventType: event.eventType,
        eventPayload: event.eventPayload,
      } as StockItemEvent)
    );

    const regenerateResult = regenerate(stockItemEvents);
    if (!regenerateResult.success) {
      assert.fail("regeneratedStockItem is null");
    }

    const updateStockItemCommand: UpdateStockItemCommand = {
      name: "test1",
    };
    const updateResult = update(
      regenerateResult.value,
      updateStockItemCommand
    );
    if (!updateResult.success) {
      assert.fail("stockItemUpdatedEvent is null");
    }

    const result2 = await prisma.stockItemEvent.create({
      data: {
        aggregateId: updateResult.value.occurredEvent.aggregateId,
        eventType: updateResult.value.occurredEvent.eventType,
        eventPayload: updateResult.value.occurredEvent.eventPayload,
      },
    });

    prisma.$disconnect();
  });
});