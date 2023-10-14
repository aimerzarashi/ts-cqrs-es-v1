import { JWT } from "next-auth/jwt";
import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth/jwt" {
  interface JWT {
    accessToken: string
    accessExpiresIn: number
    refreshToken: string
    refreshExpiresIn: number
  }
}

declare module "next-auth" {
  interface Session {
    user: {
      authorization: {
        accessToken: string
        accessExpiresIn: number
        refreshToken: string
        refreshExpiresIn: number
      }
    } & DefaultSession["user"]
  }
}

