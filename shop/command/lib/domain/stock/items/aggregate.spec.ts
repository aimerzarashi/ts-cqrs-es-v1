import { describe, it } from "node:test";
import assert from "node:assert";
import { generate, regenerate } from "./aggregate";
import {
  StockItemCreateCommand,
  StockItemUpdateCommand,
  create,
  update,
} from "./command";
import { store, get } from "@/lib/application/stock/items/repository";

describe("create", () => {
  it("generate", async () => {
    const stockItem = generate();
    if (!stockItem.success) {
      assert.fail("stockItem is error");
    }
  });

  it("apply", async () => {
    const stockItem = generate();
    if (!stockItem.success) {
      assert.fail("stockItem is error");
    }

    const StockItemCreateCommand: StockItemCreateCommand = {
      name: "test1",
      accountId: crypto.randomUUID(),
    };
    const createResult = create(stockItem.value, StockItemCreateCommand);
    if (!createResult.success) {
      assert.fail("stockItemEvent is error");
    }

    const createStoreResult = await store(createResult.value.occurredEvent);
    if (!createStoreResult.success) {
      assert.fail("storeResult is error");
    }
  });

  it("regenerate", async () => {
    const stockItem = generate();
    if (!stockItem.success) {
      assert.fail("stockItem is error");
    }

    const StockItemCreateCommand: StockItemCreateCommand = {
      name: "test1",
      accountId: crypto.randomUUID(),
    };
    const createResult = create(stockItem.value, StockItemCreateCommand);
    if (!createResult.success) {
      assert.fail("stockItemEvent is error");
    }

    const createStoreResult = await store(createResult.value.occurredEvent);
    if (!createStoreResult.success) {
      assert.fail("storeResult is error");
    }

    const stockItemEvents = await get(stockItem.value.id);
    if (!stockItemEvents.success) {
      assert.fail("stockItemEvents is error");
    }

    const regenerateResult = regenerate(stockItemEvents.value);
    if (!regenerateResult.success) {
      assert.fail("regeneratedStockItem is error");
    }

    const StockItemUpdateCommand: StockItemUpdateCommand = {
      name: "test1",
    };
    const updateResult = update(regenerateResult.value, StockItemUpdateCommand);
    if (!updateResult.success) {
      assert.fail("stockItemUpdatedEvent is error");
    }

    const updateStoreResult = await store(updateResult.value.occurredEvent);
    if (!updateStoreResult.success) {
      assert.fail("updateStoreResult is error");
    }
  });
});