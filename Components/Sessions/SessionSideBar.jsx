// components/Sessions/SessionSidebar.js
import React from 'react';

const SessionSidebar = ({ facialRecognitionAccuracy, lecturePresenceSpread }) => {
  return (
    <div className="flex flex-col gap-6">
      {/* Insights Box */}
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Session Insights</h2>
        <p><strong>Facial Recognition Accuracy:</strong> {facialRecognitionAccuracy}</p>
        <p className="mt-2"><strong>Lecture Presence Spread:</strong></p>
        <p>{lecturePresenceSpread}</p>
        <p className="mt-4 text-gray-600">Other insights about the session can be added here based on the data from charts or session tracking information.</p>
      </div>

      {/* Historical Data Analysis Box */}
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Historical Data Analysis</h2>
        <p className="text-gray-600">Coming soon</p>
      </div>
    </div>
  );
};

export default SessionSidebar;
