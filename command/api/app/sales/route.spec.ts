import { describe, it } from "node:test";
import assert from "node:assert";

import { POST } from "./route"; // テスト対象のファイルをインポートする

describe("POST", () => {
  it("should return a JSON response with status 200 and message 'Hello World'", async () => {
    const response = await POST();

    // レスポンスのステータスコードとメッセージを検証するアサーションを行う
    assert.strictEqual(response.status, 200);
    assert.deepStrictEqual(JSON.parse(await response.text()), { message: "Hello World" });
  });
});
