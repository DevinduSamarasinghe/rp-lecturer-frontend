"use client"

import React, { useState, useEffect } from 'react';
import useStore from '@/context/useStore';


const whatsHigher = (activeTime, passiveTime) => {
  let activePercentage = activeTime / (activeTime + passiveTime);

  if (activePercentage > 0.8) {
    return "You had a very active session";
  } else if (activePercentage > 0.6) {
    return "You had a moderately active session";
  } else if (activePercentage > 0.4) {
    return "You had a moderately passive session";
  } else {
    return "You had a very passive session";
  }
}

const adjustData = (isStagnant, mostFrequentPosition, mostFrequentDirection) => {
  if (isStagnant == "Stagnant"){
    return "Stagnant. Better if we move around a bit yeah? ";
  }else{
    return "covering area! Keep up the good work!";
  }
}

const SessionSidebar = () => {
  const activeTime = useStore((state) => state.activeTime);
  const passiveTime = useStore((state) => state.passiveTime);
  const session = useStore((state) => state.sessionContext);
  const isStagnant = useStore((state) => state.isStagnant);
  const mostFrequentPosition = useStore((state) => state.mostFrequentPosition);
  const mostFrequentDirection = useStore((state) => state.mostFrequentDirection);
  const facialRecognitionAccuracy = useStore((state) => state.facialRecognitionAccuracy);
  const lecturePresenceSpread = useStore((state) => state.setFacialRecognitionAccuracy);
  
  const [activeInsight, setActiveInsight] = useState(null);

  useEffect(() => {
    const activeInsight = whatsHigher(activeTime, passiveTime);
    setActiveInsight(activeInsight);
  }, [activeTime, passiveTime, session]);

  return (
    <div className="flex flex-col gap-6 mx-4 pt-2">
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4"><strong>Session Insights</strong></h2>
        <p><strong>Facial Recognition Accuracy:</strong> {facialRecognitionAccuracy}</p>
        <p className="mt-2"><strong>Lecture Presence Spread:</strong></p>
        <p>{lecturePresenceSpread}</p>
        <p className="mt-4 text-gray-600">Based on the statistics. {activeInsight}</p>
        <p className="mt-4 text-gray-600">Based on the statistics. You are {isStagnant && adjustData(isStagnant)}</p>
        <p className="mt-4 text-gray-600">Your most frequent position is {mostFrequentPosition && mostFrequentPosition?.join(', ')}</p>
        <p className="mt-4 text-gray-600">Your most frequent direction is {mostFrequentDirection && mostFrequentDirection}</p>
      </div>
    </div>
  );
};

export default SessionSidebar;
