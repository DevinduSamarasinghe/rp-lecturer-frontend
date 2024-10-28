import React from 'react'
import { auth } from '@clerk/nextjs'
import SessionTable from '@/Components/Sessions/SessionTable'
const page = async() => {

    const {sessionClaims} = auth()
    return (
        <>
            <SessionTable user_email={sessionClaims.user_email}/>
        </>
    )
}

export default page