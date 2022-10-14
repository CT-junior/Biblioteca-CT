import { FirestoreAdapter } from "@next-auth/firebase-adapter";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

import { firebaseConfig } from "../../../services/firebase";

export default NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET,
        }),
    ],
    callbacks: {
        async signIn({ account, profile }) {
            if (account.provider === "google") {
                return (
                    profile.email_verified &&
                    profile.email.endsWith("@ctjunior.com.br")
                );
            }
            return true; // if there is no specific handling for the provider, sign in is allowed
        },
        session: async ({ session, token }) => {
            if (session?.user) {
                session.user.id = token.sub;
            }
            return session;
        },
    },
    session: {
        strategy: "jwt",
    },

    pages: {
        signIn: "/auth/signin",
        error: "/auth/signin",
    },
    adapter: FirestoreAdapter({ ...firebaseConfig }),
});
