import React from "react";

export default function Page({ params }: { params: { id: string } }) {
  return (
    <main>
      <div>{params.id}</div>
    </main>
  );
}
