"use server";
import { auth } from "@/auth";
import { db } from "@/lib/db"; 
import { getCurrentUser } from "@/modules/auth/actions";


export const getAllplaygroundForUser = async()=>{
    try {
        const user =await  getCurrentUser();
        if(!user) return null;
        const id = user.id;
        const playgrounds = await db.playground.findMany({where:{
            userId:id
        },
        include:{
            user:true,
            starMark:true
        }
    })
        return playgrounds;
    } catch (error) {
        console.log(error);
        return null;
    }

}