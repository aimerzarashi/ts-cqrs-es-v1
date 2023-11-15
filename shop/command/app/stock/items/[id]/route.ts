import { NextRequest, NextResponse } from "next/server";
import { headers } from 'next/headers';
import { extractAccountId } from '@/lib/auth/validation';
import { paths } from '@/schemas/stockItem';
import { apply } from "@/app/stock/items/aggregate";
import { get, save } from "@/app/stock/items/repository";
import { StockItemEvent } from "@/app/stock/items/event";

type RequestBody = paths['/stock/items/{id}']['put']['requestBody']['content']['application/json'];

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  const headersList = headers();
  const authorization = headersList.get('authorization');

  // アカウントIDを取得
  const accountId = extractAccountId(authorization);
  if (!accountId.success) {
    console.error(accountId.error);
    return NextResponse.json(
      { message: 'failed' },
      { status: 401 }
    );
  }

  // リクエストボディを取得
  const requestbody: RequestBody = await request.json();

  // 集約IDを取得
  const aggregateId = params.id;

  // 集約を取得
  const stockItem = await get(aggregateId);
  if (!stockItem.success) {
    console.error(stockItem.error);
    return NextResponse.json(
      { message: 'failed' },
      { status: 404 }
    );
  }

  // 集約を更新
  const event: StockItemEvent = {
    aggregateId: aggregateId,
    type: 'Updated',
    payload: {
      name: requestbody.name
    }
  };

  // イベントを適用
  const stockItemEvent = apply(stockItem.value, [event]);

  // イベントを保存
  const result = await save(aggregateId, event);

  return NextResponse.json({ message: 'success' }, { status: 200 });
}