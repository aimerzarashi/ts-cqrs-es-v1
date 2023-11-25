"use client";

import { Suspense } from "react";
import Link from "next/link";
import { getStockItems, StockItem } from "./getStockItems";

const StockItemList = () => {
  return (
    <ul>
      <Suspense fallback={<div>Loading...</div>}>
        {getStockItems().then((items) => {
          return items.map((item) => {
            return (
              <li key={item.id}>
                <Link href="/stock/items/[id]" as={`/stock/items/${item.id}`}>
                  {item.name}
                </Link>
              </li>
            );
          });
        })}
      </Suspense>
    </ul>
  );
};

export default StockItemList;
