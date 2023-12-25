"use client";
import { signIn, useSession } from "next-auth/react";
import { useEffect } from "react";

export default function Login() {
  useEffect(() => {
    redirect();
  }, []);

  async function redirect() {
    await signIn("auth0", {
      redirect: false,
      callbackUrl: "/pedidos",
    });
  }

  return <div></div>;
}
