import connectToDB from "@/database/db";
import NextAuth from "next-auth/next";
import GoogleProvider from 'next-auth/providers/google'
import User from "@/models/User";
import { SessionProps } from "@/types";

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID || "",
            clientSecret: process.env.GOOGLE_SECRET || ""
        })
    ],
    callbacks: {
        async session({ session }: { session: SessionProps }) {
            const sessionUser = await User.findOne({ email: session.user?.email });
            if (session.user?.id) {
                session.user.id = sessionUser._id.toString();
            }
            return session;
        },

        async signIn({ profile }) {
            try {
                await connectToDB();
                const userExists = await User.findOne({ email: profile?.email })
                if (!userExists) {
                    User.create({
                        email: profile?.email,
                        name: profile?.name,
                        image: profile?.image
                    })
                }
                return true;
            } catch (error) {
                return false;
            }
        }
    }
})

export { handler as GET, handler as POST };