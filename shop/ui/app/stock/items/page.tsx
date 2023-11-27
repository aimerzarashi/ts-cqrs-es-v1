import React from "react";
import Link from "next/link";
import StockItemList from "@/components/stock/items/stockItemList";

const Page = () => {
  return (
    <main>
      <Link href="/stock/items/create">Create</Link>
      <StockItemList />
    </main>
  );
};

export default Page;
