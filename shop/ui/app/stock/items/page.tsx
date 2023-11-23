import { graphql } from "@/schemas/graphql/gql";
import { Client, cacheExchange, fetchExchange } from "@urql/core";

const client = new Client({
  url: "http://shop-query:5000/graphql",
  exchanges: [cacheExchange, fetchExchange],
});

const getStockItems = async (): Promise<void> => {
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
  console.log({ result: data?.stockItems?.nodes }); // { data: ... }
};

export default async function Page() {
  await getStockItems();

  return (
    <main>
      <div>Hello</div>
    </main>
  );
}
