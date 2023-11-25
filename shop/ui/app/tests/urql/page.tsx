import React from "react";
import Link from "next/link";

export default function Page() {
  return (
    <>
      <div className="topMenu">Urql Tests</div>
      <div>
        <Link href="/tests/urql/simple">simple</Link>
      </div>
      <div>
        <Link href="/tests/urql/components">components</Link>
      </div>
    </>
  );
}
