import React from 'react';

const SessionDetails = ({ session }) => {
  return (
    <div>
      <p><strong>Session ID:</strong> {session.session_id}</p>
      <p><strong>User Email:</strong> {session.user_email}</p>
      <p><strong>Session Start:</strong> {session.session_start_time}</p>
      <p><strong>Session End:</strong> {session.session_end_time}</p>
      <p><strong>Session Duration:</strong> {session.session_duration} seconds</p>

      <h2>Session Intervals:</h2>
      {session.session_intervals.map((interval, index) => (
        <div key={index}>
          <h3>Interval {index + 1}</h3>
          <p><strong>Interval Time:</strong> {interval.interval_time}</p>
          <p><strong>Interval Closing Time:</strong> {interval.interval_closing_time}</p>
          <p><strong>Face Name:</strong> {interval.face_name}</p>
          <p><strong>Bounding Box:</strong> {interval.bbox.join(', ')}</p>
          <p><strong>Face Detected Time:</strong> {interval.face_detected_time}</p>
          <p><strong>Is Hand Recognized:</strong> {interval.is_hand_recognized ? 'Yes' : 'No'}</p>
          <p><strong>Hand Gesture Classifier Name:</strong> {interval.hand_gesture_classifier_name}</p>
          <p><strong>Tracking Duration:</strong> {interval.tracking_duration} seconds</p>
          <p><strong>Posture:</strong> {interval.posture}</p>
        </div>
      ))}
    </div>
  );
};

export default SessionDetails;
