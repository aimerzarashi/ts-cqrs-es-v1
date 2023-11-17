import { describe, it } from "node:test";
import assert from "node:assert";
import { PrismaClient } from '@prisma/client';

const token = 'eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICI4T3VJcFluQW1acndFVXBESFlSRkU5NzZGQThUcWs1QmZNMURNZEl2S1o0In0.eyJleHAiOjE2OTg5NzE5MzMsImlhdCI6MTY5ODk3MTYzMywianRpIjoiNTNiMzc2ZmYtODU1Yy00ZWFkLWFjMjUtODQ1OTBmYjY3ZWYwIiwiaXNzIjoiaHR0cHM6Ly9pYW0tcHJvdmlkZXIuYWltZXJ6YXJhc2hpLmNvbS9yZWFsbXMvYWltZXJ6YXJhc2hpIiwiYXVkIjpbImNvbW1hbmQiLCJwb3N0Z3JhcGhpbGUiLCJhY2NvdW50Il0sInN1YiI6IjAwYzE4NGU2LWIyNWMtNGUwOS05MTcxLWUwYzEzZDNkYjhkMyIsInR5cCI6IkJlYXJlciIsImF6cCI6IndlYnNpdGUtdWkiLCJzZXNzaW9uX3N0YXRlIjoiYTU1MmQ1YmUtN2E4OS00YjY4LThlYzQtNTdiZTg5ZTBjYmRkIiwiYWNyIjoiMSIsImFsbG93ZWQtb3JpZ2lucyI6WyIvKiJdLCJyZWFsbV9hY2Nlc3MiOnsicm9sZXMiOlsib2ZmbGluZV9hY2Nlc3MiLCJ1bWFfYXV0aG9yaXphdGlvbiIsImRlZmF1bHQtcm9sZXMtYWltZXJ6YXJhc2hpIl19LCJyZXNvdXJjZV9hY2Nlc3MiOnsiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJwcm9maWxlIGVtYWlsIiwic2lkIjoiYTU1MmQ1YmUtN2E4OS00YjY4LThlYzQtNTdiZTg5ZTBjYmRkIiwiYWNjb3VudF9pZCI6IjMyODllYjg4LWM2MDYtNDhiYS1iZjYxLTE0Mzg0MDc2NzQ1NyIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiIyMDIzMTEwMjE5MzYwMDAwMEBleGFtcGxlLmNvbSIsImVtYWlsIjoiMjAyMzExMDIxOTM2MDAwMDBAZXhhbXBsZS5jb20ifQ.ESqnfX6jpaG6HLgSHIzjp8u1lCic7yQ8XIlf8-RRlZNl_3-Q32uAIy-G2DbuN4b8JdqU53bl0ZeGZHbCrcH6Ygb6eax1e44FGww7kDNehecwFm5YojvQT0VTuFXz9gOvqo4o5VxQ7JZmi9c0NbKPqMrZ9PbeVPUXjDRSjMOG5xqM1m0f7s-MHXCaOBqN2xGfxoiev39E1OhlNsF_iPN-s3-F86wSwasOpbcBRkDnXKo2-olBtV2ZP0grFmdbbXeh-jahNkLSgg0nMJ3YFkexa_yKkbEl9h8Qr33chOhJYgd-N7kcSDcGvoeYpWyCow6r9VQwcO-GaBHGyrE1hZUiow';

describe("POST", () => {
  it("異常系①", async () => {
    const response = await fetch('http://localhost:3000/stock/items',
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      });

    // レスポンスのステータスコードとメッセージを検証するアサーションを行う
    assert.strictEqual(
      response.status,
      401,
      "ステータスコードが期待通りではありません");
    assert.deepStrictEqual(
      JSON.parse(await response.text()),
      { message: "failed" },
      "メッセージが期待通りではありません");
  });

  it("異常系②", async () => {
    const response = await fetch('http://localhost:3000/stock/items',
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `${token}`
        },
        body: JSON.stringify({}),
      });

    // レスポンスのステータスコードとメッセージを検証するアサーションを行う
    assert.strictEqual(
      response.status,
      401,
      "ステータスコードが期待通りではありません");
    assert.deepStrictEqual(
      JSON.parse(await response.text()),
      { message: "failed" },
      "メッセージが期待通りではありません");
  });

  it("異常系③", async () => {
    const response = await fetch('http://localhost:3000/stock/items',
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer `
        },
        body: JSON.stringify({}),
      });

    // レスポンスのステータスコードとメッセージを検証するアサーションを行う
    assert.strictEqual(
      response.status,
      401,
      "ステータスコードが期待通りではありません");
    assert.deepStrictEqual(
      JSON.parse(await response.text()),
      { message: "failed" },
      "メッセージが期待通りではありません");
  });

  it("異常系④", async () => {
    const response = await fetch('http://localhost:3000/stock/items',
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({}),
      });

    // レスポンスのステータスコードとメッセージを検証するアサーションを行う
    assert.strictEqual(
      response.status,
      400,
      "ステータスコードが期待通りではありません");
    assert.deepStrictEqual(
      JSON.parse(await response.text()),
      { message: "failed" },
      "メッセージが期待通りではありません");
  });

  it("正常系", async () => {
    const response = await fetch('http://localhost:3000/stock/items',
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ name: crypto.randomUUID() }),
      });

    // レスポンスのステータスコードとメッセージを検証するアサーションを行う
    assert.strictEqual(
      response.status,
      201,
      "ステータスコードが期待通りではありません");
    assert.deepStrictEqual(
      JSON.parse(await response.text()),
      { message: "success" },
      "メッセージが期待通りではありません");
  });
});

describe("PUT", () => {
  it("正常系", async () => {
    const token = 'eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICI4T3VJcFluQW1acndFVXBESFlSRkU5NzZGQThUcWs1QmZNMURNZEl2S1o0In0.eyJleHAiOjE2OTg5NzE5MzMsImlhdCI6MTY5ODk3MTYzMywianRpIjoiNTNiMzc2ZmYtODU1Yy00ZWFkLWFjMjUtODQ1OTBmYjY3ZWYwIiwiaXNzIjoiaHR0cHM6Ly9pYW0tcHJvdmlkZXIuYWltZXJ6YXJhc2hpLmNvbS9yZWFsbXMvYWltZXJ6YXJhc2hpIiwiYXVkIjpbImNvbW1hbmQiLCJwb3N0Z3JhcGhpbGUiLCJhY2NvdW50Il0sInN1YiI6IjAwYzE4NGU2LWIyNWMtNGUwOS05MTcxLWUwYzEzZDNkYjhkMyIsInR5cCI6IkJlYXJlciIsImF6cCI6IndlYnNpdGUtdWkiLCJzZXNzaW9uX3N0YXRlIjoiYTU1MmQ1YmUtN2E4OS00YjY4LThlYzQtNTdiZTg5ZTBjYmRkIiwiYWNyIjoiMSIsImFsbG93ZWQtb3JpZ2lucyI6WyIvKiJdLCJyZWFsbV9hY2Nlc3MiOnsicm9sZXMiOlsib2ZmbGluZV9hY2Nlc3MiLCJ1bWFfYXV0aG9yaXphdGlvbiIsImRlZmF1bHQtcm9sZXMtYWltZXJ6YXJhc2hpIl19LCJyZXNvdXJjZV9hY2Nlc3MiOnsiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJwcm9maWxlIGVtYWlsIiwic2lkIjoiYTU1MmQ1YmUtN2E4OS00YjY4LThlYzQtNTdiZTg5ZTBjYmRkIiwiYWNjb3VudF9pZCI6IjMyODllYjg4LWM2MDYtNDhiYS1iZjYxLTE0Mzg0MDc2NzQ1NyIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiIyMDIzMTEwMjE5MzYwMDAwMEBleGFtcGxlLmNvbSIsImVtYWlsIjoiMjAyMzExMDIxOTM2MDAwMDBAZXhhbXBsZS5jb20ifQ.ESqnfX6jpaG6HLgSHIzjp8u1lCic7yQ8XIlf8-RRlZNl_3-Q32uAIy-G2DbuN4b8JdqU53bl0ZeGZHbCrcH6Ygb6eax1e44FGww7kDNehecwFm5YojvQT0VTuFXz9gOvqo4o5VxQ7JZmi9c0NbKPqMrZ9PbeVPUXjDRSjMOG5xqM1m0f7s-MHXCaOBqN2xGfxoiev39E1OhlNsF_iPN-s3-F86wSwasOpbcBRkDnXKo2-olBtV2ZP0grFmdbbXeh-jahNkLSgg0nMJ3YFkexa_yKkbEl9h8Qr33chOhJYgd-N7kcSDcGvoeYpWyCow6r9VQwcO-GaBHGyrE1hZUiow';
    const id = '0cc8fbce-1dd1-41d8-baf8-9629d992976a';

    const response = await fetch("http://localhost:3000/stock/items/0cc8fbce-1dd1-41d8-baf8-9629d992976a",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ name: crypto.randomUUID() }),
      });

    // レスポンスのステータスコードとメッセージを検証するアサーションを行う
    assert.strictEqual(
      response.status,
      200,
      "ステータスコードが期待通りではありません");
    assert.deepStrictEqual(
      JSON.parse(await response.text()),
      { message: "success" },
      "メッセージが期待通りではありません");
  });
});
