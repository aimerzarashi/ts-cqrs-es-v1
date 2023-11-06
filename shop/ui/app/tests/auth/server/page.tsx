import React from "react";
import Link from "next/link";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth/options";
import SignButton from "@/components/menu/sign";

export default async function Page() {
  const session = await getServerSession(authOptions);

  return (
    <main>
      <div>
        <SignButton />
      </div>
      <div>{JSON.stringify(session?.user)}</div>
      <div>
        <Link href="/tests/auth/">back</Link>
      </div>
    </main>
  );
}
