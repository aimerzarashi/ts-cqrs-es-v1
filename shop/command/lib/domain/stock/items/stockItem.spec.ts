import { describe, it } from "node:test";
import assert from "node:assert";
import { regenerate } from "./aggregate";
import {
  StockItemCreateCommand,
  StockItemUpdateCommand,
  create,
  update,
} from "./command";
import { store, get } from "@/lib/domain/stock/items/repository";

describe("stockItem aggregate", () => {

  it("create", async () => {
    const currentDateTime = new Date().toISOString();
    const StockItemCreateCommand: StockItemCreateCommand = {
      id: crypto.randomUUID(),
      name: "test1",
      accountId: crypto.randomUUID(),
    };
    const createResult = create(StockItemCreateCommand);
    if (!createResult.success) {
      assert.fail("stockItemEvent is error");
    }
    else {
      assert.equal(createResult.value.aggregate.id, StockItemCreateCommand.id);
      assert.equal(createResult.value.aggregate.name, StockItemCreateCommand.name);
      assert.equal(createResult.value.aggregate.accountId, StockItemCreateCommand.accountId);
      assert.ok(createResult.value.domainEvent.id);
      assert.ok(createResult.value.domainEvent.occurredAt >= currentDateTime);
      assert.equal(createResult.value.domainEvent.aggregateId, createResult.value.aggregate.id);
      assert.equal(createResult.value.domainEvent.type, "Created");
      assert.deepEqual(createResult.value.domainEvent.payload, {
        id: StockItemCreateCommand.id,
        name: StockItemCreateCommand.name,
        accountId: StockItemCreateCommand.accountId,
      })
    }
  });

  it("update", async () => {
    const StockItemCreateCommand: StockItemCreateCommand = {
      id: crypto.randomUUID(),
      name: "test1",
      accountId: crypto.randomUUID(),
    };
    const createResult = create(StockItemCreateCommand);
    if (!createResult.success) {
      assert.fail("create is error");
    }

    const StockItemUpdateCommand: StockItemUpdateCommand = {
      name: "test2",
    };
    const currentDateTime = new Date().toISOString();
    const updateResult = update(createResult.value.aggregate, StockItemUpdateCommand);
    if (!updateResult.success) {
      assert.fail("stockItemUpdatedEvent is error");
    }
    else {
      assert.equal(updateResult.value.aggregate.id, createResult.value.aggregate.id);
      assert.equal(updateResult.value.aggregate.name, StockItemUpdateCommand.name);
      assert.equal(updateResult.value.aggregate.accountId, createResult.value.aggregate.accountId);
      assert.ok(updateResult.value.domainEvent.id);
      assert.ok(updateResult.value.domainEvent.occurredAt >= currentDateTime);
      assert.equal(updateResult.value.domainEvent.aggregateId, updateResult.value.aggregate.id);
      assert.equal(updateResult.value.domainEvent.type, "Updated");
      assert.deepEqual(updateResult.value.domainEvent.payload, {
        name: StockItemUpdateCommand.name,
      })
    }
  });

  it("regenerate none event", async () => {
    const regenerateResult = regenerate([]);
    if (regenerateResult.success) {
      assert.fail("regeneratedStockItem is error");
    }
    else {
      assert.ok(regenerateResult.error instanceof Error);
    }
  });

  it("regenerate some event", async () => {
    const StockItemCreateCommand: StockItemCreateCommand = {
      id: crypto.randomUUID(),
      name: "test1",
      accountId: crypto.randomUUID(),
    };
    const createResult = create(StockItemCreateCommand);
    if (!createResult.success) {
      assert.fail("create is error");
    }

    const createStoreResult = await store(createResult.value.domainEvent);
    if (!createStoreResult.success) {
      assert.fail("storeResult is error");
    }

    const stockItemEvents = await get(createResult.value.aggregate.id);
    if (!stockItemEvents.success) {
      assert.fail("stockItemEvents is error");
    }

    const regenerateResult = regenerate(stockItemEvents.value);
    if (!regenerateResult.success) {
      assert.fail("regeneratedStockItem is error");
    }
    else {
      assert.deepEqual(regenerateResult.value, createResult.value.aggregate);
    }

    const StockItemUpdateCommand: StockItemUpdateCommand = {
      name: "test2",
    };
    const updateResult = update(createResult.value.aggregate, StockItemUpdateCommand);
    if (!updateResult.success) {
      assert.fail("stockItemUpdatedEvent is error");
    }

    assert.equal(updateResult.value.aggregate.id, createResult.value.aggregate.id);
    assert.equal(updateResult.value.aggregate.name, StockItemUpdateCommand.name);
    assert.equal(updateResult.value.aggregate.accountId, createResult.value.aggregate.accountId);
  });

});