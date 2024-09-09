'use client';

import PosturePieChart from '@/Components/Sessions/PosturePie';
import React, { useEffect, useState } from 'react';
import { formatDuration } from '@/lib/format_utils/format_duration';
import PresencePieChart from '@/Components/Sessions/LecturePresence';
import BubbleChart from '@/Components/Sessions/BubbleChart';
import SessionSidebar from '@/Components/Sessions/SessionSideBar';

const SessionDetailPage = ({ params }) => {
  const { session_id } = params;

  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSession = async () => {
      try {
        console.log('Fetching session:', session_id); // Log for debugging
        const response = await fetch(`/api/server/sessions?session_id=${session_id}`);
  
        if (!response.ok) {
          throw new Error('Error fetching session details');
        }
  
        const data = await response.json();
        setSession(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching session details:', error);
        setError(error.message);
        setLoading(false);
      }
    };
  
    fetchSession();
  }, [session_id]); // Make sure to include session_id in the dependency array

  if (loading) return <div className="text-center mt-10 text-xl">Loading session...</div>;
  if (error) return <div className="text-center mt-10 text-red-500">Error: {error}</div>;
  if (!session) return <div className="text-center mt-10 text-gray-500">Session not found</div>;

  // Format session start and end times for display
  const sessionStartTime = new Date(session.session_start_time).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });
  const sessionEndTime = new Date(session.session_end_time).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });
  const sessionDate = new Date(session.session_start_time).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  // Example insights - accuracy of facial recognition (replace this with real data)
  const facialRecognitionAccuracy = '95%'; // Just an example; replace with actual data
  const lecturePresenceSpread = 'Evenly distributed across the session'; // Based on Bubble chart insights

  return (
    <div className="container mx-auto p-6 flex gap-6">
      {/* Left column with insights */}
      <div className="w-1/4">
        <SessionSidebar 
          facialRecognitionAccuracy={facialRecognitionAccuracy}
          lecturePresenceSpread={lecturePresenceSpread}
        />
      </div>

      {/* Main column with session details and charts */}
      <div className="w-1/2">
        {/* Display session time and date */}
        <h1 className="text-3xl font-bold mb-2">
          Session: {sessionStartTime} - {sessionEndTime}
        </h1>
        <p className="text-gray-500 text-sm mb-4">on {sessionDate}</p>
        <p className="text-gray-600">
          <strong>Session Duration: </strong> {formatDuration(session.session_duration)}
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-4">Session Intervals</h2>

        {/* Box with shadow around the pie charts */}
        <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
          <div className="flex flex-wrap justify-center space-x-4">
            <div className="w-1/3">
              <PresencePieChart session={session} />
            </div>
            <div className="w-1/3">
              <PosturePieChart session={session} />
            </div>
          </div>
        </div>

        {/* Bubble chart aligned with the box above */}
        <div className="bg-white shadow-lg rounded-lg p-6 w-full mx-auto">
          <BubbleChart session={session} />
        </div>
      </div>
    </div>
  );
};

export default SessionDetailPage;
