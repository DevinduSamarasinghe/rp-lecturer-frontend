import { NextResponse } from 'next/server';
import { fetchAllSessions, fetchSessionById, fetchSessionBySessionId, fetchSessionByUserEmail } from '@/lib/actions/sessions.action';

export async function GET(req) {

    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    const user_email = searchParams.get('user_email');
    const session_id = searchParams.get('session_id');

    if (id) {
        return await getSessionByIdHandler(id);
    } else if (session_id) {
        return await getSessionBySessionIdHandler(session_id);
    }else if (user_email) {
        return await getAllSessionsByUserEmailHandler(user_email);  
    } else {
        return await getAllSessionsHandler();
    }

}

const getAllSessionsHandler = async () => {

    try {
        const sessions = await fetchAllSessions();
        return NextResponse.json(sessions, { status: 200 });

    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });

    }
};

const getAllSessionsByUserEmailHandler = async (user_email)=>{
    try {

        const sessions = await fetchSessionByUserEmail(user_email);
        return NextResponse.json(sessions, { status: 200 });
    }catch (error){
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

const getSessionByIdHandler = async (id) => {
    try {
        const session = await fetchSessionById(id);
        if (!session) {
            return NextResponse.json({ message: 'Session not found' }, { status: 404 });
        }
        return NextResponse.json(session, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
};

const getSessionBySessionIdHandler = async (session_id) => {
    try {
        const session = await fetchSessionBySessionId(session_id);
        if (!session) {
            return NextResponse.json({ message: 'Session not found' }, { status: 404 });
        }
        return NextResponse.json(session, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
};
