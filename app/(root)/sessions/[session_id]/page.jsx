// SessionDetailPage.jsx
'use client';


import PosturePieChart from '@/Components/Sessions/PosturePie';
import React, { useEffect, useState } from 'react';
import { formatDuration } from '@/lib/format_utils/format_duration';
import PresencePieChart from '@/Components/Sessions/LecturePresence';

import SessionSidebar from '@/Components/Sessions/SessionSideBar2';
import HistoryComponent from '@/Components/Sessions/HistoryComponent';
import useStore from '@/context/useStore';
import BubbleNonLinear from '@/Components/Sessions/BubbleNonLinear';

const SessionDetailPage = ({ params }) => {
  const { session_id } = params;
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  console.log("")

  const setActiveSession = useStore((state)=> state.setSessionContext);
  useEffect(() => {
    const fetchSession = async () => {
      try {
        const response = await fetch(`/api/server/sessions?session_id=${session_id}`);
  
        if (!response.ok) {
          throw new Error('Error fetching session details');
        }
  
        const data = await response.json();
        setSession(data);
        setActiveSession(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching session details:', error);
        setError(error.message);
        setLoading(false);
      }
    };
  
    fetchSession();
  }, [session_id]);

  if (loading) return <div className="text-center mt-10 text-xl ml-6">Loading session...</div>;
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
    <div className="flex w-full overflow-hidden">
      {/* Left column with insights */}
      <div className="w-1/4 h-full overflow-auto">
        <SessionSidebar 
          facialRecognitionAccuracy={facialRecognitionAccuracy}
          lecturePresenceSpread={lecturePresenceSpread}
        />
      </div>

      {/* Main column with session details and charts */}
      <div className="flex-1 h-full overflow-auto p-6">
        <div className='overflow-hidden '>
          <h1 className="text-3xl font-bold">
            Session: {sessionStartTime} - {sessionEndTime}
          </h1>
          <p className="text-gray-500 text-sm mb-4">on {sessionDate}</p>
          <p className="text-gray-600 pb-5">
            <strong>Session Duration: </strong> {formatDuration(session.session_duration)}
          </p>
        </div>

        <div className="flex flex-col space-y-6">
          {/* Presence Pie Chart */}
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h3 className="text-lg font-bold mb-4">Lecture Presence</h3>
            <PresencePieChart session={session} />
          </div>

          {/* Posture Pie Chart */}
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h3 className="text-lg font-bold mb-4">Dominant Postures</h3>
            <PosturePieChart session={session} />
          </div>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-6 mt-6">
          <BubbleNonLinear session={session} />
        </div>
      </div>

      {/* Right column with history analysis */}
      <div className="w-1/4 h-full overflow-auto">
        <HistoryComponent />
      </div>
    </div>
  );
};

export default SessionDetailPage;
