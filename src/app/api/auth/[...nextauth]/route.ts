/* eslint-disable react-hooks/rules-of-hooks */
import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

import configureAxiosInterceptors from "@/api/interceptor";
import { authService } from "@/modules/auth/services";
import { cookies } from "next/headers";
import { meService } from "@/modules/app/services/me-service";
import { useLogger } from "@/modules/app/hooks/use-logger.hook";

const logger = useLogger();

const nextAuthOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
        storeName: { label: "storeName", type: "text" },
      },

      async authorize(credentials) {
        try {
          const email = credentials?.email;
          const password = credentials?.password;
          const storeName = credentials?.storeName;

          if (storeName) {
            const { data: user } = await authService.signInSupport(
              email,
              password,
              storeName
            );

            if (user) {
              const cookie = cookies();

              cookie.set("yeap-delivery-token", user.accessToken);
              return user;
            }
            return null;
          }

          const { data: user } = await authService.signIn(email, password);

          if (user) {
            const cookie = cookies();

            cookie.set("yeap-delivery-token", user.accessToken);
            return user;
          }
        } catch (error) {
          logger.error("Erro ao fazer login", error);
          throw new Error("Usuário ou senha inválidos");
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = (user as any).accessToken;
      }

      return token;
    },
    async session({ session }) {
      try {
        const cookie = cookies();

        const token = cookie.get("yeap-delivery-token").value;

        configureAxiosInterceptors(token);

        const { data: me } = await meService.me();
        const { data: userMe } = await authService.userMe();

        session.store = {
          ...me,
          accessToken: token,
        };

        session.user = userMe;

        return session;
      } catch (error) {
        logger.error("Erro ao buscar usuário logado", error);
      }
    },
  },
  pages: {
    signIn: "/",
  },
};

const handler = NextAuth(nextAuthOptions);

export { handler as GET, handler as POST, nextAuthOptions };
