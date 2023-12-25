"use client";
import { useRouter } from "next/navigation";

export function ButtonLogout() {
  const router = useRouter();

  return (
    <a href="/api/auth/logout" className="bg-slate-600 w-28">
      button-logout
    </a>
  );
}
