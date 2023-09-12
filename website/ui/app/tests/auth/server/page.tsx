import React from "react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth/options";
import SignButton from '@/components/menu/sign';

export default async function Page() {
  const session = await getServerSession(authOptions);

  return (
    <main>
      <SignButton />
      <div>
        {JSON.stringify(session?.user)}
      </div>
    </main>
  );
}
