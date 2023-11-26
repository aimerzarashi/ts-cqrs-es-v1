import React from "react";
import Link from "next/link";

export default function Page() {
  return (
    <>
      <div className="topMenu">Urql Tests</div>
      <div>
        <Link href="/tests/urql/server">server</Link>
      </div>
      <div>
        <Link href="/tests/urql/client">client</Link>
      </div>
      <div>
        <Link href="/tests/urql/components">components</Link>
      </div>
    </>
  );
}
