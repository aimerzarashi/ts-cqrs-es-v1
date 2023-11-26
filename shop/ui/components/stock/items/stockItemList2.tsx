"use client";

import React from "react";
import Link from "next/link";
import { useQuery } from "urql";
import { graphql } from "@/schemas/graphql/gql";

const stockItemsQuery = graphql(`
  query getStockItems {
    stockItems {
      nodes {
        id
        name
        accountId
        createdAt
        updatedAt
      }
    }
  }
`);

const StockItemList = () => {
  const [result, reexecuteQuery] = useQuery({
    query: stockItemsQuery,
  });

  const { data, fetching, error } = result;

  if (fetching) return <p>Loading...</p>;
  if (error) return <p>Oh no... {error.message}</p>;

  return (
    <ul>
      {data?.stockItems?.nodes?.map((stockItem) => (
        <li key={stockItem.id}>
          <Link href="/stock/items/[id]" as={`/stock/items/${stockItem.id}`}>
            {stockItem.name}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default StockItemList;
