import type { NextAuthOptions } from "next-auth";
import { Adapter } from "next-auth/adapters";
import Email from "next-auth/providers/email";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma) as Adapter,
  providers: [
    Email({
      server: {
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT),
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      console.log('callbacks signIn');
      console.log(user);
      console.log(account);
      console.log(profile);
      console.log(email);
      console.log(credentials);
      return true;
    },
    async redirect({ url, baseUrl }) {
      console.log({
        type: 'callbacks redirect',
        url: url,
        baseUrl: baseUrl
      });
      return baseUrl;
    },  
    async session({ session, token, user, newSession }) {
      console.log({
        type: 'callbacks session',
        session: session,
        token: token,
        user: user,
        newSession: newSession
      });
      return session;
    },
    async jwt({ token, user, account, profile, trigger }) {
      console.log({
        type: 'callbacks jwt',
        token: token,
        user: user,
        account: account,
        profile: profile,
        trigger: trigger
      });
      return token;
    }  
  },
  events: {
    async signIn(message) {
      console.log({
        type: 'events signIn',
        message: message
      });
    },
    async signOut(message) {
      console.log({
        type: 'events signOut',
        message: message
      });
    },
    async createUser(message) {
      console.log({
        type: 'events createUser',
        message: message
      });
    },
    async updateUser(message) {
      console.log({
        type: 'events updateUser',
        message: message
      });
    },
    async linkAccount(message) {
      console.log({
        type: 'events linkAccount',
        message: message
      });
    },
    async session(message) {
      console.log({
        type: 'events session',
        message: message
      });
    },
  }
};