import NextAuth from "next-auth";
import Providers from "next-auth/providers";

import { EnvironmentVariables, Routes } from "@utils/constants";

// types
import type { NextAuthOptions } from "next-auth";

const { nextAuth, node } = EnvironmentVariables;

const options: NextAuthOptions = {
  providers: [
    Providers.Credentials({
      credentials: {
        username: {
          type: "text",
          label: "Username",
          placeholder: "Enter your username...",
        },
        email: {
          type: "email",
          label: "Email",
          placeholder: "Enter your email...",
        },
      },
      authorize: async (credentials) => {
        const url = `${nextAuth.URL}${Routes.AUTH_VALIDATE_USER}`;
        try {
          const options: RequestInit = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(credentials),
          };
          const response = await fetch(url, options);
          const data = await response.json();

          const { email, name } = data || {};
          if (!response.ok || !email || !name) {
            throw new Error("[ApiNextAuth]: Invalid response");
          }

          return data;
        } catch (error) {
          if (node.env === "development") console.log(error);
          return null;
        }
      },
    }),
    Providers.GitHub({
      clientId: nextAuth.AUTH_GITHUB_ID,
      clientSecret: nextAuth.AUTH_GITHUB_SECRET,
    }),
  ],
  theme: "auto",
  session: {},
  jwt: {},
  debug: true,
};

export default NextAuth(options);
