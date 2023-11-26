import React from "react";
import Link from "next/link";

export default function Page() {
  return (
    <>
      <div className="topMenu">Urql Tests components</div>
      <div>
        <Link href="/tests/urql/components/server">server</Link>
      </div>
      <div>
        <Link href="/tests/urql/components/client">client</Link>
      </div>
    </>
  );
}
