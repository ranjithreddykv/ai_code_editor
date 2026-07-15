import { UserRole } from "./generated/prisma/enums";
import NextAuth , {type DefaultSession} from "next-auth";

export type ExtendedUser = DefaultSession["user"] &{
    role:UserRole
}
// "Whenever someone imports anything from next-auth, treat the Session interface as if it also contains my changes.";
// declare module is module augmentation: it extends the type definitions of an existing module.
declare module "next-auth"{
    interface Session{
        user:ExtendedUser
    }
}
import {JWT} from "next-auth/jwt"

declare module "next-auth/jwt"{
    interface JWT{
        role:UserRole
    }
}