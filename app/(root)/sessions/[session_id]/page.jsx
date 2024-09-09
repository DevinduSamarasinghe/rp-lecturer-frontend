'use client';

import PosturePieChart from '@/Components/Sessions/PosturePie';
import React, { useEffect, useState } from 'react';
import { formatDuration } from '@/lib/utils/format_duration';
import HeatmapPlot from '@/Components/Sessions/HeadMap';
import PresencePieChart from '@/Components/Sessions/LecturePresence';
import BubbleChart from '@/Components/Sessions/BubbleChart';

const SessionDetailPage = ({ params }) => {
  //const session_id = params.session_id; // Access session_id from params
  const {session_id} = params

  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSession = async () => {
      try {
        console.log('Fetching session:', session_id); // Log for debugging
        const response = await fetch(`/api/sessions?session_id=${session_id}`);
  
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

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Session ID: {session.session_id}</h1>
      <p className="text-lg mb-4">User Email: {session.user_email}</p>
      <p className="text-gray-600"><strong>Start Time:</strong> {new Date(session.session_start_time).toLocaleString()}</p>
      <p className="text-gray-600"><strong>End Time:</strong> {new Date(session.session_end_time).toLocaleString()}</p>
      <p className="text-grey-600"><strong>Session Duration: </strong>  {formatDuration(session.session_duration)}</p>

      <h2 className="text-2xl font-semibold mt-6 mb-4">Session Intervals</h2>
      {/* {session.session_intervals && session.session_intervals.length > 0 ? (
        <ul className="list-disc pl-5">
          {session.session_intervals.map((interval, index) => (
            <li key={index} className="mb-4">
              <p><strong>Interval Time:</strong> {interval.interval_time}</p>
              <p><strong>Face Name:</strong> {interval.face_name}</p>
              <p><strong>BBox:</strong> {interval.bbox.join(', ')}</p>
              <p><strong>Face Detected Time:</strong> {interval.face_detected_time}</p>
              <p><strong>Hand Recognized:</strong> {interval.is_hand_recognized ? 'Yes' : 'No'}</p>
              <p><strong>Hand Gesture:</strong> {interval.hand_gesture_classifier_name}</p>
              <p><strong>Tracking Duration:</strong> {interval.tracking_duration} seconds</p>
              <p><strong>Posture:</strong> {interval.posture}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No intervals available for this session.</p>
      )} */}
      
      <div>
        <PresencePieChart session={session} />
        <HeatmapPlot session={session} />
        <PosturePieChart session={session} />
        <BubbleChart session={session} />
      </div>
    </div>
  );
};

export default SessionDetailPage;
