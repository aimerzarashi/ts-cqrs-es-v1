import { describe, it } from "node:test";
import assert from "node:assert";

const token = 'eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJUR3lEUXhzaGhyQkZSSVhrbVJ2MVhZXzlLckpFOVg0MXpHcWZaN0U1Ym5BIn0.eyJleHAiOjE2OTgwNjUxMTEsImlhdCI6MTY5ODA2NDgxMSwianRpIjoiYjljMGQ5YTktYTc2ZS00MDQ2LTgyNzAtYTcwMmNiN2Q3NWYxIiwiaXNzIjoiaHR0cHM6Ly9pYW0tcHJvdmlkZXIuYWltZXJ6YXJhc2hpLmNvbS9yZWFsbXMvYWltZXJ6YXJhc2hpIiwiYXVkIjpbInBvc3RncmFwaGlsZSIsImFjY291bnQiXSwic3ViIjoiZDU1ODkyYjMtMDdjNS00YWQ2LWIxNjctMGY5ZTQ5NjBlYWI4IiwidHlwIjoiQmVhcmVyIiwiYXpwIjoid2Vic2l0ZS11aSIsInNlc3Npb25fc3RhdGUiOiI5YTgxYjc4NS03ZDRjLTRkMGUtODYwZS0zMzBjYTI5MjM2ODQiLCJhY3IiOiIxIiwiYWxsb3dlZC1vcmlnaW5zIjpbIi8qIl0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJvZmZsaW5lX2FjY2VzcyIsInVtYV9hdXRob3JpemF0aW9uIiwiZGVmYXVsdC1yb2xlcy1haW1lcnphcmFzaGkiXX0sInJlc291cmNlX2FjY2VzcyI6eyJhY2NvdW50Ijp7InJvbGVzIjpbIm1hbmFnZS1hY2NvdW50IiwibWFuYWdlLWFjY291bnQtbGlua3MiLCJ2aWV3LXByb2ZpbGUiXX19LCJzY29wZSI6ImVtYWlsIHByb2ZpbGUiLCJzaWQiOiI5YTgxYjc4NS03ZDRjLTRkMGUtODYwZS0zMzBjYTI5MjM2ODQiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicHJlZmVycmVkX3VzZXJuYW1lIjoiMjAyMzEwMjMyMTM5MDAwMDBAZXhhbXBsZS5jb20iLCJlbWFpbCI6IjIwMjMxMDIzMjEzOTAwMDAwQGV4YW1wbGUuY29tIn0.VMtBAKFELj3kYIYMzxIYmZHD9Ub0ZE3i5dACVEuvlNkp8njMbKO152C_P9f3sB4dujx1WfXuqu1tif-TFk7-1XseFtbWq-IW3d_6nhXJvnEz2NBrSMtQka58jInFfP85Cz0fH46K5idtGPplHrkCbFZ6iq11GAUcsP-5iKDREkf6gMXP3s2lFPZPZdn2J8TvrAyjG3iys-IG4fUxLSIT9ip0cths--MEaiKs21WOncoTr9qezBwQQdBOL2SVyOPgbfVflxNU8QXVwn29sEM9GT6ZTxG4CoJI0v8T6L3rP0TWOT4ee3qU-zKMO4LzugpukbTRkW-kAhTZlpldcmRb3g';

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
      { error: "Invalid Authorization Header" },
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
      { error: "Invalid Authorization Header" },
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
      { error: "Invalid Authorization Header" },
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
        body: JSON.stringify({}),
      });

    // レスポンスのステータスコードとメッセージを検証するアサーションを行う
    assert.strictEqual(
      response.status,
      201,
      "ステータスコードが期待通りではありません");
    assert.deepStrictEqual(
      JSON.parse(await response.text()),
      { message: "Hello World" },
      "メッセージが期待通りではありません");
  });
});
