import type { NextAuthOptions } from "next-auth";
import { Adapter } from "next-auth/adapters";
import Email from "next-auth/providers/email";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import { getAdminToken, createUser, getToken, refreshToken } from "@/lib/iam/api";

const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt"
  },
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
      console.debug({
        type: 'callbacks signIn',
        user: user,
        account: profile,
        email: email,
        credentials: credentials
      });

      // IAM providerにUserを登録する
      if (email == undefined && user.id == user.email) {
        const adminToken = await getAdminToken();
        await createUser(adminToken.accessToken, user.email);
      }
      
      return true;
    },
    async redirect({ url, baseUrl }) {
      console.debug({
        type: 'callbacks redirect',
        url: url,
        baseUrl: baseUrl
      });
      // Allows relative callback URLs
      if (url.startsWith("/")) return `${baseUrl}${url}`
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url
      return baseUrl;
    },  
    async session({ session, token, user, newSession }) {
      console.debug({
        type: 'callbacks session',
        session: session,
        token: token,
        user: user,
        newSession: newSession
      });
//      return session;
      return {
        ...session,
        user: {
          ...session.user,
          authorization: {
            accessToken: token?.accessToken,
            accessExpiresIn: token?.accessExpiresIn,
            refreshToken: token?.refreshToken,
            refreshExpiresIn: token?.refreshExpiresIn
          }
        }
      };
    },
    async jwt({ token, user, account, profile, trigger }) {
      console.debug({
        type: 'callbacks jwt',
        token: token,
        user: user,
        account: account,
        profile: profile,
        trigger: trigger
      });

      const currentTimestamp = Math.floor(Date.now() / 1000);
      if ( token.accessExpiresIn && token.accessExpiresIn <= currentTimestamp) {
        if (token.refreshExpiresIn && currentTimestamp < token.refreshExpiresIn) {
          // IAM providerからRefreshTokenで取得する
          const userToken = await refreshToken(token.refreshToken);
          token.accessToken = userToken.accessToken;
          token.accessExpiresIn = userToken.accessExpiresIn;
          token.refreshToken = userToken.refreshToken;
          token.refreshExpiresIn = userToken.refreshExpiresIn;
        }
      }
      if (! token.accessToken || (token.refreshExpiresIn && token.refreshExpiresIn <= currentTimestamp) ) {
        // IAM providerからTokenを取得する
        const userToken = await getToken(token.email as string);
        token.accessToken = userToken.accessToken;
        token.accessExpiresIn = userToken.accessExpiresIn;
        token.refreshToken = userToken.refreshToken;
        token.refreshExpiresIn = userToken.refreshExpiresIn;
      }
      return token;
    }  
  },
  events: {
    async signIn(message) {
      console.debug({
        type: 'events signIn',
        message: message
      });
    },
    async signOut(message) {
      console.debug({
        type: 'events signOut',
        message: message
      });
    },
    async createUser(message) {
      console.debug({
        type: 'events createUser',
        message: message
      });
    },
    async updateUser(message) {
      console.debug({
        type: 'events updateUser',
        message: message
      });
    },
    async linkAccount(message) {
      console.debug({
        type: 'events linkAccount',
        message: message
      });
    },
    async session(message) {
      console.debug({
        type: 'events session',
        message: message
      });
    },
  }
};