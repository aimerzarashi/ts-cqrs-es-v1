import React from 'react';
import Link from "next/link";

export default function Page() {
  return (
    <>
      <div className='topMenu'>Auth Tests</div>
      <div>
        <Link href="/tests/auth/server">server</Link>
      </div>
      <div>
        <Link href="/tests/auth/client">client</Link>
      </div>
    </>
  )
}
