//"use client";
import { graphql } from "@/schemas/graphql/gql";
import { Client, cacheExchange, fetchExchange } from "@urql/core";

type StockItem = {
  id: string;
  name: string;
  accountId: string;
  createdAt: string;
  updatedAt: string;
};

const getStockItems = async (): Promise<StockItem[]> => {
  //  "use server";
  const client = new Client({
    url: "http://shop-query:5000/graphql",
    exchanges: [cacheExchange, fetchExchange],
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

export default async function Page() {
  const stockItems = await getStockItems();
  console.log({ result: stockItems });

  return (
    <main>
      <ul>
        {stockItems.map((stockItem) => (
          <li key={stockItem.id}>
            {stockItem.name}:{stockItem.accountId}
          </li>
        ))}
      </ul>
    </main>
  );
}
