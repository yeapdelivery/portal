"use client";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";

export function ButtonLogout() {
  const router = useRouter();

  async function handleLogout() {
    await signOut({
      redirect: false,
    });

    router.replace("/");
  }

  return (
    <button className="bg-slate-600 w-28" onClick={handleLogout}>
      button-logout
    </button>
  );
}
