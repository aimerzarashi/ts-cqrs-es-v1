import React from "react";
import Link from "next/link";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth/options";
import { redirect } from "next/navigation";
import { paths } from "@/schemas/openapi/stockItem";

type StockItem =
  paths["/stock/items"]["post"]["requestBody"]["content"]["application/json"];

const updateStockItem = async (data: FormData) => {
  "use server";

  const session = await getServerSession(authOptions);
  if (!session) {
    throw new Error("No session");
  }
  const token = session.user.authorization.accessToken;

  const id = data.get("id");
  if (!id) {
    throw new Error("No id");
  }

  const name = data.get("name");
  if (!name) {
    throw new Error("No name");
  }

  const requestBody: StockItem = {
    name: name.toString(),
  };

  const response = await fetch(`http://shop-command:3000/stock/items/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(requestBody),
  });
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  redirect("/stock/items");
};

const Page = async ({ params }: { params: { id: string } }) => {
  return (
    <main>
      <div>{params.id}</div>
      <form action={updateStockItem}>
        <input type="hidden" name="id" value={params.id} />
        <input type="text" name="name" />
        <input type="submit" value="Update" />
      </form>
      <Link href="/stock/items">Back</Link>
    </main>
  );
};

export default Page;
