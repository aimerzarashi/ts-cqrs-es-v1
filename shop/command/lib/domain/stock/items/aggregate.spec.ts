import { describe, it } from "node:test";
import assert from "node:assert";

import {
  generate,
  create, StockItemCreateCommand,
  update, StockItemUpdateCommand,
} from "./aggregate";

import { storeEvent, findEvents } from "./repository";
import { PrismaClient } from "@prisma/client";

describe("stockItem aggregate", () => {
  it("create", async () => {
    const stockItemCreateCommand: StockItemCreateCommand = {
      id: crypto.randomUUID(),
      name: "test",
      accountId: crypto.randomUUID(),
    };
    const timestamp = new Date().toISOString();
    const createResult = create(stockItemCreateCommand);
    if (!createResult.success) {
      assert.fail("createResult is fail");
    }
    const { aggregate, domainEvent } = createResult.value;
    assert.deepEqual(aggregate, {
      id: stockItemCreateCommand.id,
      name: stockItemCreateCommand.name,
      accountId: stockItemCreateCommand.accountId,
    });
    assert.ok(domainEvent.id);
    assert.ok(domainEvent.occurredAt >= timestamp);
    assert.equal(domainEvent.aggregateId, stockItemCreateCommand.id);
    assert.equal(domainEvent.type, "Created");
    assert.deepEqual(domainEvent.payload, {
      id: stockItemCreateCommand.id,
      name: stockItemCreateCommand.name,
      accountId: stockItemCreateCommand.accountId,
    });
  });

  it("update", async () => {
    const stockItemCreateCommand: StockItemCreateCommand = {
      id: crypto.randomUUID(),
      name: "test",
      accountId: crypto.randomUUID(),
    };
    const createResult = create(stockItemCreateCommand);
    if (!createResult.success) {
      assert.fail("createResult is fail");
    }
    const { aggregate: createdAggregate, domainEvent: stockItemCreatedEvent } =
      createResult.value;

    const stockItemUpdateCommand: StockItemUpdateCommand = {
      name: "test2",
    };
    const timestamp = new Date().toISOString();
    const updateResult = update(createdAggregate, stockItemUpdateCommand);
    if (!updateResult.success) {
      assert.fail("updateResult is fail");
    }
    const { aggregate, domainEvent } = updateResult.value;
    assert.deepEqual(aggregate, {
      id: createdAggregate.id,
      name: stockItemUpdateCommand.name,
      accountId: createdAggregate.accountId,
    });
    assert.ok(domainEvent.id);
    assert.ok(domainEvent.occurredAt >= timestamp);
    assert.equal(domainEvent.aggregateId, aggregate.id);
    assert.equal(domainEvent.type, "Updated");
    assert.deepEqual(domainEvent.payload, {
      name: stockItemUpdateCommand.name,
    });
  });

  it("generate fail", async () => {
    const generateResult = generate([]);
    if (generateResult.success) {
      assert.fail("generateResult is success");
    }
    assert.ok(generateResult.error);
    assert.equal(generateResult.error.message, "No events");
  });

  it("generate success", async () => {
    const stockItemCreateCommand: StockItemCreateCommand = {
      id: crypto.randomUUID(),
      name: "test",
      accountId: crypto.randomUUID(),
    };
    const createResult = create(stockItemCreateCommand);
    if (!createResult.success) {
      assert.fail("createResult is fail");
    }
    const { aggregate: createdAggregate, domainEvent: stockItemCreatedEvent } =
      createResult.value;

    const stockItemUpdateCommand: StockItemUpdateCommand = {
      name: "test2",
    };
    const updateResult = update(createdAggregate, stockItemUpdateCommand);
    if (!updateResult.success) {
      assert.fail("updateResult is fail");
    }

    const { aggregate: updatedAggregate, domainEvent: stockItemUpdatedEvent } =
      updateResult.value;

    const generateResult = generate([
      stockItemCreatedEvent,
      stockItemUpdatedEvent,
    ]);
    if (!generateResult.success) {
      assert.fail("generateResult is fail");
    }

    const generateAggregate = generateResult.value;
    assert.deepEqual(generateAggregate, updatedAggregate);
  });
});

describe("stockItem repository", () => {
  it("storeEvent", async () => {
    const stockItemCreateCommand: StockItemCreateCommand = {
      id: crypto.randomUUID(),
      name: "test",
      accountId: crypto.randomUUID(),
    };
    const createResult = create(stockItemCreateCommand);
    if (!createResult.success) {
      assert.fail("createResult is fail");
    }
    const { domainEvent } = createResult.value;
    const storeEventResult = await storeEvent(domainEvent);
    if (!storeEventResult.success) {
      assert.fail("storeEventResult is fail");
    }
    const prisma = new PrismaClient();
    const stockItemEvent = await prisma.stockItemEvent.findUnique({
      where: {
        id: domainEvent.id,
      },
    })
    assert.deepEqual(stockItemEvent, {
      id: domainEvent.id,
      occurredAt: new Date(domainEvent.occurredAt),
      aggregateId: domainEvent.aggregateId,
      type: domainEvent.type,
      payload: {
        id: domainEvent.payload.id,
        name: domainEvent.payload.name,
        accountId: domainEvent.payload.accountId,
      }
    })
  });

  it("getEvents", async () => {
    const stockItemCreateCommand: StockItemCreateCommand = {
      id: crypto.randomUUID(),
      name: "test",
      accountId: crypto.randomUUID(),
    };
    const createResult = create(stockItemCreateCommand);
    if (!createResult.success) {
      assert.fail("createResult is fail");
    }
    const { domainEvent } = createResult.value;
    const storeEventResult = await storeEvent(domainEvent);
    if (!storeEventResult.success) {
      assert.fail("storeEventResult is fail");
    }
    const findEventsResult = await findEvents(domainEvent.aggregateId);
    if (!findEventsResult.success) {
      assert.fail("getEventsResult is fail");
    }
    assert.deepEqual(findEventsResult.value, [domainEvent]);
  })
});