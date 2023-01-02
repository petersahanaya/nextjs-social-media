import { AuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import GoogleProvider from 'next-auth/providers/google'

export const authOption : AuthOptions = {
    providers : [
        GoogleProvider({
            clientId : "229256620237-th8na2ds21piitcrp2ljg6nnugp9h13p.apps.googleusercontent.com",
            clientSecret : "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"
        }),
    ],
    pages : {
        signIn : "/"
    },
    session : {
        strategy : "jwt",
    },
    secret : "secret"
}   

export default NextAuth(authOption)