"use client";

import React from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import SignButton from '@/components/menu/sign';

export default function Page() {
  const { data: session, status } = useSession();

  return (
    <main>
      <div>
        <SignButton />
      </div>
      <div>
        {JSON.stringify(session?.user)}
      </div>
      <div>
        <Link href="/tests/auth/">back</Link>
      </div>
    </main>
  );
}
