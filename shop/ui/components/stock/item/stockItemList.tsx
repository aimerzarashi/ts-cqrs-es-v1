"use client";

import { Suspense } from "react";
import { getStockItems, StockItem } from "./getStockItems";

const StockItemList = () => {
  return (
    <ul>
      <Suspense fallback={<div>Loading...</div>}>
        {getStockItems().then((items) => {
          return items.map((item) => {
            return <li key={item.id}>{item.name}</li>;
          });
        })}
      </Suspense>
    </ul>
  );
};

export default StockItemList;
