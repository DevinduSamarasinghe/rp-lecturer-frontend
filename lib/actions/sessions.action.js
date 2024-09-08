import Session from "../database/models/sessions.model";
import connectToDatabase from "../database";

export const fetchAllSessions = async()=>{
    try{

        await connectToDatabase();
        const sessions = await Session.find();
        return sessions
    } catch(error){
        throw new Error(error.message)
    }
}

export const fetchSessionById = async(id)=>{
    try{
        await connectToDatabase();
        const session = await Session.findById(id);
        return session
    } catch(error){
        throw new Error(error.message)
    }
}

export const fetchSessionBySessionId = async(session_id)=>{
    try{
        console.log("Sesion ID", session_id)
        await connectToDatabase();
        const session = await Session.findOne({session_id});
        return session
    } catch(error){
        throw new Error(error.message)
    }
}