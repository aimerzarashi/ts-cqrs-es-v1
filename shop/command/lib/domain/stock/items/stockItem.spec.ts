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

describe("create", () => {

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
      assert.equal(createResult.value.appliedAggregate.id, StockItemCreateCommand.id);
      assert.equal(createResult.value.appliedAggregate.name, StockItemCreateCommand.name);
      assert.equal(createResult.value.appliedAggregate.accountId, StockItemCreateCommand.accountId);
      assert.ok(createResult.value.occurredEvent.id);
      assert.ok(createResult.value.occurredEvent.occurredAt >= currentDateTime);
      assert.equal(createResult.value.occurredEvent.aggregateId, createResult.value.appliedAggregate.id);
      assert.equal(createResult.value.occurredEvent.type, "Created");
      assert.deepEqual(createResult.value.occurredEvent.payload, {
        id: StockItemCreateCommand.id,
        name: StockItemCreateCommand.name,
        accountId: StockItemCreateCommand.accountId,
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

  it("regenerate one event", async () => {
    const StockItemCreateCommand: StockItemCreateCommand = {
      id: crypto.randomUUID(),
      name: "test1",
      accountId: crypto.randomUUID(),
    };
    const createResult = create(StockItemCreateCommand);
    if (!createResult.success) {
      assert.fail("create is error");
    }

    const createStoreResult = await store(createResult.value.occurredEvent);
    if (!createStoreResult.success) {
      assert.fail("storeResult is error");
    }

    const stockItemEvents = await get(createResult.value.appliedAggregate.id);
    if (!stockItemEvents.success) {
      assert.fail("stockItemEvents is error");
    }

    const regenerateResult = regenerate(stockItemEvents.value);
    if (!regenerateResult.success) {
      assert.fail("regeneratedStockItem is error");
    }
    else {
      assert.deepEqual(regenerateResult.value, createResult.value.appliedAggregate);
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
    const updateResult = update(createResult.value.appliedAggregate, StockItemUpdateCommand);
    if (!updateResult.success) {
      assert.fail("stockItemUpdatedEvent is error");
    }
    else {
      assert.equal(updateResult.value.appliedAggregate.id, createResult.value.appliedAggregate.id);
      assert.equal(updateResult.value.appliedAggregate.name, StockItemUpdateCommand.name);
      assert.equal(updateResult.value.appliedAggregate.accountId, createResult.value.appliedAggregate.accountId);
      assert.ok(updateResult.value.occurredEvent.id);
      assert.ok(updateResult.value.occurredEvent.occurredAt >= currentDateTime);
      assert.equal(updateResult.value.occurredEvent.aggregateId, updateResult.value.appliedAggregate.id);
      assert.equal(updateResult.value.occurredEvent.type, "Updated");
      assert.deepEqual(updateResult.value.occurredEvent.payload, {
        name: StockItemUpdateCommand.name,
      })
    }
  });

});