import { config } from "@/config";
import { createDefaultData } from "@/lib/actions";
import { prisma } from "@/lib/prisma";
import NextAuth, { User } from "next-auth";
import { AdapterUser } from "next-auth/adapters";
import GoogleProvider from "next-auth/providers/google";
interface Props {
  user: User | AdapterUser;
}
export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: config.googleClientId,
      clientSecret: config.googleClientSecret,
    }),
  ],
  pages: {
    signIn: "/auth/sign-in",
  },
  callbacks: {
    async signIn({ user }: Props) {
      const userFromDb = await prisma.user.findFirst({
        where: { email: user.email as string },
      });
      if (!userFromDb) {
        await createDefaultData(user);
      }
      return true;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
