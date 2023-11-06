"use client";

import React from "react";
import { signIn, signOut, useSession } from "next-auth/react";

const SignButton = () => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p>Loading....</p>;
  }

  if (status === "unauthenticated") {
    return <button onClick={() => signIn()}>Sign In</button>;
  }

  if (status === "authenticated") {
    return <button onClick={() => signOut()}>Sign Out</button>;
  }
};

export default SignButton;
