'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

const SessionsPage = () => {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const response = await fetch('/api/sessions');

        if (!response.ok) {
          throw new Error('Error fetching sessions');
        }

        const data = await response.json();
        setSessions(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching sessions', error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchSessions();
  }, []);

  if (loading) return <div className="text-center mt-10 text-xl">Loading sessions...</div>;
  if (error) return <div className="text-center mt-10 text-red-500">Error: {error}</div>;

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
  );
};

export default SessionsPage;
