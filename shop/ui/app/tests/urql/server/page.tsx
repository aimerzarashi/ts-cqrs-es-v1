import React from "react";
import { graphql } from "@/schemas/graphql/gql";
import { Client, fetchExchange, cacheExchange } from "@urql/core";
import { Context } from "urql";

const Page = async () => {
  const client = new Client({
    url: "http://shop-query:5000/graphql",
    exchanges: [fetchExchange],
    requestPolicy: "network-only",
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

  const stockItems = await client
    .query(stockItemsQuery, {})
    .toPromise()
    .then(({ data }) => {
      if (!data?.stockItems?.nodes) {
        return [];
      }
      console.debug({
        timestamp: new Date().toISOString(),
        data: data?.stockItems?.nodes,
      });
      return data?.stockItems?.nodes.map((stockItem) => ({
        id: stockItem.id,
        name: stockItem.name,
        accountId: stockItem.accountId,
        createdAt: stockItem.createdAt,
        updatedAt: stockItem.updatedAt,
      }));
    });

  return (
    <ul>
      {stockItems.map((stockItem) => (
        <li key={stockItem.id}>{stockItem.name}</li>
      ))}
    </ul>
  );
};

export default Page;
