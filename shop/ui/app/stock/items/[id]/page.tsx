import React from "react";
import Link from "next/link";

export default function Page({ params }: { params: { id: string } }) {
  return (
    <main>
      <div>{params.id}</div>
      <Link href="/stock/items">Back</Link>
    </main>
  );
}
