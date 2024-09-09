'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { formatDuration } from '@/lib/format_utils/format_duration';

const SessionsPage = () => {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const response = await fetch('/api/server/sessions');

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
  <>
  <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Sessions</h1>
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {sessions.map((session) => (
          <Link href={`/sessions/${session.session_id}`} passHref>
            <li key={session.session_id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200">
                {session.session_id}
              <p className="text-gray-600"><strong>User Email:</strong> {session.user_email}</p>
              <p className="text-gray-600"><strong>Start Time:</strong> {new Date(session.session_start_time).toLocaleString()}</p>
              <p className="text-gray-600"><strong>End Time:</strong> {new Date(session.session_end_time).toLocaleString()}</p>
              <p className="text-gray-600"><strong>Duration:</strong> {formatDuration(session.session_duration)}</p>
            </li>
          </Link>
        ))}
      </ul>
    </div>
  </>
    
  );
};

export default SessionsPage;
