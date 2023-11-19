import { describe, it } from "node:test";
import assert from "node:assert";

import { create, update, StockItemCreateCommand, StockItemUpdateCommand } from "./aggregate";

describe("stockItem aggregate", () => {

  it("create", async () => {
    const stockItemCreateCommand: StockItemCreateCommand = {
      id: crypto.randomUUID(),
      name: "test",
      accountId: crypto.randomUUID(),
    }
    const timestamp = new Date().toISOString();
    const createResult = create(stockItemCreateCommand);
    if (!createResult.success) {
      assert.fail('createResult is fail');
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
    })
  });

  it("update", async () => {
    const stockItemCreateCommand: StockItemCreateCommand = {
      id: crypto.randomUUID(),
      name: "test",
      accountId: crypto.randomUUID(),
    };
    const createResult = create(stockItemCreateCommand);
    if (!createResult.success) {
      assert.fail('createResult is fail');
    }
    const { aggregate: createdAggregate, domainEvent: stockItemCreatedEvent } = createResult.value;

    const stockItemUpdateCommand: StockItemUpdateCommand = {
      name: "test2",
    };
    const timestamp = new Date().toISOString();
    const updateResult = update(createdAggregate, stockItemUpdateCommand);
    if (!updateResult.success) {
      assert.fail('updateResult is fail');
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

});