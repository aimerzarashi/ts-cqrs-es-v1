"use client";

import { useSession } from "next-auth/react";
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
    </main>
  );
}
