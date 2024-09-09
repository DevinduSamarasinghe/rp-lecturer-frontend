import React from 'react'

const SessionDetails = ({sessions}) => {
    return (
        <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6 text-center">Sessions</h1>
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {sessions.map((session) => (
                <li key={session.session_id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200">
                <Link href={`/sessions/${session.session_id}`} passHref>
                    {session.session_id}
                </Link>
                <p className="text-gray-600">User Email: {session.user_email}</p>
                <p className="text-gray-600">Start Time: {session.session_start_time}</p>
                <p className="text-gray-600">End Time: {session.session_end_time}</p>
                <p className="text-gray-600">Duration: {session.session_duration} seconds</p>
                </li>
            ))}
            </ul>
      </div>
    )
}

export default SessionDetails