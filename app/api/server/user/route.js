import { getUserByEmail } from "@/lib/actions/user.action";
import { NextResponse } from "next/server";

import { auth } from "@clerk/nextjs";

export async function GET(req) {
    
    const { searchParams} = new URL(req.url);
    const email = searchParams.get('email')

    if(email){
        return await getUserByEmailHandler(email)
    }else{
        return await getCurrentUserHandler()
    }
}

const getUserByEmailHandler = async (email)=>{
    try{
        const user = await getUserByEmail(email)
        return NextResponse.json(user, {status:200})
    } catch(error){
        return NextResponse.json({error: error.message}, {status: 500})
    }
}

const getCurrentUserHandler = async ()=>{
    try {
        const sessionClaims = auth();

        console.log("Session Claims:", sessionClaims)
        const user_email = sessionClaims.user.primaryEmailAddressId;
        return NextResponse.json({user_email}, {status:200})
    } catch(error){
        return NextResponse.json({error: error.message}, {status: 500})
    }
}



