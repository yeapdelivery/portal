import { getSession } from "@auth0/nextjs-auth0";
import { cookies } from "next/headers";
import { parseCookies } from "nookies";

import qs from "qs";

export default class ApiService {
  baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  getToken(): string {
    const isServer = typeof window === "undefined";
    let token = "";

    if (isServer) {
      const cookieStore = cookies();

      const tokenFromCookie = cookieStore.get("appSession1");

      if (tokenFromCookie) {
        token = tokenFromCookie.value;
      }

      return token;
    }

    const cookieFromNookies = parseCookies(null);

    if (cookies) {
      token = cookieFromNookies.appSession;
    }

    return token;
  }

  async GET(path?: string, queries?: Record<string, any>, headers?: any) {
    // const token = this.getToken();
    // const user = await getSession();

    // console.log({ token });

    const token =
      "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InAyNVQyUVJ6SEFmUWxDOGlsUm03ZyJ9.eyJpc3MiOiJodHRwczovL3llYXAudXMuYXV0aDAuY29tLyIsInN1YiI6ImF1dGgwfDY1OGJhNTY4ZTUxZDk1MjU3OWVkNDBjZiIsImF1ZCI6ImFwaS55ZWFwZGVsaXZlcnkuY29tLmJyIiwiaWF0IjoxNzExMzc3NDcxLCJleHAiOjE3MTE0NjM4NzEsImd0eSI6InBhc3N3b3JkIiwiYXpwIjoiM2tuclpmUnRVRzlwenFvNGRZaGZ0NU9PR095ZUpNY3AiLCJwZXJtaXNzaW9ucyI6WyJjcmVhdGU6cHJvZHVjdHMiLCJjcmVhdGU6c3RvcmVzIiwiZGVsZXRlOnByb2R1Y3RzIiwiZGVsZXRlOnN0b3JlcyIsInJlYWQ6cHJvZHVjdHMiLCJyZWFkOnN0b3JlcyIsInVwZGF0ZTpwcm9kdWN0cyIsInVwZGF0ZTpzdG9yZXMiXX0.m2JP4lbfOAVBQYIYeC5bmCJYQ7ORClCWuzMpAr71742euJEeQ1hvg-CpEaC_SEH_C223AVVK_3lDCrqGmuQfPaC_xAHl9VJoEHLwEGsDWX2XyjR-GBjub0V7tbYSKgkfg-F08dLwWSwKWiyE6cV0HFbRV7Yw5n3c5Th5LIdpga7v3DqI5e5E_WLsMoTdR3kciEj0uKzT_YV0Hvm82WFXuo6oE9LELS2z6sPHUM59Sa8Xaum0G-jBsfcTX8vYruU0H29cjt_S-TYXz7I8zyGGKX519KFE_a_GOG5ke-GdbDu_t_nZmTcXLoGx9ZeS4SW2Bwyeh2yHACwOy29cKrzOeA";

    const params = qs.stringify(
      {
        ...queries,
      },
      {
        encodeValuesOnly: true,
      }
    );

    const response = await fetch(`${this.baseUrl}${path}?${params}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        ...headers,
      },
    });

    return response.json();
  }
}
