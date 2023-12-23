import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

const correctEmail = "yeap@email.com";
const correctPassword = "123456";
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";

const nextAuthOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
      },

      async authorize(credentials) {
        await delay(600);
        const email = credentials?.email;
        const password = credentials?.password;

        if (email === correctEmail && password === correctPassword) {
          return {
            id: "user_id",
            accessToken: token,
          };
        }

        return null;
      },
    }),
  ],
  //   maxAge: 60,
  // },
  // callbacks: {
  //   async jwt({ token, user }) {
  //     console.log("jwt", token, user);

  //     if (user) {
  //       token.accessToken = (user as any).access_token;
  //     }

  //     return token;
  //   },
  //   async session({ session, token }) {
  //     console.log("session", session, token);
  //     (session as any).accessToken = token.accessToken;
  //     return session;
  //   },
  // },
  pages: {
    signIn: "/",
  },
};

const handler = NextAuth(nextAuthOptions);

export { handler as GET, handler as POST, nextAuthOptions };
