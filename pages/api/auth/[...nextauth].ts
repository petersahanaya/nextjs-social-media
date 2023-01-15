import { AuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import GoogleProvider from 'next-auth/providers/google'
import {connectToDatabase} from "../../../lib/mongodb";
import { LoginType } from "../../../type";

export const authOption : AuthOptions = {
    providers : [
        GoogleProvider({
            clientId : process.env.PROVIDER_CLIENT_ID!,
            clientSecret : process.env.PROVIDER_CLIENT_SECRET!
        }),
    ],
    pages : {
        signIn : "/"
    },
    session : {
        strategy : "jwt",
    },
    callbacks : {
        async signIn({account, user, profile}) {
            const { db } = await connectToDatabase()

            const Login = db.collection<LoginType>('Login')
            
            const find = await Login.findOne({userId : profile?.sub}, {projection : { _id : 0 }})

            if(find) return true

            if(!find) 
            await Login.insertOne({ userId : profile?.sub!, followed : [], profile : user?.image!, username : profile?.name! })

            return true
        },
        async session({session, user, token}) {
            session.user.id = token.sub
            return session
        }
    },
    secret : process.env.NEXTAUTH_SECRET!
}   

export default NextAuth(authOption)