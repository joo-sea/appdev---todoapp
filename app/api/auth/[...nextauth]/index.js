import prisma from "@/lib/prisma";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const user = await prisma.user.findFirst({ where: { username: credentials.username}});
        if (user && user.password === credentials.password) {
          return {
            id: user.id,
            name: user.username,
          };
        }
        return null;
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      let user = null;
      if (!session.user.id && token.email) {
        user = await prisma.user.upsert({
          where: { username: token.email },
          update: {},
          create: {
            username: token.email,
            password: crypto.randomUUID()
          }
        });
      } else if (!session.user.id && token.name) {
        user = await prisma.user.findFirst({ 
          where: { username: token.name }
        });
      }
      session.user.id = user?.id;
      return session;
    }
  }
};











