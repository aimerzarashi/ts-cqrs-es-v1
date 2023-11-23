"use server";

import { graphql } from "@/schemas/graphql/gql";
import { Client, fetchExchange } from "@urql/core";

export type StockItem = {
  id: string;
  name: string;
  accountId: string;
  createdAt: string;
  updatedAt: string;
};

export const getStockItems = async (): Promise<StockItem[]> => {
  const client = new Client({
    url: "http://shop-query:5000/graphql",
    exchanges: [fetchExchange],
  });

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
  const { data } = await client.query(stockItemsQuery, {});
  if (!data?.stockItems?.nodes) {
    return [];
  }

  return data?.stockItems?.nodes.map((stockItem) => ({
    id: stockItem.id,
    name: stockItem.name,
    accountId: stockItem.accountId,
    createdAt: stockItem.createdAt,
    updatedAt: stockItem.updatedAt,
  }));
};
