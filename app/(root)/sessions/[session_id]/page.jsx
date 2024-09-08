'use client';

import React, { useEffect, useState } from 'react';

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
      <p className="text-lg mb-4">Session Start: {session.session_start_time}</p>
      <p className="text-lg mb-4">Session End: {session.session_end_time}</p>
      <p className="text-lg mb-4">Session Duration: {session.session_duration} seconds</p>

      <h2 className="text-2xl font-semibold mt-6 mb-4">Session Intervals</h2>
      {session.session_intervals && session.session_intervals.length > 0 ? (
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
      )}
    </div>
  );
};

export default SessionDetailPage;
