import React from "react";
import Link from "next/link";
import StockItemList from "@/components/stock/items/stockItemList2";

const Page = () => {
  return (
    <main>
      <StockItemList />
      <Link href="/stock/items/create">Create</Link>
    </main>
  );
};

export default Page;
