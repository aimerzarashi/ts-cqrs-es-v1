import React from "react";
import Link from "next/link";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth/options";
import { redirect } from "next/navigation";

const createStockItem = async (data: FormData) => {
  "use server";
  const session = await getServerSession(authOptions);
  const name = data.get("name");
  if (!session) {
    throw new Error("No session");
  }
  const token = session.user.authorization.accessToken;
  const response = await fetch("http://shop-command:3000/stock/items", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name: name }),
  });
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  redirect("/stock/items");
};

const Page = async () => {
  return (
    <main>
      <form action={createStockItem}>
        <input type="text" name="name" />
        <input type="submit" value="Create" />
      </form>
      <Link href="/stock/items">Back</Link>
    </main>
  );
};

export default Page;
