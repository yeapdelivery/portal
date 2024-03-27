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

    const token = "";

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
