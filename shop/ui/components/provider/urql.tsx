"use client";

import React from "react";
import { Provider } from "urql";
import { Client, cacheExchange, fetchExchange } from "@urql/core";
import { useSession } from "next-auth/react";

type Props = {
  children?: React.ReactNode;
};

export const GraphqlProvider = ({ children }: Props) => {
  const { data, status } = useSession({
    required: true,
  });

  const client = new Client({
    url: "https://shop-query.aimerzarashi.com/graphql",
    exchanges: [cacheExchange, fetchExchange],
    fetchOptions: () => {
      return {
        headers: {
          Authorization: data?.user.authorization.accessToken
            ? `Bearer ${data?.user.authorization.accessToken}`
            : "",
        },
      };
    },
  });

  return <Provider value={client}>{children}</Provider>;
};
