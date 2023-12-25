"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();

  useEffect(() => {
    redirect();
  }, []);

  function redirect() {
    router.push("/api/auth/login");
  }

  return <div></div>;
}
